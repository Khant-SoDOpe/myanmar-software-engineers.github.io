"use client";

import { motion, useInView } from "framer-motion";
import HorizontalWrapper from "../Common/HorizontalWrapper/HorizontalWrapper";
import { iconListData } from "@/data/IconList";
import { cn } from "@/utils";
import { useRef } from "react";

// Prism accent colors — cycle through for each icon
const prismColors = ["#22d3ee", "#a78bfa", "#fb7185", "#fbbf24"];

// --- Individual Icon Node ---

const IconNode = ({
  item,
  index,
  isInView,
}: {
  item: (typeof iconListData)[number];
  index: number;
  isInView: boolean;
}) => {
  const color = prismColors[index % prismColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.85, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      {/* Ambient glow behind icon on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl scale-[2]"
        style={{
          background: `radial-gradient(circle, ${color}25, transparent 70%)`,
        }}
      />

      <div
        className={cn(
          "relative flex flex-col items-center gap-2.5 cursor-pointer",
          "transition-transform duration-500 ease-out",
          "group-hover:-translate-y-2"
        )}
      >
        {/* Icon container with gradient border */}
        <div className="relative">
          {/* Gradient border ring — appears on hover */}
          <div
            className={cn(
              "absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100",
              "transition-opacity duration-500"
            )}
            style={{
              background: `linear-gradient(135deg, ${color}80, ${color}20 50%, transparent)`,
            }}
          />

          {/* Main icon box */}
          <div
            className={cn(
              "relative min-w-[62px] min-h-[62px] rounded-xl flex justify-center items-center",
              "bg-surface/90 backdrop-blur-sm",
              "border border-white/[0.06] group-hover:border-transparent",
              "transition-all duration-500"
            )}
          >
            {/* Inner radial highlight */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${color}12, transparent 70%)`,
              }}
            />

            <item.icon
              className={cn(
                "w-5 h-5 relative z-10",
                "text-zinc-500 group-hover:text-zinc-200",
                "transition-colors duration-300"
              )}
            />
          </div>

          {/* Top-right accent spark */}
          <motion.div
            className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: color,
              boxShadow: `0 0 6px ${color}`,
            }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Label */}
        <span
          className={cn(
            "text-[9px] font-mono tracking-wider uppercase",
            "text-zinc-600 group-hover:text-zinc-300",
            "transition-colors duration-300"
          )}
        >
          {item.title}
        </span>
      </div>
    </motion.div>
  );
};

// === MAIN COMPONENT ===

const LanguageIconSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <div ref={ref} className="relative py-2">
      <HorizontalWrapper horizontalDirection={400}>
        <div className="relative -left-[400px]">
          {/* Icon strip */}
          <div className="flex flex-row gap-5 relative z-10">
            {iconListData.map((item, index) => (
              <IconNode
                key={item.title}
                item={item}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </HorizontalWrapper>
    </div>
  );
};

export default LanguageIconSection;
