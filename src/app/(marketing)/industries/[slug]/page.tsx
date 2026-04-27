import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { RelatedLinks } from "@/components/shared/related-links";
import { getIndustryBySlug, INDUSTRIES } from "@/server/db/seed/industries";
import { SERVICES } from "@/server/db/seed/services";
import { CASE_STUDIES } from "@/server/db/seed/case-studies";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) return {};
  return pageMetadata({
    title: `${ind.name} freight & logistics`,
    description: ind.desc,
    path: `/industries/${ind.slug}`,
    image: ind.image,
    keywords: [ind.name.toLowerCase(), "freight forwarder", "India", "logistics", ind.tag.toLowerCase()],
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) notFound();

  const Icon = ind.icon;
  const services = SERVICES.filter((s) => ind.relatedServices.includes(s.id));
  const cases = CASE_STUDIES.filter((c) => c.industrySlug === ind.slug);
  const others = INDUSTRIES.filter((x) => x.slug !== ind.slug).slice(0, 3);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
    { name: ind.name, href: `/industries/${ind.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `${ind.name} freight & logistics`,
          description: ind.desc,
          slug: `/industries/${ind.slug}`,
          category: ind.tag,
        })}
      />

      <section className="relative pt-32 pb-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
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
                <Pill kind="cargo">{ind.tag}</Pill>
              </div>
              <h1 className="f-display mb-6 text-[56px] leading-[0.88] tracking-tighter md:text-[96px]">
                {ind.name}
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: "var(--bone)" }}>
                {ind.desc}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="cine-frame relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
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
            {ind.stats.map((m) => (
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
              <SectionLabel num="02">CHALLENGES</SectionLabel>
              <h2 className="f-display mt-4 mb-8 text-5xl leading-tight">
                What this sector pays us to solve.
              </h2>
              <ul className="space-y-3">
                {ind.challenges.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-start gap-4 rounded-xl p-4"
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
                    <span className="pt-1 text-sm leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel num="03">CAPABILITIES</SectionLabel>
              <h2 className="f-display mt-4 mb-8 text-5xl leading-tight">How we deliver.</h2>
              <ul className="space-y-2">
                {ind.capabilities.map((f) => (
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
            </div>
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className="py-20" style={{ background: "var(--ink-2)" }}>
          <div className="mx-auto max-w-[1440px] px-6 md:px-8">
            <SectionLabel num="04">SERVICES INVOLVED</SectionLabel>
            <h2 className="f-display mt-4 mb-10 text-4xl">
              How {ind.name.toLowerCase()} ships through us.
            </h2>
            <div
              className="grid gap-px md:grid-cols-2 lg:grid-cols-4"
              style={{ background: "var(--line)" }}
            >
              {services.map((s) => {
                const SIcon = s.icon;
                return (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="group lift block p-8 text-left"
                    style={{ background: "var(--ink)" }}
                  >
                    <SIcon size={22} style={{ color: "var(--cargo)" }} className="mb-4" />
                    <div className="font-semibold">{s.name}</div>
                    <div className="mt-1 text-xs" style={{ color: "var(--ash)" }}>
                      {s.short}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {cases.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-[1440px] px-6 md:px-8">
            <SectionLabel num="05">CASE STUDIES</SectionLabel>
            <h2 className="f-display mt-4 mb-10 text-4xl">From this desk.</h2>
            <div
              className="grid gap-px md:grid-cols-2"
              style={{ background: "var(--line)" }}
            >
              {cases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="group block p-8"
                  style={{ background: "var(--ink)" }}
                >
                  <div className="caption mb-3 text-[10px]" style={{ color: "var(--cargo)" }}>
                    CASE STUDY
                  </div>
                  <div className="f-display text-2xl tracking-tight transition-colors group-hover:text-[var(--cargo)]">
                    {c.title}
                  </div>
                  <div className="mt-3 text-sm" style={{ color: "var(--ash)" }}>
                    {c.excerpt}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[64px]">
                  Speak to the {ind.tag.toLowerCase()} desk.
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Average response time: 27 minutes during business hours.
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

      <RelatedLinks
        num="06"
        label="OTHER INDUSTRIES"
        heading="Other desks under this roof"
        items={others.map((o) => ({
          href: `/industries/${o.slug}`,
          title: o.name,
          blurb: o.short,
          tag: o.tag,
        }))}
      />
    </>
  );
}
