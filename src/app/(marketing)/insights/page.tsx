import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { InsightsIndex } from "@/components/marketing/insights-index";
import { pageMetadata } from "@/lib/seo";
import { listPublishedInsights } from "@/server/queries/insights";

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

export default async function InsightsPage() {
  const posts = await listPublishedInsights();

  return (
    <>
      <section className="hero-section relative min-h-[60svh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/insights-hero.jpg"
            alt=""
            className="h-full w-full max-w-none object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 100%), linear-gradient(to top, var(--ink) 0%, transparent 40%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10 mx-auto flex w-full min-w-0 max-w-full flex-col pt-32 pb-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Insights", href: "/insights" },
            ]}
          />
          <div className="w-full max-w-3xl mt-6">
            <h1 className="f-display text-[64px] leading-[0.88] tracking-tighter md:text-[110px] text-white">
              Trade-route
              <br />
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                bulletins
              </span>
              ,
              <br />
              from the desk.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-white/90">
              Honest writing on shipping geopolitics, customs, cool-chain, and the math behind a
              single decimal point of on-time delivery.
            </p>
          </div>
        </div>
      </section>

      <InsightsIndex posts={posts} />
    </>
  );
}

