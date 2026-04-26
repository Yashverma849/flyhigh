import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/section-label";
import { QuoteForm } from "@/components/marketing/quote-form";

export const metadata: Metadata = {
  title: "Get a quote",
  description:
    "Request a freight quote from Flyhigh — sea, air, road, customs, warehousing, project cargo. Reply within 90 minutes.",
};

export default function QuotePage() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[960px] px-6 md:px-8">
        <SectionLabel num="00">QUOTE</SectionLabel>
        <h1 className="f-display mt-4 mb-6 text-[64px] leading-[0.95] tracking-tight md:text-[88px]">
          Tell us what
          <br />
          you need to{" "}
          <span className="f-display-it" style={{ color: "var(--cargo)" }}>
            move.
          </span>
        </h1>
        <p className="mb-12 max-w-2xl text-lg" style={{ color: "var(--ash)" }}>
          A single message reaches three people: a planner, a customs broker, and the head of
          operations. You will hear back within ninety minutes.
        </p>
        <QuoteForm />
      </div>
    </section>
  );
}
