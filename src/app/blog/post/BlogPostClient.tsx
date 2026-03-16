"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Tag,
  User,
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
        <div className="w-6 h-6 border-2 border-prism-violet/30 border-t-prism-violet rounded-full animate-spin" />
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
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Post not found
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            This post may have been removed or is no longer available.
          </p>
          <MseLink
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-white/[0.06] border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-white/[0.1] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
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
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <MseLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </MseLink>
        </motion.div>

        {/* Cover image */}
        {post.coverImageURL && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <img
              src={post.coverImageURL}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-lg text-zinc-400 leading-relaxed mb-6">
              {post.description}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            {/* Author */}
            <div className="flex items-center gap-2">
              {post.authorPhotoURL ? (
                <img
                  src={post.authorPhotoURL}
                  alt={post.authorName}
                  className="w-6 h-6 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span>{post.authorName}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-mono text-xs">{formattedDate}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono",
                    "bg-white/[0.04] border border-white/[0.06] text-zinc-500"
                  )}
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="mt-8 h-[1px] bg-gradient-to-r from-prism-violet/20 via-prism-cyan/10 to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ContentRenderer value={post.content} />
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
          <div className="w-6 h-6 border-2 border-prism-violet/30 border-t-prism-violet rounded-full animate-spin" />
        </div>
      }
    >
      <BlogPostInner />
    </Suspense>
  );
}
