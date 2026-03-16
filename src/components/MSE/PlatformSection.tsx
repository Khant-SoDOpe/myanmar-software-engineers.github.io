"use client";

import { cn } from "@/utils";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useCallback } from "react";
import TitleText from "../Common/TitleText/TitleText";
import BodyText from "../Common/BodyText/BodyText";
import SpacingDivider from "../Common/SpacingDivider/SpacingDivider";
import { Monitor, Smartphone, Cloud, Server } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

// Platform icon/color config (labels/descriptions are translated in the component)
const platformConfigs = [
  { icon: Monitor, key: "desktop", color: "#22d3ee" },
  { icon: Smartphone, key: "mobile", color: "#a78bfa" },
  { icon: Cloud, key: "cloud", color: "#fb7185" },
  { icon: Server, key: "backend", color: "#fbbf24" },
];

// --- Platform Card with spotlight ---

type PlatformData = {
  icon: typeof Monitor;
  label: string;
  color: string;
  description: string;
};

const PlatformCard = ({
  platform,
  index,
  isInView,
}: {
  platform: PlatformData;
  index: number;
  isInView: boolean;
}) => {
  const Icon = platform.icon;
  const color = platform.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: 0.4 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group h-full"
    >
      <div
        className={cn(
          "relative flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl overflow-hidden cursor-default h-full",
          "bg-surface/80",
          "border border-white/[0.06]",
          "transition-all duration-500 ease-out",
          "hover:-translate-y-2 hover:border-white/[0.12]",
          "hover:shadow-[0_20px_60px_-15px_rgba(167,139,250,0.12)]"
        )}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />

        {/* Icon container */}
        <div className="relative">
          {/* Ambient glow behind icon */}
          <div
            className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-[3]"
            style={{
              background: `radial-gradient(circle, ${color}, transparent 60%)`,
            }}
          />

          {/* Icon box */}
          <motion.div
            className={cn(
              "relative flex items-center justify-center w-14 h-14 rounded-xl",
              "transition-all duration-500"
            )}
            style={{
              background: `linear-gradient(135deg, ${color}12, ${color}06)`,
              border: `1px solid ${color}20`,
            }}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon
              className="w-6 h-6 relative z-10 transition-colors duration-300"
              style={{ color }}
            />
          </motion.div>
        </div>

        {/* Label */}
        <TitleText
          tag="p"
          className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors duration-300"
        >
          {platform.label}
        </TitleText>

        {/* Description */}
        <span
          className={cn(
            "font-mono text-[10px] tracking-wide text-center",
            "text-zinc-600 group-hover:text-zinc-400",
            "transition-colors duration-300"
          )}
        >
          {platform.description}
        </span>

        {/* Bottom corner decoration */}
        <div
          className="absolute bottom-0 right-0 w-20 h-20 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at bottom right, ${color}, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  );
};

// --- Terminal-style Hello World banner ---

