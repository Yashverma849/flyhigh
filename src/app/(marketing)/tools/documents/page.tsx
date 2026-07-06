import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shipping documents required",
  description:
    "What paperwork moves with what cargo — by mode, region, and commodity. The reference checklist used by Flyhigh's documentation desk.",
  path: "/tools/documents",
  keywords: [
    "shipping documents required",
    "export documents India",
    "import documents India",
    "bill of lading air waybill",
    "certificate of origin",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Documents required", href: "/tools/documents" },
];

const SECTIONS = [
  {
    title: "Always required (every shipment)",
    docs: [
      {
        name: "Commercial Invoice",
        desc: "Detailed invoice from seller to buyer with HS codes, values, Incoterm.",
      },
      {
        name: "Packing List",
        desc: "Box-level breakdown — weights, dimensions, contents, marks, numbers.",
      },
      {
        name: "Transport document",
        desc: "Bill of Lading (sea), Air Waybill (air), or CMR / consignment note (road).",
      },
    ],
  },
  {
    title: "Customs & origin",
    docs: [
      {
        name: "Certificate of Origin (Generic)",
        desc: "Issued by chamber of commerce, declares country of manufacture.",
      },
      {
        name: "Preferential Origin Certificate",
        desc: "EUR.1, Form A, Form AI, RCEP CO — needed to claim FTA preferential duty.",
      },
      {
        name: "Bill of Entry / Shipping Bill",
        desc: "Indian customs declaration filed via ICEGATE for import / export.",
      },
      {
        name: "AD Code Letter",
        desc: "Authorised Dealer code letter from your bank — required for export filings.",
      },
      {
        name: "Self-declared FOB",
        desc: "Required for low-value postal exports under the courier mode.",
      },
    ],
  },
  {
    title: "Commodity-specific",
    docs: [
      {
        name: "Phytosanitary Certificate",
        desc: "Plants, fruits, vegetables, wood — issued by Plant Protection officer.",
      },
      {
        name: "Health / Veterinary Certificate",
        desc: "Animal products, dairy — origin authority issued, importer-stamped.",
      },
      {
        name: "Fumigation Certificate",
        desc: "Wooden packaging, certain agricultural cargo — ISPM-15 compliant.",
      },
      {
        name: "MSDS",
        desc: "Material Safety Data Sheet — required for any DG and many chemicals.",
      },
      {
        name: "Dangerous Goods Declaration",
        desc: "IMDG (sea) or IATA Shipper's Declaration (air) — signed by trained DG specialist.",
      },
      { name: "GMP / WHO Certificate", desc: "Pharmaceutical exports — destination-specific." },
      {
        name: "BIS / WPC Licence",
        desc: "Electronics imports into India — for radio-frequency or BIS-mandated items.",
      },
    ],
  },
  {
    title: "Region-specific (where applicable)",
    docs: [
      {
        name: "SONCAP / Form M / PAAR",
        desc: "Nigerian imports — pre-shipment conformity, Form M registration, Pre-Arrival Assessment Report.",
      },
      {
        name: "EUR.1 Movement Certificate",
        desc: "EU preferential origin proof — required to claim reduced or zero EU duty.",
      },
      {
        name: "ATLAS data set",
        desc: "German customs e-declaration data, lodged pre-arrival at EU ports.",
      },
      {
        name: "ACE / ACAS data",
        desc: "US Customs Automated Commercial Environment — pre-arrival data for air and sea.",
      },
      {
        name: "CBSA e-Manifest",
        desc: "Canadian Border Services Agency — pre-arrival data for all modes.",
      },
      { name: "GCC e-Mirsal", desc: "UAE customs single-window declaration." },
      {
        name: "AQIS Biosecurity Declaration",
        desc: "Australian Quarantine — applies even to non-food cargo with biological residue risk.",
      },
      {
        name: "ICS2 ENS",
        desc: "EU pre-loading import safety filing — phased rollout completing 2024-2025.",
      },
    ],
  },
  {
    title: "Insurance & finance",
    docs: [
      {
        name: "Marine Insurance Certificate",
        desc: "Per-shipment cover note under master policy. ICC(A), (B), or (C) clause.",
      },
      {
        name: "Letter of Credit",
        desc: "Bank-issued payment instrument with strict document compliance — DRAFT before shipment.",
      },
      {
        name: "Bank Realisation Certificate",
        desc: "Indian export — proof of foreign exchange realisation, needed for duty drawback.",
      },
    ],
  },
];

