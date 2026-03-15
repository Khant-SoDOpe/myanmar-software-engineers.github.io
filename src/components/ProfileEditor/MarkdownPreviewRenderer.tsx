"use client";

import { cn } from "@/utils";
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents: Components = {
  h1: ({ className, ...rest }) => (
    <h1
      className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tight", className)}
      {...rest}
    />
  ),
  h2: ({ className, ...rest }) => (
    <h2
      className={cn(
        "mt-10 border-b border-white/10 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...rest}
    />
  ),
  h3: ({ className, ...rest }) => (
    <h3
      className={cn(
        "mt-8 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...rest}
    />
  ),
  h4: ({ className, ...rest }) => (
    <h4
      className={cn(
        "mt-8 text-xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...rest}
    />
  ),
  h5: ({ className, ...rest }) => (
    <h5
      className={cn(
        "mt-8 text-lg font-semibold tracking-tight first:mt-0",
        className
      )}
      {...rest}
    />
  ),
  h6: ({ className, ...rest }) => (
    <h6
      className={cn(
        "mt-8 text-base font-semibold tracking-tight first:mt-0",
        className
      )}
      {...rest}
    />
  ),
  a: ({ className, ...rest }) => (
    <a
      className={cn(
        "font-medium underline underline-offset-4 tracking-tight text-prism-cyan hover:text-prism-violet transition-colors",
        className
      )}
      {...rest}
    />
  ),
  p: ({ className, ...rest }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...rest}
    />
  ),
  ul: ({ className, ...rest }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...rest} />
  ),
  ol: ({ className, ...rest }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...rest} />
  ),
  li: ({ className, ...rest }) => (
    <li className={cn("mt-2", className)} {...rest} />
  ),
  blockquote: ({ className, ...rest }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-prism-violet/40 pl-6 italic text-zinc-400",
        className
      )}
      {...rest}
    />
  ),
  img: ({ className, alt, ...rest }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("rounded-md border border-white/10", className)}
      alt={alt}
      {...rest}
    />
  ),
  hr: ({ className, ...rest }) => (
    <hr className={cn("my-4 md:my-8 border-white/10", className)} {...rest} />
  ),
  table: ({ className, ...rest }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...rest} />
    </div>
  ),
  tr: ({ className, ...rest }) => (
    <tr
      className={cn(
        "m-0 border-t border-white/10 p-0 even:bg-white/[0.02]",
        className
      )}
      {...rest}
    />
  ),
  th: ({ className, ...rest }) => (
    <th
      className={cn(
        "border border-white/10 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...rest}
    />
  ),
  td: ({ className, ...rest }) => (
    <td
      className={cn(
        "border border-white/10 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...rest}
    />
  ),
  pre: ({ className, ...rest }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border border-white/10 bg-surface py-4 px-2",
        className
      )}
      {...rest}
    />
  ),
  code: ({ className, ...rest }) => (
    <code
      className={cn(
        "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...rest}
    />
  ),
};

const MarkdownPreviewRenderer = ({ content }: { content: string }) => {
  if (!content.trim()) return null;

  return (
    <div className="mdx text-zinc-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreviewRenderer;
