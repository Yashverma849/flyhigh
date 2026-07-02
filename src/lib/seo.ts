import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.AUTH_URL ?? "https://flyhigh-website.vercel.app";

export function absoluteUrl(path: string = "/") {
  if (path.startsWith("http")) return path;
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
  noindex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  keywords,
  noindex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? absoluteUrl("/opengraph-image");
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ───────────────────────── JSON-LD builders ──────────────────────────

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Flyhigh Logistics Pvt. Ltd.",
  alternateName: "Flyhigh",
  url: SITE_URL,
  logo: absoluteUrl("/opengraph-image"),
  foundingDate: "2017",
  description:
    "A premium freight forwarding maison from Mumbai. Sea, air, customs, warehousing, road, and project cargo — handled with editorial precision.",
  email: "flyhighfreightservices@gmail.com",
  telephone: "+91-9322627766",
  sameAs: [
    "https://www.linkedin.com/company/flyhigh-logistics",
    "https://twitter.com/flyhighfreight",
    "https://www.instagram.com/flyhigh.freight",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Arjun House, Sahar Cargo, Andheri East",
    addressLocality: "Mumbai",
    postalCode: "400099",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9322627766",
      contactType: "customer service",
      areaServed: ["IN", "AE", "SG", "GB", "US", "DE", "NL"],
      availableLanguage: ["English", "Hindi"],
    },
  ],
});

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Flyhigh — Mumbai HQ",
  image: absoluteUrl("/opengraph-image"),
  priceRange: "$$$",
  url: SITE_URL,
  telephone: "+91-9322627766",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Arjun House, Sahar Cargo, Andheri East",
    addressLocality: "Mumbai",
    postalCode: "400099",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 18.943, longitude: 72.823 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Flyhigh",
  description: "Worldwide Freight, Refined.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/insights?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export type Crumb = { name: string; href: string };

export const breadcrumbJsonLd = (items: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.href),
  })),
});

export const serviceJsonLd = (input: {
  name: string;
  description: string;
  slug: string;
  category?: string;
  areaServed?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: input.name,
  description: input.description,
  serviceType: input.category ?? "Freight Forwarding",
  provider: { "@id": `${SITE_URL}/#organization` },
  url: absoluteUrl(input.slug),
  areaServed: input.areaServed ?? "Worldwide",
});

export const articleJsonLd = (input: {
  title: string;
  description: string;
  slug: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  category?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: input.title,
  description: input.description,
  image: [input.image],
  datePublished: input.datePublished,
  dateModified: input.dateModified ?? input.datePublished,
  author: { "@type": "Organization", name: input.authorName ?? "Flyhigh Editorial" },
  publisher: { "@id": `${SITE_URL}/#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(input.slug) },
  articleSection: input.category,
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
