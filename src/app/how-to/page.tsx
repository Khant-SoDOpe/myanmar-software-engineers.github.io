import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import HowToPageClient from "./HowToPageClient";

export const metadata: Metadata = {
  title: `How to? | ${APP_CONFIG.title}`,
  description:
    "Step-by-step guide to add your developer profile to the Myanmar Software Engineers community.",
  openGraph: {
    title: `How to? | ${APP_CONFIG.title}`,
    description:
      "Step-by-step guide to add your developer profile to the Myanmar Software Engineers community.",
    images: "https://mmswe.com/images/mmswe-seo.png",
  },
};

export default function HowToPage() {
  return (
    <PageTransitionWrapper>
      <HowToPageClient />
    </PageTransitionWrapper>
  );
}
