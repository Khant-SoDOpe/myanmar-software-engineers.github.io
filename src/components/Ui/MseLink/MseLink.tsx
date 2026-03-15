import { cn } from "@/utils";
import Link from "next/link";
import { PropsWithChildren } from "react";

type TMesLink = PropsWithChildren<{
  href: string;
  className?: string;
}>;

const MseLink: React.FC<TMesLink> = ({ children, href, className }) => {
  return (
    <Link href={href} className={cn(className)}>
      {children}
    </Link>
  );
};
export default MseLink;
