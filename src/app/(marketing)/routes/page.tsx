import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { ROUTES, ROUTE_REGIONS } from "@/server/db/seed/routes";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Trade routes & lanes from India",
  description:
    "Indicative ocean and air rates, transit times, and operational notes for the lanes Flyhigh actually runs — fifteen corridors out of every Indian gateway.",
  path: "/routes",
  keywords: [
    "India trade routes",
    "Mumbai to Rotterdam freight",
    "India to Dubai air freight",
    "Chennai to Mombasa shipping",
    "ocean freight rates India",
    "transit time India to Europe",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Routes", href: "/routes" },
];

export default function RoutesIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel num="01">LANES</SectionLabel>
              <h1 className="f-display mt-6 text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
                The lanes
                <br />
                we{" "}
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  actually
                </span>{" "}
                run.
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-32">
              <p className="text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                Indicative rates per 20&apos; container or air kg, transit days, weekly frequency,
                and the operational notes nobody else publishes. Click into any lane for routing,
                carriers, paperwork, and what we charge to handle it end to end.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
            style={{ background: "var(--line)" }}
          >
            {ROUTE_REGIONS.map((region) => {
              const count = ROUTES.filter((r) => r.region === region).length;
              return (
                <a
                  key={region}
                  href={`#${region.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  className="lift block p-6 text-left"
                  style={{ background: "var(--ink)" }}
                >
                  <div className="caption" style={{ color: "var(--brass)" }}>
                    {region.toUpperCase()}
                  </div>
                  <div className="f-display mt-2 text-2xl">{count}</div>
                  <div className="text-xs" style={{ color: "var(--ash)" }}>
                    lanes
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {ROUTE_REGIONS.map((region, ri) => {
        const inRegion = ROUTES.filter((r) => r.region === region);
        if (inRegion.length === 0) return null;
        return (
          <section
            key={region}
            id={region.toLowerCase().replace(/[^a-z]/g, "-")}
            className="py-20"
            style={{ background: ri % 2 === 0 ? "transparent" : "var(--ink-2)" }}
          >
            <div className="mx-auto max-w-[1440px] px-6 md:px-8">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <div
                    className="caption mb-2 text-[10px]"
                    style={{ color: "var(--cargo)" }}
                  >
                    REGION · 0{ri + 1}
                  </div>
                  <h2 className="f-display text-4xl tracking-tight md:text-5xl">{region}</h2>
                </div>
                <div className="caption" style={{ color: "var(--ash)" }}>
                  {inRegion.length} {inRegion.length === 1 ? "lane" : "lanes"}
                </div>
              </div>

              <div
                className="rounded-2xl border"
                style={{ borderColor: "var(--line)", background: "var(--ink)" }}
              >
                <div
                  className="caption hidden grid-cols-12 items-center gap-4 border-b p-5 md:grid"
                  style={{ borderColor: "var(--line-2)", color: "var(--ash)" }}
                >
                  <div className="col-span-4">ORIGIN → DESTINATION</div>
                  <div className="col-span-2">MODE</div>
                  <div className="col-span-2">TRANSIT</div>
                  <div className="col-span-3 text-right">FROM</div>
                  <div className="col-span-1" />
                </div>
                {inRegion.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/routes/${r.slug}`}
                    className="group grid grid-cols-1 items-center gap-4 border-b p-5 transition-colors last:border-b-0 hover:bg-[var(--surface-tint-2)] md:grid-cols-12"
                    style={{ borderColor: "var(--line-2)" }}
                    data-cursor="OPEN"
                  >
                    <div className="flex items-center gap-2 text-sm md:col-span-4">
                      <span className="font-medium">{r.from}</span>
                      <ArrowRight size={12} style={{ color: "var(--cargo)" }} />
                      <span className="font-medium">{r.to}</span>
                    </div>
                    <div className="md:col-span-2">
                      <Pill kind={r.mode === "Air" ? "cargo" : "brass"}>{r.mode}</Pill>
                    </div>
                    <div className="f-mono text-sm md:col-span-2">{r.days} days</div>
                    <div
                      className="f-display tabular text-[20px] md:col-span-3 md:text-right md:text-[24px]"
                      style={{ color: "var(--cargo)" }}
                    >
                      {formatINR(r.rate)}
                    </div>
                    <div className="text-right md:col-span-1">
                      <ArrowUpRight
                        size={16}
                        className="md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <p className="caption mt-4" style={{ color: "var(--ash)" }}>
                INDICATIVE · 1 × 20&apos; DRY CONTAINER OR AIR KG · EX-WORKS · EXCLUDES TAXES &amp;
                SURCHARGES
              </p>
            </div>
          </section>
        );
      })}

      <section className="py-24" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[56px]">
                  Don&apos;t see your lane?
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  We run quietly on another seventy-seven corridors. Send us the brief — we&apos;ll
                  route, price, and recommend.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/quote" className="btn-primary">
                  Get a quote <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Speak with a planner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
