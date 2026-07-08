export type Insight = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: "OCEAN" | "AIR" | "CUSTOMS" | "OPERATIONS" | "POLICY" | "INDUSTRY";
  date: string;
  read: string;
  image: string;
  tags?: string[];
};

export const INSIGHTS: ReadonlyArray<Insight> = [
  {
    id: 1,
    slug: "new-geography-of-the-red-sea",
    title: "The new geography of the Red Sea: rerouting Asia–Europe trade",
    excerpt:
      "How Houthi disruptions reshape ocean schedules, premiums, and the case for multi-modal redundancy.",
    category: "OCEAN",
    date: "2026-03-12",
    read: "8 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/red_sea_routing.png",
    tags: ["Red Sea", "Asia-Europe", "Routing"],
  },
  {
    id: 2,
    slug: "pharma-cool-chain-in-the-cabin",
    title: "Why pharma cool-chain belongs in the cabin, not the belly",
    excerpt:
      "Active vs. passive temperature control, customs hot-zones, and the economics of CRT-15.",
    category: "AIR",
    date: "2026-03-04",
    read: "6 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/pharma_cabin.png",
    tags: ["Pharma", "Cool chain", "Air freight"],
  },
  {
    id: 3,
    slug: "ata-carnet-for-fashion",
    title: "ATA Carnet for fashion: the case for temporary admission",
    excerpt: "Runways, art fairs, and trade shows — when carnet beats outright export by a margin.",
    category: "CUSTOMS",
    date: "2026-02-24",
    read: "5 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/fashion_carnet.png",
    tags: ["ATA Carnet", "Fashion", "Customs"],
  },
  {
    id: 4,
    slug: "what-99-4-percent-on-time-really-costs",
    title: "What 99.4% on-time really costs",
    excerpt:
      "An honest accounting of buffers, reroutes, and the freight-forwarder math behind a single decimal point.",
    category: "OPERATIONS",
    date: "2026-02-10",
    read: "11 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/ontime_cost.png",
    tags: ["KPIs", "Reliability"],
  },
  {
    id: 5,
    slug: "incoterms-2020-the-three-changes-people-still-miss",
    title: "Incoterms 2020: the three changes people still miss",
    excerpt:
      "DAT became DPU. CIP cover increased. FCA gained an on-board option. Quietly important for 2026 contract drafting.",
    category: "POLICY",
    date: "2026-01-28",
    read: "7 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/incoterms.png",
    tags: ["Incoterms", "Compliance"],
  },
  {
    id: 6,
    slug: "lithium-batteries-by-air-the-2026-rulebook",
    title: "Lithium batteries by air: the 2026 rulebook",
    excerpt:
      "UN3480, UN3481, UN3090, UN3091. State-of-charge limits, packaging, and the carrier embargoes nobody publishes loudly.",
    category: "AIR",
    date: "2026-01-15",
    read: "9 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/lithium_air.png",
    tags: ["Lithium", "DG", "EV"],
  },
  {
    id: 7,
    slug: "indias-pli-scheme-and-the-import-paperwork-it-creates",
    title: "India's PLI scheme and the import paperwork it creates",
    excerpt:
      "Production-Linked Incentive volumes are reshaping bonded-warehousing demand. A practical view from a forwarder's desk.",
    category: "POLICY",
    date: "2026-01-05",
    read: "8 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/pli_scheme.png",
    tags: ["PLI", "India policy", "Bonded"],
  },
  {
    id: 8,
    slug: "what-actually-happens-when-a-container-is-detained",
    title: "What actually happens when a container is detained",
    excerpt:
      "The hour-by-hour: from the customs notice to release. With the calls we make, in the order we make them.",
    category: "CUSTOMS",
    date: "2025-12-18",
    read: "10 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/detained_container.png",
    tags: ["Customs", "Operations"],
  },
  {
    id: 9,
    slug: "ev-supply-chain-out-of-india-2026",
    title: "EV supply chain out of India: a 2026 forecast for forwarders",
    excerpt:
      "Pune, Chennai, and Sanand are the new automotive corridors. Battery export volumes will double; bonded EV cells are the bottleneck.",
    category: "INDUSTRY",
    date: "2025-12-02",
    read: "12 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/ev_supply_chain.png",
    tags: ["EV", "Automotive", "India"],
  },
  {
    id: 10,
    slug: "the-quiet-rise-of-india-africa-trade",
    title: "The quiet rise of India–Africa trade",
    excerpt:
      "Mumbai-Mombasa is now a more important lane than Mumbai-Hamburg in some commodities. The map is changing.",
    category: "OCEAN",
    date: "2025-11-14",
    read: "7 min",
    image: "https://evaibprnnexdluamvnsb.supabase.co/storage/v1/object/public/Insights/india_africa_trade.png",
    tags: ["Africa", "India", "Sea freight"],
  },
];

export const INSIGHT_CATEGORIES: Insight["category"][] = [
  "OCEAN",
  "AIR",
  "CUSTOMS",
  "OPERATIONS",
  "POLICY",
  "INDUSTRY",
];

export const getInsightBySlug = (slug: string) => INSIGHTS.find((i) => i.slug === slug);
export const getRelatedInsights = (slug: string, n: number = 3) => {
  const current = INSIGHTS.find((i) => i.slug === slug);
  if (!current) return [];
  return INSIGHTS.filter((i) => i.slug !== slug && i.category === current.category)
    .concat(INSIGHTS.filter((i) => i.slug !== slug && i.category !== current.category))
    .slice(0, n);
};
