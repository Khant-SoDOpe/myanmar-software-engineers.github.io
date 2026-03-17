"use client";

import { useState, useEffect, useCallback } from "react";
import { getPublishedJobPosts } from "@/lib/firebase/firestore-jobs";
import type { JobPost } from "@/lib/firebase/types";
import type { DocumentSnapshot } from "firebase/firestore";

export function useJobList(pageSize = 6) {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<DocumentSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const result = await getPublishedJobPosts(pageSize);
        if (cancelled) return;
        setJobs(result.data);
        setCursor(result.lastDoc);
        setHasMore(result.hasMore);
      } catch (err) {
        console.error("Failed to load job posts:", err);
        if (!cancelled) setError("Failed to load job posts");
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
      const result = await getPublishedJobPosts(pageSize, cursor);
      setJobs((prev) => [...prev, ...result.data]);
      setCursor(result.lastDoc);
      setHasMore(result.hasMore);
    } catch {
      setError("Failed to load more jobs");
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, cursor, pageSize]);

  return { jobs, loading, loadingMore, hasMore, loadMore, error };
}
