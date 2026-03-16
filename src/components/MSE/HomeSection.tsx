"use client";
import { cn } from "@/utils";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { ReactNode, useRef, useCallback } from "react";
import {
  Code2,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Braces,
  GitBranch,
  Cpu,
  Globe,
} from "lucide-react";
import AnimateText from "../Common/AnimateText/AnimateText";
import BodyText from "../Common/BodyText/BodyText";
import TitleText from "../Common/TitleText/TitleText";
import styles from "@/styles/styles";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

const title = ["Myanmar", "Software", "Engineers"];

const titleColors = [
  "from-prism-cyan to-prism-violet",
  "from-prism-violet to-prism-rose",
  "from-prism-rose to-accent-gold",
];

// --- Decorative Elements ---

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
    className="absolute rounded-full pointer-events-none blur-[40px]"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    }}
    animate={{
      y: [0, -20, 10, -15, 0],
      opacity: [0.3, 0.5, 0.25, 0.45, 0.3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const GridDecoration = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
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

const PrismLine = ({
  direction,
  delay,
}: {
  direction: "horizontal" | "vertical";
  delay: number;
}) => (
  <motion.div
    className={cn(
      "absolute pointer-events-none",
      direction === "horizontal"
        ? "h-[1px] w-full left-0"
        : "w-[1px] h-full top-0"
    )}
    style={{
      ...(direction === "horizontal" ? { top: "50%" } : { left: "50%" }),
      background:
        direction === "horizontal"
          ? "linear-gradient(90deg, transparent 0%, #22d3ee 20%, #a78bfa 50%, #fb7185 80%, transparent 100%)"
          : "linear-gradient(180deg, transparent 0%, #22d3ee 20%, #a78bfa 50%, #fb7185 80%, transparent 100%)",
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.08, scale: 1 }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
  />
);

const floatingIcons = [Terminal, Braces, GitBranch, Cpu, Globe];

const FloatingIcon = ({
  delay,
  x,
  y,
  index,
}: {
  delay: number;
  x: string;
  y: string;
  index: number;
}) => {
  const Icon = floatingIcons[index % floatingIcons.length];
  const colors = ["#22d3ee", "#a78bfa", "#fb7185", "#fbbf24", "#22d3ee"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        opacity: [0, 0.25, 0.15, 0.25, 0],
        y: [0, -12, 4, -8, 0],
        rotate: [0, 8, -5, 3, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
    </motion.div>
  );
};

// --- Hero Title Word ---

const HeroWord = ({
  word,
  gradient,
  index,
  isInView,
}: {
  word: string;
  gradient: string;
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.1, delay: index * 0.15 }}
    >
      {/* Shimmer sweep behind text */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.15) 50%, transparent 100%)",
        }}
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "200%" } : { x: "-100%" }}
        transition={{
          duration: 1.2,
          delay: 0.8 + index * 0.2,
          ease: "easeInOut",
        }}
      />
      <motion.h2
        className={cn(
          "font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
          "bg-gradient-to-r bg-clip-text text-transparent leading-[1.1]",
          gradient
        )}
        initial={{ y: 80, opacity: 0, filter: "blur(4px)" }}
        animate={
          isInView
            ? { y: 0, opacity: 1, filter: "blur(0px)" }
            : { y: 80, opacity: 0, filter: "blur(4px)" }
        }
        transition={{
          duration: 0.8,
          delay: 0.2 + index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {word}
      </motion.h2>
    </motion.div>
  );
};

// --- Feature Card ---

