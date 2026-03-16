import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import BlogWriteClient from "./BlogWriteClient";

export const metadata: Metadata = {
  title: `Write | ${APP_CONFIG.title}`,
  description: "Write a new blog post for the community.",
};

export default function BlogWritePage() {
  return (
    <PageTransitionWrapper>
      <BlogWriteClient />
    </PageTransitionWrapper>
  );
}
