"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Pill } from "@/components/shared/pill";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import type { MappedInsight as Insight } from "@/server/queries/insights";
import { formatDate } from "@/lib/utils";

const FILTER_TAGS = ["ALL", "OCEAN", "AIR", "CUSTOMS", "OPERATIONS"] as const;

function FeaturedInsight({ post }: { post: Insight }) {
  return (
    <div className="mb-16 grid gap-8 lg:grid-cols-12">
      <ScrollReveal variant="slide-left" className="lg:col-span-7">
        <Link
          href={`/insights/${post.slug}`}
          className="group lift block"
          data-cursor="READ"
        >
          <div
            className="cine-frame relative aspect-[16/10] overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--line)" }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-6 left-6 z-10">
              <Pill kind="cargo">FEATURED · {post.category}</Pill>
            </div>
          </div>
        </Link>
      </ScrollReveal>

      <ScrollReveal variant="fade" staggerIndex={2} className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
        <div className="caption mb-4" style={{ color: "var(--brass)" }}>
          {formatDate(post.date)} · {post.read} read
        </div>
        <Link href={`/insights/${post.slug}`} className="block">
          <h2 className="f-display mb-6 text-[36px] leading-tight transition-opacity hover:opacity-80 md:text-5xl">
            {post.title}
          </h2>
        </Link>
        <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
          {post.excerpt}
        </p>
        <Link href={`/insights/${post.slug}`} className="btn-link self-start">
          Read article <ArrowRight size={14} />
        </Link>
      </ScrollReveal>
    </div>
  );
}

function InsightCard({ post, index }: { post: Insight; index: number }) {
  return (
    <ScrollReveal variant="slide-left" staggerIndex={index} as="article">
      <Link
        href={`/insights/${post.slug}`}
        className="group block h-full p-6"
        style={{ background: "var(--ink)" }}
        data-cursor="READ"
      >
        <div className="cine-frame relative mb-5 aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="mb-3 flex items-center gap-3">
          <Pill kind="brass">{post.category}</Pill>
          <span className="caption" style={{ color: "var(--ash)" }}>
            {post.read} read
          </span>
        </div>
        <h3 className="f-display mb-3 text-2xl leading-tight transition-colors group-hover:text-[var(--cargo)]">
          {post.title}
        </h3>
        <p className="text-sm" style={{ color: "var(--ash)" }}>
          {post.excerpt}
        </p>
        <div className="caption mt-4" style={{ color: "var(--brass)" }}>
          {formatDate(post.date)}
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function InsightsIndex({ posts }: { posts: readonly Insight[] }) {
  const [featured, ...rest] = posts;
  if (!featured) return null;

  return (
    <section className="py-12">
      <div className="site-gutter">
        <ScrollReveal variant="fade">
          <div className="mb-12 flex flex-wrap items-center gap-2">
            <span className="caption mr-2" style={{ color: "var(--brass)" }}>
              FILTER:
            </span>
            {FILTER_TAGS.map((tag, i) => (
              <button
                key={tag}
                type="button"
                className={`caption rounded-full px-4 py-1.5 text-xs transition-all ${i === 0 ? "" : "opacity-60 hover:opacity-100"}`}
                style={{
                  background: i === 0 ? "var(--cargo)" : "transparent",
                  color: "var(--bone)",
                  border: `1px solid ${i === 0 ? "var(--cargo)" : "var(--line)"}`,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <FeaturedInsight post={featured} />

        <div className="grid gap-px md:grid-cols-3" style={{ background: "var(--line)" }}>
          {rest.map((post, index) => (
            <InsightCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