const REGIONS = [
  {
    tag: "EU",
    region: "European Union",
    required: ["EUR.1 (where qualifying)", "ICS2 ENS", "ATLAS data"],
  },
  {
    tag: "US",
    region: "United States",
    required: ["ACE filing", "ACAS data (air)", "FDA prior notice (food/pharma)", "ISF 10+2 (sea)"],
  },
  {
    tag: "GB",
    region: "United Kingdom",
    required: ["CDS declaration data", "GMR (Goods Movement Reference) for transit"],
  },
  { tag: "CA", region: "Canada", required: ["CBSA e-Manifest", "B3 Coding Form"] },
  {
    tag: "AE",
    region: "UAE / GCC",
    required: ["GCC e-Mirsal", "Certificate of origin attestation (case-by-case)"],
  },
  {
    tag: "AU",
    region: "Australia / NZ",
    required: ["AQIS biosecurity declaration", "ICS Cargo Report"],
  },
  { tag: "NG", region: "Nigeria", required: ["Form M registration", "SONCAP certificate", "PAAR"] },
  {
    tag: "KE",
    region: "Kenya",
    required: ["ICUMS pre-clearance", "PVoC certificate (where applicable)"],
  },
];

export default function DocumentsPage() {
  return (
    <>

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} />
          <SectionLabel num="01">DOCUMENTS</SectionLabel>
          <h1 className="f-display mt-6 text-[56px] leading-[0.88] tracking-tighter md:text-[88px]">
            What moves
            <br />
            with the{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              cargo
            </span>
            .
          </h1>
          <p className="mt-8 max-w-3xl text-lg" style={{ color: "var(--ash)" }}>
            Paperwork is half the freight. This is the reference our documentation desk works
            against — what&apos;s always needed, what depends on commodity, what depends on
            destination, and what you should never ship without.
          </p>
        </div>
      </section>

      {SECTIONS.map((s, i) => (
        <section
          key={s.title}
          className="py-16"
          style={{ background: i % 2 === 1 ? "var(--ink-2)" : "transparent" }}
        >
          <div className="site-gutter">
            <h2 className="f-display mb-8 text-3xl tracking-tight md:text-4xl">{s.title}</h2>
            <div className="grid gap-px md:grid-cols-2" style={{ background: "var(--line)" }}>
              {s.docs.map((d) => (
                <div
                  key={d.name}
                  className="flex gap-4 p-6"
                  style={{ background: i % 2 === 1 ? "var(--ink-2)" : "var(--ink)" }}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--cargo-tint-10)" }}
                  >
                    <Check size={14} style={{ color: "var(--cargo)" }} />
                  </div>
                  <div>
                    <div className="font-semibold">{d.name}</div>
                    <div className="mt-1 text-sm" style={{ color: "var(--ash)" }}>
                      {d.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16">
        <div className="site-gutter">
          <h2 className="f-display mb-8 text-3xl tracking-tight md:text-4xl">
            Quick reference: by destination
          </h2>
          <div
            className="grid gap-px md:grid-cols-2 lg:grid-cols-4"
            style={{ background: "var(--line)" }}
          >
            {REGIONS.map((r) => (
              <div key={r.region} className="p-6" style={{ background: "var(--ink)" }}>
                <Pill kind="brass">{r.tag}</Pill>
                <div className="f-display mt-3 text-xl tracking-tight">{r.region}</div>
                <ul className="mt-3 space-y-1 text-sm" style={{ color: "var(--ash)" }}>
                  {r.required.map((x) => (
                    <li key={x}>· {x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
                  We&apos;ll handle the paperwork.
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Send the brief; our documentation desk drafts everything you need, in the
                  destination&apos;s preferred format.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/services/customs" className="btn-primary">
                  Customs & docs <ArrowRight size={14} />
                </Link>
                <Link href="/quote" className="btn-ghost">
                  Get a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
