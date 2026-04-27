import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { RelatedLinks } from "@/components/shared/related-links";
import { getCaseStudyBySlug, CASE_STUDIES } from "@/server/db/seed/case-studies";
import { getServiceBySlug } from "@/server/db/seed/services";
import { getIndustryBySlug } from "@/server/db/seed/industries";
import { pageMetadata, articleJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudyBySlug(slug);
  if (!c) return {};
  return pageMetadata({
    title: c.title,
    description: c.excerpt,
    path: `/case-studies/${c.slug}`,
    image: c.image,
    type: "article",
    publishedTime: c.date,
    keywords: [c.industry, c.region, "case study", "freight forwarding"],
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudyBySlug(slug);
  if (!c) notFound();

  const service = getServiceBySlug(c.serviceSlug);
  const industry = getIndustryBySlug(c.industrySlug);
  const others = CASE_STUDIES.filter((x) => x.slug !== c.slug).slice(0, 3);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Case studies", href: "/case-studies" },
    { name: c.title, href: `/case-studies/${c.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: c.title,
          description: c.excerpt,
          slug: `/case-studies/${c.slug}`,
          image: c.image,
          datePublished: c.date,
          category: c.industry,
        })}
      />

      <article className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
          <Link href="/case-studies" className="caption u-link mb-8 flex items-center gap-1">
            <ChevronLeft size={12} /> ALL CASE STUDIES
          </Link>
          <Pill kind="cargo">CASE STUDY · {c.industry.toUpperCase()}</Pill>
          <h1 className="f-display mt-6 mb-8 text-[42px] leading-[0.95] tracking-tight md:text-[68px]">
            {c.title}
          </h1>
          <div
            className="caption mb-12 flex flex-wrap items-center gap-3"
            style={{ color: "var(--ash)" }}
          >
            <span>CLIENT · {c.client}</span>
            <span>·</span>
            <span>REGION · {c.region.toUpperCase()}</span>
            <span>·</span>
            <time dateTime={c.date}>{formatDate(c.date)}</time>
          </div>
        </div>

        <div className="mx-auto mb-12 max-w-5xl px-6 md:px-8">
          <div className="cine-frame relative aspect-[21/9] overflow-hidden rounded-2xl">
            <Image
              src={c.image}
              alt={c.title}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div
            className="mb-16 grid grid-cols-2 gap-px lg:grid-cols-4"
            style={{ background: "var(--line)" }}
          >
            {c.metrics.map((m) => (
              <div key={m.l} className="p-8" style={{ background: "var(--ink-2)" }}>
                <div className="caption" style={{ color: "var(--brass)" }}>
                  {m.l}
                </div>
                <div className="f-display mt-2 text-3xl">{m.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p
            className="f-display mb-12 text-2xl leading-relaxed md:text-3xl"
            style={{ color: "var(--bone)" }}
          >
            {c.excerpt}
          </p>

          <h2 className="f-display mb-4 text-3xl tracking-tight">The challenge</h2>
          <p className="mb-12 text-lg leading-relaxed" style={{ color: "var(--bone)" }}>
            {c.challenge}
          </p>

          <h2 className="f-display mb-4 text-3xl tracking-tight">Our approach</h2>
          <p className="mb-12 text-lg leading-relaxed" style={{ color: "var(--bone)" }}>
            {c.approach}
          </p>

          <h2 className="f-display mb-4 text-3xl tracking-tight">The outcome</h2>
          <p className="mb-12 text-lg leading-relaxed" style={{ color: "var(--bone)" }}>
            {c.outcome}
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {service && (
              <Link
                href={`/services/${service.slug}`}
                className="group block rounded-xl p-6"
                style={{
                  border: "1px solid var(--line)",
                  background: "var(--surface-tint-2)",
                }}
              >
                <div className="caption mb-2" style={{ color: "var(--brass)" }}>
                  SERVICE
                </div>
                <div className="font-semibold">{service.name}</div>
                <div className="mt-1 text-xs" style={{ color: "var(--ash)" }}>
                  {service.short}
                </div>
              </Link>
            )}
            {industry && (
              <Link
                href={`/industries/${industry.slug}`}
                className="group block rounded-xl p-6"
                style={{
                  border: "1px solid var(--line)",
                  background: "var(--surface-tint-2)",
                }}
              >
                <div className="caption mb-2" style={{ color: "var(--brass)" }}>
                  INDUSTRY
                </div>
                <div className="font-semibold">{industry.name}</div>
                <div className="mt-1 text-xs" style={{ color: "var(--ash)" }}>
                  {industry.short}
                </div>
              </Link>
            )}
          </div>
        </div>
      </article>

      <section className="py-24" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[56px]">
                  Bring us a problem.
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  The next case study could be yours. We respond in 27 minutes during business
                  hours.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/quote" className="btn-primary">
                  Get a quote <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Speak with desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        num="—"
        label="MORE CASE STUDIES"
        heading="Other freight stories"
        items={others.map((o) => ({
          href: `/case-studies/${o.slug}`,
          title: o.title,
          blurb: o.excerpt,
          tag: `${o.industry.toUpperCase()} · ${formatDate(o.date)}`,
        }))}
      />
    </>
  );
}
