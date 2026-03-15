import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import ProfileEditorClient from "./ProfileEditorClient";

export const metadata: Metadata = {
  title: `Profile Editor | ${APP_CONFIG.title}`,
  description:
    "Create your developer profile for the Myanmar Software Engineers community.",
  openGraph: {
    title: `Profile Editor | ${APP_CONFIG.title}`,
    description:
      "Create your developer profile for the Myanmar Software Engineers community.",
    images: "https://mmswe.com/images/mmswe-seo.png",
  },
};

const ProfileEditorPage = () => {
  return (
    <PageTransitionWrapper>
      <ProfileEditorClient />
    </PageTransitionWrapper>
  );
};

export default ProfileEditorPage;
