"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  createJobPost,
  updateJobPost,
  getJobPost,
} from "@/lib/firebase/firestore-jobs";
import type { JobPost, JobPostInput } from "@/lib/firebase/types";
import type { SerializedEditorState } from "lexical";

interface UseJobEditorOptions {
  postId?: string;
}

export function useJobEditor(options: UseJobEditorOptions = {}) {
  const { user } = useAuth();
  const [position, setPosition] = useState("");
  const [tag, setTag] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [officeEmail, setOfficeEmail] = useState("");
  const [expiredAt, setExpiredAt] = useState<Date | null>(null);
  const [description, setDescription] = useState<SerializedEditorState | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!options.postId);
  const [error, setError] = useState<string | null>(null);
  const [postId, setPostId] = useState<string | null>(options.postId ?? null);
  const [post, setPost] = useState<JobPost | null>(null);

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load existing post
  useEffect(() => {
    if (!options.postId) return;
    let cancelled = false;

    (async () => {
      try {
        const existing = await getJobPost(options.postId!);
        if (cancelled || !existing) return;
        setPost(existing);
        setPosition(existing.position);
        setTag(existing.tag);
        setSkills(existing.skills);
        setOfficeEmail(existing.officeEmail);
        setExpiredAt(existing.expiredAt);
        setDescription(existing.description);
      } catch {
        setError("Failed to load job post");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [options.postId]);

  // Auto-save (debounced 5s)
  useEffect(() => {
    if (!postId || !description || !user) return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      try {
        await updateJobPost(postId, {
          position,
          tag,
          skills,
          officeEmail,
          expiredAt,
          description,
        });
      } catch {
        // Silent auto-save failure
      }
    }, 5000);

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [description, position, tag, skills, officeEmail, expiredAt, postId, user]);

  const save = useCallback(async () => {
    if (!user || !description) return null;
    setSaving(true);
    setError(null);

    try {
      const input: JobPostInput = {
        position,
        tag,
        skills,
        officeEmail,
        expiredAt,
        description,
      };

      if (postId) {
        await updateJobPost(postId, input);
        return postId;
      } else {
        const newId = await createJobPost(input, user);
        setPostId(newId);
        return newId;
      }
    } catch {
      setError("Failed to save job post");
      return null;
    } finally {
      setSaving(false);
    }
  }, [user, description, position, tag, skills, officeEmail, expiredAt, postId]);

  return {
    position,
    setPosition,
    tag,
    setTag,
    skills,
    setSkills,
    officeEmail,
    setOfficeEmail,
    expiredAt,
    setExpiredAt,
    description,
    setDescription,
    postId,
    post,
    saving,
    loading,
    error,
    save,
  };
}
