import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { FAQS, FAQ_CATEGORIES } from "@/server/db/seed/faqs";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Frequently asked questions",
  description:
    "Eighteen questions our desk hears every week — quoting, customs, cool chain, ATA Carnet, pricing — answered candidly.",
  path: "/resources/faq",
  keywords: [
    "freight forwarder FAQ",
    "shipping FAQ India",
    "customs broker FAQ",
    "cool chain FAQ",
    "logistics questions",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
  { name: "FAQ", href: "/resources/faq" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[breadcrumbJsonLd(breadcrumbs), faqJsonLd(FAQS.map((f) => ({ q: f.q, a: f.a })))]}
      />

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <SectionLabel num="01">FAQ</SectionLabel>
          <h1 className="f-display mt-6 text-[56px] leading-[0.88] tracking-tighter md:text-[88px]">
            Asked
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              candidly
            </span>
            .
          </h1>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ash)" }}>
            The questions we hear weekly — answered without sales spin. If yours isn&apos;t here,
            send it: we&apos;ll add it (and reply to you).
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="site-gutter">
          {FAQ_CATEGORIES.map((cat) => {
            const items = FAQS.filter((f) => f.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <Pill kind="brass">{cat.toUpperCase()}</Pill>
                  <span className="caption" style={{ color: "var(--ash)" }}>
                    {items.length} questions
                  </span>
                </div>
                <div className="space-y-3">
                  {items.map((f) => (
                    <details
                      key={f.q}
                      className="rounded-2xl p-6"
                      style={{ border: "1px solid var(--line)", background: "var(--ink)" }}
                    >
                      <summary className="cursor-pointer pr-6 font-semibold">{f.q}</summary>
                      <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--bone)" }}>
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--ink-2)" }}>
        <div className="site-gutter">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[56px]">
                  Question we missed?
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Send it — we&apos;ll answer privately and add it here for the next reader.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/contact" className="btn-primary">
                  Ask the desk <ArrowRight size={14} />
                </Link>
                <Link href="/resources/glossary" className="btn-ghost">
                  Glossary
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
