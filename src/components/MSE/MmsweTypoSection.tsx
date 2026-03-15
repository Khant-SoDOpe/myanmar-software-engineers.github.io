"use client";

import { motion, useInView } from "framer-motion";
import Container from "../Common/Container/Container";
import HorizontalWrapper from "../Common/HorizontalWrapper/HorizontalWrapper";
import { cn } from "@/utils";
import { useRef } from "react";

// Prism accent for each letter of MMSWE
const letterConfig = [
  { char: "M", color: "#22d3ee" },
  { char: "M", color: "#a78bfa" },
  { char: "S", color: "#fb7185" },
  { char: "W", color: "#fbbf24" },
  { char: "E", color: "#22d3ee" },
];

// --- Floating ambient particles ---

const particleData = [
  { color: "#22d3ee", size: 3, x: "8%", y: "15%", delay: 0 },
  { color: "#a78bfa", size: 2.5, x: "52%", y: "8%", delay: 1.6 },
  { color: "#fb7185", size: 2, x: "78%", y: "72%", delay: 0.4 },
  { color: "#fbbf24", size: 2, x: "38%", y: "88%", delay: 2.0 },
];

const FloatingParticle = ({
  color,
  size,
  x,
  y,
  delay,
}: {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: color,
      boxShadow: `0 0 ${size * 4}px ${color}50`,
    }}
    animate={{
      y: [0, -18, 6, -12, 0],
      opacity: [0.15, 0.5, 0.2, 0.45, 0.15],
      scale: [1, 1.4, 0.9, 1.2, 1],
    }}
    transition={{
      duration: 5 + delay,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

// --- Individual animated letter ---

const PrismLetter = ({
  char,
  color,
  index,
  isInView,
}: {
  char: string;
  color: string;
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      className="relative inline-flex items-center justify-center group cursor-default"
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.3,
        filter: "blur(6px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 1,
        delay: 0.15 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -14,
        scale: 1.1,
        transition: { type: "spring", stiffness: 300, damping: 12 },
      }}
    >
      {/* Deep ambient glow */}
      <div
        className="absolute inset-0 blur-[40px] opacity-20 scale-[2.5] group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 60%)`,
        }}
      />

      {/* Floor reflection glow */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-10 blur-2xl opacity-10 group-hover:opacity-25 transition-opacity duration-500"
        style={{ background: color }}
      />

      {/* The letter with gradient fill */}
      <span
        className={cn(
          "relative font-display font-black select-none",
          "text-[clamp(5rem,14vw,10rem)] leading-[0.85]"
        )}
        style={{
          background: `linear-gradient(175deg, #ffffff 15%, ${color}cc 70%, ${color}60 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {char}
      </span>

      {/* Top-right accent spark */}
      <motion.div
        className="absolute -top-3 right-0 w-2 h-2 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}50`,
        }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.5, 0.8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: index * 0.4,
          ease: "easeInOut",
        }}
      />

      {/* Hover edge glow */}
      <div
        className="absolute bottom-1 left-1/4 right-1/4 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 12px ${color}60`,
        }}
      />
    </motion.div>
  );
};

// --- Animated gradient underline ---

const PrismUnderline = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    className="relative h-[2px] mx-auto max-w-sm overflow-hidden rounded-full"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
    transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: "left" }}
  >
    <div className="absolute inset-0 bg-prism-gradient opacity-60" />
    {/* Traveling light pulse */}
    <motion.div
      className="absolute top-0 w-16 h-full rounded-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
      }}
      animate={{ x: ["-64px", "400px"] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

// --- Subtitle with stagger letter reveal ---

const subtitleText = "Myanmar Software Engineers";

const SubtitleReveal = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    className="flex justify-center mt-5 overflow-hidden gap-2"
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : {}}
    transition={{ delay: 1.2 }}
  >
    {subtitleText.split(" ").map((word, i) => (
      <motion.span
        key={i}
        className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-600 inline-block"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 0.5, y: 0 } : {}}
        transition={{
          duration: 0.4,
          delay: 1.3 + i * 0.1,
          ease: "easeOut",
        }}
      >
        {word}
      </motion.span>
    ))}
  </motion.div>
);

// === MAIN COMPONENT ===

const MmsweTypoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  return (
    <Container withPadding>
      <HorizontalWrapper horizontalDirection={-150} activeOpacity>
        <div ref={ref} className="relative -right-[150px] min-h-screen flex flex-col items-center justify-center">
          {/* Floating ambient particles */}
          {particleData.map((p, i) => (
            <FloatingParticle key={i} {...p} />
          ))}

          {/* Letter row */}
          <div className="flex items-baseline justify-center gap-1 md:gap-3">
            {letterConfig.map(({ char, color }, index) => (
              <PrismLetter
                key={index}
                char={char}
                color={color}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Gradient underline */}
          <div className="mt-3">
            <PrismUnderline isInView={isInView} />
          </div>

          {/* Subtitle with per-letter stagger */}
          <SubtitleReveal isInView={isInView} />
        </div>
      </HorizontalWrapper>
    </Container>
  );
};

export default MmsweTypoSection;
