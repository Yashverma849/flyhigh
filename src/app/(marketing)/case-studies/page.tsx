import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { CASE_STUDIES } from "@/server/db/seed/case-studies";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Case studies",
  description:
    "Six freight stories with the receipts. Mango air-lifts, EV battery JIT, ATA carnets at Paris Fashion Week, and a 65-metre wind blade by breakbulk.",
  path: "/case-studies",
  keywords: [
    "freight forwarding case studies",
    "logistics case study India",
    "pharma cool chain case study",
    "EV battery air freight",
    "ATA carnet case study",
    "project cargo wind turbine",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Case studies", href: "/case-studies" },
];

export default function CaseStudiesIndexPage() {
  const [featured, ...rest] = CASE_STUDIES;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <SectionLabel num="01">CASE STUDIES</SectionLabel>
          <h1 className="f-display mt-6 max-w-4xl text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
            Stories with
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              receipts
            </span>
            .
          </h1>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ash)" }}>
            We don&apos;t talk about clients we don&apos;t serve well. These are the moves where the
            math, the cargo, and the calendar all worked. With the metrics to prove it.
          </p>
        </div>
      </section>

      {featured && (
        <section className="py-12">
          <div className="site-gutter">
            <div className="mb-16 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Link
                  href={`/case-studies/${featured.slug}`}
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
                      <Pill kind="cargo">FEATURED · {featured.industry.toUpperCase()}</Pill>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
                <div className="caption mb-4" style={{ color: "var(--brass)" }}>
                  {formatDate(featured.date)} · {featured.read} read
                </div>
                <Link href={`/case-studies/${featured.slug}`} className="block">
                  <h2 className="f-display mb-6 text-[36px] leading-tight transition-opacity hover:opacity-80 md:text-5xl">
                    {featured.title}
                  </h2>
                </Link>
                <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                  {featured.excerpt}
                </p>
                <div className="caption" style={{ color: "var(--ash)" }}>
                  CLIENT · {featured.client}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="site-gutter">
          <div
            className="grid gap-px md:grid-cols-2 lg:grid-cols-3"
            style={{ background: "var(--line)" }}
          >
            {rest.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group block p-6"
                style={{ background: "var(--ink)" }}
                data-cursor="READ"
              >
                <div className="cine-frame relative mb-5 aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mb-3 flex items-center gap-3">
                  <Pill kind="brass">{c.industry.toUpperCase()}</Pill>
                  <span className="caption" style={{ color: "var(--ash)" }}>
                    {c.read} read
                  </span>
                </div>
                <h3 className="f-display mb-3 text-2xl leading-tight transition-colors group-hover:text-[var(--cargo)]">
                  {c.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--ash)" }}>
                  {c.excerpt}
                </p>
                <div
                  className="caption mt-4 flex items-center gap-2"
                  style={{ color: "var(--brass)" }}
                >
                  {formatDate(c.date)}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
