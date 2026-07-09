import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { DocumentsScrollStack } from "@/components/marketing/documents-scroll-stack";
import { DestinationReferenceWindow } from "@/components/marketing/destination-reference-window";
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

function AlwaysRequiredBento({
  docs,
}: {
  docs: { name: string; desc: string; image?: string }[];
}) {
  const [featured, ...rest] = docs;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Featured: Commercial Invoice */}
      <div
        className="group flex min-h-[420px] flex-col justify-between rounded-2xl border p-8"
        style={{ borderColor: "var(--line)", background: "var(--ink)" }}
      >
        <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
          <img
            src={featured!.image}
            alt={featured!.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="text-left">
          <h3 className="f-display text-2xl tracking-tight md:text-3xl">{featured!.name}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed md:text-base" style={{ color: "var(--ash)" }}>
            {featured!.desc}
          </p>
        </div>
      </div>

      {/* Rest: Packing List & Transport Document */}
      <div className="flex flex-col gap-6">
        {rest.map((d) => (
          <div
            key={d.name}
            className="group flex flex-1 min-h-[200px] flex-col justify-between gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center"
            style={{ borderColor: "var(--line)", background: "var(--ink)" }}
          >
            <div className="flex-1 text-left">
              <h3 className="font-semibold">{d.name}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                {d.desc}
              </p>
            </div>
            <div className="relative aspect-[4/3] max-h-[140px] w-full shrink-0 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] sm:max-h-none sm:w-[160px]">
              <img
                src={d.image}
                alt={d.name}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        image: "/commercial_invoice.png",
      },
      {
        name: "Packing List",
        desc: "Box-level breakdown — weights, dimensions, contents, marks, numbers.",
        image: "/packing_list.png",
      },
      {
        name: "Transport document",
        desc: "Bill of Lading (sea), Air Waybill (air), or CMR / consignment note (road).",
        image: "/transport_document.png",
      },
    ],
  },
  {
    title: "Customs & origin",
    image: "/services_borders_1783068829815.png",
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
    image: "/pharma_cargo.png",
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
    image: "/manifesto_ocean_harbor_1783063499614.png",
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
    image: "/services_cabinet_1783068927669.png",
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
    region: "European Union",
    required: ["EUR.1 (where qualifying)", "ICS2 ENS", "ATLAS data"],
  },
  {
    region: "United States",
    required: ["ACE filing", "ACAS data (air)", "FDA prior notice (food/pharma)", "ISF 10+2 (sea)"],
  },
  {
    region: "United Kingdom",
    required: ["CDS declaration data", "GMR (Goods Movement Reference) for transit"],
  },
  { region: "Canada", required: ["CBSA e-Manifest", "B3 Coding Form"] },
  {
    region: "UAE / GCC",
    required: ["GCC e-Mirsal", "Certificate of origin attestation (case-by-case)"],
  },
  {
    region: "Australia / NZ",
    required: ["AQIS biosecurity declaration", "ICS Cargo Report"],
  },
  { region: "Nigeria", required: ["Form M registration", "SONCAP certificate", "PAAR"] },
  {
    region: "Kenya",
    required: ["ICUMS pre-clearance", "PVoC certificate (where applicable)"],
  },
];

export default function DocumentsPage() {
  return (
    <>

      <section className="hero-section relative min-h-[60svh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/documents-hero.png"
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
          <div className="mt-6 w-full max-w-3xl">
            <SectionLabel num="01" onDark>
              DOCUMENTS
            </SectionLabel>
            <h1 className="f-display mt-6 text-[64px] leading-[0.88] tracking-tighter text-white md:text-[110px]">
              What moves
              <br />
              with the{" "}
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                cargo
              </span>
              .
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-white/90">
              Paperwork is half the freight. This is the reference our documentation desk works
              against — what&apos;s always needed, what depends on commodity, what depends on
              destination, and what you should never ship without.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="site-gutter">
          <h2 className="f-display mb-8 text-3xl tracking-tight md:text-4xl">
            {SECTIONS[0]!.title}
          </h2>
          <AlwaysRequiredBento docs={SECTIONS[0]!.docs} />
        </div>
      </section>

      <DocumentsScrollStack
        sections={SECTIONS.slice(1).map((s) => ({
          title: s.title,
          image: s.image!,
          docs: s.docs,
        }))}
      />

      <section className="relative py-16" style={{ background: "var(--ink)" }}>
        <div className="site-gutter">
          <h2 className="f-display mb-8 text-3xl tracking-tight md:text-4xl">
            Quick reference: by destination
          </h2>
          <DestinationReferenceWindow regions={REGIONS} />
        </div>
      </section>

      <section className="relative w-full min-w-0 max-w-full overflow-x-hidden py-24 md:py-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/services_borders_1783068829815.png"
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(12%) contrast(96%)" }}
          />
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
                We&apos;ll handle the paperwork.
              </h2>
              <p className="text-lg text-white/80">
                Send the brief; our documentation desk drafts everything you need, in the
                destination&apos;s preferred format.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href="/services/customs" className="btn-primary">
                Customs & docs <ArrowRight size={14} />
              </Link>
              <Link
                href="/quote"
                className="btn-ghost"
                style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
