import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContactForm } from "@/components/marketing/contact-form";
import { SITE } from "@/lib/constants";
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
      <div className="site-gutter">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]}
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left — contact form */}
          <div
            className="rounded-3xl p-8 md:p-10 lg:p-12"
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              boxShadow: "0 24px 64px rgba(28, 24, 20, 0.06)",
            }}
          >
            <h1
              className="f-display mt-4 mb-8 text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-tight"
              style={{ color: "var(--bone)" }}
            >
              Let&apos;s start a{" "}
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                conversation.
              </span>
            </h1>
            <ContactForm />
          </div>

          {/* Right — video panel */}
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl lg:min-h-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/import_export_vid.mp4" type="video/mp4" />
            </video>

            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  "linear-gradient(to top, rgba(28, 24, 20, 0.92) 0%, rgba(28, 24, 20, 0.35) 45%, rgba(28, 24, 20, 0.15) 100%)",
              }}
            />

            <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end p-8 text-white md:p-10">
              <p className="caption mb-3" style={{ color: "var(--brass)" }}>
                {SITE.name.toUpperCase()}
              </p>
              <h2 className="f-display mb-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] tracking-tight">
                Trusted freight guidance.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-white/85">
                Mumbai HQ, 24/7 operations. Average 27-minute response from a planner who knows your
                lane.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
