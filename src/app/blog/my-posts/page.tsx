import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import MyPostsClient from "./MyPostsClient";

export const metadata: Metadata = {
  title: `My Blogs | ${APP_CONFIG.title}`,
  description: "Manage your blogs.",
};

export default function MyPostsPage() {
  return (
    <PageTransitionWrapper>
      <MyPostsClient />
    </PageTransitionWrapper>
  );
}
