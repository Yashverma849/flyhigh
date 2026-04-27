import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of service",
  description:
    "Standard Trading Conditions of Flyhigh Logistics Pvt. Ltd. — the legal framework for our freight forwarding services, aligned with the FFFAI standard 2018.",
  path: "/legal/terms",
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Legal", href: "/legal/terms" },
  { name: "Terms", href: "/legal/terms" },
];

const SECTIONS = [
  {
    h: "Scope",
    body: [
      "These Standard Trading Conditions govern every quotation, contract, and service performed by Flyhigh Logistics Pvt. Ltd. (referred to as 'the Company') unless varied in writing by an authorised signatory of the Company.",
      "By instructing the Company — verbally, in writing, or by conduct — the Customer accepts these Conditions in their entirety.",
    ],
  },
  {
    h: "Capacity",
    body: [
      "The Company acts as a freight forwarder, customs broker, warehouse keeper, or other agent — never as a common carrier. Where the Company performs services as an agent, it does so on behalf of carriers, customs authorities, and other principals.",
      "Bills of Lading and Air Waybills are issued by carriers; the Company's responsibility is to procure them on the Customer's behalf, not to underwrite carriage.",
    ],
  },
  {
    h: "Quotations & rates",
    body: [
      "Quotations are valid for fourteen calendar days unless otherwise stated. They are based on the information supplied by the Customer; any inaccuracy or omission renders the quotation re-priceable without notice.",
      "All published rates exclude duties, taxes, demurrage, detention, port storage, and any third-party charges incurred at the Customer's instance or due to factors outside the Company's control.",
    ],
  },
  {
    h: "Customer obligations",
    body: [
      "The Customer warrants that all information supplied — including commodity descriptions, classifications, weights, values, and addresses — is accurate, complete, and lawful.",
      "The Customer is responsible for ensuring that goods are properly packed, marked, and accompanied by all required documentation under the laws of the origin, transit, and destination jurisdictions.",
      "The Customer indemnifies the Company against all claims, losses, fines, and penalties arising from misdescription, inadequate packing, or non-compliance.",
    ],
  },
  {
    h: "Liability",
    body: [
      "Subject to applicable convention liability (Hague-Visby for sea, Montreal for air, CMR for road), the Company's liability is limited to two Special Drawing Rights per kilogram of gross weight of the goods lost or damaged.",
      "In no event shall the Company be liable for indirect, consequential, or special damages — including loss of profit, market, or goodwill.",
      "The Company is not liable for delay unless delay is the proximate result of the Company's gross negligence or wilful misconduct.",
    ],
  },
  {
    h: "Insurance",
    body: [
      "Goods are not insured by the Company unless the Customer instructs the Company in writing to procure insurance, specifying the cover required.",
      "The Company arranges insurance as the Customer's agent. The insurance contract is between the Customer and the underwriter; claims are made directly under the policy.",
    ],
  },
  {
    h: "Lien & sale",
    body: [
      "The Company has a particular and general lien on all goods, documents, and funds in its possession for sums due from the Customer, whether in respect of the relevant shipment or otherwise.",
      "Goods may be sold without notice to satisfy charges if outstanding for more than ninety days; the Company will account for the proceeds to the Customer, less expenses.",
    ],
  },
  {
    h: "Force majeure",
    body: [
      "Performance is suspended for the period of any event beyond the Company's reasonable control — including but not limited to war, embargo, strike, pandemic, port closure, severe weather, regulatory action, or carrier failure.",
      "Where suspension exceeds sixty days, either party may terminate the affected engagement on notice without further liability.",
    ],
  },
  {
    h: "Time bar",
    body: [
      "Any claim against the Company must be notified in writing within fourteen days of the event giving rise to the claim, and proceedings must be commenced within nine months — failing which the claim is conclusively waived.",
    ],
  },
  {
    h: "Jurisdiction",
    body: [
      "These Conditions are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts at Mumbai.",
      "The Company offers commercial mediation in good faith before formal proceedings.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <SectionLabel num="—">TERMS</SectionLabel>
          <h1 className="f-display mt-6 text-[48px] leading-[0.9] tracking-tight md:text-[72px]">
            Standard trading conditions
          </h1>
          <p className="mt-6 text-base" style={{ color: "var(--ash)" }}>
            Aligned with the FFFAI 2018 Standard Trading Conditions. Last updated: 15 April 2026.
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
