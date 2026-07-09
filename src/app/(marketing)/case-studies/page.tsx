import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CaseStudiesIndex } from "@/components/marketing/case-studies-index";
import { pageMetadata } from "@/lib/seo";
import { listPublishedCaseStudies } from "@/server/queries/case-studies";

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

export default async function CaseStudiesIndexPage() {
  const caseStudies = await listPublishedCaseStudies();

  return (
    <>
      <section className="hero-section relative min-h-[60svh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/case-studies-hero.jpg"
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
          <Breadcrumbs items={breadcrumbs} />
          <div className="w-full max-w-3xl mt-6">
            <h1 className="f-display text-[64px] leading-[0.88] tracking-tighter md:text-[110px] text-white">
              Stories with
              <br />
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                receipts
              </span>
              .
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-white/90">
              We don&apos;t talk about clients we don&apos;t serve well. These are the moves where the
              math, the cargo, and the calendar all worked. With the metrics to prove it.
            </p>
          </div>
        </div>
      </section>

      <CaseStudiesIndex caseStudies={caseStudies} />
    </>
  );
}