const TerminalBanner = ({ isInView, helloText, fromText, isMyanmar }: { isInView: boolean; helloText: string; fromText: string; isMyanmar: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const spotlightX = useTransform(springX, (v) => `${v}px`);
  const spotlightY = useTransform(springY, (v) => `${v}px`);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(4px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: 1.0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group w-full max-w-xl mx-auto"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "relative rounded-2xl overflow-hidden",
          "bg-surface/80 backdrop-blur-sm",
          "border border-white/[0.06]",
          "transition-all duration-500 ease-out",
          "hover:border-white/[0.12]",
          "hover:shadow-[0_20px_60px_-15px_rgba(167,139,250,0.1)]"
        )}
      >
        {/* Cursor-following spotlight */}
        <motion.div
          className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            left: spotlightX,
            top: spotlightY,
            width: 250,
            height: 250,
            x: -125,
            y: -125,
            background:
              "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(90deg, transparent, #a78bfa, transparent)",
          }}
        />

        {/* Terminal header bar */}
        <div className="flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 border-b border-white/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-prism-rose/60" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent-gold/60" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-prism-cyan/60" />
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 ml-1 sm:ml-2">
            mmswe.terminal
          </span>
        </div>

        {/* Terminal body */}
        <div className="px-3 py-4 sm:px-5 sm:py-5 md:px-8 md:py-6">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Prompt */}
            <motion.span
              className="font-mono text-xs sm:text-sm text-prism-cyan"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.6 } : {}}
              transition={{ delay: 1.1 }}
            >
              $
            </motion.span>

            <motion.span
              className="font-mono text-xs sm:text-sm text-zinc-500"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.15 }}
            >
              echo
            </motion.span>

            {/* First item: helloText (en) or MMSWE (mm) */}
            <motion.span
              className={`font-display text-sm sm:text-lg md:text-xl ${isMyanmar ? "font-bold bg-prism-gradient bg-clip-text text-transparent" : "text-zinc-100"}`}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: isMyanmar ? 0 : 0 } : {}}
              transition={{ duration: isMyanmar ? 0.5 : 0.4, delay: 1.3, ease: isMyanmar ? [0.22, 1, 0.36, 1] : "easeOut" }}
            >
              {isMyanmar ? "MMSWE" : helloText}
            </motion.span>

            {/* From */}
            <motion.span
              className="font-display text-sm sm:text-lg md:text-xl text-zinc-400"
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.5, ease: "easeOut" }}
            >
              {fromText}
            </motion.span>

            {/* Last item: MMSWE (en) or helloText (mm) */}
            <motion.span
              className={`font-display text-sm sm:text-lg md:text-xl ${isMyanmar ? "text-zinc-100" : "font-bold bg-prism-gradient bg-clip-text text-transparent"}`}
              initial={{ opacity: 0, scale: isMyanmar ? 1 : 0.8, y: isMyanmar ? 8 : 0 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {isMyanmar ? helloText : "MMSWE"}
            </motion.span>

            {/* Blinking cursor */}
            <motion.span
              className="font-mono text-sm sm:text-lg md:text-xl text-prism-violet"
              animate={{ opacity: [1, 1, 0, 0, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                times: [0, 0.45, 0.5, 0.95, 1],
                ease: "linear",
              }}
            >
              _
            </motion.span>
          </div>
        </div>

        {/* Bottom corner decoration */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at bottom right, #a78bfa, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
};

// --- Section title with animated reveal ---

const SectionHeader = ({ isInView, t, mmFont }: { isInView: boolean; t: ReturnType<typeof useTranslations>; mmFont: string }) => (
  <div className="max-w-[860px] text-center mx-auto px-5">
    {/* Badge */}
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-surface/60 backdrop-blur-sm mb-6"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : {}
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <Server className="w-3.5 h-3.5 text-prism-rose" />
      </motion.div>
      <span className={cn("font-mono text-xs text-zinc-400 tracking-wider uppercase", mmFont)}>
        {t("badge")}
      </span>
    </motion.div>

    {/* Title */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <TitleText
        tag="h2"
        className={cn("text-3xl md:text-4xl font-bold mb-5", mmFont)}
      >
        <span className="text-zinc-100">{t("title.prefix")}</span>
        {t("title.highlight") && (
          <span className="bg-prism-gradient bg-clip-text text-transparent">
            {t("title.highlight")}
          </span>
        )}
      </TitleText>
    </motion.div>

    {/* Body */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <BodyText className={cn("text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto", mmFont)}>
        {t("description.intro")}
        <span className="text-prism-cyan font-medium">{t("description.desktop")}</span>,{" "}
        <span className="text-prism-violet font-medium">{t("description.mobile")}</span>,{" "}
        <span className="text-prism-rose font-medium">{t("description.cloud")}</span>,{" "}
        <span className="text-accent-gold font-medium">{t("description.backend")}</span>
        {t("description.outro")}
      </BodyText>
    </motion.div>
  </div>
);

// --- Decorative horizontal prism line ---

const PrismDivider = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    className="relative h-[1px] max-w-xs mx-auto overflow-hidden rounded-full"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
    transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: "center" }}
  >
    <div className="absolute inset-0 bg-prism-gradient opacity-40" />
    <motion.div
      className="absolute top-0 w-12 h-full rounded-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
      }}
      animate={{ x: ["-48px", "320px"] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

// === MAIN COMPONENT ===

const PlatformSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  const { isMyanmar } = useLanguage();
  const t = useTranslations("platform");

  const mmFont = isMyanmar ? khitHaungg.className : "";

  const platforms: PlatformData[] = platformConfigs.map((cfg) => ({
    icon: cfg.icon,
    color: cfg.color,
    label: t(`${cfg.key}.label`),
    description: t(`${cfg.key}.description`),
  }));

  return (
    <div ref={ref} className="relative py-10">
      <SectionHeader isInView={isInView} t={t} mmFont={mmFont} />

      <SpacingDivider size="base" />

      <PrismDivider isInView={isInView} />

      <SpacingDivider size="base" />

      {/* Platform cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto">
        {platforms.map((platform, index) => (
          <PlatformCard
            key={platform.label}
            platform={platform}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      <SpacingDivider size="lg" />

      {/* Terminal Hello World banner */}
      <TerminalBanner
        isInView={isInView}
        helloText={t("terminal.hello")}
        fromText={t("terminal.from")}
        isMyanmar={isMyanmar}
      />

      <SpacingDivider size="lg" />
      <SpacingDivider size="lg" />
    </div>
  );
};

export default PlatformSection;
