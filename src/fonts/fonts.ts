import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const displayFont = Bricolage_Grotesque({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFontBase = Plus_Jakarta_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Backward-compat aliases — existing imports must not break
export const titleFont = displayFont;
export const titleFontBold = displayFont;
export const bodyFont = bodyFontBase;

export { displayFont, bodyFontBase, monoFont };
