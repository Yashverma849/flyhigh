import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Incoterms 2020 reference",
  description:
    "All eleven Incoterms 2020, plain-English. Risk transfer, cost split, paperwork, and which to use when — from a freight forwarder's desk.",
  path: "/tools/incoterms",
  keywords: [
    "Incoterms 2020",
    "Incoterms explained",
    "EXW DDP CIP FOB",
    "Incoterms freight forwarder",
    "international trade terms",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Incoterms", href: "/tools/incoterms" },
];

type Incoterm = {
  code: string;
  name: string;
  modes: ("Any" | "Sea")[];
  riskTransfer: string;
  buyerPays: string;
  sellerPays: string;
  whenToUse: string;
};

const INCOTERMS: Incoterm[] = [
  {
    code: "EXW",
    name: "Ex Works",
    modes: ["Any"],
    riskTransfer: "At seller's premises, before loading",
    buyerPays: "Loading, export clearance, freight, insurance, import clearance, delivery",
    sellerPays: "Make goods available at named place",
    whenToUse:
      "Maximum buyer responsibility. Use only when buyer has strong logistics presence at origin.",
  },
  {
    code: "FCA",
    name: "Free Carrier",
    modes: ["Any"],
    riskTransfer: "When goods are handed to first carrier nominated by buyer",
    buyerPays: "Main freight, insurance, import clearance",
    sellerPays: "Export clearance, delivery to named carrier",
    whenToUse:
      "Most flexible Incoterm — works for any mode. New 2020 option to require carrier to issue 'on board' B/L.",
  },
  {
    code: "CPT",
    name: "Carriage Paid To",
    modes: ["Any"],
    riskTransfer: "When goods handed to first carrier",
    buyerPays: "Insurance, import clearance, delivery from named destination",
    sellerPays: "Carriage to named destination, export clearance",
    whenToUse: "Seller arranges and pays freight but does not bear risk after handover.",
  },
  {
    code: "CIP",
    name: "Carriage and Insurance Paid To",
    modes: ["Any"],
    riskTransfer: "When goods handed to first carrier",
    buyerPays: "Import clearance, delivery from named destination",
    sellerPays: "Carriage and Institute Cargo Clauses (A) insurance to named destination",
    whenToUse:
      "2020 change: insurance level raised from ICC(C) to ICC(A). Use when buyer wants seller to insure but not bear risk.",
  },
  {
    code: "DAP",
    name: "Delivered at Place",
    modes: ["Any"],
    riskTransfer: "On arrival at named destination, ready for unloading",
    buyerPays: "Unloading, import clearance",
    sellerPays: "All freight, insurance, transit",
    whenToUse: "Common for B2B deliveries where buyer handles import clearance.",
  },
  {
    code: "DPU",
    name: "Delivered at Place Unloaded",
    modes: ["Any"],
    riskTransfer: "After unloading at named destination",
    buyerPays: "Import clearance",
    sellerPays: "All freight, insurance, transit, unloading",
    whenToUse: "Replaced DAT in 2020. Only Incoterm where seller must unload.",
  },
  {
    code: "DDP",
    name: "Delivered Duty Paid",
    modes: ["Any"],
    riskTransfer: "On arrival at named destination, ready for unloading",
    buyerPays: "Unloading only",
    sellerPays: "Everything including import duty and taxes",
    whenToUse: "Maximum seller responsibility. Use for door-to-door retail or e-commerce.",
  },
  {
    code: "FAS",
    name: "Free Alongside Ship",
    modes: ["Sea"],
    riskTransfer: "When goods placed alongside vessel at named port",
    buyerPays: "Loading on vessel, freight, insurance, import",
    sellerPays: "Export clearance, transport to alongside vessel",
    whenToUse: "Bulk and breakbulk only. Rare in containerised trade.",
  },
  {
    code: "FOB",
    name: "Free on Board",
    modes: ["Sea"],
    riskTransfer: "When goods loaded on vessel at named port of shipment",
    buyerPays: "Sea freight, insurance, import clearance",
    sellerPays: "Export clearance, loading on vessel",
    whenToUse: "Containerised sea freight; widely (mis)used for any sea export.",
  },
  {
    code: "CFR",
    name: "Cost and Freight",
    modes: ["Sea"],
    riskTransfer: "When goods loaded on vessel at named port of shipment",
    buyerPays: "Insurance, import clearance, destination charges",
    sellerPays: "Sea freight to named destination port, export clearance",
    whenToUse: "Seller arranges sea freight but buyer bears risk in transit.",
  },
  {
    code: "CIF",
    name: "Cost, Insurance and Freight",
    modes: ["Sea"],
    riskTransfer: "When goods loaded on vessel at named port of shipment",
    buyerPays: "Import clearance, destination charges",
    sellerPays: "Sea freight, ICC(C) insurance to named destination port",
    whenToUse:
      "Default for many commodity trades. Note minimum insurance only — buyer often tops up.",
  },
];

