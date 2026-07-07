import type { Metadata } from "next";
import { HoverSlidingCard } from "@/components/marketing/hover-sliding-card";
import styles from "@/components/marketing/hover-sliding-card.module.css";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hover sliding card animation",
  description: "Preview of the hover sliding card animation used on Incoterms cards.",
  path: "/tools/incoterms/sliding-card",
  noindex: true,
});

export default function IncotermSlidingCardDemoPage() {
  return (
    <section className="flex min-h-[100svh] items-center justify-center pt-32 pb-24">
      <div className="site-gutter w-full max-w-sm">
        <HoverSlidingCard
          header={
            <>
              <span className="f-display text-3xl" style={{ color: "var(--cargo)" }}>
                EXW
              </span>
              <span className={styles.title}>Ex Works</span>
            </>
          }
        >
          <p style={{ color: "var(--ash)" }}>
            Maximum buyer responsibility. Use only when buyer has strong logistics presence at
            origin.
          </p>
          <a href="/tools/incoterms#exw">View details</a>
        </HoverSlidingCard>
      </div>
    </section>
  );
}
