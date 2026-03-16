"use client";

import { useState, useEffect, useCallback } from "react";
import { getPublishedBlogPosts } from "@/lib/firebase/firestore";
import type { BlogPost } from "@/lib/firebase/types";
import type { DocumentSnapshot } from "firebase/firestore";

/**
 * Fetches published Firestore blog posts with cursor-based pagination.
 */
export function useBlogList(pageSize = 6) {
  const [firestoreBlogs, setFirestoreBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<DocumentSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const result = await getPublishedBlogPosts(pageSize);
        if (cancelled) return;
        setFirestoreBlogs(result.data);
        setCursor(result.lastDoc);
        setHasMore(result.hasMore);
      } catch (err) {
        console.error("Failed to load blog posts:", err);
        if (!cancelled) setError("Failed to load community posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pageSize]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || !cursor) return;
    setLoadingMore(true);

    try {
      const result = await getPublishedBlogPosts(pageSize, cursor);
      setFirestoreBlogs((prev) => [...prev, ...result.data]);
      setCursor(result.lastDoc);
      setHasMore(result.hasMore);
    } catch {
      setError("Failed to load more posts");
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, cursor, pageSize]);

  return { firestoreBlogs, loading, loadingMore, hasMore, loadMore, error };
}
