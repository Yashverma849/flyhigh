import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { CaseStudyHeroSection } from "@/components/marketing/case-study-hero-section";
import { OtherDisciplinesSection } from "@/components/marketing/other-disciplines-section";
import { SplitHeroTitle } from "@/components/marketing/split-hero-title";
import { IndustryHeroMetrics } from "@/components/marketing/industry-hero-metrics";
import { DeskSection } from "@/components/marketing/service-desk-section";
import { ServiceOverviewSlider } from "@/components/marketing/service-overview-slider";
import { getIndustryBySlug, INDUSTRIES } from "@/server/db/seed/industries";
import { SERVICES } from "@/server/db/seed/services";
import { listPublishedCaseStudies } from "@/server/queries/case-studies";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { SLIDER_IMAGES } from "@/lib/slider-images";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) return {};
  return pageMetadata({
    title: `${ind.name} freight & logistics`,
    description: ind.desc,
    path: `/industries/${ind.slug}`,
    image: ind.image,
    keywords: [
      ind.name.toLowerCase(),
      "freight forwarder",
      "India",
      "logistics",
      ind.tag.toLowerCase(),
    ],
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) notFound();

  const relatedServices = SERVICES.filter((s) => ind.relatedServices.includes(s.id));
  const allCases = await listPublishedCaseStudies();
  const cases = allCases.filter((c) => c.industrySlug === ind.slug);
  const others = INDUSTRIES.filter((x) => x.slug !== ind.slug).slice(0, 3);

  const indIndex = INDUSTRIES.findIndex((x) => x.slug === slug);
  const startIndex = (indIndex * 15) % SLIDER_IMAGES.length;

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `${ind.name} freight & logistics`,
          description: ind.desc,
          slug: `/industries/${ind.slug}`,
          category: ind.tag,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
          { name: ind.name, href: `/industries/${ind.slug}` },
        ]}
      />

      <section className="hero-section relative min-h-[100svh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={ind.image}
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
                <SplitHeroTitle name={ind.name} />
              </h1>
              <p className="text-[clamp(1rem,2vw,1.5rem)] leading-relaxed" style={{ color: "var(--bone)" }}>
                {ind.desc}
              </p>
            </div>
          </div>
          <div className="w-full max-w-full">
            <IndustryHeroMetrics stats={ind.stats} />
          </div>
        </div>
      </section>

      <DeskSection
        leftHeading="How we deliver."
        rightHeading="What this sector pays us to solve."
        leftItems={ind.capabilities.map((b, i) => ({ b, image: SLIDER_IMAGES[(startIndex + i) % SLIDER_IMAGES.length] }))}
        rightItems={ind.challenges.map((b, i) => ({ b, image: SLIDER_IMAGES[(startIndex + ind.capabilities.length + i) % SLIDER_IMAGES.length] }))}
        title={
          <>
            Sector playbook.
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              Real constraints.
            </span>
          </>
        }
        description={`The ${ind.name} desk runs on two ledgers — how we deliver, and what this sector pays us to solve. Capabilities are the lanes, paperwork, and handling this team owns. Challenges are the constraints every file is built around, from first survey to delivery.`}
      />

      {relatedServices.length > 0 && (
        <section
          className="w-full min-w-0 max-w-full overflow-x-hidden py-10 md:py-12"
          style={{ background: "var(--ink-2)" }}
        >
          <div className="site-gutter relative min-w-0 overflow-x-hidden">
            <div className="relative mb-6 min-w-0">
              <h2 className="f-display text-[clamp(1.75rem,4vw,2.5rem)]">
                Disciplines that serve this desk.
              </h2>
            </div>
            <ServiceOverviewSlider serviceSlugs={relatedServices.map((s) => s.slug)} />
          </div>
        </section>
      )}

      {cases.length > 0 && (
        <CaseStudyHeroSection
          items={cases.map((c) => ({
            href: `/case-studies/${c.slug}`,
            title: c.title,
            blurb: c.excerpt,
            tag: c.industry.toUpperCase(),
            image: c.image,
          }))}
        />
      )}

      <OtherDisciplinesSection
        heading="Other industries"
        hrefPrefix="/industries/"
        ctaLabel="Open desk"
        tablistLabel="Other industries"
        items={others.map((o) => ({
          slug: o.slug,
          name: o.name,
          tag: o.tag,
          short: o.short,
          desc: o.desc,
          image: o.image,
          eta: o.stats[0]?.v ?? "—",
          coverage: o.stats[1]?.v ?? "—",
          highlights: o.capabilities.slice(0, 3),
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
            Ready to{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              move
            </span>
            ?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white md:text-xl">
            Speak to the {ind.tag.toLowerCase()} desk. Average response time: 27 minutes.
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