const FAQS = [
  {
    q: "What changed in Incoterms 2020 vs 2010?",
    a: "Three meaningful changes: DAT became DPU (delivered place unloaded). CIP insurance level was raised from minimum (ICC C) to maximum (ICC A). FCA gained an option requiring the carrier to issue an on-board bill of lading.",
  },
  {
    q: "Which Incoterm is best for first-time exporters from India?",
    a: "FOB or CIF for sea, CIP or DAP for air — they are well understood, balance the work, and keep the seller in control of paperwork at origin.",
  },
  {
    q: "Why is EXW risky for sellers?",
    a: "EXW puts export clearance on the buyer, who may not file it correctly — leaving the seller's GST / EOU benefits exposed and creating audit risk.",
  },
];

export default function IncotermsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(breadcrumbs), faqJsonLd(FAQS)]} />

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <SectionLabel num="01">INCOTERMS 2020</SectionLabel>
          <h1 className="f-display mt-6 text-[56px] leading-[0.88] tracking-tighter md:text-[88px]">
            Eleven words,
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              eleven
            </span>{" "}
            contracts.
          </h1>
          <p className="mt-8 max-w-3xl text-lg" style={{ color: "var(--ash)" }}>
            ICC&apos;s 2020 revision of the eleven Incoterms — the world&apos;s shorthand for who
            does what in international trade. Below: cost split, risk transfer, and which to use
            when.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="site-gutter">
          <div className="grid gap-px md:grid-cols-2" style={{ background: "var(--line)" }}>
            {INCOTERMS.map((t) => (
              <article
                key={t.code}
                id={t.code.toLowerCase()}
                className="p-8"
                style={{ background: "var(--ink)" }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="f-display text-3xl" style={{ color: "var(--cargo)" }}>
                    {t.code}
                  </span>
                  <Pill kind={t.modes.includes("Sea") ? "brass" : "cargo"}>
                    {t.modes.includes("Sea") ? "SEA ONLY" : "ANY MODE"}
                  </Pill>
                </div>
                <h2 className="f-display mb-4 text-2xl tracking-tight">{t.name}</h2>

                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="caption" style={{ color: "var(--brass)" }}>
                      RISK TRANSFER
                    </dt>
                    <dd className="mt-1" style={{ color: "var(--bone)" }}>
                      {t.riskTransfer}
                    </dd>
                  </div>
                  <div>
                    <dt className="caption" style={{ color: "var(--brass)" }}>
                      SELLER PAYS
                    </dt>
                    <dd className="mt-1" style={{ color: "var(--bone)" }}>
                      {t.sellerPays}
                    </dd>
                  </div>
                  <div>
                    <dt className="caption" style={{ color: "var(--brass)" }}>
                      BUYER PAYS
                    </dt>
                    <dd className="mt-1" style={{ color: "var(--bone)" }}>
                      {t.buyerPays}
                    </dd>
                  </div>
                  <div>
                    <dt className="caption" style={{ color: "var(--brass)" }}>
                      WHEN TO USE
                    </dt>
                    <dd className="mt-1" style={{ color: "var(--ash)" }}>
                      {t.whenToUse}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--ink-2)" }}>
        <div className="site-gutter">
          <SectionLabel num="02">FAQ</SectionLabel>
          <h2 className="f-display mt-4 mb-10 text-4xl">Common Incoterms questions.</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="rounded-2xl p-6"
                style={{ border: "1px solid var(--line)", background: "var(--ink)" }}
              >
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="site-gutter">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[56px]">
                  Not sure which to use?
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Our customs desk advises on Incoterm selection at quote stage — it&apos;s usually
                  worth a 10-minute conversation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/contact" className="btn-primary">
                  Speak with the desk <ArrowRight size={14} />
                </Link>
                <Link href="/services/customs" className="btn-ghost">
                  Customs service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
