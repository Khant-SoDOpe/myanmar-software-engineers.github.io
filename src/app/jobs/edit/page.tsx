import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import JobEditClient from "./JobEditClient";

export const metadata: Metadata = {
  title: `Edit Job | ${APP_CONFIG.title}`,
  description: "Edit your job post.",
};

export default function JobEditPage() {
  return (
    <PageTransitionWrapper>
      <JobEditClient />
    </PageTransitionWrapper>
  );
}
