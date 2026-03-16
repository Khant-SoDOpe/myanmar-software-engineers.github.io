"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { motion } from "motion/react";
import {
  Calendar,
  ArrowLeft,
  Tag,
  Clock3,
  BookOpen,
  Share2,
  FileText,
} from "lucide-react";
import MseLink from "@/components/Ui/MseLink/MseLink";
import { ContentRenderer } from "@/components/ContentEditor";
import { getBlogPostBySlug } from "@/lib/firebase/firestore";
import type { BlogPost } from "@/lib/firebase/types";

function BlogPostInner() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await getBlogPostBySlug(slug);
        if (cancelled) return;
        if (data) {
          setPost(data);
        } else {
          setNotFound(true);
        }
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: "#a78bfa", borderRightColor: "#22d3ee" }}
          />
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div
            className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/[0.06]"
            style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.08), rgba(34,211,238,0.08))" }}
          >
            <FileText className="w-7 h-7 text-zinc-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Post not found
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            This post may have been removed or is no longer available.
          </p>
          <MseLink
            href="/blog"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300 overflow-hidden"
          >
            <span
              className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                padding: "1.5px",
                background: "linear-gradient(135deg, #22d3ee, #a78bfa, #fb7185)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.06), rgba(167,139,250,0.06), rgba(251,113,133,0.06))" }}
            />
            <ArrowLeft className="relative z-10 w-4 h-4" />
            <span className="relative z-10">Back to Blog</span>
          </MseLink>
        </motion.div>
      </div>
    );
  }

  const formattedDate = post.publishedAt
    ? post.publishedAt.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : post.createdAt.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  // Rough reading time estimate
  const readTime = Math.max(2, Math.ceil((post.description?.length ?? 200) / 150));

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20 px-5 relative">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.05] blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, #a78bfa 0%, #22d3ee 40%, transparent 70%)",
          }}
        />
      </div>

      <article className="max-w-3xl mx-auto relative z-10">
        {/* Top bar: back + share */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <MseLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider">Blog</span>
          </MseLink>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-200 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
          >
            <Share2 className="w-3 h-3" />
            Share
          </button>
        </motion.div>

        {/* Cover image */}
        {post.coverImageURL && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 rounded-2xl overflow-hidden border border-white/[0.06] relative"
          >
            <img
              src={post.coverImageURL}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[420px]"
            />
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-obsidian/80 to-transparent" />
          </motion.div>
        )}

        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-10 rounded-2xl overflow-hidden bg-white/[0.015] border border-white/[0.05] p-6 md:p-8"
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, #22d3ee50, #a78bfa40, #fb718530, transparent 80%)" }}
          />

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {/* Section label */}
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
              <BookOpen className="w-3 h-3 text-prism-violet" />
              Article
            </span>

            <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />

            {/* Date */}
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
              <Calendar className="w-3 h-3 text-prism-cyan" />
              {formattedDate}
            </span>

            <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />

            {/* Read time */}
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600">
              <Clock3 className="w-2.5 h-2.5" />
              {readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-base text-zinc-400 leading-relaxed mb-6">
              {post.description}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono",
                    "bg-white/[0.03] border border-white/[0.06] text-zinc-500"
                  )}
                >
                  <Tag className="w-2.5 h-2.5 text-prism-violet/60" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Separator */}
          <div className="h-px w-full bg-gradient-to-r from-white/[0.04] via-white/[0.06] to-transparent mb-5" />

          {/* Author row */}
          <div className="flex items-center gap-3">
            {/* Avatar with prismatic ring */}
            <div
              className="w-9 h-9 rounded-full p-[1.5px] shrink-0"
              style={{ background: "linear-gradient(135deg, #22d3ee, #a78bfa, #fb7185)" }}
            >
              <span className="block w-full h-full rounded-full overflow-hidden bg-obsidian">
                {post.authorPhotoURL ? (
                  <img
                    src={post.authorPhotoURL}
                    alt={post.authorName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center bg-prism-violet/15 text-sm font-bold text-prism-violet uppercase">
                    {(post.authorName ?? "U").charAt(0)}
                  </span>
                )}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">{post.authorName}</p>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Author</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ContentRenderer value={post.content} />
        </motion.div>

        {/* Bottom nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/[0.04]"
        >
          <div className="flex items-center justify-between">
            <MseLink
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider">All posts</span>
            </MseLink>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-200 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
            >
              <Share2 className="w-3 h-3" />
              Share
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
}

export default function BlogPostClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
              style={{ borderTopColor: "#a78bfa", borderRightColor: "#22d3ee" }}
            />
          </div>
        </div>
      }
    >
      <BlogPostInner />
    </Suspense>
  );
}
