import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./hover-sliding-card.module.css";

type HoverSlidingCardProps = {
  id?: string;
  header: ReactNode;
  children: ReactNode;
  className?: string;
};

export function HoverSlidingCard({ id, header, children, className }: HoverSlidingCardProps) {
  return (
    <div className={styles.cell}>
      <article id={id} className={cn(styles.card, className)}>
        <div className={styles.header}>{header}</div>
        <div className={styles.content}>{children}</div>
      </article>
    </div>
  );
}
