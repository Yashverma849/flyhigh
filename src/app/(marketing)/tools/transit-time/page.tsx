import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TransitTimeTable } from "@/components/marketing/transit-time-table";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Transit-time estimator",
  description:
    "Realistic transit days for ocean and air corridors out of Indian gateways. Based on the lanes Flyhigh actually books, not theoretical schedules.",
  path: "/tools/transit-time",
  keywords: [
    "transit time India to Europe",
    "Mumbai to Rotterdam transit",
    "air freight transit time India",
    "ocean freight transit calculator",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Transit-time estimator", href: "/tools/transit-time" },
];

export default function TransitTimePage() {
  return (
    <>

      <section className="pt-32 pb-4">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="f-display mt-6 text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
            transit{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              time
            </span>
          </h1>
        </div>
      </section>

      <TransitTimeTable />

      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 z-0">
          <img
            src="/cta%201.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--ink) 0%, rgba(0,0,0,0.55) 50%, var(--ink) 100%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight text-white md:text-[56px]">
                Need a precise quote?
              </h2>
              <p className="text-lg text-white/80">
                Indicative is the start. Send the brief — origin, destination, mode, weight,
                volume — and we&apos;ll come back with three real prices in 27 minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href="/quote" className="btn-primary">
                Get a quote <ArrowRight size={14} />
              </Link>
              <Link
                href="/routes"
                className="btn-ghost"
                style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
              >
                All routes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
