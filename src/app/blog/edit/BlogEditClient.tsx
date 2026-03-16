"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { PenLine, Save, Tag, X, Image as ImageIcon, CheckCircle } from "lucide-react";
import AuthGuard from "@/components/Auth/AuthGuard";
import UnauthorizedMessage from "@/components/Auth/UnauthorizedMessage";
import { ContentEditor } from "@/components/ContentEditor";
import type { SerializedEditorState } from "@/components/ContentEditor";
import { useBlogEditor } from "@/hooks/blog/useBlogEditor";
import { useAuth } from "@/hooks/useAuth";
import { publishBlogPost, unpublishBlogPost } from "@/lib/firebase/firestore";

const INPUT_CLASS = cn(
  "w-full px-4 py-3 rounded-xl text-sm",
  "bg-white/[0.04] border border-white/[0.08]",
  "text-zinc-200 placeholder:text-zinc-600",
  "focus:outline-none focus:border-prism-violet/40 focus:ring-1 focus:ring-prism-violet/20",
  "transition-all duration-200"
);

function TagInput({
  tags,
  onAdd,
  onRemove,
}: {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = value.trim().toLowerCase();
      if (tag && !tags.includes(tag)) {
        onAdd(tag);
      }
      setValue("");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-prism-violet/10 text-prism-violet border border-prism-violet/20"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="hover:text-prism-rose transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags (press Enter)"
        className={INPUT_CLASS}
      />
    </div>
  );
}

function BlogEditForm({ postId }: { postId: string }) {
  const { user, isAdmin } = useAuth();
  const {
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
    saving,
    loading,
    error,
    post,
    save,
  } = useBlogEditor({ postId });

  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const handleContentChange = useCallback(
    (state: SerializedEditorState) => {
      setContent(state);
    },
    [setContent]
  );

  const handleSave = async () => {
    await save();
  };

  const handlePublishToggle = async () => {
    if (!post || !user) return;
    setPublishing(true);
    setPublishError(null);
    try {
      if (post.status === "published") {
        await unpublishBlogPost(postId);
      } else {
        await publishBlogPost(postId, user.uid, isAdmin);
      }
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        setPublishError(err.message);
      }
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-prism-violet/30 border-t-prism-violet rounded-full animate-spin" />
      </div>
    );
  }

  // Check authorization: author or admin
  if (post && user && post.authorId !== user.uid && !isAdmin) {
    return <UnauthorizedMessage />;
  }

  return (
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

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-prism-violet/20 to-prism-cyan/20 border border-white/[0.08]">
                <PenLine className="w-4.5 h-4.5 text-prism-cyan" />
              </div>
              <div>
                <h1 className="text-xl font-semibold font-display text-white tracking-tight">
                  Edit Blog
                </h1>
                <p className="text-[11px] text-zinc-600 font-mono">
                  {post?.status === "published" ? "Published" : "Draft"} · Auto-saves every 5s
                </p>
              </div>
            </div>

            {post?.status === "published" && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="w-3 h-3" />
                Published
              </span>
            )}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className={cn(INPUT_CLASS, "text-lg font-display")}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary"
              rows={2}
              className={cn(INPUT_CLASS, "resize-none")}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              <ImageIcon className="w-3 h-3 inline mr-1" />
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImageURL ?? ""}
              onChange={(e) => setCoverImageURL(e.target.value || null)}
              placeholder="https://example.com/image.jpg (optional)"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              <Tag className="w-3 h-3 inline mr-1" />
              Tags
            </label>
            <TagInput
              tags={tags}
              onAdd={(tag) => setTags([...tags, tag])}
              onRemove={(tag) => setTags(tags.filter((t) => t !== tag))}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Content
            </label>
            <ContentEditor
              value={content}
              onChange={handleContentChange}
              placeholder="Start writing..."
            />
          </div>

          {error && <p className="text-sm text-prism-rose">{error}</p>}
          {publishError && <p className="text-sm text-prism-rose">{publishError}</p>}

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium",
                "bg-prism-violet text-white",
                "hover:bg-prism-violet/90 transition-colors",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={handlePublishToggle}
              disabled={publishing}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors",
                post?.status === "published"
                  ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  : "bg-emerald-600 text-white hover:bg-emerald-500",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              <CheckCircle className="w-4 h-4" />
              {publishing
                ? "..."
                : post?.status === "published"
                  ? "Unpublish"
                  : "Publish"}
            </button>

            {!isAdmin && post?.status !== "published" && (
              <span className="text-[11px] text-zinc-600 font-mono">
                Max 3 posts/day
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BlogEditInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-zinc-500">No post ID specified.</p>
      </div>
    );
  }

  return (
    <AuthGuard>
      <BlogEditForm postId={id} />
    </AuthGuard>
  );
}

export default function BlogEditClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-prism-violet/30 border-t-prism-violet rounded-full animate-spin" />
        </div>
      }
    >
      <BlogEditInner />
    </Suspense>
  );
}
