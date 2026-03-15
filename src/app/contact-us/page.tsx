import PageTransitionWrapper from "@/components/Animate/PageTransitionWrapper/PageTransitionWrapper";
import APP_CONFIG from "@/config/config";
import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: `Contact us | ${APP_CONFIG.title}`,
  description: APP_CONFIG.description,
  openGraph: {
    title: `Contact us | ${APP_CONFIG.title}`,
    description: APP_CONFIG.description,
    images: "https://mmswe.com/images/mmswe-seo.png",
  },
};

const links = [
  {
    label: "Facebook Community",
    href: "https://www.facebook.com/groups/myanmarsoftwareengineers",
    description:
      "Join our Facebook group to connect with fellow Myanmar software engineers. Share knowledge, find opportunities, and grow together.",
  },
  {
    label: "GitHub",
    href: "https://github.com/myanmar-software-engineers",
    description:
      "Contribute to our open-source projects, add your developer profile, and collaborate on community-driven initiatives.",
  },
];

const ContactUsPage = () => {
  return (
    <PageTransitionWrapper>
      <ContactPageClient links={links} />
    </PageTransitionWrapper>
  );
};

export default ContactUsPage;
