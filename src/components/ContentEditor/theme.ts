import type { EditorThemeClasses } from "lexical";

const editorTheme: EditorThemeClasses = {
  root: "text-zinc-200 font-body text-base leading-relaxed focus:outline-none min-h-[200px]",
  paragraph: "mb-3 leading-7",
  heading: {
    h1: "text-4xl font-bold font-display text-white mt-6 mb-4",
    h2: "text-3xl font-semibold font-display text-white mt-8 mb-3 border-b border-white/10 pb-1",
    h3: "text-2xl font-semibold font-display text-white mt-6 mb-2",
  },
  text: {
    bold: "font-bold text-white",
    italic: "italic",
    underline: "underline underline-offset-4",
    strikethrough: "line-through text-zinc-500",
    code: "px-1.5 py-0.5 rounded bg-surface-light font-mono text-sm text-prism-cyan",
  },
  list: {
    ul: "list-disc ml-6 my-4",
    ol: "list-decimal ml-6 my-4",
    listitem: "mt-2 leading-7",
    nested: {
      listitem: "list-none",
    },
    listitemChecked:
      "relative ml-6 list-none line-through text-zinc-500",
    listitemUnchecked:
      "relative ml-6 list-none",
  },
  quote:
    "border-l-2 border-prism-violet/40 pl-6 italic text-zinc-400 my-4",
  link: "text-prism-cyan underline underline-offset-4 hover:text-prism-violet transition-colors cursor-pointer",
  code: "bg-surface rounded-lg border border-white/10 p-4 font-mono text-sm my-4 overflow-x-auto block",
  codeHighlight: {
    atrule: "text-prism-violet",
    attr: "text-prism-cyan",
    boolean: "text-prism-rose",
    builtin: "text-prism-cyan",
    cdata: "text-zinc-500",
    char: "text-green-400",
    class: "text-prism-cyan",
    "class-name": "text-prism-cyan",
    comment: "text-zinc-500 italic",
    constant: "text-prism-rose",
    deleted: "text-red-400",
    doctype: "text-zinc-500",
    entity: "text-prism-cyan",
    function: "text-prism-violet",
    important: "text-prism-rose",
    inserted: "text-green-400",
    keyword: "text-prism-violet",
    namespace: "text-zinc-400",
    number: "text-prism-rose",
    operator: "text-zinc-400",
    prolog: "text-zinc-500",
    property: "text-prism-cyan",
    punctuation: "text-zinc-400",
    regex: "text-prism-rose",
    selector: "text-green-400",
    string: "text-green-400",
    symbol: "text-prism-rose",
    tag: "text-prism-rose",
    url: "text-prism-cyan",
    variable: "text-prism-rose",
  },
};

export default editorTheme;
