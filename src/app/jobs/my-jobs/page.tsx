import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import MyJobsClient from "./MyJobsClient";

export const metadata: Metadata = {
  title: `My Jobs | ${APP_CONFIG.title}`,
  description: "Manage your job posts.",
};

export default function MyJobsPage() {
  return (
    <PageTransitionWrapper>
      <MyJobsClient />
    </PageTransitionWrapper>
  );
}
