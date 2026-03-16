"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, PenLine, FileText, User } from "lucide-react";
import MseLink from "@/components/Ui/MseLink/MseLink";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { khitHaungg } from "@/fonts/fonts";

export default function UserAvatar() {
  const { user, signOut, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations("auth");
  const tBlog = useTranslations("blog");
  const { isMyanmar } = useLanguage();
  const mmFont = isMyanmar ? khitHaungg.className : "";

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-300",
          open
            ? "border-prism-violet shadow-[0_0_12px_rgba(167,139,250,0.3)]"
            : "border-white/10 hover:border-white/30"
        )}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName ?? "User"}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-prism-violet/20 flex items-center justify-center">
            <User className="w-4 h-4 text-prism-violet" />
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute right-0 top-full mt-2 w-56",
              "rounded-xl overflow-hidden",
              "bg-surface/95 backdrop-blur-xl",
              "border border-white/[0.08]",
              "shadow-2xl shadow-black/40",
              "z-50"
            )}
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <p className="text-sm font-medium text-white truncate">
                {user.displayName}
              </p>
              <p className="text-[11px] text-zinc-500 truncate">
                {user.email}
              </p>
              {isAdmin && (
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-prism-violet/15 text-prism-violet border border-prism-violet/20">
                  Admin
                </span>
              )}
            </div>

            {/* Menu items */}
            <div className="py-1">
              <MseLink
                href="/blog/write"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <PenLine className="w-4 h-4" />
                <span onClick={() => setOpen(false)} className={mmFont}>{tBlog("writeBlog")}</span>
              </MseLink>
              <MseLink
                href="/blog/my-posts"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span onClick={() => setOpen(false)} className={mmFont}>{tBlog("myBlogs")}</span>
              </MseLink>
            </div>

            {/* Sign out */}
            <div className="border-t border-white/[0.06] py-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-500 hover:text-prism-rose hover:bg-prism-rose/[0.04] transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                <span className={mmFont}>{t("signOut")}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
