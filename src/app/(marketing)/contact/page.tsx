import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContactForm } from "@/components/marketing/contact-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact our concierge",
  description:
    "Speak with a Flyhigh planner — Mumbai HQ, 24/7 operations, average 27-minute response. Phone, email, or in-person.",
  path: "/contact",
  keywords: ["contact freight forwarder", "Mumbai logistics company contact", "Flyhigh contact"],
});

export default function ContactPage() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]}
          className="mb-8"
        />
        <SectionLabel num="00">CONCIERGE</SectionLabel>
        <h1 className="f-display mt-4 mb-12 text-[64px] leading-[0.95] tracking-tight md:text-[96px]">
          Speak with
          <br />
          <span className="f-display-it" style={{ color: "var(--cargo)" }}>
            a planner.
          </span>
        </h1>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="caption mb-3" style={{ color: "var(--brass)" }}>
              MUMBAI HQ
            </div>
            <div className="space-y-3 text-sm" style={{ color: "var(--ash)" }}>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                Flyhigh House, 14 Marine Lines, Mumbai 400020, India
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> +91 22 4000 5500 ·{" "}
                <span className="f-mono">24/7 ops</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} /> concierge@flyhigh.in
              </p>
            </div>

            <div className="mt-12">
              <div className="caption mb-3" style={{ color: "var(--brass)" }}>
                DESKS
              </div>
              <ul className="space-y-2 text-sm" style={{ color: "var(--bone)" }}>
                <li>Pharma cool-chain · pharma@flyhigh.in</li>
                <li>Project cargo · projects@flyhigh.in</li>
                <li>Carnet · carnet@flyhigh.in</li>
                <li>Press · press@flyhigh.in</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
