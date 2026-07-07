import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { InsightsIndex } from "@/components/marketing/insights-index";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights & journal",
  description:
    "Trade-route bulletins from Flyhigh's editorial desk — Red Sea routing, pharma cool-chain, lithium-battery air corridors, Incoterms 2020, and the math behind 99.4% on-time.",
  path: "/insights",
  keywords: [
    "freight forwarding insights",
    "shipping news India",
    "Red Sea routing",
    "Incoterms 2020 India",
    "pharma cool chain",
    "lithium battery air freight",
  ],
});

export default function InsightsPage() {
  return (
    <>
      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Insights", href: "/insights" },
            ]}
          />
          <h1 className="f-display mt-6 max-w-4xl text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
            Trade-route
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              bulletins
            </span>
            ,
            <br />
            from the desk.
          </h1>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ash)" }}>
            Honest writing on shipping geopolitics, customs, cool-chain, and the math behind a
            single decimal point of on-time delivery.
          </p>
        </div>
      </section>

      <InsightsIndex />
    </>
  );
}
