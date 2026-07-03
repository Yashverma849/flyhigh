export type Stat = {
  value: string;
  label: string;
  target: number;
  suffix: string;
  decimals?: number;
};

export const STATS: ReadonlyArray<Stat> = [
  { value: "48,200+", label: "Shipments cleared",  target: 48200, suffix: "+" },
  { value: "94",      label: "Countries served",   target: 94,    suffix: "" },
  { value: "320+",    label: "Ports & airports",   target: 320,   suffix: "+" },
  { value: "98.6%",   label: "On-time delivery",   target: 98.6,  suffix: "%", decimals: 1 },
];
