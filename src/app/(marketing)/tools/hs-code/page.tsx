import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { HsCodeTable } from "@/components/marketing/hs-code-table";
import { CtaBackground } from "@/components/marketing/cta-background";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "HS code lookup",
  description:
    "Common Indian ITC-HS classifications for traded commodities. Use as a starting point for duty estimation — verify against the official schedule before filing.",
  path: "/tools/hs-code",
  keywords: [
    "ITC HS code India",
    "HS code lookup",
    "Indian customs tariff",
    "HSN classification",
    "import duty India",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "HS code lookup", href: "/tools/hs-code" },
];

export default function HsCodePage() {
  return (
    <>

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="f-display mt-6 text-[56px] leading-[0.88] tracking-tighter md:text-[88px]">
            Eight digits,
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              real
            </span>{" "}
            money.
          </h1>
          <p className="mt-8 max-w-3xl text-lg" style={{ color: "var(--ash)" }}>
            Indian Customs uses the eight-digit ITC-HS schedule, derived from the WCO Harmonized
            System. Below: classifications we see most often, with indicative Basic Customs Duty
            (BCD). Always verify against the live tariff before filing.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="site-gutter">
          <HsCodeTable />

          <div
            className="mt-10 rounded-2xl p-6 text-sm leading-relaxed"
            style={{
              border: "1px solid var(--line)",
              background: "var(--surface-tint-2)",
              color: "var(--bone)",
            }}
          >
            <strong style={{ color: "var(--cargo)" }}>Note:</strong> BCD is one of several
            components (BCD + Social Welfare Surcharge + IGST). Anti-dumping duties, safeguard
            duties, and product-specific cesses can apply. This list is indicative — for binding
            classification, request a Pre-Shipment HS opinion from our customs desk.
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-32">
        <div className="absolute inset-0 z-0 opacity-40">
          <CtaBackground />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--ink) 0%, transparent 60%, var(--ink) 100%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight text-white md:text-[56px]">
                Need a binding HS opinion?
              </h2>
              <p className="text-lg text-white/80">
                Our customs desk issues pre-shipment HS opinions on letterhead — useful for audit
                defence and duty exposure modelling.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href="/services/customs" className="btn-primary">
                Customs service <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="btn-ghost"
                style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
              >
                Speak with desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
