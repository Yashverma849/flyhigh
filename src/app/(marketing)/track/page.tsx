import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TrackForm } from "@/components/marketing/track-form";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Track shipment",
  description:
    "Track any Flyhigh shipment in real time — sea, air, road. Enter your FH- ID for live status, ETA, and cool-chain temperature where applicable.",
  path: "/track",
  keywords: ["track shipment", "freight tracking India", "shipment status Mumbai"],
});

export default function TrackPage() {
  return (
    <section className="py-32">
      <div className="site-gutter">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Track", href: "/track" },
          ]}
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left — tracking form */}
          <div
            className="rounded-3xl p-8 md:p-10 lg:p-12"
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              boxShadow: "0 24px 64px rgba(28, 24, 20, 0.06)",
            }}
          >
            <h1
              className="f-display mt-4 mb-6 text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-tight"
              style={{ color: "var(--bone)" }}
            >
              Where is
              <br />
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                my cargo?
              </span>
            </h1>
            <p className="mb-10 text-lg" style={{ color: "var(--ash)" }}>
              Enter your Flyhigh tracking ID. They look like{" "}
              <span className="f-mono">FH-2403-001892</span>.
            </p>
            <TrackForm />
            <p className="caption mt-10" style={{ color: "var(--ash)" }}>
              Tracking IDs sit on every booking confirmation. Lost yours? Email
              flyhighfreightservices@gmail.com — we&apos;ll find it.
            </p>
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
              <source src="/truck%20video.mp4" type="video/mp4" />
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
                Live shipment status.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-white/85">
                Sea, air, road — ETA and cool-chain temperature where applicable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
