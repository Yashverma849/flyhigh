export type MarketingPageRow = {
  id: string;
  title: string;
  path: string;
  section: string;
};

export type CaseStudyRow = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  date: string;
  excerpt: string;
  image: string;
};

export type MediaRow = {
  id: string;
  title: string;
  source: string;
  url: string;
};

export const MARKETING_PAGES: MarketingPageRow[] = [
  { id: "home", title: "Home", path: "/", section: "Core" },
  { id: "about", title: "About", path: "/about", section: "Core" },
  { id: "services", title: "Services", path: "/services", section: "Core" },
  { id: "industries", title: "Industries", path: "/industries", section: "Core" },
  { id: "routes", title: "Routes", path: "/routes", section: "Core" },
  { id: "insights", title: "Insights", path: "/insights", section: "Core" },
  { id: "case-studies", title: "Case studies", path: "/case-studies", section: "Core" },
  { id: "contact", title: "Contact", path: "/contact", section: "Core" },
  { id: "quote", title: "Quote", path: "/quote", section: "Conversion" },
  { id: "track", title: "Track", path: "/track", section: "Conversion" },
  { id: "resources", title: "Resources", path: "/resources", section: "Resources" },
  { id: "newsroom", title: "Newsroom", path: "/newsroom", section: "Resources" },
  { id: "careers", title: "Careers", path: "/careers", section: "Company" },
  { id: "compliance", title: "Compliance", path: "/compliance", section: "Company" },
  { id: "offices", title: "Offices", path: "/offices", section: "Company" },
];

export function buildMediaLibrary(
  posts: Array<{ id: string; title: string; heroImage: string | null }>,
  caseStudies: CaseStudyRow[],
): MediaRow[] {
  const rows: MediaRow[] = [];

  for (const post of posts) {
    if (!post.heroImage) continue;
    rows.push({
      id: `post-${post.id}`,
      title: post.title,
      source: "Insights post",
      url: post.heroImage,
    });
  }

  for (const study of caseStudies) {
    if (!study.image) continue;
    rows.push({
      id: `case-${study.slug}`,
      title: study.title,
      source: "Case study",
      url: study.image,
    });
  }

  return rows;
}
