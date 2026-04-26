import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronLeft } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { getServiceBySlug, SERVICES } from "@/server/db/seed/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  return service ? { title: service.name, description: service.short } : {};
}

const PROCESS = [
  {
    n: "01",
    t: "Brief & survey",
    b: "We learn the cargo, the route, and the constraint that nobody mentions in the brief.",
  },
  {
    n: "02",
    t: "Plan & quote",
    b: "Three quotes — fastest, cheapest, and the one we recommend, with the math behind each.",
  },
  {
    n: "03",
    t: "Documentation",
    b: "Customs paperwork, certificates of origin, dangerous goods declarations — all under one roof.",
  },
  {
    n: "04",
    t: "Execution",
    b: "A planner, a customs broker, and the head of operations on a single thread for the duration.",
  },
  {
    n: "05",
    t: "Delivery & report",
    b: "Photographs at every transhipment. A final report at delivery. The ledger updates.",
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  const Icon = s.icon;
  const others = SERVICES.filter((x) => x.slug !== slug);

  const metrics = [
    { l: "TYPICAL ETA", v: s.eta },
    { l: "COVERAGE", v: s.coverage },
    { l: "DESK STAFF", v: "12+" },
    { l: "AVAILABILITY", v: "24/7" },
  ];

  return (
    <>
      <section className="relative pt-32 pb-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Link
            href="/services"
            className="caption u-link mb-8 flex items-center gap-2"
          >
            <ChevronLeft size={12} /> ALL SERVICES
          </Link>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "var(--cargo-tint-10)",
                    border: "1px solid var(--cargo)",
                  }}
                >
                  <Icon size={28} style={{ color: "var(--cargo)" }} />
                </div>
                <Pill kind="cargo">{s.tag}</Pill>
              </div>
              <h1 className="f-display mb-6 text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
                {s.name}
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: "var(--bone)" }}>
                {s.desc}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="cine-frame relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="grid grid-cols-2 gap-px lg:grid-cols-4"
            style={{ background: "var(--line)" }}
          >
            {metrics.map((m) => (
              <div key={m.l} className="p-8" style={{ background: "var(--ink-2)" }}>
                <div className="caption" style={{ color: "var(--brass)" }}>
                  {m.l}
                </div>
                <div className="f-display mt-2 text-3xl">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel num="02">CAPABILITIES</SectionLabel>
              <h2 className="f-display mt-4 mb-8 text-5xl leading-tight">
                What this desk handles.
              </h2>
              <ul className="space-y-3">
                {s.features.map((f, i) => (
                  <li
                    key={f}
                    className="lift flex items-start gap-4 rounded-xl p-4"
                    style={{
                      border: "1px solid var(--line)",
                      background: "var(--surface-tint-2)",
                    }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "var(--cargo-tint-10)" }}
                    >
                      <span className="f-mono text-xs" style={{ color: "var(--cargo)" }}>
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="pt-1">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel num="03">PROCESS</SectionLabel>
              <h2 className="f-display mt-4 mb-8 text-5xl leading-tight">
                From brief to delivery.
              </h2>
              <div className="space-y-px" style={{ background: "var(--line)" }}>
                {PROCESS.map((p) => (
                  <div
                    key={p.n}
                    className="flex gap-6 p-6"
                    style={{ background: "var(--ink)" }}
                  >
                    <div className="f-mono text-xs" style={{ color: "var(--cargo)" }}>
                      {p.n}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 font-semibold">{p.t}</div>
                      <div className="text-sm" style={{ color: "var(--ash)" }}>
                        {p.b}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[64px]">
                  Ready to move?
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Speak to the {s.name} desk. Average response time: 27 minutes.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/quote" className="btn-primary">
                  Get a quote <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Speak with desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <SectionLabel num="04">RELATED</SectionLabel>
          <h3 className="f-display mt-4 mb-8 text-4xl">Other disciplines</h3>
          <div
            className="grid gap-px md:grid-cols-3 lg:grid-cols-5"
            style={{ background: "var(--line)" }}
          >
            {others.map((o) => {
              const OIcon = o.icon;
              return (
                <Link
                  key={o.id}
                  href={`/services/${o.slug}`}
                  className="group lift block p-6 text-left"
                  style={{ background: "var(--ink)" }}
                  data-cursor="OPEN"
                >
                  <OIcon size={20} style={{ color: "var(--cargo)" }} className="mb-4" />
                  <div className="mb-1 font-semibold">{o.name}</div>
                  <div className="text-xs" style={{ color: "var(--ash)" }}>
                    {o.short}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-4 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: "var(--cargo)" }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
