"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import editorTheme from "./theme";
import { editorNodes } from "./nodes";
import type { ContentRendererProps } from "./types";
import { cn } from "@/utils";
import { khitHaungg } from "@/fonts/fonts";

export default function ContentRenderer({
  value,
  className,
}: ContentRendererProps) {
  const initialConfig = {
    namespace: "ContentRenderer",
    theme: editorTheme,
    nodes: editorNodes,
    editable: false,
    editorState: JSON.stringify(value),
    onError: (error: Error) => {
      console.error("[ContentRenderer]", error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={cn(
          "ce-renderer",
          "relative rounded-2xl",
          "bg-white/[0.01] border border-white/[0.04]",
          "p-6 sm:p-8 md:p-10",
          className
        )}
      >
        {/* Subtle top accent */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.12), rgba(34,211,238,0.08), transparent)" }}
        />

        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={cn("text-zinc-300 text-[15px] leading-[1.8] focus:outline-none", khitHaungg.className)}
            />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  );
}
