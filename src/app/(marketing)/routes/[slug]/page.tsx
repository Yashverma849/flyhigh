import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { RelatedLinks } from "@/components/shared/related-links";
import { getRouteBySlug, ROUTES, getRoutesByRegion } from "@/server/db/seed/routes";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return ROUTES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getRouteBySlug(slug);
  if (!r) return {};
  return pageMetadata({
    title: `${r.fromCity} to ${r.toCity} freight (${r.mode})`,
    description: `${r.short}. Indicative ${formatINR(r.rate)}, ${r.days} days transit, ${r.freqWeekly}× weekly. Carriers, paperwork, and routing notes from Flyhigh's desk.`,
    path: `/routes/${r.slug}`,
    keywords: [
      `${r.fromCity} to ${r.toCity}`,
      `${r.fromCode} to ${r.toCode}`,
      `${r.mode.toLowerCase()} freight ${r.fromCity}`,
      `India to ${r.toCity}`,
      "freight forwarder",
    ],
  });
}

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRouteBySlug(slug);
  if (!r) notFound();

  const sameRegion = getRoutesByRegion(r.region)
    .filter((x) => x.slug !== r.slug)
    .slice(0, 3);
  const otherModes = ROUTES.filter(
    (x) => x.fromCity === r.fromCity && x.toCity === r.toCity && x.slug !== r.slug,
  );
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Routes", href: "/routes" },
    { name: `${r.fromCity} → ${r.toCity}`, href: `/routes/${r.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `${r.fromCity} to ${r.toCity} freight forwarding`,
          description: r.desc,
          slug: `/routes/${r.slug}`,
          category: r.mode,
          areaServed: `${r.fromCity}, IN to ${r.toCity}`,
        })}
      />

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Pill kind={r.mode === "Air" ? "cargo" : "brass"}>{r.mode}</Pill>
            <Pill>{r.region}</Pill>
            <span className="caption" style={{ color: "var(--ash)" }}>
              {r.fromCode} → {r.toCode}
            </span>
          </div>

          <h1 className="f-display mb-6 text-[52px] leading-[0.88] tracking-tighter md:text-[88px]">
            {r.fromCity}{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              →
            </span>{" "}
            {r.toCity}
          </h1>
          <p className="max-w-3xl text-xl leading-relaxed" style={{ color: "var(--bone)" }}>
            {r.desc}
          </p>
        </div>
      </section>

      <section className="py-12" style={{ background: "var(--ink-2)" }}>
        <div className="site-gutter">
          <div
            className="grid grid-cols-2 gap-px lg:grid-cols-4"
            style={{ background: "var(--line)" }}
          >
            <div className="p-8" style={{ background: "var(--ink-2)" }}>
              <div className="caption" style={{ color: "var(--brass)" }}>
                INDICATIVE FROM
              </div>
              <div className="f-display mt-2 text-3xl" style={{ color: "var(--cargo)" }}>
                {formatINR(r.rate)}
              </div>
            </div>
            <div className="p-8" style={{ background: "var(--ink-2)" }}>
              <div className="caption" style={{ color: "var(--brass)" }}>
                TRANSIT TIME
              </div>
              <div className="f-display mt-2 text-3xl">{r.days} days</div>
            </div>
            <div className="p-8" style={{ background: "var(--ink-2)" }}>
              <div className="caption" style={{ color: "var(--brass)" }}>
                FREQUENCY
              </div>
              <div className="f-display mt-2 text-3xl">{r.freqWeekly}× / wk</div>
            </div>
            <div className="p-8" style={{ background: "var(--ink-2)" }}>
              <div className="caption" style={{ color: "var(--brass)" }}>
                MODE
              </div>
              <div className="f-display mt-2 text-3xl">{r.mode}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="site-gutter">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel num="02">CARRIERS</SectionLabel>
              <h2 className="f-display mt-4 mb-8 text-4xl leading-tight">
                Who we book on this lane.
              </h2>
              <ul className="space-y-2">
                {(r.carriers ?? []).map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-3 rounded-xl p-4 text-sm"
                    style={{
                      border: "1px solid var(--line)",
                      background: "var(--surface-tint-2)",
                    }}
                  >
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        background: "var(--cargo-tint-10)",
                        border: "1px solid var(--cargo)",
                      }}
                    >
                      <Check size={12} style={{ color: "var(--cargo)" }} />
                    </div>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel num="03">DOCUMENTATION</SectionLabel>
              <h2 className="f-display mt-4 mb-8 text-4xl leading-tight">
                Paperwork we handle for you.
              </h2>
              <ul className="space-y-2">
                {r.documents.map((d, i) => (
                  <li key={d} className="flex items-center gap-3 text-sm">
                    <span className="f-mono text-xs" style={{ color: "var(--cargo)" }}>
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mt-16 rounded-2xl p-8"
            style={{ border: "1px solid var(--line)", background: "var(--surface-tint-2)" }}
          >
            <div className="caption mb-3" style={{ color: "var(--brass)" }}>
              OPERATIONAL NOTES
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--bone)" }}>
              {r.notes}
            </p>
          </div>
        </div>
      </section>

      {otherModes.length > 0 && (
        <section className="py-20" style={{ background: "var(--ink-2)" }}>
          <div className="site-gutter">
            <SectionLabel num="04">SAME LANE, DIFFERENT MODE</SectionLabel>
            <h2 className="f-display mt-4 mb-8 text-3xl">
              {r.fromCity} → {r.toCity} alternatives.
            </h2>
            <div
              className="grid gap-px md:grid-cols-2 lg:grid-cols-3"
              style={{ background: "var(--line)" }}
            >
              {otherModes.map((o) => (
                <Link
                  key={o.slug}
                  href={`/routes/${o.slug}`}
                  className="group block p-6"
                  style={{ background: "var(--ink)" }}
                >
                  <Pill kind={o.mode === "Air" ? "cargo" : "brass"}>{o.mode}</Pill>
                  <div className="f-display mt-3 text-2xl">{o.days} days</div>
                  <div className="f-display mt-1 text-lg" style={{ color: "var(--cargo)" }}>
                    From {formatINR(o.rate)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24">
        <div className="site-gutter">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[56px]">
                  Quote this lane.
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Three quotes back — fastest, cheapest, and the one we recommend, with the math
                  behind each.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/quote" className="btn-primary">
                  Get quote for {r.fromCode}–{r.toCode} <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Speak with the desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        num="05"
        label="OTHER LANES"
        heading={`More ${r.region} corridors`}
        items={sameRegion.map((o) => ({
          href: `/routes/${o.slug}`,
          title: `${o.fromCity} → ${o.toCity}`,
          blurb: o.short,
          tag: `${o.mode} · ${o.days} days`,
        }))}
      />
    </>
  );
}
