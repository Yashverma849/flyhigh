import type { Metadata, Route } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, FileText, Hash, FileCheck2 } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Freight tools & calculators",
  description:
    "Practical tools for freight forwarders' clients — transit-time estimator, Incoterms 2020 reference, HS-code lookup, and shipping documents checklist.",
  path: "/tools",
  keywords: ["freight calculator", "Incoterms", "HS code", "transit time India", "shipping documents"],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
];

const TOOLS = [
  {
    href: "/tools/transit-time",
    icon: Clock,
    title: "Transit-time estimator",
    blurb:
      "Pick origin, destination, and mode. We return realistic transit days based on the lanes we actually run.",
  },
  {
    href: "/tools/incoterms",
    icon: FileText,
    title: "Incoterms 2020 reference",
    blurb:
      "All eleven Incoterms with the obligations spelled out — risk transfer, cost split, paperwork, and the change from 2010.",
  },
  {
    href: "/tools/hs-code",
    icon: Hash,
    title: "HS code lookup",
    blurb:
      "Common commodity classifications under India's eight-digit ITC-HS schedule. Use it to estimate duty exposure before you commit.",
  },
  {
    href: "/tools/documents",
    icon: FileCheck2,
    title: "Documents required",
    blurb:
      "What paperwork moves with what cargo. Filterable by mode, region, and commodity — never ship without checking.",
  },
];

export default function ToolsIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <SectionLabel num="01">TOOLS</SectionLabel>
          <h1 className="f-display mt-6 max-w-4xl text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
            The reference
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              shelf
            </span>
            .
          </h1>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ash)" }}>
            Free tools and references we use ourselves. No login. No mailing-list capture. Use them
            against any forwarder.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="grid gap-px md:grid-cols-2"
            style={{ background: "var(--line)" }}
          >
            {TOOLS.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.href}
                  href={t.href as Route}
                  className="group lift block p-12"
                  style={{ background: "var(--ink)" }}
                  data-cursor="OPEN"
                >
                  <Icon size={32} style={{ color: "var(--cargo)" }} className="mb-6" />
                  <div className="f-display mb-3 text-3xl tracking-tight">{t.title}</div>
                  <p className="text-base" style={{ color: "var(--ash)" }}>
                    {t.blurb}
                  </p>
                  <ArrowUpRight
                    size={20}
                    className="mt-8 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: "var(--cargo)" }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
