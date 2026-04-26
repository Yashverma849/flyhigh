export const CLIENT_SECTORS = [
  {
    id: "energy-heavy",
    label: "Energy & Heavy Industry",
    companies: ["RELIANCE", "ADANI", "TATA STEEL", "HINDALCO", "L&T"],
  },
  {
    id: "automotive",
    label: "Automotive",
    companies: ["MARUTI SUZUKI", "MAHINDRA", "BAJAJ"],
  },
  {
    id: "consumer",
    label: "Consumer & FMCG",
    companies: ["ITC", "GODREJ", "ASIAN PAINTS"],
  },
  {
    id: "technology",
    label: "Technology",
    companies: ["INFOSYS"],
  },
] as const;

export const CLIENTS = CLIENT_SECTORS.flatMap((s) => s.companies);
