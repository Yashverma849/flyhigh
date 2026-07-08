import type { MetadataRoute } from "next";
import { SERVICES } from "@/server/db/seed/services";
import { INDUSTRIES } from "@/server/db/seed/industries";
import { listPublishedInsights } from "@/server/queries/insights";
import { ROUTES } from "@/server/db/seed/routes";
import { SITE_URL } from "@/lib/seo";
import { listPublishedCaseStudies } from "@/server/queries/case-studies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const base = SITE_URL.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/routes`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/tools/transit-time`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/tools/incoterms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${base}/tools/hs-code`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/tools/documents`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/resources/glossary`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/newsroom`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/compliance`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/offices`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/quote`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/track`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industries: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const routes: MetadataRoute.Sitemap = ROUTES.map((r) => ({
    url: `${base}/routes/${r.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const cases = await listPublishedCaseStudies();
  const caseStudies: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: new Date(c.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const publishedInsights = await listPublishedInsights();
  const insights: MetadataRoute.Sitemap = publishedInsights.map((i) => ({
    url: `${base}/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...services, ...industries, ...routes, ...caseStudies, ...insights];
}
