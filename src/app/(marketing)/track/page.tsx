import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/section-label";
import { TrackForm } from "@/components/marketing/track-form";

export const metadata: Metadata = { title: "Track shipment" };

export default function TrackPage() {
  return (
    <section className="topo py-32">
      <div className="mx-auto max-w-[720px] px-6 md:px-8">
        <SectionLabel num="00">TRACK</SectionLabel>
        <h1 className="f-display mt-4 mb-6 text-[56px] leading-[0.95] tracking-tight md:text-[80px]">
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
          concierge@flyhigh.in — we&apos;ll find it.
        </p>
      </div>
    </section>
  );
}
