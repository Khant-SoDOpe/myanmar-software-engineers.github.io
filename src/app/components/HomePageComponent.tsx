"use client";

import Container from "@/components/Common/Container/Container";
import OverflowContainer from "@/components/Common/Container/OverflowContainer";
import SpacingDivider from "@/components/Common/SpacingDivider/SpacingDivider";
import HomeSection from "@/components/MSE/HomeSection";
import JoinSection from "@/components/MSE/JoinSection";
import LanguageIconSection from "@/components/MSE/LanguageIconSection";
import MmsweTypoSection from "@/components/MSE/MmsweTypoSection";
import PlatformSection from "@/components/MSE/PlatformSection";
import styles from "@/styles/styles";

export default function HomePageComponent() {
  return (
    <>
      <Container>
        <section className="w-full overflow-x-hidden lg:overflow-x-visible">
          <HomeSection />
        </section>

        <section className={styles.paddingHelper}>
          <JoinSection />
        </section>

      </Container>

      <OverflowContainer>
        <SpacingDivider size="sm" />

        <section>
          <LanguageIconSection />
        </section>

        <SpacingDivider size="sm" />

        <section>
          <MmsweTypoSection />
        </section>

        <SpacingDivider size="sm" />
      </OverflowContainer>

      <Container withPadding>
        <section>
          <PlatformSection />
        </section>
      </Container>
    </>
  );
}
