import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SERVICES } from "@/server/db/seed/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Freight services",
  description:
    "Six freight disciplines under one Mumbai roof — sea, air, customs, warehousing, road, and ATA Carnet. Each desk led by a quarter-century of craft.",
  path: "/services",
  keywords: [
    "freight forwarding services",
    "ocean freight India",
    "air freight India",
    "customs clearance India",
    "warehousing Mumbai",
    "ATA Carnet India",
    "FICCI Carnet panel",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
            ]}
            className="mb-8"
          />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel num="01">DISCIPLINES</SectionLabel>
              <h1 className="f-display mt-6 text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
                Six disciplines
                <br />
                under{" "}
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  one roof.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-32">
              <p className="text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                We resisted the urge to specialize in only the easy services. Instead we built six
                separate desks — each led by someone with a quarter-century in their craft — and we
                let them quietly become the best in the country at what they do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section
          key={s.id}
          className="py-24"
          style={{ background: i % 2 === 0 ? "transparent" : "var(--ink-2)" }}
        >
          <div className="mx-auto max-w-[1440px] px-6 md:px-8">
            <div
              className={`grid items-center gap-12 lg:grid-cols-12 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-7">
                <div
                  className="cine-frame lift relative aspect-[16/10] overflow-hidden rounded-2xl"
                  style={{ border: "1px solid var(--line)" }}
                >
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <Pill kind="cargo">{s.tag}</Pill>
                  </div>
                  <div className="absolute right-6 bottom-6 z-10">
                    <div
                      className="f-mono rounded-full px-4 py-2 text-xs"
                      style={{ background: "var(--ink)", border: "1px solid var(--line)" }}
                    >
                      <span style={{ color: "var(--brass)" }}>{s.eta}</span> ·{" "}
                      <span style={{ color: "var(--ash)" }}>{s.coverage}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="caption mb-3 text-[10px]" style={{ color: "var(--cargo)" }}>
                  0{i + 1} / {SERVICES.length.toString().padStart(2, "0")}
                </div>
                <h2 className="f-display mb-6 text-[48px] leading-[0.95] tracking-tight md:text-[64px]">
                  {s.name}
                </h2>
                <p className="mb-8 text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                  {s.desc}
                </p>
                <ul className="mb-10 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full"
                        style={{
                          background: "var(--cargo-tint-10)",
                          border: "1px solid var(--cargo)",
                        }}
                      >
                        <Check size={11} style={{ color: "var(--cargo)" }} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Link href={`/services/${s.slug}`} className="btn-ghost" data-cursor="DETAILS">
                    Service details <ArrowRight size={14} />
                  </Link>
                  <Link href="/quote" className="btn-primary" data-cursor="QUOTE">
                    Get quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
