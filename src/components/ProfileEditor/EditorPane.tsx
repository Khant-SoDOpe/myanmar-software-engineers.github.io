"use client";

import { cn } from "@/utils";
import styles from "@/styles/styles";
import { motion } from "framer-motion";
import { User, FileText, ImageIcon, TagsIcon, PenLine } from "lucide-react";
import TagInput from "./TagInput";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

const INPUT_CLASS = cn(
  "w-full bg-obsidian border border-white/[0.08] rounded-lg px-4 py-2.5",
  "text-zinc-200 placeholder:text-zinc-600 font-body text-sm",
  "focus:outline-none focus:border-prism-violet/50 focus:ring-1 focus:ring-prism-violet/20",
  "transition-all duration-200"
);

const FieldLabel = ({
  icon: Icon,
  label,
  required,
  mmFont = "",
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  required?: boolean;
  mmFont?: string;
}) => (
  <label className={`flex items-center gap-2 font-mono text-[11px] text-zinc-500 uppercase tracking-[0.2em] mb-2 ${mmFont}`}>
    <Icon className="w-3 h-3 text-prism-violet/60" />
    {label}
    {required && <span className="text-prism-rose/60">*</span>}
  </label>
);

const EditorPane = ({
  name,
  description,
  image,
  tags,
  body,
  setName,
  setDescription,
  setImage,
  addTag,
  removeTag,
  setBody,
}: {
  name: string;
  description: string;
  image: string;
  tags: string[];
  body: string;
  setName: (v: string) => void;
  setDescription: (v: string) => void;
  setImage: (v: string) => void;
  addTag: (t: string) => void;
  removeTag: (t: string) => void;
  setBody: (v: string) => void;
}) => {
  const t = useTranslations("profileEditor");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  const fields = [
    {
      key: "name",
      label: t("name"),
      icon: User,
      required: true,
      value: name,
      onChange: setName,
      placeholder: t("namePlaceholder"),
      type: "text",
    },
    {
      key: "description",
      label: t("description"),
      icon: FileText,
      value: description,
      onChange: setDescription,
      placeholder: t("descriptionPlaceholder"),
      type: "text",
    },
    {
      key: "image",
      label: t("imageUrl"),
      icon: ImageIcon,
      value: image,
      onChange: setImage,
      placeholder: "https://avatars.githubusercontent.com/u/...",
      type: "url",
    },
  ];

  return (
    <div className={cn(styles.cardSurface, "p-6 space-y-5")}>
      {/* Section header */}
      <motion.div
        className="flex items-center gap-2 pb-4 border-b border-white/[0.06]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="flex items-center justify-center w-7 h-7 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #a78bfa12, #a78bfa06)",
            border: "1px solid rgba(167,139,250,0.15)",
          }}
        >
          <PenLine className="w-3.5 h-3.5 text-prism-violet" />
        </div>
        <span className={`font-mono text-[11px] text-zinc-400 uppercase tracking-[0.15em] ${mmFont}`}>
          {t("editorHeader")}
        </span>
      </motion.div>

      {/* Text fields */}
      {fields.map((field, i) => (
        <motion.div
          key={field.key}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <FieldLabel
            icon={field.icon}
            label={field.label}
            required={field.required}
            mmFont={mmFont}
          />
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder={field.placeholder}
            className={INPUT_CLASS}
          />
        </motion.div>
      ))}

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1 + 3 * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <FieldLabel icon={TagsIcon} label={t("tags")} mmFont={mmFont} />
        <TagInput tags={tags} onAdd={addTag} onRemove={removeTag} />
      </motion.div>

      {/* Divider */}
      <div
        className="h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, #a78bfa15, #22d3ee25, #fb718515, transparent 80%)",
        }}
      />

      {/* Body textarea */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1 + 4 * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <FieldLabel icon={FileText} label={t("markdownBody")} mmFont={mmFont} />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t("bodyPlaceholder")}
          className={cn(
            INPUT_CLASS,
            "font-mono text-sm min-h-[300px] resize-y leading-relaxed"
          )}
        />
      </motion.div>
    </div>
  );
};

export default EditorPane;
