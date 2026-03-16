import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import TestEditorClient from "./TestEditorClient";

export const metadata: Metadata = {
  title: `Test Editor | ${APP_CONFIG.title}`,
  description: "Test page for the ContentEditor component.",
};

export default function TestEditorPage() {
  return (
    <PageTransitionWrapper>
      <TestEditorClient />
    </PageTransitionWrapper>
  );
}
