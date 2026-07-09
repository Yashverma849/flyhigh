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
      <JsonLd data={faqJsonLd(FAQS.map((f) => ({ q: f.q, a: f.a })))} />

      <section className="hero-section relative min-h-[60svh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/faq-hero.png"
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
              Asked
              <br />
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                candidly
              </span>
              .
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/90">
              The questions we hear weekly — answered without sales spin. If yours isn&apos;t here,
              send it: we&apos;ll add it (and reply to you).
            </p>
          </div>
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
