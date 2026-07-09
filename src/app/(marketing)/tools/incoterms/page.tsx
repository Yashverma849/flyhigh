import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IncotermsSlider } from "@/components/marketing/incoterms-slider";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBackground } from "@/components/marketing/cta-background";
import { pageMetadata } from "@/lib/seo";

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

export default function IncotermsPage() {
  return (
    <>
      <section className="hero-section relative min-h-[60svh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/incoterms-hero.png"
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
            <h1 className="f-display text-[64px] leading-[0.88] tracking-tighter text-white md:text-[110px]">
              Eleven words,
              <br />
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                eleven
              </span>{" "}
              contracts.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-white/90">
              ICC&apos;s 2020 revision of the eleven Incoterms — the world&apos;s shorthand for who
              does what in international trade. Below: cost split, risk transfer, and which to use
              when.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-visible pt-8 pb-8">
        <IncotermsSlider items={INCOTERMS} />
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
        <div className="site-gutter relative z-10 text-center">
          <h2 className="f-display text-[64px] leading-[0.9] tracking-tighter text-white md:text-[100px]">
            Not sure which to use?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300">
            Our customs desk advises on Incoterm selection at quote stage — it&apos;s usually worth
            a 10-minute conversation.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary px-8 py-4 text-base">
              Speak with the desk <ArrowRight size={16} />
            </Link>
            <Link
              href="/services/customs"
              className="btn-ghost px-8 py-4 text-base"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
            >
              Customs service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
