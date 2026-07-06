import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { CaseStudyHeroSection } from "@/components/marketing/case-study-hero-section";
import { OtherDisciplinesSection } from "@/components/marketing/other-disciplines-section";
import { ServiceHeroMetrics } from "@/components/marketing/service-hero-metrics";
import { ServiceDeskSection } from "@/components/marketing/service-desk-section";
import { IndustryOverviewSlider } from "@/components/marketing/industry-overview-slider";
import { getServiceBySlug, SERVICES } from "@/server/db/seed/services";
import { INDUSTRIES } from "@/server/db/seed/industries";
import { CASE_STUDIES } from "@/server/db/seed/case-studies";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: `${service.short}. ${service.desc}`,
    path: `/services/${service.slug}`,
    image: service.image,
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} India`,
      service.tag.toLowerCase(),
      "freight forwarder",
      "Mumbai",
    ],
  });
}

const PROCESS = [
  {
    n: "01",
    t: "Brief & survey",
    b: "We learn the cargo, the route, and the constraint that nobody mentions in the brief.",
  },
  {
    n: "02",
    t: "Plan & quote",
    b: "Three quotes — fastest, cheapest, and the one we recommend, with the math behind each.",
  },
  {
    n: "03",
    t: "Documentation",
    b: "Customs paperwork, certificates of origin, dangerous goods declarations — all under one roof.",
  },
  {
    n: "04",
    t: "Execution",
    b: "A planner, a customs broker, and the head of operations on a single thread for the duration.",
  },
  {
    n: "05",
    t: "Delivery & report",
    b: "Photographs at every transhipment. A final report at delivery. The ledger updates.",
  },
];

function ServiceHeroTitle({ name }: { name: string }) {
  const space = name.lastIndexOf(" ");
  if (space === -1) return name;

  return (
    <>
      {name.slice(0, space)}
      <br />
      <span className="f-display-it" style={{ color: "var(--cargo)" }}>
        {name.slice(space + 1)}
      </span>
    </>
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  const others = SERVICES.filter((x) => x.slug !== slug);

  const relatedIndustries = INDUSTRIES.filter((ind) => ind.relatedServices.includes(s.id)).slice(
    0,
    4,
  );
  const relatedCases = CASE_STUDIES.filter((c) => c.serviceSlug === s.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: s.name,
          description: `${s.short}. ${s.desc}`,
          slug: `/services/${s.slug}`,
          category: s.tag,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: s.name, href: `/services/${s.slug}` },
        ]}
      />

      <section className="hero-section relative min-h-[100svh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={s.image}
            alt=""
            className="h-full w-full max-w-none object-cover object-[62%_center] sm:object-[58%_center] lg:object-[55%_center]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.72) 32%, rgba(0,0,0,0.35) 58%, rgba(0,0,0,0.2) 100%), linear-gradient(to top, var(--ink) 0%, transparent 38%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10 mx-auto flex min-h-[100svh] w-full min-w-0 max-w-full flex-col pt-28 sm:pt-32 lg:pt-40">
          <div className="flex flex-1 flex-col justify-center">
            <div className="w-full max-w-2xl lg:max-w-3xl">
              <h1 className="f-display mb-6 text-[clamp(2.75rem,8.5vw,6.875rem)] leading-[0.88] tracking-tighter">
                <ServiceHeroTitle name={s.name} />
              </h1>
              <p className="text-[clamp(1rem,2vw,1.5rem)] leading-relaxed" style={{ color: "var(--bone)" }}>
                {s.desc}
              </p>
            </div>
          </div>
          <div className="w-full max-w-full">
            <ServiceHeroMetrics eta={s.eta} coverage={s.coverage} />
          </div>
        </div>
      </section>

      <ServiceDeskSection serviceName={s.name} features={s.features} process={PROCESS} />

      {relatedIndustries.length > 0 && (
        <section className="w-full min-w-0 max-w-full overflow-x-hidden py-10 md:py-12" style={{ background: "var(--ink-2)" }}>
      <div className="site-gutter relative min-w-0 overflow-x-hidden">
            <div className="relative mb-6 min-w-0">
              <h2 className="f-display text-[clamp(1.75rem,4vw,2.5rem)]">Industries that lean on this desk.</h2>
            </div>
            <IndustryOverviewSlider industrySlugs={relatedIndustries.map((ind) => ind.slug)} />
          </div>
        </section>
      )}

      {relatedCases.length > 0 && (
        <CaseStudyHeroSection
          items={relatedCases.map((c) => ({
            href: `/case-studies/${c.slug}`,
            title: c.title,
            blurb: c.excerpt,
            tag: c.industry.toUpperCase(),
            image: c.image,
          }))}
        />
      )}

      <OtherDisciplinesSection
        items={others.map((o) => ({
          slug: o.slug,
          name: o.name,
          tag: o.tag,
          short: o.short,
          desc: o.desc,
          image: o.image,
          eta: o.eta,
          coverage: o.coverage,
          highlights: o.features.slice(0, 3),
        }))}
      />

      <section className="relative w-full min-w-0 max-w-full overflow-x-hidden py-16 text-center md:py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/cta%201.png"
            alt=""
            className="h-full w-full object-cover"
          />
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
            Ready to{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              move
            </span>
            ?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white md:text-xl">
            Speak to the {s.name} desk. Average response time: 27 minutes.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/quote" className="btn-primary px-8 py-4 text-base" data-cursor="QUOTE">
              Get a quote <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="btn-ghost px-8 py-4 text-base"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
            >
              Speak with desk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
