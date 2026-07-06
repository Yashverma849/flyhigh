import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { QuoteForm } from "@/components/marketing/quote-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Get a freight quote",
  description:
    "Request a quote from Flyhigh — sea, air, road, customs, warehousing, project cargo. Three quotes back: fastest, cheapest, and the one we recommend. Average response 27 minutes.",
  path: "/quote",
  keywords: [
    "freight quote India",
    "ocean freight quote",
    "air freight quote",
    "shipping quote Mumbai",
    "freight forwarder quote",
  ],
});

export default function QuotePage() {
  return (
    <section className="relative py-32">
      <div className="site-gutter">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Quote", href: "/quote" },
          ]}
         
        />
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
