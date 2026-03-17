import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import JobsPageClient from "./JobsPageClient";

export const metadata: Metadata = {
  title: `Jobs | ${APP_CONFIG.title}`,
  description: "Browse job opportunities posted by the Myanmar software engineering community.",
  openGraph: {
    title: `Jobs | ${APP_CONFIG.title}`,
    description: "Browse job opportunities posted by the Myanmar software engineering community.",
    images: "https://mmswe.com/images/mmswe-seo.png",
  },
};

export default function JobsPage() {
  return (
    <PageTransitionWrapper>
      <JobsPageClient />
    </PageTransitionWrapper>
  );
}
