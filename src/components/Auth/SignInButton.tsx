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
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
        "bg-white/[0.06] border border-white/[0.08]",
        "text-zinc-300 hover:text-white hover:bg-white/[0.1]",
        "hover:border-prism-violet/30",
        "transition-all duration-300",
        className
      )}
    >
      <LogIn className="w-4 h-4" />
      <span className={mmFont}>{t("signIn")}</span>
    </button>
  );
}
