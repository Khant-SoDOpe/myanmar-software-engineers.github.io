"use client";

import { cn } from "@/utils";
import Container from "@/components/Common/Container/Container";
import EditorPane from "@/components/ProfileEditor/EditorPane";
import PreviewPane from "@/components/ProfileEditor/PreviewPane";
import { useProfileEditor } from "@/hooks/profile/useProfileEditor";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  PenTool,
  Download,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

/* ── Floating ambient orbs ── */
const FloatingOrb = ({
  size,
  color,
  x,
  y,
  delay,
  duration,
}: {
  size: number;
  color: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: "blur(50px)",
    }}
    animate={{
      y: [0, -18, 10, -12, 0],
      x: [0, 12, -8, 10, 0],
      scale: [1, 1.12, 0.92, 1.08, 1],
      opacity: [0.2, 0.35, 0.15, 0.3, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/* ── Grid decoration ── */
const GridDecoration = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(167, 139, 250, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(167, 139, 250, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

/* ── Floating sparkle particles ── */
const FloatingSparkle = ({
  delay,
  x,
  y,
}: {
  delay: number;
  x: string;
  y: string;
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      opacity: [0, 0.7, 0],
      scale: [0.5, 1.2, 0.5],
      y: [0, -16, 0],
    }}
    transition={{
      duration: 3.5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Sparkles className="w-3 h-3 text-prism-violet" />
  </motion.div>
);

/* ── Main Profile Editor Client ── */
const ProfileEditorClient = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { amount: 0.3, once: true });
  const t = useTranslations("profileEditor");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  const editor = useProfileEditor();

  return (
    <div className="relative min-h-[60vh]">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <GridDecoration />
        <FloatingOrb
          size={200}
          color="#a78bfa"
          x="-5%"
          y="10%"
          delay={0}
          duration={9}
        />
        <FloatingOrb
          size={180}
          color="#22d3ee"
          x="85%"
          y="35%"
          delay={2}
          duration={10}
        />
        <FloatingOrb
          size={140}
          color="#fb7185"
          x="50%"
          y="75%"
          delay={3.5}
          duration={8}
        />
        <FloatingSparkle delay={0.5} x="8%" y="15%" />
        <FloatingSparkle delay={2.5} x="92%" y="20%" />
        <FloatingSparkle delay={4} x="40%" y="8%" />
      </div>

      {/* Hero header */}
      <div ref={heroRef} className="relative z-10 pt-8 pb-6 md:pt-12 md:pb-10">
        <Container withPadding>
          {/* Section label */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={
              heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #a78bfa12, #22d3ee08)",
                border: "1px solid rgba(167,139,250,0.15)",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <PenTool className="w-4 h-4 text-prism-violet" />
            </motion.div>
            <span className={`font-mono text-[11px] text-zinc-500 uppercase tracking-[0.2em] ${mmFont}`}>
              {t("label")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            className={`relative mb-4 ${mmFont ? "" : "overflow-hidden"}`}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.1, delay: 0.1 }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.1) 50%, transparent 100%)",
              }}
              initial={{ x: "-100%" }}
              animate={heroInView ? { x: "200%" } : { x: "-100%" }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.h1
              className={`font-bold text-4xl sm:text-5xl md:text-6xl ${mmFont ? `${mmFont} leading-[1.6] py-2 text-prism-violet` : "font-display leading-[1.15] bg-gradient-to-r from-prism-violet via-prism-cyan to-prism-rose bg-clip-text text-transparent"}`}
              initial={{ y: 50, opacity: 0, filter: "blur(6px)" }}
              animate={
                heroInView
                  ? { y: 0, opacity: 1, filter: "blur(0px)" }
                  : { y: 50, opacity: 0, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t("title")}
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className={`font-body text-base text-zinc-500 max-w-lg leading-relaxed ${mmFont}`}
            initial={{ opacity: 0, y: 15 }}
            animate={
              heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
            }
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          >
            {t("subtitle")}
            <span className="text-prism-cyan">{t("download")}</span>
            {t("subtitleMid")}
            <span className="text-prism-violet">{t("mdx")}</span>
            {t("subtitleEnd")}
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            className="mt-8 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, #a78bfa15, #22d3ee25, #fb718515, transparent 80%)",
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          />
        </Container>
      </div>

      {/* Editor section */}
      <div className="relative z-10 pb-16">
        <Container withPadding>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <EditorPane
              name={editor.name}
              description={editor.description}
              image={editor.image}
              tags={editor.tags}
              body={editor.body}
              setName={editor.setName}
              setDescription={editor.setDescription}
              setImage={editor.setImage}
              addTag={editor.addTag}
              removeTag={editor.removeTag}
              setBody={editor.setBody}
            />
            <PreviewPane
              name={editor.name}
              description={editor.description}
              image={editor.image}
              tags={editor.tags}
              body={editor.body}
              mdxOutput={editor.mdxOutput}
            />
          </div>

          {/* Action buttons */}
          <motion.div
            className="mt-6 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={editor.handleDownload}
              disabled={!editor.isValid}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-2.5 rounded-full",
                "font-display text-sm font-bold tracking-tight",
                "bg-gradient-to-r from-prism-violet via-prism-cyan to-prism-rose text-obsidian",
                "hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]",
                "active:scale-95 transition-all duration-200",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              )}
            >
              <Download className="w-4 h-4" />
              <span className={mmFont}>{t("downloadBtn")}</span>
            </button>

            <button
              type="button"
              onClick={editor.handleReset}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
                "font-display text-sm font-bold tracking-tight",
                "bg-white/[0.04] text-zinc-400 border border-white/[0.08]",
                "hover:bg-white/[0.08] hover:text-zinc-200 hover:border-white/[0.12]",
                "active:scale-95 transition-all duration-200"
              )}
            >
              <RotateCcw className="w-4 h-4" />
              <span className={mmFont}>{t("resetBtn")}</span>
            </button>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default ProfileEditorClient;
