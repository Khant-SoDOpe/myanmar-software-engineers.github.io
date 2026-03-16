"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import { khitHaungg } from "@/fonts/fonts";
import BodyText from "../Common/BodyText/BodyText";
import TitleText from "../Common/TitleText/TitleText";
import { cn } from "@/utils";
import Link from "next/link";
import {
  Users,
  ArrowUpRight,
  Zap,
  MessageCircle,
  Briefcase,
  PenTool,
} from "lucide-react";
import { ReactNode, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";

// --- Shared Card (same pattern as HomeSection) ---

const JoinCard = ({
  children,
  index,
  accentColor,
  isInView,
  href,
  external,
}: {
  children: ReactNode;
  index: number;
  accentColor: string;
  isInView: boolean;
  href?: string;
  external?: boolean;
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

  const inner = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full h-full rounded-2xl p-6 overflow-hidden",
        "bg-surface/80 backdrop-blur-sm",
        "border border-white/[0.06]",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:border-white/[0.12]",
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

      {children}

      {/* Bottom corner decoration */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at bottom right, ${accentColor}, transparent 70%)`,
        }}
      />
    </div>
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
        delay: 0.3 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      {href ? (
        <Link
          href={href}
          className="block h-full"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  );
};

// --- Feature Pill ---

const FeaturePill = ({
  icon: Icon,
  label,
  delay,
  isInView,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  delay: number;
  isInView: boolean;
}) => (
  <motion.div
    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]"
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={
      isInView
        ? { opacity: 1, scale: 1, y: 0 }
        : { opacity: 0, scale: 0.8, y: 10 }
    }
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <Icon className="w-3.5 h-3.5 text-prism-violet" />
    <span className="font-mono text-xs text-zinc-400">{label}</span>
  </motion.div>
);

// === MAIN COMPONENT ===

const JoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const { isMyanmar } = useLanguage();
  const t = useTranslations("join");

  const mmFont = isMyanmar ? khitHaungg.className : "";

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto w-full relative"
    >
      {/* === LEFT: CTA Card === */}
      <JoinCard
        index={0}
        accentColor="#a78bfa"
        isInView={isInView}
        href="https://www.facebook.com/groups/myanmarsoftwareengineers"
        external
      >
        <div className="relative flex flex-col items-center justify-center gap-4">
          {/* Icon + Title row */}
          <div className="flex items-center gap-3">
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(167,139,250,0.05))",
                border: "1px solid rgba(167,139,250,0.2)",
              }}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Users className="w-5 h-5 text-prism-violet" />
            </motion.div>
            <TitleText
              tag="p"
              className={cn("text-base font-semibold text-zinc-100", mmFont)}
            >
              {t("title")}
            </TitleText>
            <motion.div
              className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300"
              initial={{ x: 0, y: 0 }}
              whileHover={{ x: 2, y: -2 }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Body */}
          <BodyText className={cn("text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500 text-center max-w-xs", mmFont)}>
            {t("description")}
          </BodyText>

          {/* CTA pill */}
          <div
            className={cn(
              "flex items-center gap-2 px-5 py-2 rounded-full",
              "bg-white/[0.04] border border-white/[0.08]",
              "group-hover:border-prism-violet/30 group-hover:bg-prism-violet/10",
              "transition-all duration-500"
            )}
          >
            <span className={cn("font-body text-sm text-zinc-300", mmFont)}>
              {t("cta")}
            </span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-prism-cyan" />
            </motion.div>
          </div>
        </div>
      </JoinCard>

      {/* === RIGHT: Community Info Card === */}
      <JoinCard index={1} accentColor="#22d3ee" isInView={isInView}>
        <div className="relative flex flex-col justify-center">
          {/* Icon + Title row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.05))",
                  border: "1px solid rgba(34,211,238,0.2)",
                }}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Zap className="w-5 h-5 text-prism-cyan" />
              </motion.div>
              <TitleText
                tag="p"
                className={cn("text-base font-semibold text-zinc-100", mmFont)}
              >
                {t("communityTitle")}
              </TitleText>
            </div>
          </div>

          {/* Description with highlighted keywords */}
          <BodyText className={cn("text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500 leading-relaxed", mmFont)}>
            {t("desc.explore")}
            <span className="text-prism-cyan font-medium">{t("desc.jobBoard")}</span>,
            {" "}{isMyanmar ? "" : "access insightful "}
            <span className="text-prism-violet font-medium">
              {t("desc.techArticles")}
            </span>
            , {isMyanmar ? "" : "showcase your "}
            <span className="text-prism-rose font-medium">{t("desc.portfolio")}</span>
            {t("desc.outro")}
          </BodyText>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            <FeaturePill
              icon={Briefcase}
              label={t("pill.jobs")}
              delay={0.7}
              isInView={isInView}
            />
            <FeaturePill
              icon={PenTool}
              label={t("pill.articles")}
              delay={0.8}
              isInView={isInView}
            />
            <FeaturePill
              icon={Zap}
              label={t("pill.portfolio")}
              delay={0.9}
              isInView={isInView}
            />
            <FeaturePill
              icon={MessageCircle}
              label={t("pill.community")}
              delay={1.0}
              isInView={isInView}
            />
          </div>
        </div>
      </JoinCard>
    </div>
  );
};
export default JoinSection;
