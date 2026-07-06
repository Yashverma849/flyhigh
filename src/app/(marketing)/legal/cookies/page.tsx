import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/section-label";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookie policy",
  description:
    "What cookies and similar technologies Flyhigh's website uses, why, and how to control them.",
  path: "/legal/cookies",
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Legal", href: "/legal/cookies" },
  { name: "Cookies", href: "/legal/cookies" },
];

const COOKIES = [
  {
    name: "Strictly necessary",
    purpose: "Session continuity, theme preference, CSRF protection.",
    duration: "Session to 12 months",
    optional: false,
  },
  {
    name: "Functional",
    purpose: "Remembers form state during multi-step quote requests.",
    duration: "Up to 30 days",
    optional: true,
  },
  {
    name: "Analytics (anonymous)",
    purpose: "Aggregated, de-identified page-view counts. No cross-site tracking.",
    duration: "Up to 12 months",
    optional: true,
  },
];

export default function CookiesPage() {
  return (
    <>

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} />
          <SectionLabel num="—">COOKIES</SectionLabel>
          <h1 className="f-display mt-6 text-[48px] leading-[0.9] tracking-tight md:text-[72px]">
            Cookie policy
          </h1>
          <p className="mt-6 text-base" style={{ color: "var(--ash)" }}>
            Last updated: 15 April 2026
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="site-gutter">
          <div className="mb-12">
            <h2 className="f-display mb-4 text-2xl tracking-tight md:text-3xl">01. What we use</h2>
            <p className="mb-3 text-base leading-relaxed" style={{ color: "var(--bone)" }}>
              We use cookies and similar technologies (local storage, session storage) for three
              purposes only — keeping the site functional, remembering your preferences, and
              measuring aggregate traffic. We do not run advertising cookies, third-party
              fingerprinting, or cross-site trackers.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="f-display mb-6 text-2xl tracking-tight md:text-3xl">02. Categories</h2>
            <div
              className="rounded-2xl border"
              style={{ borderColor: "var(--line)", background: "var(--ink)" }}
            >
              {COOKIES.map((c, i) => (
                <div
                  key={c.name}
                  className="grid gap-2 border-b p-6 last:border-b-0 md:grid-cols-12"
                  style={{
                    borderColor: i === COOKIES.length - 1 ? "transparent" : "var(--line-2)",
                  }}
                >
                  <div className="md:col-span-4">
                    <div className="font-semibold">{c.name}</div>
                    <div
                      className="caption mt-1"
                      style={{ color: c.optional ? "var(--brass)" : "var(--cargo)" }}
                    >
                      {c.optional ? "OPTIONAL" : "REQUIRED"}
                    </div>
                  </div>
                  <div className="text-sm md:col-span-6" style={{ color: "var(--bone)" }}>
                    {c.purpose}
                  </div>
                  <div className="caption md:col-span-2" style={{ color: "var(--ash)" }}>
                    {c.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="f-display mb-4 text-2xl tracking-tight md:text-3xl">
              03. How to control
            </h2>
            <p className="mb-3 text-base leading-relaxed" style={{ color: "var(--bone)" }}>
              Most browsers let you block or delete cookies via their settings menu. Disabling
              strictly-necessary cookies will affect the site&apos;s functionality (form state,
              theme) but the site will still load.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--bone)" }}>
              Detailed guidance for the major browsers: Chrome, Safari, Firefox, Edge — each
              publishes a cookie-management page in their support documentation.
            </p>
          </div>

          <div>
            <h2 className="f-display mb-4 text-2xl tracking-tight md:text-3xl">04. Contact</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--bone)" }}>
              Questions: flyhighfreightservices@gmail.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
