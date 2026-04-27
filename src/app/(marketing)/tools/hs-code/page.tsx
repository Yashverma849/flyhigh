import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

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

const HS_GROUPS: { chapter: string; title: string; codes: { hs: string; desc: string; bcd: string }[] }[] = [
  {
    chapter: "Chapter 30",
    title: "Pharmaceutical products",
    codes: [
      { hs: "3003.10.00", desc: "Medicaments containing penicillins", bcd: "10%" },
      { hs: "3004.20.00", desc: "Medicaments containing antibiotics", bcd: "10%" },
      { hs: "3002.15.00", desc: "Immunological products in measured doses", bcd: "10%" },
      { hs: "3006.50.00", desc: "First-aid boxes and kits", bcd: "10%" },
    ],
  },
  {
    chapter: "Chapter 61",
    title: "Apparel and clothing accessories — knitted",
    codes: [
      { hs: "6109.10.00", desc: "T-shirts of cotton, knitted", bcd: "20%" },
      { hs: "6110.20.00", desc: "Sweaters and pullovers of cotton, knitted", bcd: "20%" },
      { hs: "6104.43.00", desc: "Women's dresses of synthetic fibres, knitted", bcd: "20%" },
    ],
  },
  {
    chapter: "Chapter 62",
    title: "Apparel and clothing accessories — not knitted",
    codes: [
      { hs: "6203.42.00", desc: "Men's trousers of cotton, woven", bcd: "20%" },
      { hs: "6204.62.00", desc: "Women's trousers of cotton, woven", bcd: "20%" },
      { hs: "6205.20.00", desc: "Men's shirts of cotton, woven", bcd: "20%" },
    ],
  },
  {
    chapter: "Chapter 84",
    title: "Machinery and mechanical appliances",
    codes: [
      { hs: "8471.30.00", desc: "Portable digital ADP machines (≤10 kg)", bcd: "0%" },
      { hs: "8479.89.00", desc: "Other machines and mechanical appliances", bcd: "7.5%" },
      { hs: "8413.81.00", desc: "Pumps for liquids", bcd: "7.5%" },
    ],
  },
  {
    chapter: "Chapter 85",
    title: "Electrical machinery and equipment",
    codes: [
      { hs: "8517.12.00", desc: "Telephones for cellular networks", bcd: "20%" },
      { hs: "8507.60.00", desc: "Lithium-ion accumulators", bcd: "15%" },
      { hs: "8541.40.00", desc: "Photosensitive semiconductor devices, photovoltaic cells", bcd: "0%" },
      { hs: "8542.31.00", desc: "Electronic integrated circuits — processors and controllers", bcd: "0%" },
    ],
  },
  {
    chapter: "Chapter 87",
    title: "Vehicles and parts",
    codes: [
      { hs: "8703.80.10", desc: "Motor cars with electric motor (BEV) — capacity ≤4 persons", bcd: "70-100%" },
      { hs: "8708.40.00", desc: "Gear boxes and parts thereof", bcd: "10%" },
      { hs: "8714.91.00", desc: "Frames and forks of bicycles", bcd: "10%" },
    ],
  },
  {
    chapter: "Chapter 22",
    title: "Beverages, spirits and vinegar",
    codes: [
      { hs: "2204.21.00", desc: "Wine of fresh grapes (in containers ≤2 litres)", bcd: "150%" },
      { hs: "2208.30.00", desc: "Whisky", bcd: "150%" },
      { hs: "2208.40.00", desc: "Rum and other spirits from sugar-cane", bcd: "150%" },
    ],
  },
  {
    chapter: "Chapter 8",
    title: "Edible fruit and nuts",
    codes: [
      { hs: "0804.50.00", desc: "Mangoes, fresh or dried", bcd: "30%" },
      { hs: "0801.32.00", desc: "Cashew nuts, shelled", bcd: "70%" },
      { hs: "0802.31.00", desc: "Walnuts in shell", bcd: "100%" },
    ],
  },
];

export default function HsCodePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <SectionLabel num="01">HS CODE LOOKUP</SectionLabel>
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
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          {HS_GROUPS.map((g) => (
            <div key={g.chapter} className="mb-12">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="caption" style={{ color: "var(--brass)" }}>
                  {g.chapter}
                </span>
                <h2 className="f-display text-2xl tracking-tight">{g.title}</h2>
              </div>
              <div
                className="rounded-2xl border"
                style={{ borderColor: "var(--line)", background: "var(--ink)" }}
              >
                <div
                  className="caption hidden grid-cols-12 items-center gap-4 border-b p-4 md:grid"
                  style={{ borderColor: "var(--line-2)", color: "var(--ash)" }}
                >
                  <div className="col-span-3">HS CODE</div>
                  <div className="col-span-7">DESCRIPTION</div>
                  <div className="col-span-2 text-right">BCD</div>
                </div>
                {g.codes.map((c) => (
                  <div
                    key={c.hs}
                    className="grid grid-cols-1 gap-2 border-b p-4 last:border-b-0 md:grid-cols-12"
                    style={{ borderColor: "var(--line-2)" }}
                  >
                    <div className="f-mono text-sm md:col-span-3" style={{ color: "var(--cargo)" }}>
                      {c.hs}
                    </div>
                    <div className="text-sm md:col-span-7">{c.desc}</div>
                    <div className="f-mono text-sm md:col-span-2 md:text-right">{c.bcd}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

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

      <section className="py-24" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[56px]">
                  Need a binding HS opinion?
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Our customs desk issues pre-shipment HS opinions on letterhead — useful for
                  audit defence and duty exposure modelling.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/services/customs" className="btn-primary">
                  Customs service <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Speak with desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
