import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Flyhigh Logistics Pvt. Ltd. collects, uses, and protects personal data — under India's DPDP Act 2023 and aligned to GDPR for EU-origin data.",
  path: "/legal/privacy",
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Legal", href: "/legal/privacy" },
  { name: "Privacy", href: "/legal/privacy" },
];

const SECTIONS = [
  {
    h: "Who we are",
    body: [
      "Flyhigh Logistics Pvt. Ltd. (CIN U63090MH2017PTC290114) — registered at Flyhigh House, 14 Marine Lines, Mumbai 400020, India. References to 'Flyhigh', 'we', 'us', or 'our' mean this company.",
    ],
  },
  {
    h: "What data we collect",
    body: [
      "Identity & contact: name, company, email, phone, postal address, job title.",
      "Trade data: shipper / consignee details, commodity descriptions, HS codes, weights, values, Incoterms.",
      "Financial: bank account details for invoicing and refunds (held under encryption).",
      "Technical: IP address, browser type, device identifiers, pages viewed, session duration.",
      "Communications: emails, calls, and chat transcripts in connection with shipments.",
    ],
  },
  {
    h: "Why we collect it",
    body: [
      "To provide freight forwarding, customs clearance, and warehousing services you have requested.",
      "To meet legal and regulatory obligations — customs filings, sanctions screening, anti-money-laundering checks.",
      "To improve our services, train staff, and audit operational quality.",
      "To send transactional updates (shipment status) and, where you have opted in, periodic newsletters.",
    ],
  },
  {
    h: "How long we keep it",
    body: [
      "Customs and tax records: minimum eight years per Indian customs law.",
      "Financial records: seven years per Indian Companies Act.",
      "Marketing data: until you withdraw consent.",
      "Operational logs and emails: thirty-six months from closure of the relevant shipment.",
    ],
  },
  {
    h: "Who we share it with",
    body: [
      "Carriers, customs authorities, port authorities, and overseas agents necessary to perform the shipment.",
      "Banks and payment processors for invoicing and settlement.",
      "Auditors, regulators, and law enforcement where legally required.",
      "Sub-processors (cloud infrastructure, communications) under written data-processing agreements.",
      "We do not sell personal data. We do not share data for advertising.",
    ],
  },
  {
    h: "Your rights",
    body: [
      "Under India's DPDP Act 2023 you have the right to access, correct, and erase your personal data, and to nominate someone to act on your behalf.",
      "EU residents — under GDPR you additionally have the right to data portability and to object to processing.",
      "California residents — under CCPA you have the right to know what we collect and to deletion (subject to legal hold).",
    ],
  },
  {
    h: "International transfers",
    body: [
      "Trade data necessarily moves across borders — that is the nature of international shipping. Where we transfer data outside India, we use the standard data-protection mechanisms recognised under the receiving jurisdiction (e.g., EU SCCs for EU-origin data).",
    ],
  },
  {
    h: "Security",
    body: [
      "Encryption in transit (TLS 1.3) and at rest (AES-256). Role-based access controls. Annual third-party penetration testing. Mandatory data-handling training for all staff.",
      "Despite these controls, no system is impenetrable. We notify affected individuals and the Data Protection Board within 72 hours of becoming aware of any personal-data breach involving sensitive data.",
    ],
  },
  {
    h: "Contact our DPO",
    body: [
      "Data Protection Officer · privacy@flyhigh.in · Flyhigh House, 14 Marine Lines, Mumbai 400020, India.",
      "We acknowledge requests within seven calendar days and respond substantively within thirty.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <SectionLabel num="—">PRIVACY</SectionLabel>
          <h1 className="f-display mt-6 text-[48px] leading-[0.9] tracking-tight md:text-[72px]">
            Privacy policy
          </h1>
          <p className="mt-6 text-base" style={{ color: "var(--ash)" }}>
            Last updated: 15 April 2026
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          {SECTIONS.map((s, i) => (
            <div key={s.h} className="mb-12">
              <h2 className="f-display mb-4 text-2xl tracking-tight md:text-3xl">
                {(i + 1).toString().padStart(2, "0")}. {s.h}
              </h2>
              {s.body.map((p, j) => (
                <p
                  key={j}
                  className="mb-3 text-base leading-relaxed"
                  style={{ color: "var(--bone)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
