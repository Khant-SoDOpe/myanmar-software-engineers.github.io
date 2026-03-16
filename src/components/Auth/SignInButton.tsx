"use client";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

export default function SignInButton({ className }: { className?: string }) {
  const { signInWithGoogle } = useAuth();
  const t = useTranslations("auth");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      className={cn(
        "group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider overflow-hidden",
        "text-white transition-all duration-300",
        className
      )}
    >
      {/* Gradient background */}
      <span
        className="absolute inset-0 rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, #22d3ee, #a78bfa, #fb7185)",
        }}
      />
      {/* Hover glow */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: "0 0 20px rgba(167,139,250,0.4), 0 0 40px rgba(34,211,238,0.2)",
        }}
      />
      <LogIn className="relative z-10 w-3.5 h-3.5" />
      <span className={cn("relative z-10", mmFont)}>{t("signIn")}</span>
    </button>
  );
}
