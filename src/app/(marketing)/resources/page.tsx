import type { Metadata, Route } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, MessageSquareText } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resources & references",
  description:
    "Glossary of freight terms, FAQs from the desk, and the working references we share with clients.",
  path: "/resources",
  keywords: [
    "freight forwarding glossary",
    "shipping FAQ",
    "freight terms",
    "logistics dictionary",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
];

const RESOURCES = [
  {
    href: "/resources/faq",
    icon: MessageSquareText,
    title: "Frequently asked questions",
    blurb:
      "Eighteen questions we hear weekly — quoting, customs, cool chain, ATA Carnet, and pricing — answered candidly.",
  },
  {
    href: "/resources/glossary",
    icon: BookOpen,
    title: "Freight glossary",
    blurb:
      "Twenty-seven terms freight forwarders use without explaining. AOG, ATA Carnet, BAF, CRT-15, GDP, IMDG, ULD — the working dictionary.",
  },
];

export default function ResourcesIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-16">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <SectionLabel num="01">RESOURCES</SectionLabel>
          <h1 className="f-display mt-6 max-w-4xl text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
            The working
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              references
            </span>
            .
          </h1>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ash)" }}>
            Definitions, answers, and the documentation we share with clients on day one. Free,
            unlocked, and updated when the regulations move.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="site-gutter">
          <div className="grid gap-px md:grid-cols-2" style={{ background: "var(--line)" }}>
            {RESOURCES.map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.href}
                  href={r.href as Route}
                  className="group lift block p-12"
                  style={{ background: "var(--ink)" }}
                  data-cursor="OPEN"
                >
                  <Icon size={32} style={{ color: "var(--cargo)" }} className="mb-6" />
                  <div className="f-display mb-3 text-3xl tracking-tight">{r.title}</div>
                  <p className="text-base" style={{ color: "var(--ash)" }}>
                    {r.blurb}
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
