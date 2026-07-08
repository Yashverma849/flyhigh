import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { GlossaryList } from "@/components/marketing/glossary-list";
import { JsonLd } from "@/components/shared/json-ld";
import { GLOSSARY } from "@/server/db/seed/glossary";
import { CtaBackground } from "@/components/marketing/cta-background";
import { pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Freight glossary",
  description:
    "Twenty-seven freight forwarding terms — AOG, ATA Carnet, BAF, CRT-15, GDP, IMDG, ULD — explained without jargon by Flyhigh.",
  path: "/resources/glossary",
  keywords: [
    "freight glossary",
    "shipping terms",
    "logistics dictionary",
    "Incoterms",
    "freight forwarding terminology",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
  { name: "Glossary", href: "/resources/glossary" },
];

export default function GlossaryPage() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: "Flyhigh freight glossary",
            description:
              "Working dictionary of freight forwarding and international logistics terminology.",
            hasDefinedTerm: sorted.map((e) => ({
              "@type": "DefinedTerm",
              "@id": `${SITE_URL}/resources/glossary#${e.term.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
              name: e.term,
              description: e.long,
            })),
          },
        ]}
      />

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} />
          <SectionLabel num="01">GLOSSARY</SectionLabel>
          <h1 className="f-display mt-6 text-[56px] leading-[0.88] tracking-tighter md:text-[88px]">
            Without
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              jargon
            </span>
            .
          </h1>
          <p className="mt-8 max-w-3xl text-lg" style={{ color: "var(--ash)" }}>
            Freight forwarders use shorthand the way cooks use mise en place — quietly, all the
            time, and without explaining. This is the working dictionary, in plain English.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="site-gutter">
          <GlossaryList />
        </div>
      </section>

      <section className="relative w-full min-w-0 max-w-full overflow-x-hidden py-24 md:py-28">
        <div className="absolute inset-0 z-0">
          <CtaBackground imageStyle={{ filter: "grayscale(12%) contrast(96%)" }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.75) 100%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-left">
              <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight text-white md:text-[56px]">
                Term we missed?
              </h2>
              <p className="text-lg text-white/80">
                We add to this list as the trade vocabulary moves.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href="/contact" className="btn-primary">
                Suggest a term <ArrowRight size={14} />
              </Link>
              <Link
                href="/resources/faq"
                className="btn-ghost"
                style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
