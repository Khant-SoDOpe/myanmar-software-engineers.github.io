"use client";

import ProfileCardItem from "@/components/Profile/ProfileCardItem/ProfileCardItem";
import { cn } from "@/utils";
import styles from "@/styles/styles";
import { motion } from "motion/react";
import { Eye, FileCode, LayoutGrid } from "lucide-react";
import { useState } from "react";
import MarkdownPreviewRenderer from "./MarkdownPreviewRenderer";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

const PreviewPane = ({
  name,
  description,
  image,
  tags,
  body,
  mdxOutput,
}: {
  name: string;
  description: string;
  image: string;
  tags: string[];
  body: string;
  mdxOutput: string;
}) => {
  const [showRaw, setShowRaw] = useState(false);
  const t = useTranslations("profileEditor");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  const hasContent = name.trim() || description.trim() || image.trim() || tags.length > 0 || body.trim();

  return (
    <div className={cn(styles.cardSurface, "p-6 lg:sticky lg:top-6 overflow-y-auto max-h-[85vh]")}>
      {/* Section header */}
      <motion.div
        className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-7 h-7 rounded-lg"
            style={{
              background: "linear-gradient(135deg, #22d3ee12, #22d3ee06)",
              border: "1px solid rgba(34,211,238,0.15)",
            }}
          >
            <Eye className="w-3.5 h-3.5 text-prism-cyan" />
          </div>
          <span className={`font-mono text-[11px] text-zinc-400 uppercase tracking-[0.15em] ${mmFont}`}>
            {t("preview")}
          </span>
        </div>

        {/* Toggle raw/preview */}
        <button
          type="button"
          onClick={() => setShowRaw(!showRaw)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono",
            "border transition-all duration-200 active:scale-95",
            showRaw
              ? "bg-prism-cyan/10 border-prism-cyan/20 text-prism-cyan"
              : "bg-white/[0.04] border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12]"
          )}
        >
          <FileCode className="w-3 h-3" />
          {showRaw ? t("mdx") : t("raw")}
        </button>
      </motion.div>

      {!hasContent ? (
        /* Empty state */
        <motion.div
          className="flex flex-col items-center justify-center py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #a78bfa08, #22d3ee05)",
              border: "1px solid rgba(167,139,250,0.1)",
            }}
          >
            <Eye className="w-7 h-7 text-zinc-700" />
          </div>
          <p className={`text-sm text-zinc-600 font-body ${mmFont}`}>
            {t("emptyPreview")}
          </p>
        </motion.div>
      ) : showRaw ? (
        /* Raw MDX output */
        <motion.pre
          className="overflow-x-auto rounded-lg border border-white/10 bg-obsidian p-4 font-mono text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {mdxOutput}
        </motion.pre>
      ) : (
        /* Visual preview */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-5"
        >
          {/* Profile Card Preview — exactly as it appears on /profile */}
          {name.trim() && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <LayoutGrid className="w-3 h-3 text-prism-violet/50" />
                <span className={`font-mono text-[10px] text-zinc-600 uppercase tracking-[0.15em] ${mmFont}`}>
                  {t("cardPreview")}
                </span>
              </div>
              <div className="pointer-events-none max-w-sm">
                <ProfileCardItem
                  _id="editor-preview"
                  slugAsParams="editor"
                  name={name.trim()}
                  description={description.trim() || undefined}
                  image={image.trim() || undefined}
                  tags={tags.length > 0 ? tags : undefined}
                  searchTag=""
                />
              </div>
            </div>
          )}

          {/* Markdown body */}
          {body.trim() && (
            <div className="border-t border-white/[0.06] pt-5">
              <MarkdownPreviewRenderer content={body} />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PreviewPane;
