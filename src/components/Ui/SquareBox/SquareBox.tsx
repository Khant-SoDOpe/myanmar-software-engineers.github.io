import { cn } from "@/utils";
import { PropsWithChildren } from "react";
import styles from "@/styles/styles";

type TSquareBox = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

const SquareBox = ({ children, className = "", onClick }: TSquareBox) => {
  return (
    <div
      className={cn(
        "relative bg-surface border border-white/5 rounded-2xl py-5 overflow-hidden",
        styles.paddingHelper,
        className
      )}
      onClick={onClick}
    >
      <div className="relative">{children}</div>
    </div>
  );
};
export default SquareBox;
