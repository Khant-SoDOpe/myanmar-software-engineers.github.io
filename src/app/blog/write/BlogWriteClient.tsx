"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { PenLine, Save, Tag, X, Image as ImageIcon } from "lucide-react";
import AuthGuard from "@/components/Auth/AuthGuard";
import { ContentEditor } from "@/components/ContentEditor";
import type { SerializedEditorState } from "@/components/ContentEditor";
import { useBlogEditor } from "@/hooks/blog/useBlogEditor";

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

function BlogWriteForm() {
  const router = useRouter();
  const {
    title,
    setTitle,
    description,
    setDescription,
    tags,
    setTags,
    coverImageURL,
    setCoverImageURL,
    setContent,
    saving,
    error,
    save,
  } = useBlogEditor();

  const handleContentChange = useCallback(
    (state: SerializedEditorState) => {
      setContent(state);
    },
    [setContent]
  );

  const handleSave = async () => {
    const id = await save();
    if (id) {
      router.push(`/blog/edit?id=${id}`);
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

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-prism-violet/20 to-prism-cyan/20 border border-white/[0.08]">
              <PenLine className="w-4.5 h-4.5 text-prism-cyan" />
            </div>
            <h1 className="text-xl font-semibold font-display text-white tracking-tight">
              Write New Blog
            </h1>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-5"
        >
          {/* Title */}
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

          {/* Description */}
          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of your post"
              rows={2}
              className={cn(INPUT_CLASS, "resize-none")}
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              <ImageIcon className="w-3 h-3 inline mr-1" />
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImageURL ?? ""}
              onChange={(e) =>
                setCoverImageURL(e.target.value || null)
              }
              placeholder="https://example.com/image.jpg (optional)"
              className={INPUT_CLASS}
            />
          </div>

          {/* Tags */}
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

          {/* Content Editor */}
          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Content
            </label>
            <ContentEditor
              value={null}
              onChange={handleContentChange}
              placeholder="Start writing your post... (type / for commands)"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-prism-rose">{error}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium",
                "bg-prism-violet text-white",
                "hover:bg-prism-violet/90 transition-colors duration-200",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Draft"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function BlogWriteClient() {
  return (
    <AuthGuard>
      <BlogWriteForm />
    </AuthGuard>
  );
}
