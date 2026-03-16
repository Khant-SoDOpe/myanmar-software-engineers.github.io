"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  createBlogPost,
  updateBlogPost,
  getBlogPost,
} from "@/lib/firebase/firestore";
import type { BlogPost, BlogPostInput } from "@/lib/firebase/types";
import type { SerializedEditorState } from "lexical";

interface UseBlogEditorOptions {
  postId?: string; // If editing existing post
}

export function useBlogEditor(options: UseBlogEditorOptions = {}) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImageURL, setCoverImageURL] = useState<string | null>(null);
  const [content, setContent] = useState<SerializedEditorState | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!options.postId);
  const [error, setError] = useState<string | null>(null);
  const [postId, setPostId] = useState<string | null>(options.postId ?? null);
  const [post, setPost] = useState<BlogPost | null>(null);

  // Auto-save timer
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load existing post
  useEffect(() => {
    if (!options.postId) return;
    let cancelled = false;

    (async () => {
      try {
        const existing = await getBlogPost(options.postId!);
        if (cancelled || !existing) return;
        setPost(existing);
        setTitle(existing.title);
        setDescription(existing.description);
        setTags(existing.tags);
        setCoverImageURL(existing.coverImageURL);
        setContent(existing.content);
      } catch {
        setError("Failed to load post");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [options.postId]);

  // Auto-save (debounced 5s after last content change)
  useEffect(() => {
    if (!postId || !content || !user) return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      try {
        await updateBlogPost(postId, {
          title,
          description,
          content,
          tags,
          coverImageURL,
        });
      } catch {
        // Silent auto-save failure
      }
    }, 5000);

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [content, title, description, tags, coverImageURL, postId, user]);

  const save = useCallback(async () => {
    if (!user || !content) return null;
    setSaving(true);
    setError(null);

    try {
      const input: BlogPostInput = {
        title,
        description,
        content,
        tags,
        coverImageURL,
      };

      if (postId) {
        await updateBlogPost(postId, input);
        return postId;
      } else {
        const newId = await createBlogPost(input, user);
        setPostId(newId);
        return newId;
      }
    } catch {
      setError("Failed to save post");
      return null;
    } finally {
      setSaving(false);
    }
  }, [user, content, title, description, tags, coverImageURL, postId]);

  return {
    // State
    title,
    setTitle,
    description,
    setDescription,
    tags,
    setTags,
    coverImageURL,
    setCoverImageURL,
    content,
    setContent,
    // Meta
    postId,
    post,
    saving,
    loading,
    error,
    // Actions
    save,
  };
}
