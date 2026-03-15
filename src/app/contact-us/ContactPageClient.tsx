"use client";

import { cn } from "@/utils";
import Container from "@/components/Common/Container/Container";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useCallback } from "react";
import {
  Users,
  Github,
  ArrowUpRight,
  Send,
  Sparkles,
  MessageCircle,
  GitPullRequest,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

/* ── Types ── */
type ContactLink = {
  label: string;
  href: string;
  description: string;
};

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
    <Sparkles className="w-3 h-3 text-prism-cyan" />
  </motion.div>
);

/* ── Signal pulse ring ── */
const SignalPulse = ({
  color,
  delay,
}: {
  color: string;
  delay: number;
}) => (
  <motion.div
    className="absolute inset-0 rounded-xl pointer-events-none"
    style={{ border: `1px solid ${color}` }}
    initial={{ opacity: 0.4, scale: 1 }}
    animate={{
      opacity: [0.3, 0],
      scale: [1, 1.5],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

/* ── Contact card with cursor-tracking spotlight ── */
const ContactCard = ({
  link,
  icon: Icon,
  secondaryIcon: SecondaryIcon,
  accentColor,
  index,
  isInView,
  tagline,
  ctaLabel,
  mmFont = "",
}: {
  link: ContactLink;
  icon: LucideIcon;
  secondaryIcon: LucideIcon;
  accentColor: string;
  index: number;
  isInView: boolean;
  tagline: string;
  ctaLabel: string;
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
        delay: 0.3 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className={cn(
            "relative h-full rounded-2xl p-7 md:p-8",
            "bg-surface/60 backdrop-blur-sm",
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
              width: 280,
              height: 280,
              x: -140,
              y: -140,
              background: `radial-gradient(circle, ${accentColor}14 0%, transparent 70%)`,
            }}
          />

          {/* Top accent line on hover */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            }}
          />

          {/* Corner glow */}
          <div
            className="absolute -top-16 -right-16 w-40 h-40 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 rounded-full"
            style={{
              background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon + signal */}
            <div className="flex items-start justify-between mb-6">
              <div className="relative">
                <motion.div
                  className="flex items-center justify-center w-14 h-14 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
                    border: `1px solid ${accentColor}25`,
                  }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon
                    className="w-6 h-6 relative z-10"
                    style={{ color: accentColor }}
                  />
                </motion.div>

                {/* Signal pulse rings */}
                <SignalPulse color={`${accentColor}30`} delay={0} />
                <SignalPulse color={`${accentColor}20`} delay={0.8} />
              </div>

              {/* Arrow */}
              <motion.div
                className="text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300"
                whileHover={{ x: 2, y: -2 }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Label */}
            <h2 className={`font-display font-bold text-xl md:text-2xl text-zinc-100 mb-2 group-hover:text-white transition-colors duration-300 ${mmFont}`}>
              {link.label}
            </h2>

            {/* Tagline */}
            <p
              className={`font-mono text-[11px] uppercase tracking-[0.15em] mb-4 ${mmFont}`}
              style={{ color: `${accentColor}90` }}
            >
              {tagline}
            </p>

            {/* Description */}
            <p className={`font-body text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-500 mb-6 ${mmFont}`}>
              {link.description}
            </p>

            {/* CTA button */}
            <div className="mt-auto">
              <div
                className={cn(
                  "inline-flex items-center gap-3 px-5 py-2.5 rounded-full",
                  "bg-white/[0.03] border border-white/[0.08]",
                  "group-hover:border-opacity-100 transition-all duration-500"
                )}
              >
                <SecondaryIcon
                  className="w-4 h-4 transition-colors duration-300"
                  style={{ color: `${accentColor}70` }}
                />
                <span className={`font-body text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 ${mmFont}`}>
                  {ctaLabel}
                </span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowUpRight
                    className="w-3.5 h-3.5"
                    style={{ color: accentColor }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Bottom corner decoration — positioned outside rounded clip */}
            <div
              className="absolute -bottom-8 -right-8 w-40 h-40 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
              }}
            />
          </div>
        </div>
      </a>
    </motion.div>
  );
};

/* ── Main Contact Page Client ── */
const ContactPageClient = ({ links }: { links: ContactLink[] }) => {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const heroInView = useInView(heroRef, { amount: 0.3, once: true });
  const cardsInView = useInView(cardsRef, { amount: 0.2, once: true });
  const t = useTranslations("contact");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  return (
    <div className="relative min-h-[60vh]">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <GridDecoration />
        <FloatingOrb
          size={200}
          color="#a78bfa"
          x="-5%"
          y="15%"
          delay={0}
          duration={9}
        />
        <FloatingOrb
          size={180}
          color="#22d3ee"
          x="85%"
          y="40%"
          delay={2}
          duration={10}
        />
        <FloatingOrb
          size={140}
          color="#fb7185"
          x="50%"
          y="80%"
          delay={3.5}
          duration={8}
        />
        <FloatingSparkle delay={0.5} x="10%" y="20%" />
        <FloatingSparkle delay={2} x="90%" y="15%" />
        <FloatingSparkle delay={3.5} x="45%" y="10%" />
      </div>

      {/* Hero header */}
      <div ref={heroRef} className="relative z-10 pt-8 pb-10 md:pt-12 md:pb-14">
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
                background: "linear-gradient(135deg, #22d3ee12, #a78bfa08)",
                border: "1px solid rgba(34,211,238,0.15)",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Send className="w-4 h-4 text-prism-cyan" />
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
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
              }}
              initial={{ x: "-100%" }}
              animate={heroInView ? { x: "200%" } : { x: "-100%" }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.h1
              className={`font-bold text-4xl sm:text-5xl md:text-6xl ${mmFont ? `${mmFont} leading-[1.6] py-2 text-prism-cyan` : "font-display leading-[1.15] bg-gradient-to-r from-prism-violet via-prism-cyan to-prism-rose bg-clip-text text-transparent"}`}
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
            {t("subtitlePrefix")}
            <span className="text-prism-violet">{t("collaborate")}</span>
            {t("subtitleMid")}
            <span className="text-prism-cyan">{t("contribute")}</span>
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

      {/* Contact cards */}
      <div ref={cardsRef} className="relative z-10 pb-16">
        <Container withPadding>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px]">
            <ContactCard
              link={{ ...links[0], label: t("fbLabel"), description: t("fbDesc") }}
              icon={Users}
              secondaryIcon={MessageCircle}
              accentColor="#a78bfa"
              index={0}
              isInView={cardsInView}
              tagline={t("fbTagline")}
              ctaLabel={t("fbCta")}
              mmFont={mmFont}
            />

            <ContactCard
              link={{ ...links[1], label: t("ghLabel"), description: t("ghDesc") }}
              icon={Github}
              secondaryIcon={GitPullRequest}
              accentColor="#22d3ee"
              index={1}
              isInView={cardsInView}
              tagline={t("ghTagline")}
              ctaLabel={t("ghCta")}
              mmFont={mmFont}
            />
          </div>

          {/* Bottom message */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={
              cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
            }
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="inline-flex items-center gap-2 text-xs text-zinc-600 font-mono"
              whileHover={{ scale: 1.02 }}
            >
              <span className={mmFont}>{t("openTo")}</span>
              <motion.span
                className="inline-flex"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-3 h-3 text-prism-rose fill-prism-rose" />
              </motion.span>
              <span className={mmFont}>{t("allWelcome")}</span>
            </motion.p>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default ContactPageClient;
