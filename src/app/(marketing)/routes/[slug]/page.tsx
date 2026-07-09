import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { OtherDisciplinesSection } from "@/components/marketing/other-disciplines-section";
import { RouteHeroTitle } from "@/components/marketing/route-hero-title";
import { RouteHeroMetrics } from "@/components/marketing/route-hero-metrics";
import { DeskSection } from "@/components/marketing/service-desk-section";
import { RouteOverviewSlider } from "@/components/marketing/route-overview-slider";
import { getRouteBySlug, ROUTES, getRoutesByRegion } from "@/server/db/seed/routes";
import { getRouteHeroImage } from "@/lib/route-hero-image";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import { SLIDER_IMAGES } from "@/lib/slider-images";

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

  const routeIndex = ROUTES.findIndex((x) => x.slug === slug);
  const startIndex = (routeIndex * 15 + 40) % SLIDER_IMAGES.length;

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `${r.fromCity} to ${r.toCity} freight (${r.mode})`,
          description: `${r.short}. Transit ${r.days} days.`,
          slug: `/routes/${r.slug}`,
          category: r.mode.toUpperCase(),
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Routes", href: "/routes" },
          { name: `${r.fromCity} to ${r.toCity}`, href: `/routes/${r.slug}` },
        ]}
      />

      <section className="hero-section relative min-h-[100svh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={getRouteHeroImage(r.mode)}
            alt=""
            className="h-full w-full max-w-none object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 32%, rgba(0,0,0,0.35) 58%, rgba(0,0,0,0.2) 100%), linear-gradient(to top, var(--ink) 0%, transparent 38%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10 mx-auto flex min-h-[100svh] w-full min-w-0 max-w-full flex-col pt-28 sm:pt-32 lg:pt-40">
          <div className="flex flex-1 flex-col justify-center">
            <div className="w-full max-w-2xl lg:max-w-3xl">
              <h1 className="f-display mb-6 text-[clamp(2.75rem,8vw,6rem)] leading-[0.88] tracking-tighter">
                <RouteHeroTitle fromCity={r.fromCity} toCity={r.toCity} />
              </h1>
              <p className="text-[clamp(1rem,2vw,1.5rem)] leading-relaxed" style={{ color: "var(--bone)" }}>
                {r.desc}
              </p>
            </div>
          </div>
          <div className="w-full max-w-full">
            <RouteHeroMetrics
              rate={r.rate}
              days={r.days}
              freqWeekly={r.freqWeekly}
              mode={r.mode}
            />
          </div>
        </div>
      </section>

      <DeskSection
        leftHeading="Who we book on this lane."
        rightHeading="Paperwork we handle for you."
        leftItems={(r.carriers ?? []).map((b, i) => ({ b, image: SLIDER_IMAGES[(startIndex + i) % SLIDER_IMAGES.length] }))}
        rightItems={r.documents.map((b, i) => ({ b, image: SLIDER_IMAGES[(startIndex + (r.carriers ?? []).length + i) % SLIDER_IMAGES.length] }))}
        title={
          <>
            Carriers booked.
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              Paperwork cleared.
            </span>
          </>
        }
        description={`The ${r.fromCity} → ${r.toCity} lane runs on two ledgers — who we book, and what we file. Carriers are the alliances and operators we hold space with on this corridor. Documentation is the paperwork chain every shipment clears before wheels-up or sail-away. ${r.notes}`}
      />

      {otherModes.length > 0 && (
        <section
          className="w-full min-w-0 max-w-full overflow-x-hidden py-10 md:py-12"
          style={{ background: "var(--ink-2)" }}
        >
          <div className="site-gutter relative min-w-0 overflow-x-hidden">
            <div className="relative mb-6 min-w-0">
              <h2 className="f-display text-[clamp(1.75rem,4vw,2.5rem)]">
                {r.fromCity} → {r.toCity} alternatives.
              </h2>
            </div>
            <RouteOverviewSlider routeSlugs={otherModes.map((o) => o.slug)} />
          </div>
        </section>
      )}

      <OtherDisciplinesSection
        heading={`More ${r.region} corridors`}
        hrefPrefix="/routes/"
        ctaLabel="Open lane"
        tablistLabel="Other lanes"
        items={sameRegion.map((o) => ({
          slug: o.slug,
          name: `${o.fromCity} → ${o.toCity}`,
          tag: o.mode,
          short: o.short,
          desc: o.desc,
          image: getRouteHeroImage(o.mode),
          eta: `${o.days} days`,
          coverage: formatINR(o.rate),
          highlights: [o.region, `${o.freqWeekly}× / week`],
        }))}
      />

      <section className="relative w-full min-w-0 max-w-full overflow-x-hidden py-16 text-center md:py-20">
        <div className="absolute inset-0 z-0">
          <img src="/cta%201.png" alt="" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--ink) 0%, rgba(0,0,0,0.55) 50%, var(--ink) 100%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10">
          <h2 className="f-display mx-auto max-w-full px-4 text-[clamp(2.5rem,8vw,6.25rem)] leading-[0.9] tracking-tighter text-white">
            Quote this{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              lane
            </span>
            ?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white md:text-xl">
            Three quotes back — fastest, cheapest, and the one we recommend, with the math behind
            each.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/quote" className="btn-primary px-8 py-4 text-base" data-cursor="QUOTE">
              Get quote for {r.fromCode}–{r.toCode} <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="btn-ghost px-8 py-4 text-base"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
            >
              Speak with the desk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
