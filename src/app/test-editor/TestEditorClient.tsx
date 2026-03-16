"use client";

import { useState, useMemo, useCallback } from "react";
import { ContentEditor, ContentRenderer } from "@/components/ContentEditor";
import type { SerializedEditorState } from "@/components/ContentEditor";
import { cn } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine,
  Eye,
  Braces,
  ChevronDown,
  Keyboard,
  Type,
  Hash,
  Bold,
  Quote,
  Minus,
  Slash,
} from "lucide-react";

/* ── Helpers ── */
function countWords(state: SerializedEditorState | null): number {
  if (!state) return 0;
  const text = extractText(state.root);
  return text
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(node: any): string {
  if (!node) return "";
  if (node.text) return node.text;
  if (node.children) {
    return node.children.map(extractText).join(" ");
  }
  return "";
}

/* ── Shortcut Pill ── */
function ShortcutPill({
  keys,
  label,
  icon: Icon,
}: {
  keys: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-2 group">
      <div
        className={cn(
          "w-7 h-7 rounded-md flex items-center justify-center",
          "bg-white/[0.04] border border-white/[0.06]",
          "group-hover:border-prism-violet/30 group-hover:bg-prism-violet/[0.06]",
          "transition-all duration-300"
        )}
      >
        <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-prism-violet transition-colors duration-300" />
      </div>
      <div className="flex items-center gap-1.5">
        <kbd
          className={cn(
            "px-1.5 py-0.5 rounded text-[10px] font-mono leading-none",
            "bg-white/[0.04] border border-white/[0.08] text-zinc-500",
            "group-hover:text-zinc-300 transition-colors duration-300"
          )}
        >
          {keys}
        </kbd>
        <span className="text-[11px] text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ── Tab Button ── */
function TabButton({
  active,
  onClick,
  disabled,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300",
        active
          ? "text-white"
          : "text-zinc-500 hover:text-zinc-300",
        "disabled:opacity-30 disabled:cursor-not-allowed"
      )}
    >
      <Icon className={cn("w-4 h-4 transition-colors duration-300", active ? "text-prism-cyan" : "")} />
      {label}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prism-cyan to-transparent"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

/* ── Main ── */
export default function TestEditorClient() {
  const [content, setContent] = useState<SerializedEditorState | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "preview" | "json">("editor");
  const [jsonCollapsed, setJsonCollapsed] = useState(true);

  const wordCount = useMemo(() => countWords(content), [content]);

  const handleChange = useCallback((state: SerializedEditorState) => {
    setContent(state);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20 px-5 relative overflow-hidden">
      {/* ── Atmospheric Background ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 bg-square"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.03) 70%, transparent)",
          }}
        />
        {/* Prism glow */}
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.07] blur-[120px]"
          style={{
            background: "radial-gradient(ellipse, #a78bfa 0%, #22d3ee 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center",
                "bg-gradient-to-br from-prism-violet/20 to-prism-cyan/20",
                "border border-white/[0.08]"
              )}
            >
              <PenLine className="w-4.5 h-4.5 text-prism-cyan" />
            </div>
            <div>
              <h1 className="text-xl font-semibold font-display text-white tracking-tight">
                Content Editor
              </h1>
              <p className="text-xs text-zinc-600">
                Lexical-powered rich text editor
              </p>
            </div>
          </div>

          {/* Shortcut hints */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-x-4 gap-y-2 mt-4"
          >
            <ShortcutPill icon={Slash} keys="/" label="Commands" />
            <ShortcutPill icon={Hash} keys="#" label="Heading" />
            <ShortcutPill icon={Bold} keys="**" label="Bold" />
            <ShortcutPill icon={Quote} keys=">" label="Quote" />
            <ShortcutPill icon={Minus} keys="---" label="Divider" />
            <ShortcutPill icon={Type} keys="Select" label="Toolbar" />
          </motion.div>
        </motion.div>

        {/* ── Editor Chrome ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Tab bar */}
          <div
            className={cn(
              "flex items-center border-b border-white/[0.06]",
              "bg-surface/60 backdrop-blur-sm rounded-t-xl"
            )}
          >
            <TabButton
              active={activeTab === "editor"}
              onClick={() => setActiveTab("editor")}
              icon={PenLine}
              label="Editor"
            />
            <TabButton
              active={activeTab === "preview"}
              onClick={() => setActiveTab("preview")}
              disabled={!content}
              icon={Eye}
              label="Preview"
            />
            <TabButton
              active={activeTab === "json"}
              onClick={() => setActiveTab("json")}
              disabled={!content}
              icon={Braces}
              label="JSON"
            />

            {/* Word count — right side */}
            <div className="ml-auto pr-4 flex items-center gap-3">
              {content && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] text-zinc-600 font-mono tabular-nums"
                >
                  {wordCount} {wordCount === 1 ? "word" : "words"}
                </motion.span>
              )}
            </div>
          </div>

          {/* Content area */}
          <div
            className={cn(
              "rounded-b-xl border border-t-0 border-white/[0.06]",
              "bg-[#0f0f14]/80 backdrop-blur-sm",
              "shadow-2xl shadow-black/30"
            )}
          >
            {/* Editor — always mounted, hidden when not active */}
            <div className={activeTab !== "editor" ? "hidden" : ""}>
              <ContentEditor
                value={null}
                onChange={handleChange}
                placeholder="Start writing... (type / for commands)"
                className="[&>div]:border-0 [&>div]:rounded-none [&>div]:bg-transparent [&>div]:rounded-b-xl"
              />
            </div>

            {/* Preview */}
            <AnimatePresence mode="wait">
              {activeTab === "preview" && content && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-5 py-4 min-h-[200px]"
                >
                  <ContentRenderer value={content} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* JSON */}
            <AnimatePresence mode="wait">
              {activeTab === "json" && content && (
                <motion.div
                  key="json"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04]">
                    <span className="text-[11px] font-mono text-zinc-600">
                      SerializedEditorState
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          JSON.stringify(content, null, 2)
                        );
                      }}
                      className="text-[11px] font-mono text-zinc-600 hover:text-prism-cyan transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 font-mono text-xs text-zinc-500 overflow-auto max-h-[400px] leading-relaxed">
                    {JSON.stringify(content, null, 2)}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Keyboard shortcuts reference ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6"
        >
          <button
            type="button"
            onClick={() => setJsonCollapsed(!jsonCollapsed)}
            className="flex items-center gap-2 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors group"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="font-mono">Keyboard shortcuts</span>
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform duration-300",
                !jsonCollapsed && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {!jsonCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div
                  className={cn(
                    "mt-3 p-4 rounded-xl",
                    "bg-white/[0.02] border border-white/[0.04]"
                  )}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                    {[
                      ["# + Space", "Heading 1"],
                      ["## + Space", "Heading 2"],
                      ["### + Space", "Heading 3"],
                      ["**text**", "Bold"],
                      ["*text*", "Italic"],
                      ["`text`", "Inline code"],
                      ["- + Space", "Bullet list"],
                      ["1. + Space", "Numbered list"],
                      ["> + Space", "Blockquote"],
                      ["```", "Code block"],
                      ["---", "Divider"],
                      ["/ ", "Slash commands"],
                    ].map(([key, desc]) => (
                      <div key={key} className="flex items-center gap-2">
                        <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/[0.06] text-zinc-500 shrink-0">
                          {key}
                        </kbd>
                        <span className="text-[11px] text-zinc-600 truncate">
                          {desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
