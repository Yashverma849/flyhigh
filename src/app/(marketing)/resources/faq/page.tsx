import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/marketing/faq-list";
import { JsonLd } from "@/components/shared/json-ld";
import { FAQS } from "@/server/db/seed/faqs";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Frequently asked questions",
  description:
    "Twenty-one questions our desk hears every week — quoting, customs, Incoterms, cool chain, ATA Carnet, pricing — answered candidly.",
  path: "/resources/faq",
  keywords: [
    "freight forwarder FAQ",
    "shipping FAQ India",
    "customs broker FAQ",
    "cool chain FAQ",
    "logistics questions",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
  { name: "FAQ", href: "/resources/faq" },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd data={faqJsonLd(FAQS.map((f) => ({ q: f.q, a: f.a })))} />

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="f-display mt-6 text-[56px] leading-[0.88] tracking-tighter md:text-[88px]">
            Asked
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              candidly
            </span>
            .
          </h1>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ash)" }}>
            The questions we hear weekly — answered without sales spin. If yours isn&apos;t here,
            send it: we&apos;ll add it (and reply to you).
          </p>
        </div>
      </section>

      <section className="overflow-x-hidden py-12">
        <div className="site-gutter">
          <FaqList />
        </div>
      </section>
    </>
  );
}
