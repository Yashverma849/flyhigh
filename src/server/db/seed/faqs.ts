export type Faq = {
  q: string;
  a: string;
  category: "Quoting" | "Operations" | "Customs" | "Cool Chain" | "Project Cargo" | "Compliance" | "Pricing";
};

export const FAQS: ReadonlyArray<Faq> = [
  {
    category: "Quoting",
    q: "How quickly can I get a quote?",
    a: "Standard sea and air lanes — under 27 minutes during business hours, under 4 hours after-hours. Project cargo and engineered moves take 24-48 hours because we run a route survey before quoting.",
  },
  {
    category: "Quoting",
    q: "What information do you need to quote a shipment?",
    a: "Origin postcode, destination postcode, mode preference (or 'recommend the right one'), commodity, weight in kg, and volume in cubic metres. For DG, we also need the UN number, packing group, and class.",
  },
  {
    category: "Quoting",
    q: "Do you quote in INR or USD?",
    a: "Both — your call. India-leg components quoted in INR; international legs quoted in USD by default but converted to INR at lock-rate on request.",
  },
  {
    category: "Operations",
    q: "Can I track shipments in real time?",
    a: "Yes. Sea cargo updates per port event (departed, transhipped, discharged, gated-in, customs-cleared, gate-out). Air updates per flight event. Cool-chain shipments include continuous temperature telemetry.",
  },
  {
    category: "Operations",
    q: "What is your on-time performance?",
    a: "99.4% on-time delivery across all modes in 2025. Air freight runs at 99.7%; sea freight at 99.1%; project cargo at 100% (small sample). On-time means within the contractually agreed window, not the marketing window.",
  },
  {
    category: "Operations",
    q: "Do you handle dangerous goods?",
    a: "Yes — IMDG Classes 3-9 for sea, IATA DGR for air. We do not move Class 1 (explosives) or Class 7 (radioactive) ourselves; for those we coordinate licensed specialists.",
  },
  {
    category: "Customs",
    q: "Are you a licensed customs broker?",
    a: "Yes. We hold customs broker licences (CHA / CB) at every major Indian gateway, and panel membership of FICCI for ATA Carnet issuance.",
  },
  {
    category: "Customs",
    q: "What happens if my shipment is held by customs?",
    a: "We notify you within 90 minutes of any hold, with the query and our recommended response. Most queries are resolved in under 24 hours; complex valuation queries can take 5-10 days but we maintain custody and warehousing in the interim.",
  },
  {
    category: "Customs",
    q: "Can you handle ATA Carnet shipments?",
    a: "Yes — FICCI panel members for ATA Carnet issuance and acceptance. We process around 180 carnets per year, mostly fashion, art, and trade-show cargo.",
  },
  {
    category: "Cool Chain",
    q: "What temperature ranges do you handle?",
    a: "CRT-15 (15-25°C), 2-8°C, frozen (-20°C), and ultra-low (-70°C / dry ice). We do not yet operate cryogenic (-150°C) corridors.",
  },
  {
    category: "Cool Chain",
    q: "Are your cool-chain lanes GDP-certified?",
    a: "Yes. 23 lanes are GDP-validated end-to-end. We can produce the full validation pack on request, including stability data, lane-trial reports, and excursion-rate evidence.",
  },
  {
    category: "Project Cargo",
    q: "Do you handle out-of-gauge and heavy lift?",
    a: "Yes. We have moved 65-metre wind turbine blades, 180-tonne transformers, and complete petrochemical reactor units. Route survey, permits, escorts, marine insurance — all in scope.",
  },
  {
    category: "Project Cargo",
    q: "Can you charter aircraft?",
    a: "Yes — full or part charter on B747F, IL-76, AN-124. Typical lead time 7-10 days; AOG-class urgency can secure capacity in 24-48 hours at premium pricing.",
  },
  {
    category: "Compliance",
    q: "What certifications do you hold?",
    a: "IATA agent, FIATA member, FICCI carnet panel, ISO 9001:2015, C-TPAT-aware procedures (we are not US-based so cannot be C-TPAT certified directly, but we partner with C-TPAT brokers in the US).",
  },
  {
    category: "Compliance",
    q: "Do you carry cargo insurance?",
    a: "We arrange marine insurance via Lloyd's-syndicate partners. Default cover is Institute Cargo Clauses A; restricted cover (B and C) available for cost-sensitive lanes. All-risk cover with named exclusions for high-value lots.",
  },
  {
    category: "Pricing",
    q: "Are your rates all-in?",
    a: "Our quotes specify exactly what is included and what is excluded. We do not bury BAF, EBS, ISPS, THC, or destination charges. Where charges are pass-through (e.g., port storage if you delay clearance), we mark them clearly.",
  },
  {
    category: "Pricing",
    q: "Do you offer credit terms?",
    a: "Net-30 terms are standard for established accounts (12 months of trading). Net-45 and Net-60 are negotiated case-by-case. New accounts run on advance for the first three shipments.",
  },
  {
    category: "Pricing",
    q: "What is your fuel surcharge policy?",
    a: "BAF (sea) and FSC (air) are pegged to published carrier or industry indices, reset monthly. We do not freelance fuel surcharges.",
  },
];

export const FAQ_CATEGORIES: Faq["category"][] = [
  "Quoting",
  "Operations",
  "Customs",
  "Cool Chain",
  "Project Cargo",
  "Compliance",
  "Pricing",
];
