import Navbar from "@/components/Common/Navbar/Navbar";
import { displayFont, bodyFontBase, monoFont, khitHaungg } from "@/fonts/fonts";
import { cn } from "@/utils";
import styles from "@/styles/styles";
import type { Metadata } from "next";
import APP_CONFIG from "@/config/config";
import Favicons from "@/components/Favicons/Favicons";
// Styles
import "@/styles/globals.scss";
import Footer from "@/components/Common/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: APP_CONFIG.title,
  description:
    "Explore our Job Board, access insightful Tech Articles, showcase your Portfolio, and join a Community that thrives on mutual growth.",
  openGraph: {
    title: APP_CONFIG.title,
    description: APP_CONFIG.description,
    images: "https://mmswe.com/images/mmswe-seo.png",
    siteName: APP_CONFIG.title,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.title,
    description: APP_CONFIG.description,
    images: "https://mmswe.com/images/mmswe-seo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  const cls = cn(
    displayFont.variable,
    bodyFontBase.variable,
    monoFont.variable,
    khitHaungg.variable,
    styles.gradient,
    "font-body min-h-screen text-zinc-200 scroll-smooth overflow-x-hidden"
  );
  return (
    <html lang={locale} data-theme="obsidian" className="overflow-x-hidden">
      <head>
        <Favicons />
      </head>
      <body className={cls}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageProvider>
            <div className="noise-overlay" />
            <Navbar />
            <main className="min-h-[calc(100vh-142px)] pt-16">{children}</main>
            <Footer />
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
