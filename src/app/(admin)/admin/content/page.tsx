import type { Metadata } from "next";
import { ContentPageClient } from "@/components/admin/content-page-client";
import { MARKETING_PAGES, type CaseStudyRow } from "@/lib/admin-content-data";
import { listAdminInsights } from "@/server/queries/insights";
import { CASE_STUDIES } from "@/server/db/seed/case-studies";

export const metadata: Metadata = { title: "Content / CMS" };

const caseStudies: CaseStudyRow[] = CASE_STUDIES.map((study) => ({
  slug: study.slug,
  title: study.title,
  client: study.client,
  industry: study.industry,
  date: study.date,
  excerpt: study.excerpt,
  image: study.image,
}));

export default async function AdminContentPage() {
  let posts: Awaited<ReturnType<typeof listAdminInsights>> = [];
  try {
    posts = await listAdminInsights();
  } catch {
    posts = [];
  }

  return (
    <div>
      <ContentPageClient
        posts={posts}
        marketingPages={MARKETING_PAGES}
        caseStudies={caseStudies}
      />
    </div>
  );
}
