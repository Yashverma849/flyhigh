import type { Metadata } from "next";
import { ContentPageClient } from "@/components/admin/content-page-client";
import { MARKETING_PAGES } from "@/lib/admin-content-data";
import { listAdminInsights } from "@/server/queries/insights";
import { listAdminCaseStudies } from "@/server/queries/case-studies";

export const metadata: Metadata = { title: "Content / CMS" };

export default async function AdminContentPage() {
  let posts: Awaited<ReturnType<typeof listAdminInsights>> = [];
  try {
    posts = await listAdminInsights();
  } catch {
    posts = [];
  }

  let caseStudies: Awaited<ReturnType<typeof listAdminCaseStudies>> = [];
  try {
    caseStudies = await listAdminCaseStudies();
  } catch {
    caseStudies = [];
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

