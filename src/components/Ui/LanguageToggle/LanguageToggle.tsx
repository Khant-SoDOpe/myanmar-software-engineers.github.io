"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/utils";

const LanguageToggle = ({ className }: { className?: string }) => {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.08] bg-surface/60 backdrop-blur-sm overflow-hidden",
        className
      )}
    >
      <motion.button
        onClick={() => setLocale("en")}
        className={cn(
          "relative px-3 py-1 font-mono text-[11px] font-medium tracking-wider transition-colors duration-300",
          locale === "en" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {locale === "en" && (
          <motion.div
            layoutId="lang-active"
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </motion.button>

      <div className="w-[1px] h-3 bg-white/[0.08]" />

      <motion.button
        onClick={() => setLocale("mm")}
        className={cn(
          "relative px-3 py-1 font-mono text-[11px] font-medium tracking-wider transition-colors duration-300",
          locale === "mm" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {locale === "mm" && (
          <motion.div
            layoutId="lang-active"
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(251,113,133,0.15))",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">MM</span>
      </motion.button>
    </div>
  );
};

export default LanguageToggle;
