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
      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} />
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

      <CaseStudiesIndex caseStudies={caseStudies} />
    </>
  );
}
