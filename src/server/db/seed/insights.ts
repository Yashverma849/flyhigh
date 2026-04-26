export type Insight = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: "OCEAN" | "AIR" | "CUSTOMS" | "OPERATIONS";
  date: string;
  read: string;
  image: string;
};

export const INSIGHTS: ReadonlyArray<Insight> = [
  {
    id: 1,
    slug: "new-geography-of-the-red-sea",
    title: "The new geography of the Red Sea: rerouting Asia–Europe trade",
    excerpt:
      "How Houthi disruptions reshape ocean schedules, premiums, and the case for multi-modal redundancy.",
    category: "OCEAN",
    date: "Mar 12, 2026",
    read: "8 min",
    image:
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    slug: "pharma-cool-chain-in-the-cabin",
    title: "Why pharma cool-chain belongs in the cabin, not the belly",
    excerpt:
      "Active vs. passive temperature control, customs hot-zones, and the economics of CRT-15.",
    category: "AIR",
    date: "Mar 04, 2026",
    read: "6 min",
    image:
      "https://images.unsplash.com/photo-1583500178690-f7fc39ee08e2?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    slug: "ata-carnet-for-fashion",
    title: "ATA Carnet for fashion: the case for temporary admission",
    excerpt:
      "Runways, art fairs, and trade shows — when carnet beats outright export by a margin.",
    category: "CUSTOMS",
    date: "Feb 24, 2026",
    read: "5 min",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    slug: "what-99-4-percent-on-time-really-costs",
    title: "What 99.4% on-time really costs",
    excerpt:
      "An honest accounting of buffers, reroutes, and the freight-forwarder math behind a single decimal point.",
    category: "OPERATIONS",
    date: "Feb 10, 2026",
    read: "11 min",
    image:
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=1200&q=80&auto=format&fit=crop",
  },
];

export const getInsightBySlug = (slug: string) => INSIGHTS.find((i) => i.slug === slug);