const Card = ({
  title,
  body,
  icon,
  link,
  index,
  accentColor,
  isInView,
  mmFont = "",
}: {
  title: string;
  body: string;
  icon?: ReactNode;
  link: string;
  index: number;
  accentColor: string;
  isInView: boolean;
  mmFont?: string;
}) => {
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
      initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)" }
      }
      transition={{
        duration: 0.7,
        delay: 0.6 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      <Link href={link} className="block">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className={cn(
            "relative w-full rounded-2xl p-6 overflow-hidden",
            "bg-surface/80 backdrop-blur-sm",
            "border border-white/[0.06]",
            "transition-all duration-500 ease-out",
            "hover:-translate-y-2 hover:border-white/[0.12]",
            "hover:shadow-[0_20px_60px_-15px_rgba(167,139,250,0.15)]"
          )}
        >
          {/* Cursor-following spotlight */}
          <motion.div
            className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              left: spotlightX,
              top: spotlightY,
              width: 200,
              height: 200,
              x: -100,
              y: -100,
              background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
            }}
          />

          {/* Top accent line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            }}
          />

          {/* Icon + Title row */}
          <div className="relative flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
                  border: `1px solid ${accentColor}20`,
                }}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {icon}
              </motion.div>
              <TitleText
                tag="p"
                className={cn("text-base font-semibold text-zinc-100", mmFont)}
              >
                {mmFont ? title : <AnimateText text={title} />}
              </TitleText>
            </div>
            <motion.div
              className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300"
              initial={{ x: 0, y: 0 }}
              whileHover={{ x: 2, y: -2 }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Body text */}
          <BodyText className={cn("text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500 leading-relaxed", mmFont)}>
            {body}
          </BodyText>

          {/* Bottom corner decoration */}
          <div
            className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at bottom right, ${accentColor}, transparent 70%)`,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

// --- Badge ---

const Badge = ({ isInView, label, mmFont = "" }: { isInView: boolean; label: string; mmFont?: string }) => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-surface/60 backdrop-blur-sm"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={
      isInView
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: 20, scale: 0.9 }
    }
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.div
      animate={{ rotate: [0, 15, -15, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Sparkles className="w-3.5 h-3.5 text-prism-cyan" />
    </motion.div>
    <span className={cn("font-mono text-xs text-zinc-400 tracking-wider uppercase", mmFont)}>
      {label}
    </span>
  </motion.div>
);

// --- Tagline ---

const Tagline = ({ isInView }: { isInView: boolean }) => (
  <motion.p
    className="font-body text-base sm:text-lg text-zinc-400 max-w-md leading-relaxed pt-10"
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    A vibrant hub where Myanmar&apos;s developers{" "}
    <span className="text-prism-cyan">connect</span>,{" "}
    <span className="text-prism-violet">share</span>, and{" "}
    <span className="text-prism-rose">grow</span> together.
  </motion.p>
);

// --- Stat Counter ---

const StatItem = ({
  value,
  label,
  delay,
  isInView,
}: {
  value: string;
  label: string;
  delay: number;
  isInView: boolean;
}) => (
  <motion.div
    className="flex flex-col"
    initial={{ opacity: 0, y: 15 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    <span className="font-display text-2xl font-bold bg-prism-gradient bg-clip-text text-transparent">
      {value}
    </span>
    <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider mt-1">
      {label}
    </span>
  </motion.div>
);

// === MAIN COMPONENT ===

const HomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  const t = useTranslations("home");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  return (
    <div ref={ref} className="relative min-h-[70vh] flex flex-col justify-center pt-10 lg:pt-16 pb-6 lg:pb-10">
      {/* Background decorations */}
      <GridDecoration />
      <FloatingOrb
        size={300}
        color="#22d3ee"
        x="-5%"
        y="10%"
        delay={0}
        duration={8}
      />
      <FloatingOrb
        size={250}
        color="#a78bfa"
        x="70%"
        y="60%"
        delay={1}
        duration={10}
      />

      <PrismLine direction="horizontal" delay={0.5} />
      <PrismLine direction="vertical" delay={0.7} />

      <FloatingIcon delay={1} x="12%" y="18%" index={0} />
      <FloatingIcon delay={2.5} x="82%" y="32%" index={1} />
      <FloatingIcon delay={4} x="48%" y="78%" index={2} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-12 lg:gap-16">
        {/* Hero text section */}
        <div className="flex flex-col items-center text-center gap-6">
          <Badge isInView={isInView} label={t("badge")} mmFont={mmFont} />

          {/* Massive title stack */}
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            {title.map((word, i) => (
              <HeroWord
                key={`hero_${word}`}
                word={word}
                gradient={titleColors[i]}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>

          <Tagline isInView={isInView} />

          {/* Stats row */}
          <motion.div
            className="flex items-center gap-8 sm:gap-12 mt-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.9 }}
          >
            <StatItem
              value="120+"
              label="Profiles"
              delay={0.9}
              isInView={isInView}
            />
            <div className="w-[1px] h-8 bg-white/10" />
            <StatItem
              value="Open"
              label="Source"
              delay={1.0}
              isInView={isInView}
            />
            <div className="w-[1px] h-8 bg-white/10" />
            <StatItem
              value="MM"
              label="Devs"
              delay={1.1}
              isInView={isInView}
            />
          </motion.div>
        </div>

        {/* Cards section */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto w-full px-5 md:px-0")}>
          <Card
            icon={
              <Code2 className="w-5 h-5 text-prism-cyan" />
            }
            title={t("devProfiles.title")}
            body={t("devProfiles.body")}
            link="/profile"
            index={0}
            accentColor="#22d3ee"
            isInView={isInView}
            mmFont={mmFont}
          />
          <Card
            icon={
              <BookOpen className="w-5 h-5 text-prism-violet" />
            }
            title={t("readArticles.title")}
            body={t("readArticles.body")}
            link="/blog"
            index={1}
            accentColor="#a78bfa"
            isInView={isInView}
            mmFont={mmFont}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
