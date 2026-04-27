// MOVIES sector is pinned to top regardless of count.
// Other sectors sort by companies.length DESC at render time (see ORDERED_SECTORS).
// Non-MOVIES sectors are placeholders pending real client data.
export type ClientSector = {
  id: string;
  label: string;
  pinned?: boolean;
  companies: string[];
};

export const CLIENT_SECTORS: ClientSector[] = [
  {
    id: "movies",
    label: "Movies",
    pinned: true,
    companies: [
      "ROHIT SHETTY PICTUREZ",
      "STAR INDIA",
      "VIACOM 18",
      "SALMAN KHAN FILMS",
      "KABIR KHAN FILMS",
      "CHALKBOARD ENTERTAINMENT",
      "E FACTOR",
      "ATUL LTD.",
    ],
  },
  { id: "energy-heavy", label: "Energy & Heavy Industry", companies: [] },
  { id: "automotive",   label: "Automotive",              companies: [] },
  { id: "consumer",     label: "Consumer & FMCG",         companies: [] },
  { id: "technology",   label: "Technology",              companies: [] },
];

export const ORDERED_SECTORS: ClientSector[] = [...CLIENT_SECTORS].sort((a, b) => {
  if (a.pinned && !b.pinned) return -1;
  if (b.pinned && !a.pinned) return 1;
  return b.companies.length - a.companies.length;
});

export const CLIENTS = ORDERED_SECTORS.flatMap((s) => s.companies);
