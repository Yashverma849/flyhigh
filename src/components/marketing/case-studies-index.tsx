"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Pill } from "@/components/shared/pill";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import type { CaseStudy } from "@/server/db/seed/case-studies";
import { formatDate } from "@/lib/utils";

function FeaturedCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <section className="py-12">
      <div className="site-gutter">
        <div className="mb-16 grid gap-8 lg:grid-cols-12">
          <ScrollReveal variant="slide-left" className="lg:col-span-7">
            <Link
              href={`/case-studies/${study.slug}`}
              className="group lift block"
              data-cursor="READ"
            >
              <div
                className="cine-frame relative aspect-[16/10] overflow-hidden rounded-2xl"
                style={{ border: "1px solid var(--line)" }}
              >
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute top-6 left-6 z-10">
                  <Pill kind="cargo">FEATURED · {study.industry.toUpperCase()}</Pill>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal variant="fade" staggerIndex={2} className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
            <div className="caption mb-4" style={{ color: "var(--brass)" }}>
              {formatDate(study.date)} · {study.read} read
            </div>
            <Link href={`/case-studies/${study.slug}`} className="block">
              <h2 className="f-display mb-6 text-[36px] leading-tight transition-opacity hover:opacity-80 md:text-5xl">
                {study.title}
              </h2>
            </Link>
            <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
              {study.excerpt}
            </p>
            <div className="caption" style={{ color: "var(--ash)" }}>
              CLIENT · {study.client}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <ScrollReveal variant="slide-left" staggerIndex={index} as="article">
      <Link
        href={`/case-studies/${study.slug}`}
        className="group block h-full p-6"
        style={{ background: "var(--ink)" }}
        data-cursor="READ"
      >
        <div className="cine-frame relative mb-5 aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={study.image}
            alt={study.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="mb-3 flex items-center gap-3">
          <Pill kind="brass">{study.industry.toUpperCase()}</Pill>
          <span className="caption" style={{ color: "var(--ash)" }}>
            {study.read} read
          </span>
        </div>
        <h3 className="f-display mb-3 text-2xl leading-tight transition-colors group-hover:text-[var(--cargo)]">
          {study.title}
        </h3>
        <p className="text-sm" style={{ color: "var(--ash)" }}>
          {study.excerpt}
        </p>
        <div className="caption mt-4 flex items-center gap-2" style={{ color: "var(--brass)" }}>
          {formatDate(study.date)}
          <ArrowUpRight
            size={14}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function CaseStudiesIndex({ caseStudies }: { caseStudies: readonly CaseStudy[] }) {
  const [featured, ...rest] = caseStudies;

  return (
    <>
      {featured && <FeaturedCaseStudy study={featured} />}

      {rest.length > 0 && (
        <section className="py-12">
          <div className="site-gutter">
            <div
              className="grid grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fit,minmax(max(280px,calc(100%/3)),1fr))] md:gap-8"
              style={{ background: "var(--ink)" }}
            >
              {rest.map((study, index) => (
                <CaseStudyCard key={study.slug} study={study} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
