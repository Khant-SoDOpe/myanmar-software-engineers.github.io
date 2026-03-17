import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import JobPostClient from "./JobPostClient";

export const metadata: Metadata = {
  title: `Job Details | ${APP_CONFIG.title}`,
  description: "View job opportunity details.",
};

export default function JobPostPage() {
  return (
    <PageTransitionWrapper>
      <JobPostClient />
    </PageTransitionWrapper>
  );
}
