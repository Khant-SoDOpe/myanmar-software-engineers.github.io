"use client";

import { cn } from "@/utils";
import MseLink from "@/components/Ui/MseLink/MseLink";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  BookOpen,
  GitFork,
  Terminal,
  Package,
  GitBranch,
  Play,
  Globe,
  FileEdit,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

/* ── Prism accent colors cycling ── */
const prismColors = ["#22d3ee", "#a78bfa", "#fb7185", "#fbbf24"] as const;
const colorAt = (i: number) => prismColors[i % prismColors.length];

/* ── Step data ── */
type StepData = {
  title: string;
  description: string;
  icon: LucideIcon;
  terminal: {
    label: string;
    lines: { prompt?: boolean; text: string; accent?: string }[];
  };
  optionToggle?: {
    labels: [string, string];
    terminals: [
      { label: string; lines: { prompt?: boolean; text: string; accent?: string }[] },
      { label: string; lines: { prompt?: boolean; text: string; accent?: string }[] },
    ];
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSteps = (t: any): StepData[] => [
  {
    title: t("step1Title"),
    description: t("step1Desc"),
    icon: GitFork,
    terminal: {
      label: "github.com",
      lines: [
        {
          text: "github.com/myanmar-software-engineers/myanmar-software-engineers.github.io",
        },
        { text: "" },
        { text: "Click the  Fork  button (top right)", accent: "#22d3ee" },
      ],
    },
  },
  {
    title: t("step2Title"),
    description: t("step2Desc"),
    icon: Terminal,
    terminal: {
      label: "terminal",
      lines: [
        {
          prompt: true,
          text: "git clone https://github.com/YOUR_USERNAME/myanmar-software-engineers.github.io.git",
        },
        { text: "Cloning into 'myanmar-software-engineers.github.io'...", accent: "#a78bfa" },
      ],
    },
  },
  {
    title: t("step3Title"),
    description: t("step3Desc"),
    icon: Package,
    terminal: {
      label: "terminal",
      lines: [
        {
          prompt: true,
          text: "cd myanmar-software-engineers.github.io",
        },
        {
          prompt: true,
          text: "bun install",
        },
        { text: "Installed 280+ packages", accent: "#fb7185" },
      ],
    },
  },
  {
    title: t("step4Title"),
    description: t("step4Desc"),
    icon: GitBranch,
    terminal: {
      label: "terminal",
      lines: [
        {
          prompt: true,
          text: "git checkout -b your_name",
        },
        { text: "Switched to a new branch 'your_name'", accent: "#fbbf24" },
      ],
    },
  },
  {
    title: t("step5Title"),
    description: t("step5Desc"),
    icon: Play,
    terminal: {
      label: "terminal",
      lines: [
        {
          prompt: true,
          text: "bun dev",
        },
        { text: "▲ Next.js 16", accent: "#22d3ee" },
        { text: "- Local:    http://localhost:3000" },
        { text: "✓ Ready in 2.1s", accent: "#22d3ee" },
      ],
    },
  },
  {
    title: t("step6Title"),
    description: t("step6Desc"),
    icon: Globe,
    terminal: {
      label: "browser",
      lines: [
        { text: "🌐  http://localhost:3000", accent: "#a78bfa" },
        { text: "" },
        { text: "Myanmar Software Engineers — homepage loaded" },
      ],
    },
  },
  {
    title: t("step7Title"),
    description: t("step7Desc"),
    icon: FileEdit,
    terminal: {
      label: "profile editor",
      lines: [],
    },
    optionToggle: {
      labels: [t("optionEditor"), t("optionManual")],
      terminals: [
        {
          label: "profile editor",
          lines: [
            { text: t("step7Line1"), accent: "#fb7185" },
            { text: t("step7Line2") },
            { text: t("step7Line3") },
            { text: t("step7Line4") },
            {
              prompt: true,
              text: "content/profile/your_name.mdx",
            },
          ],
        },
        {
          label: "terminal",
          lines: [
            {
              prompt: true,
              text: "touch content/profile/your_name.mdx",
            },
            { text: "---", accent: "#fb7185" },
            { text: 'name: "Your Name"' },
            { text: 'description: "A short bio"' },
            { text: 'image: "https://github.com/YOUR_USERNAME.png"' },
            { text: "tags:" },
            { text: "  - React" },
            { text: "  - TypeScript" },
            { text: "---", accent: "#fb7185" },
          ],
        },
      ],
    },
  },
  {
    title: t("step8Title"),
    description: t("step8Desc"),
    icon: CheckCircle2,
    terminal: {
      label: "browser",
      lines: [
        { text: "🌐  http://localhost:3000/profile", accent: "#fbbf24" },
        { text: "" },
        { text: t("step8Line1") },
        { text: t("step8Line2"), accent: "#fbbf24" },
      ],
    },
  },
];

/* ── Hero Section ── */
const HeroSection = ({ stepCount, mmFont }: { stepCount: number; mmFont: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const t = useTranslations("howTo");

  return (
    <div ref={ref} className="relative pt-8 pb-4 md:pt-12 md:pb-6">
      {/* Section label */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #22d3ee12, #a78bfa08)",
            border: "1px solid rgba(34,211,238,0.15)",
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <BookOpen className="w-4 h-4 text-prism-cyan" />
        </motion.div>
        <span className={`font-mono text-[11px] text-zinc-500 uppercase tracking-[0.2em] ${mmFont}`}>
          {t("label")}
        </span>
      </motion.div>

      {/* Title */}
      <motion.div
        className={`relative mb-4 ${mmFont ? "" : "overflow-hidden"}`}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.1, delay: 0.1 }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
          }}
          initial={{ x: "-100%" }}
          animate={inView ? { x: "200%" } : { x: "-100%" }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
        />
        <motion.h1
          className={`font-bold text-4xl sm:text-5xl md:text-6xl ${mmFont ? `${mmFont} leading-[1.6] py-2 text-prism-cyan` : "font-display leading-[1.15] bg-gradient-to-r from-prism-cyan via-prism-violet to-prism-rose bg-clip-text text-transparent"}`}
          initial={{ y: 50, opacity: 0, filter: "blur(6px)" }}
          animate={
            inView
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
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      >
        {t("subtitle", { count: stepCount })}
      </motion.p>

      {/* Prismatic divider */}
      <motion.div
        className="mt-8 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, #22d3ee15, #a78bfa25, #fb718515, transparent 80%)",
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      />
    </div>
  );
};

/* ── Terminal Block ── */
const TerminalBlock = ({
  label,
  lines,
  color,
  isInView,
  delay = 0,
}: {
  label: string;
  lines: { prompt?: boolean; text: string; accent?: string }[];
  color: string;
  isInView: boolean;
  delay?: number;
}) => (
  <motion.div
    className={cn(
      "rounded-2xl overflow-hidden",
      "bg-surface/80 backdrop-blur-sm",
      "border border-white/[0.06]"
    )}
    initial={{ opacity: 0, y: 12 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
    transition={{
      duration: 0.5,
      delay: delay + 0.2,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {/* Header bar */}
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04]">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-prism-rose/60" />
        <div className="w-2 h-2 rounded-full bg-accent-gold/60" />
        <div className="w-2 h-2 rounded-full bg-prism-cyan/60" />
      </div>
      <span className="font-mono text-[10px] text-zinc-600 ml-1">
        {label}
      </span>
    </div>

    {/* Body */}
    <div className="px-4 py-4 space-y-1">
      {lines.map((line, i) => (
        <div key={i} className="flex items-start gap-2">
          {line.prompt && (
            <span
              className="font-mono text-xs shrink-0"
              style={{ color: `${color}90` }}
            >
              $
            </span>
          )}
          <span
            className={cn(
              "font-mono text-xs leading-relaxed break-all",
              line.accent ? "" : "text-zinc-400"
            )}
            style={line.accent ? { color: line.accent } : undefined}
          >
            {line.text || "\u00A0"}
          </span>
        </div>
      ))}
    </div>
  </motion.div>
);

/* ── Option Toggle for Step 7 ── */
const OptionToggle = ({
  labels,
  active,
  onToggle,
  color,
}: {
  labels: [string, string];
  active: number;
  onToggle: (i: number) => void;
  color: string;
}) => (
  <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit mb-3">
    {labels.map((label, i) => (
      <button
        key={label}
        onClick={() => onToggle(i)}
        className={cn(
          "relative px-4 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-colors duration-200",
          active === i ? "text-white" : "text-zinc-600 hover:text-zinc-400"
        )}
      >
        {active === i && (
          <motion.div
            layoutId="option-toggle-bg"
            className="absolute inset-0 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}08)`,
              border: `1px solid ${color}30`,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">{label}</span>
      </button>
    ))}
  </div>
);

/* ── Step Card ── */
const StepCard = ({
  step,
  index,
  isLast,
  mmFont = "",
}: {
  step: StepData;
  index: number;
  isLast: boolean;
  mmFont?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const [activeOption, setActiveOption] = useState(0);
  const color = colorAt(index);
  const Icon = step.icon;
  const stepNum = index + 1;

  return (
    <div ref={ref} className="relative flex gap-5 md:gap-8">
      {/* Left column: step number + connecting line */}
      <div className="flex flex-col items-center shrink-0">
        {/* Step number circle */}
        <motion.div
          className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full z-10"
          style={{
            background: `linear-gradient(135deg, ${color}18, ${color}08)`,
            border: `2px solid ${color}40`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            inView
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
        >
          <span
            className="font-display font-bold text-sm md:text-base"
            style={{ color }}
          >
            {stepNum}
          </span>

          {/* Pulse ring on appear */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${color}` }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={
              inView
                ? { scale: 1.6, opacity: 0 }
                : { scale: 1, opacity: 0 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-[2px] flex-1 min-h-[40px] origin-top"
            style={{
              background: `linear-gradient(180deg, ${color}40, ${color}10)`,
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}
      </div>

      {/* Right column: card content */}
      <motion.div
        className="flex-1 pb-10 md:pb-14"
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 20, filter: "blur(4px)" }
        }
        transition={{
          duration: 0.6,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Icon + Title row */}
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${color}12, ${color}06)`,
              border: `1px solid ${color}18`,
            }}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </motion.div>
          <h3 className={`font-display font-bold text-lg md:text-xl text-zinc-100 ${mmFont}`}>
            {step.title}
          </h3>
        </div>

        {/* Description */}
        <p className={`font-body text-sm text-zinc-500 leading-relaxed mb-4 max-w-lg ${mmFont}`}>
          {step.description}
        </p>

        {/* Option toggle for step 7 */}
        {step.optionToggle && (
          <OptionToggle
            labels={step.optionToggle.labels}
            active={activeOption}
            onToggle={setActiveOption}
            color={color}
          />
        )}

        {/* Terminal block */}
        {step.optionToggle ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOption}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <TerminalBlock
                label={step.optionToggle.terminals[activeOption].label}
                lines={step.optionToggle.terminals[activeOption].lines}
                color={color}
                isInView={inView}
                delay={0}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <TerminalBlock
            label={step.terminal.label}
            lines={step.terminal.lines}
            color={color}
            isInView={inView}
            delay={0}
          />
        )}
      </motion.div>
    </div>
  );
};

/* ── Final CTA Section ── */
const CtaSection = ({ stepCount, mmFont }: { stepCount: number; mmFont: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const t = useTranslations("howTo");

  return (
    <div ref={ref} className="relative py-12 md:py-20">
      {/* Divider */}
      <motion.div
        className="h-[1px] mb-12 md:mb-16"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #22d3ee20 20%, #a78bfa30 50%, #fb718520 80%, transparent 100%)",
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* CTA card */}
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-surface/60 backdrop-blur-sm",
          "border border-white/[0.06]",
        )}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={
          inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 30, scale: 0.97 }
        }
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Top prismatic accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #22d3ee, #a78bfa, #fb7185, transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        />

        {/* Corner radial accents */}
        <div
          className="absolute -top-20 -left-20 w-60 h-60 pointer-events-none opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #22d3ee, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-60 h-60 pointer-events-none opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #a78bfa, transparent 70%)",
          }}
        />

        <div className="relative z-10 px-6 py-10 md:px-12 md:py-14">
          {/* Completion terminal */}
          <motion.div
            className={cn(
              "mx-auto max-w-md mb-8 rounded-xl overflow-hidden",
              "bg-obsidian/60 border border-white/[0.04]"
            )}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.04]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-prism-rose/60" />
                <div className="w-2 h-2 rounded-full bg-accent-gold/60" />
                <div className="w-2 h-2 rounded-full bg-prism-cyan/60" />
              </div>
              <span className="font-mono text-[10px] text-zinc-600 ml-1">
                {t("ctaComplete")}
              </span>
            </div>
            <div className="px-4 py-3 flex items-center gap-2">
              <motion.span
                className="text-prism-cyan"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.6,
                }}
              >
                <CheckCircle2 className="w-4 h-4" />
              </motion.span>
              <span className={`font-mono text-xs text-zinc-400 ${mmFont}`}>
                {t("ctaStepsComplete", { count: stepCount })}
              </span>
              <span className={`font-mono text-xs bg-prism-gradient bg-clip-text text-transparent font-semibold ${mmFont}`}>
                {t("ctaProfileReady")}
              </span>
            </div>
          </motion.div>

          {/* Title + subtitle */}
          <div className="text-center mb-8">
            <motion.h2
              className="font-display font-bold text-3xl md:text-4xl mb-3"
              initial={{ opacity: 0, y: 15 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 15 }
              }
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={`text-zinc-100 ${mmFont}`}>{t("ctaReadyTo")}</span>
              <span className={`bg-gradient-to-r from-prism-cyan via-prism-violet to-prism-rose bg-clip-text text-transparent ${mmFont}`}>
                {t("ctaContribute")}
              </span>
            </motion.h2>
            <motion.p
              className="font-body text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={
                inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            >
              <span className={mmFont}>{t("ctaJoinPrefix")}</span>
              <span className="text-prism-violet font-medium">116+</span>
              <span className={mmFont}>{t("ctaJoinSuffix")}</span>
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
          >
            {/* Primary CTA */}
            <MseLink
              href="/profile/editor"
              className={cn(
                "group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full",
                "font-display text-sm font-semibold text-white",
                "transition-all duration-300",
                "hover:-translate-y-0.5",
                "hover:shadow-[0_12px_40px_-10px_rgba(167,139,250,0.35)]"
              )}
            >
              {/* Gradient background */}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.2), rgba(251,113,133,0.15))",
                }}
              />
              {/* Border ring */}
              <span
                className="absolute inset-0 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(135deg, #22d3ee60, #a78bfa60, #fb718560)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <span className="relative z-10 flex items-center gap-2.5">
                <FileEdit className="w-4 h-4 text-prism-violet" />
                <span className={mmFont}>{t("ctaOpenEditor")}</span>
                <motion.span
                  className="inline-flex"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-4 h-4 text-prism-cyan" />
                </motion.span>
              </span>
            </MseLink>

            {/* Secondary CTA */}
            <MseLink
              href="/profile"
              className={cn(
                "group inline-flex items-center gap-2 px-7 py-3.5 rounded-full",
                "font-display text-sm font-semibold",
                "text-zinc-400 hover:text-zinc-200",
                "bg-white/[0.02] border border-white/[0.08]",
                "hover:border-white/[0.15] hover:bg-white/[0.04]",
                "hover:-translate-y-0.5",
                "transition-all duration-300"
              )}
            >
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span className={mmFont}>{t("ctaViewProfiles")}</span>
            </MseLink>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Main Client Component ── */
const HowToPageClient = () => {
  const t = useTranslations("howTo");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";
  const steps = getSteps(t);

  return (
    <div className="relative">
      <HeroSection stepCount={steps.length} mmFont={mmFont} />

      {/* Step timeline */}
      <div className="relative pt-8 md:pt-12">
        {steps.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            index={i}
            isLast={i === steps.length - 1}
            mmFont={mmFont}
          />
        ))}
      </div>

      <CtaSection stepCount={steps.length} mmFont={mmFont} />
    </div>
  );
};

export default HowToPageClient;
