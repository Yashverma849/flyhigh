import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { INDUSTRIES } from "@/server/db/seed/industries";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries we serve",
  description:
    "Pharma to defence, EVs to luxury wine — eight industry desks built around the cargo our clients actually move. Each with its own playbook, paperwork, and SLA.",
  path: "/industries",
  keywords: [
    "freight forwarder by industry",
    "pharma logistics India",
    "EV battery shipping",
    "automotive freight India",
    "perishables cold chain",
    "DG hazmat shipping",
    "defence logistics",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries" },
];

export default function IndustriesIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel num="01">INDUSTRIES</SectionLabel>
              <h1 className="f-display mt-6 text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
                Eight desks,
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  one
                </span>{" "}
                house.
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-32">
              <p className="text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                We don&apos;t pretend that pharma cool-chain and lithium-battery air corridors are
                the same craft. Eight industry desks, each led by someone who reads the trade
                press in their sector, not just ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="grid gap-px md:grid-cols-2 lg:grid-cols-4"
            style={{ background: "var(--line)" }}
          >
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.slug}`}
                  className="group lift block p-8 text-left"
                  style={{ background: "var(--ink)" }}
                  data-cursor="OPEN"
                >
                  <Icon size={28} style={{ color: "var(--cargo)" }} className="mb-6" />
                  <Pill kind="brass">{ind.tag}</Pill>
                  <div className="f-display mt-4 mb-2 text-2xl tracking-tight">{ind.name}</div>
                  <div className="text-sm" style={{ color: "var(--ash)" }}>
                    {ind.short}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-6 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: "var(--cargo)" }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {INDUSTRIES.map((ind, i) => {
        const Icon = ind.icon;
        return (
          <section
            key={ind.id}
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
                      src={ind.image}
                      alt={ind.name}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute top-6 left-6 z-10">
                      <Pill kind="cargo">{ind.tag}</Pill>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="caption mb-3 text-[10px]" style={{ color: "var(--cargo)" }}>
                    0{i + 1} / {INDUSTRIES.length.toString().padStart(2, "0")}
                  </div>
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className="rounded-xl p-3"
                      style={{
                        background: "var(--cargo-tint-10)",
                        border: "1px solid var(--cargo)",
                      }}
                    >
                      <Icon size={22} style={{ color: "var(--cargo)" }} />
                    </div>
                    <h2 className="f-display text-[36px] leading-[0.95] md:text-[52px]">
                      {ind.name}
                    </h2>
                  </div>
                  <p className="mb-8 text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                    {ind.desc}
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="btn-ghost"
                      data-cursor="OPEN"
                    >
                      Industry detail <ArrowRight size={14} />
                    </Link>
                    <Link href="/quote" className="btn-primary" data-cursor="QUOTE">
                      Get quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
