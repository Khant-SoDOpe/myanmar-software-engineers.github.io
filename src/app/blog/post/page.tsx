import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

export const metadata: Metadata = {
  title: `Post | ${APP_CONFIG.title}`,
  description: "Read a community blog post.",
};

export default function BlogPostPage() {
  return (
    <PageTransitionWrapper>
      <BlogPostClient />
    </PageTransitionWrapper>
  );
}
