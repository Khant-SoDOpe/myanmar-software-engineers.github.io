import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import BlogEditClient from "./BlogEditClient";

export const metadata: Metadata = {
  title: `Edit Blog | ${APP_CONFIG.title}`,
  description: "Edit your blog.",
};

export default function BlogEditPage() {
  return (
    <PageTransitionWrapper>
      <BlogEditClient />
    </PageTransitionWrapper>
  );
}
