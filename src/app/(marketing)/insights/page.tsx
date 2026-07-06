import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { INSIGHTS } from "@/server/db/seed/insights";
import { formatDate } from "@/lib/utils";
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
  const [featured, ...rest] = INSIGHTS;
  if (!featured) return null;

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
          <SectionLabel num="01">INSIGHTS</SectionLabel>
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

      <section className="py-12">
        <div className="site-gutter">
          <div className="mb-12 flex flex-wrap items-center gap-2">
            <span className="caption mr-2" style={{ color: "var(--brass)" }}>
              FILTER:
            </span>
            {(["ALL", "OCEAN", "AIR", "CUSTOMS", "OPERATIONS"] as const).map((t, i) => (
              <button
                key={t}
                type="button"
                className={`caption rounded-full px-4 py-1.5 text-xs transition-all ${i === 0 ? "" : "opacity-60 hover:opacity-100"}`}
                style={{
                  background: i === 0 ? "var(--cargo)" : "transparent",
                  color: "var(--bone)",
                  border: `1px solid ${i === 0 ? "var(--cargo)" : "var(--line)"}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Featured */}
          <div className="mb-16 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Link
                href={`/insights/${featured.slug}`}
                className="group lift block"
                data-cursor="READ"
              >
                <div
                  className="cine-frame relative aspect-[16/10] overflow-hidden rounded-2xl"
                  style={{ border: "1px solid var(--line)" }}
                >
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <Pill kind="cargo">FEATURED · {featured.category}</Pill>
                  </div>
                </div>
              </Link>
            </div>
            <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
              <div className="caption mb-4" style={{ color: "var(--brass)" }}>
                {formatDate(featured.date)} · {featured.read} read
              </div>
              <Link href={`/insights/${featured.slug}`} className="block">
                <h2 className="f-display mb-6 text-[36px] leading-tight transition-opacity hover:opacity-80 md:text-5xl">
                  {featured.title}
                </h2>
              </Link>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                {featured.excerpt}
              </p>
              <Link href={`/insights/${featured.slug}`} className="btn-link self-start">
                Read article <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Grid */}
          <div className="grid gap-px md:grid-cols-3" style={{ background: "var(--line)" }}>
            {rest.map((p) => (
              <Link
                key={p.id}
                href={`/insights/${p.slug}`}
                className="group block p-6"
                style={{ background: "var(--ink)" }}
                data-cursor="READ"
              >
                <div className="cine-frame relative mb-5 aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mb-3 flex items-center gap-3">
                  <Pill kind="brass">{p.category}</Pill>
                  <span className="caption" style={{ color: "var(--ash)" }}>
                    {p.read} read
                  </span>
                </div>
                <h3 className="f-display mb-3 text-2xl leading-tight transition-colors group-hover:text-[var(--cargo)]">
                  {p.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--ash)" }}>
                  {p.excerpt}
                </p>
                <div className="caption mt-4" style={{ color: "var(--brass)" }}>
                  {formatDate(p.date)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
