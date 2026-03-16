"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import editorTheme from "./theme";
import { editorNodes } from "./nodes";
import type { ContentRendererProps } from "./types";
import { cn } from "@/utils";

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
      <div className={cn("ce-renderer", className)}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="text-zinc-200 text-base leading-relaxed focus:outline-none"
            />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  );
}
