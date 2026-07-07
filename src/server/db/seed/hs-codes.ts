export type HsCodeEntry = { hs: string; desc: string; bcd: string };

export type HsCodeGroup = {
  chapter: string;
  title: string;
  codes: HsCodeEntry[];
};

export const HS_GROUPS: HsCodeGroup[] = [
  {
    chapter: "Chapter 30",
    title: "Pharmaceutical products",
    codes: [
      { hs: "3003.10.00", desc: "Medicaments containing penicillins", bcd: "10%" },
      { hs: "3004.20.00", desc: "Medicaments containing antibiotics", bcd: "10%" },
      { hs: "3002.15.00", desc: "Immunological products in measured doses", bcd: "10%" },
      { hs: "3006.50.00", desc: "First-aid boxes and kits", bcd: "10%" },
    ],
  },
  {
    chapter: "Chapter 61",
    title: "Apparel and clothing accessories — knitted",
    codes: [
      { hs: "6109.10.00", desc: "T-shirts of cotton, knitted", bcd: "20%" },
      { hs: "6110.20.00", desc: "Sweaters and pullovers of cotton, knitted", bcd: "20%" },
      { hs: "6104.43.00", desc: "Women's dresses of synthetic fibres, knitted", bcd: "20%" },
    ],
  },
  {
    chapter: "Chapter 62",
    title: "Apparel and clothing accessories — not knitted",
    codes: [
      { hs: "6203.42.00", desc: "Men's trousers of cotton, woven", bcd: "20%" },
      { hs: "6204.62.00", desc: "Women's trousers of cotton, woven", bcd: "20%" },
      { hs: "6205.20.00", desc: "Men's shirts of cotton, woven", bcd: "20%" },
    ],
  },
  {
    chapter: "Chapter 84",
    title: "Machinery and mechanical appliances",
    codes: [
      { hs: "8471.30.00", desc: "Portable digital ADP machines (≤10 kg)", bcd: "0%" },
      { hs: "8479.89.00", desc: "Other machines and mechanical appliances", bcd: "7.5%" },
      { hs: "8413.81.00", desc: "Pumps for liquids", bcd: "7.5%" },
    ],
  },
  {
    chapter: "Chapter 85",
    title: "Electrical machinery and equipment",
    codes: [
      { hs: "8517.12.00", desc: "Telephones for cellular networks", bcd: "20%" },
      { hs: "8507.60.00", desc: "Lithium-ion accumulators", bcd: "15%" },
      {
        hs: "8541.40.00",
        desc: "Photosensitive semiconductor devices, photovoltaic cells",
        bcd: "0%",
      },
      {
        hs: "8542.31.00",
        desc: "Electronic integrated circuits — processors and controllers",
        bcd: "0%",
      },
    ],
  },
  {
    chapter: "Chapter 87",
    title: "Vehicles and parts",
    codes: [
      {
        hs: "8703.80.10",
        desc: "Motor cars with electric motor (BEV) — capacity ≤4 persons",
        bcd: "70-100%",
      },
      { hs: "8708.40.00", desc: "Gear boxes and parts thereof", bcd: "10%" },
      { hs: "8714.91.00", desc: "Frames and forks of bicycles", bcd: "10%" },
    ],
  },
  {
    chapter: "Chapter 22",
    title: "Beverages, spirits and vinegar",
    codes: [
      { hs: "2204.21.00", desc: "Wine of fresh grapes (in containers ≤2 litres)", bcd: "150%" },
      { hs: "2208.30.00", desc: "Whisky", bcd: "150%" },
      { hs: "2208.40.00", desc: "Rum and other spirits from sugar-cane", bcd: "150%" },
    ],
  },
  {
    chapter: "Chapter 8",
    title: "Edible fruit and nuts",
    codes: [
      { hs: "0804.50.00", desc: "Mangoes, fresh or dried", bcd: "30%" },
      { hs: "0801.32.00", desc: "Cashew nuts, shelled", bcd: "70%" },
      { hs: "0802.31.00", desc: "Walnuts in shell", bcd: "100%" },
    ],
  },
];
