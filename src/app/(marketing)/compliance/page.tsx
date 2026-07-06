import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Award, FileCheck2, Globe } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Compliance & certifications",
  description:
    "Our regulatory and industry credentials — IATA, FIATA, FICCI, ISO 9001, AEO. The receipts behind 'we'll handle the paperwork'.",
  path: "/compliance",
  keywords: [
    "IATA agent",
    "FIATA member",
    "AEO India",
    "ISO 9001 freight",
    "compliance freight forwarder",
    "C-TPAT freight",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Compliance", href: "/compliance" },
];

const CREDENTIALS = [
  {
    icon: Award,
    code: "IATA",
    name: "International Air Transport Association",
    detail:
      "Accredited cargo agent. Authorised to issue Air Waybills directly on every IATA carrier.",
    since: "2018",
  },
  {
    icon: Globe,
    code: "FIATA",
    name: "International Federation of Freight Forwarders",
    detail: "Member in good standing. Represents the global freight-forwarding community.",
    since: "2019",
  },
  {
    icon: FileCheck2,
    code: "FICCI",
    name: "Federation of Indian Chambers of Commerce — ATA Carnet panel",
    detail: "Authorised carnet issuer and acceptor for India.",
    since: "2020",
  },
  {
    icon: Shield,
    code: "AEO-T2",
    name: "Authorised Economic Operator (Tier 2) — Indian Customs",
    detail: "Risk-tier-2 status; lower physical examination rates and prioritised clearance.",
    since: "2022",
  },
  {
    icon: Award,
    code: "ISO 9001:2015",
    name: "Quality Management Systems",
    detail: "Annual third-party audit by Bureau Veritas. Certificate available on request.",
    since: "2019",
  },
  {
    icon: Shield,
    code: "C-TPAT-aware",
    name: "Customs-Trade Partnership Against Terrorism (US)",
    detail:
      "Operating procedures aligned with C-TPAT minimum security criteria. We partner with C-TPAT-certified brokers in the US.",
    since: "2023",
  },
  {
    icon: FileCheck2,
    code: "WCA",
    name: "World Cargo Alliance",
    detail: "14,000-member global agent network. Reciprocal credit and compliance vetting.",
    since: "2026",
  },
  {
    icon: Award,
    code: "GDP-validated",
    name: "EU GDP — Good Distribution Practice",
    detail: "Twenty-three pharma lanes validated end-to-end. Validation pack available on request.",
    since: "2021",
  },
];

const POLICIES = [
  {
    title: "Anti-bribery & corruption",
    body: "Zero-tolerance policy aligned with the UK Bribery Act and Indian Prevention of Corruption Act. Annual mandatory training for all customer-facing staff.",
  },
  {
    title: "Data protection (DPDP / GDPR)",
    body: "We hold customer trade data in India under DPDP-compliant controls. EU-origin shipper data is processed under GDPR-aligned data-processing agreements.",
  },
  {
    title: "Sanctions screening",
    body: "Every shipment is screened against EU, UN, US OFAC, and UK consolidated lists at origin and again at re-routing. We refuse cargo where screening is unclear.",
  },
  {
    title: "Modern slavery & supply-chain ethics",
    body: "Annual audit of contracted hauliers and warehouse partners. Incident reporting via an independent third-party hotline.",
  },
  {
    title: "Environmental policy",
    body: "Carbon-emissions reporting per shipment, available on request. Sea preferred over air where transit allows. Active member of the Smart Freight Centre's GLEC framework programme.",
  },
];

export default function CompliancePage() {
  return (
    <>

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} />
          <SectionLabel num="01">COMPLIANCE</SectionLabel>
          <h1 className="f-display mt-6 max-w-4xl text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
            The
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              receipts
            </span>
            .
          </h1>
          <p className="mt-8 max-w-3xl text-lg" style={{ color: "var(--ash)" }}>
            Eight credentials, five policies, and a posture of transparency. We&apos;ll send you the
            certificates on request — most freight forwarders won&apos;t.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="site-gutter">
          <h2 className="f-display mb-8 text-3xl tracking-tight md:text-4xl">Credentials</h2>
          <div className="grid gap-px md:grid-cols-2" style={{ background: "var(--line)" }}>
            {CREDENTIALS.map((c) => {
              const Icon = c.icon;
              return (
                <article key={c.code} className="p-8" style={{ background: "var(--ink)" }}>
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="rounded-xl p-3"
                      style={{
                        background: "var(--cargo-tint-10)",
                        border: "1px solid var(--cargo)",
                      }}
                    >
                      <Icon size={20} style={{ color: "var(--cargo)" }} />
                    </div>
                    <Pill kind="brass">SINCE {c.since}</Pill>
                  </div>
                  <div
                    className="f-display mb-1 text-3xl tracking-tight"
                    style={{ color: "var(--cargo)" }}
                  >
                    {c.code}
                  </div>
                  <div className="font-semibold">{c.name}</div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                    {c.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--ink-2)" }}>
        <div className="site-gutter">
          <h2 className="f-display mb-8 text-3xl tracking-tight md:text-4xl">Policies</h2>
          <div className="space-y-4">
            {POLICIES.map((p) => (
              <details
                key={p.title}
                className="rounded-2xl p-6"
                style={{ border: "1px solid var(--line)", background: "var(--ink-2)" }}
              >
                <summary className="cursor-pointer font-semibold">{p.title}</summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                  {p.body}
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
                  Need certificate copies?
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  We share IATA, FIATA, ISO, and AEO certificates within 24 hours of request — no
                  vendor onboarding form required.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a href="mailto:compliance@flyhigh.in" className="btn-primary">
                  Request certificates <ArrowRight size={14} />
                </a>
                <Link href="/about" className="btn-ghost">
                  About the house
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
