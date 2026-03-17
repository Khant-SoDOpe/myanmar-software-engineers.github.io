import Container from "@/components/Common/Container/Container";
import styles from "@/styles/styles";

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container className={styles.paddingHelper}>{children}</Container>;
}
