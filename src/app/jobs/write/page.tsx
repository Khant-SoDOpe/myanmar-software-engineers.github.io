import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import JobWriteClient from "./JobWriteClient";

export const metadata: Metadata = {
  title: `Post a Job | ${APP_CONFIG.title}`,
  description: "Post a new job opportunity for the community.",
};

export default function JobWritePage() {
  return (
    <PageTransitionWrapper>
      <JobWriteClient />
    </PageTransitionWrapper>
  );
}
