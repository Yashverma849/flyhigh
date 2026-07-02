import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { GLOSSARY } from "@/server/db/seed/glossary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

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
  const grouped: Record<string, typeof sorted> = {};
  for (const e of sorted) {
    const letter = (e.term.charAt(0) || "#").toUpperCase();
    (grouped[letter] ??= []).push(e);
  }
  const letters = Object.keys(grouped).sort();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(breadcrumbs),
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: "Flyhigh freight glossary",
            description:
              "Working dictionary of freight forwarding and international logistics terminology.",
            hasDefinedTerm: sorted.map((e) => ({
              "@type": "DefinedTerm",
              "@id": `${process.env.AUTH_URL ?? "https://flyhigh-website.vercel.app"}/resources/glossary#${e.term.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
              name: e.term,
              description: e.long,
            })),
          },
        ]}
      />

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
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

          <div className="mt-8 flex flex-wrap gap-2">
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="caption rounded-full px-3 py-1.5"
                style={{
                  border: "1px solid var(--line)",
                  background: "var(--surface-tint-2)",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="site-gutter">
          {letters.map((l) => (
            <div key={l} id={`letter-${l}`} className="mb-12">
              <div className="caption mb-4" style={{ color: "var(--cargo)" }}>
                {l}
              </div>
              <div className="grid gap-px md:grid-cols-2" style={{ background: "var(--line)" }}>
                {(grouped[l] ?? []).map((e) => (
                  <article
                    key={e.term}
                    id={e.term.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                    className="p-6"
                    style={{ background: "var(--ink)" }}
                  >
                    <div className="flex items-baseline gap-3">
                      <h2
                        className="f-display text-2xl tracking-tight"
                        style={{ color: "var(--cargo)" }}
                      >
                        {e.term}
                      </h2>
                      <span className="caption" style={{ color: "var(--ash)" }}>
                        {e.short}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--bone)" }}>
                      {e.long}
                    </p>
                    {e.see && e.see.length > 0 && (
                      <div className="caption mt-3" style={{ color: "var(--brass)" }}>
                        SEE ALSO ·{" "}
                        {e.see.map((s, i) => (
                          <span key={s}>
                            <a
                              href={`#${s.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                              className="u-link"
                            >
                              {s}
                            </a>
                            {i < e.see!.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
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
                  Term we missed?
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  We add to this list as the trade vocabulary moves.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/contact" className="btn-primary">
                  Suggest a term <ArrowRight size={14} />
                </Link>
                <Link href="/resources/faq" className="btn-ghost">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
