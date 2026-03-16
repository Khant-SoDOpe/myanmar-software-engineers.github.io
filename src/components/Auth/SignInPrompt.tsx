"use client";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { LogIn, Shield } from "lucide-react";

export default function SignInPrompt() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-sm"
      >
        {/* Icon */}
        <motion.div
          className={cn(
            "mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center",
            "bg-gradient-to-br from-prism-violet/15 to-prism-cyan/10",
            "border border-white/[0.08]"
          )}
          animate={{
            boxShadow: [
              "0 0 0px rgba(167,139,250,0)",
              "0 0 30px rgba(167,139,250,0.1)",
              "0 0 0px rgba(167,139,250,0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Shield className="w-7 h-7 text-prism-violet" />
        </motion.div>

        <h2 className="font-display text-2xl font-bold text-white mb-2">
          Sign in required
        </h2>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
          Sign in with your Google account to access this feature.
        </p>

        <button
          type="button"
          onClick={signInWithGoogle}
          className={cn(
            "inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium",
            "bg-white text-zinc-900",
            "hover:bg-zinc-100 transition-colors duration-200",
            "shadow-lg shadow-white/10"
          )}
        >
          <LogIn className="w-4 h-4" />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
}
