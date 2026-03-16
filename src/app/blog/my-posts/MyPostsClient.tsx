"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/utils";
import { motion } from "motion/react";
import {
  FileText,
  PenLine,
  Trash2,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react";
import AuthGuard from "@/components/Auth/AuthGuard";
import MseLink from "@/components/Ui/MseLink/MseLink";
import { useAuth } from "@/hooks/useAuth";
import { getUserDrafts, deleteBlogPost } from "@/lib/firebase/firestore";
import type { BlogPost } from "@/lib/firebase/types";
import type { DocumentSnapshot } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

function PostsList() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<DocumentSnapshot | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const t = useTranslations("blog");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      try {
        const result = await getUserDrafts(user.uid);
        if (cancelled) return;
        setPosts(result.data);
        setCursor(result.lastDoc);
        setHasMore(result.hasMore);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || !cursor || !user) return;
    setLoadingMore(true);
    try {
      const result = await getUserDrafts(user.uid, 6, cursor);
      setPosts((prev) => [...prev, ...result.data]);
      setCursor(result.lastDoc);
      setHasMore(result.hasMore);
    } catch (err) {
      console.error("Failed to load more:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, cursor, user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      // handled
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-prism-violet/30 border-t-prism-violet rounded-full animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08]">
          <FileText className="w-6 h-6 text-zinc-600" />
        </div>
        <p className={cn("text-zinc-500 text-sm mb-4", mmFont)}>{t("noPostsTitle")}</p>
        <MseLink
          href="/blog/write"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-prism-violet text-white hover:bg-prism-violet/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className={mmFont}>{t("writeBlog")}</span>
        </MseLink>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl",
              "bg-white/[0.02] border border-white/[0.06]",
              "hover:border-white/[0.1] transition-all duration-200"
            )}
          >
            {/* Status icon */}
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                post.status === "published"
                  ? "bg-emerald-500/10"
                  : "bg-zinc-500/10"
              )}
            >
              {post.status === "published" ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <Clock className="w-4 h-4 text-zinc-500" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-zinc-200 truncate">
                {post.title || "Untitled"}
              </h3>
              <p className="text-[11px] text-zinc-600 font-mono">
                {post.status === "published" ? t("publish") : t("saveDraft")} ·{" "}
                {post.updatedAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <MseLink
                href={`/blog/edit?id=${post.id}`}
                className="p-2 rounded-lg text-zinc-500 hover:text-prism-cyan hover:bg-white/[0.04] transition-colors"
              >
                <PenLine className="w-4 h-4" />
              </MseLink>
              <button
                type="button"
                onClick={() => handleDelete(post.id)}
                disabled={deleting === post.id}
                className="p-2 rounded-lg text-zinc-500 hover:text-prism-rose hover:bg-prism-rose/[0.04] transition-colors disabled:opacity-30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium",
              "bg-white/[0.04] border border-white/[0.08]",
              "text-zinc-400 hover:text-white hover:bg-white/[0.08]",
              "transition-all duration-300",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            {loadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              "Load more"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function MyPostsClient() {
  const t = useTranslations("blog");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  return (
    <AuthGuard>
      <div className="min-h-screen bg-obsidian pt-24 pb-20 px-5 relative">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.05] blur-[120px]"
            style={{
              background:
                "radial-gradient(ellipse, #a78bfa 0%, #22d3ee 40%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-prism-violet/20 to-prism-cyan/20 border border-white/[0.08]">
                <FileText className="w-4.5 h-4.5 text-prism-cyan" />
              </div>
              <h1 className={cn("text-xl font-semibold font-display text-white tracking-tight", mmFont)}>
                {t("myBlogs")}
              </h1>
            </div>

            <MseLink
              href="/blog/write"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-prism-violet text-white hover:bg-prism-violet/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className={mmFont}>{t("newBlog")}</span>
            </MseLink>
          </motion.div>

          <PostsList />
        </div>
      </div>
    </AuthGuard>
  );
}
