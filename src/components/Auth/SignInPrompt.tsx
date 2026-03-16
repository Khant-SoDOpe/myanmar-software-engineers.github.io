"use client";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { motion } from "motion/react";
import { LogIn, Shield, Lock, Fingerprint } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

export default function SignInPrompt() {
  const { signInWithGoogle } = useAuth();
  const t = useTranslations("auth");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center max-w-sm w-full"
      >
        {/* Card container */}
        <div className="relative rounded-2xl overflow-hidden bg-white/[0.015] border border-white/[0.05] p-8 sm:p-10">
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, #22d3ee50, #a78bfa40, #fb718530, transparent 80%)" }}
          />

          {/* Decorative corner icons */}
          <Lock className="absolute top-4 right-4 w-3 h-3 text-zinc-800" />
          <Fingerprint className="absolute bottom-4 left-4 w-3 h-3 text-zinc-800" />

          {/* Icon with prismatic ring */}
          <motion.div
            className="relative mx-auto mb-6 w-16 h-16 rounded-2xl p-[1.5px]"
            style={{ background: "linear-gradient(135deg, #22d3ee, #a78bfa, #fb7185)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="flex items-center justify-center w-full h-full rounded-[14px] bg-obsidian">
              <Shield className="w-7 h-7 text-prism-violet" />
            </span>
          </motion.div>

          {/* Label */}
          <motion.span
            className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-1 h-1 rounded-full bg-prism-violet" />
            Authentication
          </motion.span>

          {/* Title */}
          <motion.h2
            className={cn("font-display text-2xl font-bold text-white mb-3", mmFont)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {t("signInRequired")}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={cn("text-sm text-zinc-500 mb-8 leading-relaxed", mmFont)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("signInDesc")}
          </motion.p>

          {/* Separator */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

          {/* Sign-in button — outline gradient style */}
          <motion.button
            type="button"
            onClick={signInWithGoogle}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient border */}
            <span
              className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                padding: "1.5px",
                background: "linear-gradient(135deg, #22d3ee, #a78bfa, #fb7185)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            {/* Hover fill */}
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.06), rgba(167,139,250,0.06), rgba(251,113,133,0.06))" }}
            />
            <LogIn className="relative z-10 w-4 h-4" />
            <span className={cn("relative z-10", mmFont)}>{t("signInWithGoogle")}</span>
          </motion.button>
        </div>

        {/* Ambient glow behind card */}
        <div
          className="absolute -inset-10 -z-10 opacity-[0.04] blur-[80px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #a78bfa, #22d3ee, transparent 70%)" }}
        />
      </motion.div>
    </div>
  );
}
