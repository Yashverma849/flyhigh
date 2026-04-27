import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { RelatedLinks } from "@/components/shared/related-links";
import { getInsightBySlug, getRelatedInsights, INSIGHTS } from "@/server/db/seed/insights";
import { formatDate } from "@/lib/utils";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    image: insight.image,
    type: "article",
    publishedTime: insight.date,
    keywords: insight.tags,
  });
}

const PLACEHOLDER_BODY = [
  "The Red Sea has, for nearly two centuries, been the quiet artery between Asia and Europe — a corridor so reliable that schedule planners stopped asking whether it would be open and started asking by how many hours their vessel would be ahead. That assumption ended in the autumn of 2023, and freight has not reset since.",
  "Today, the Cape of Good Hope routing adds twelve to fourteen days of sailing time, between four and six thousand dollars per forty-foot box, and a quiet tax on every commodity travelling between Mumbai and Rotterdam. The largest carriers absorbed the disruption with surcharges; smaller forwarders absorbed it by quietly disappointing their clients.",
  "We chose a third path. We rebuilt our Asia–Europe planning around three contingencies: ocean via Cape, ocean via Suez where insurable, and a multi-modal Asia–Gulf–Europe rail-and-air option that we now run twice a week. The math is uncomfortable but the schedule integrity is unchanged.",
  "What follows is the playbook — what we have learned about routing, premiums, and the case for redundancy in supply chains that previously assumed only one possibility.",
];

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  const others = getRelatedInsights(slug, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          slug: `/insights/${post.slug}`,
          image: post.image,
          datePublished: post.date,
          category: post.category,
        })}
      />

      <article className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { name: "Insights", href: "/insights" },
              { name: post.title, href: `/insights/${post.slug}` },
            ]}
            className="mb-6"
          />
          <Link href="/insights" className="caption u-link mb-8 flex items-center gap-1">
            <ChevronLeft size={12} /> ALL INSIGHTS
          </Link>
          <Pill kind="cargo">{post.category}</Pill>
          <h1 className="f-display mt-6 mb-8 text-[42px] leading-[0.95] tracking-tight md:text-[68px]">
            {post.title}
          </h1>
          <div
            className="caption mb-12 flex items-center gap-4"
            style={{ color: "var(--ash)" }}
          >
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.read} read</span>
            <span>·</span>
            <span>BY THE EDITORIAL DESK</span>
          </div>
        </div>

        <div className="mx-auto mb-12 max-w-5xl px-6 md:px-8">
          <div className="cine-frame relative aspect-[21/9] overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p
            className="f-display mb-12 text-2xl leading-relaxed md:text-3xl"
            style={{ color: "var(--bone)" }}
          >
            {post.excerpt}
          </p>
          {PLACEHOLDER_BODY.slice(0, 4).map((p, i) => (
            <p
              key={i}
              className="mb-6 text-lg leading-relaxed"
              style={{ color: "var(--bone)" }}
            >
              {p}
            </p>
          ))}
          <blockquote
            className="f-display my-12 border-l-2 pl-8 text-3xl leading-tight italic"
            style={{ borderColor: "var(--cargo)", color: "var(--brass)" }}
          >
            &ldquo;A supply chain without redundancy is a supply chain that has not yet
            failed.&rdquo;
          </blockquote>
          <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--bone)" }}>
            We have always told clients that on-time delivery is not a metric — it is a pact. The
            forwarders who emerge stronger from disruption are the ones who already have two
            routes for everything they sold.
          </p>
          <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--bone)" }}>
            If your forwarder cannot tell you, in writing, what their plan is for your most
            critical lane in the event of disruption, you are not paying for freight forwarding.
            You are paying for hope.
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="chip f-mono text-[10px]">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      <RelatedLinks
        num="—"
        label="MORE FROM THE DESK"
        heading="Keep reading"
        items={others.map((p) => ({
          href: `/insights/${p.slug}`,
          title: p.title,
          blurb: p.excerpt,
          tag: `${p.category} · ${formatDate(p.date)}`,
        }))}
      />
    </>
  );
}
