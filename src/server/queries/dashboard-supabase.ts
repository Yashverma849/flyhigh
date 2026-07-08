import "server-only";
import type { Customer, Shipment } from "@/server/db/schema";
import type {
  AnalyticsKPIs,
  CustomerRow,
  DashboardKPIs,
  ModeDatum,
  RevenueDatum,
  ThroughputDatum,
  TierSummary,
} from "@/server/queries/dashboard";

function monthStart(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function pctDelta(current: number, previous: number) {
  if (previous === 0) {
    return { text: current > 0 ? "+100%" : "0%", positive: current >= 0 };
  }
  const pct = ((current - previous) / previous) * 100;
  return {
    text: `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`,
    positive: pct >= 0,
  };
}

function daysDelta(current: number, previous: number) {
  const diff = current - previous;
  return {
    text: `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}d`,
    positive: diff <= 0,
  };
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabel(date: Date) {
  return MONTH_LABELS[date.getMonth()] ?? "—";
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function inRange(date: Date, start: Date, end: Date) {
  return date >= start && date < end;
}

function countBetween(all: Shipment[], start: Date, end: Date) {
  return all.filter((s) => inRange(s.createdAt, start, end)).length;
}

function sumRevenueBetween(all: Shipment[], start: Date, end: Date) {
  return all
    .filter((s) => inRange(s.createdAt, start, end))
    .reduce((sum, s) => sum + (s.valueInr ?? 0), 0);
}

function onTimeRateBetween(all: Shipment[], start: Date, end: Date) {
  const delivered = all.filter(
    (s) =>
      s.status === "Delivered" &&
      s.deliveredAt &&
      s.promisedAt &&
      inRange(s.deliveredAt, start, end),
  );
  if (delivered.length === 0) return null;
  const onTime = delivered.filter((s) => s.deliveredAt! <= s.promisedAt!).length;
  return (onTime / delivered.length) * 100;
}

function avgTransitBetween(all: Shipment[], start: Date, end: Date) {
  const delivered = all.filter(
    (s) => s.status === "Delivered" && s.deliveredAt && inRange(s.deliveredAt, start, end),
  );
  if (delivered.length === 0) return null;
  const totalDays = delivered.reduce((sum, s) => {
    const ms = s.deliveredAt!.getTime() - s.createdAt.getTime();
    return sum + ms / 86_400_000;
  }, 0);
  return totalDays / delivered.length;
}

export function computeDashboardKPIs(all: Shipment[]): DashboardKPIs {
  const now = new Date();
  const mtdStart = monthStart(now);
  const prevStart = addMonths(mtdStart, -1);
  const mtdEnd = addMonths(mtdStart, 1);

  const activeShipments = all.filter((s) => s.status !== "Delivered").length;
  const prevActive = all.filter(
    (s) => s.status !== "Delivered" && s.createdAt < mtdStart,
  ).length;
  const inCustoms = all.filter((s) => s.status === "Customs").length;
  const prevCustoms = all.filter(
    (s) => s.status === "Customs" && s.updatedAt < mtdStart,
  ).length;

  const revenueMtd = sumRevenueBetween(all, mtdStart, mtdEnd);
  const revenuePrev = sumRevenueBetween(all, prevStart, mtdStart);
  const onTimeMtd = onTimeRateBetween(all, mtdStart, mtdEnd);
  const onTimePrev = onTimeRateBetween(all, prevStart, mtdStart);

  return {
    activeShipments,
    activeShipmentsDelta: pctDelta(activeShipments, prevActive),
    revenueMtd,
    revenueMtdDelta: pctDelta(revenueMtd, revenuePrev),
    onTimeRate: onTimeMtd,
    onTimeDelta:
      onTimeMtd != null && onTimePrev != null
        ? pctDelta(onTimeMtd, onTimePrev)
        : { text: "—", positive: true },
    inCustoms,
    inCustomsDelta: pctDelta(inCustoms, prevCustoms),
  };
}

export function computeAnalyticsKPIs(all: Shipment[]): AnalyticsKPIs {
  const now = new Date();
  const mtdStart = monthStart(now);
  const prevStart = addMonths(mtdStart, -1);
  const mtdEnd = addMonths(mtdStart, 1);

  const volumeMtd = countBetween(all, mtdStart, mtdEnd);
  const volumePrev = countBetween(all, prevStart, mtdStart);
  const revenueMtd = sumRevenueBetween(all, mtdStart, mtdEnd);
  const revenuePrev = sumRevenueBetween(all, prevStart, mtdStart);
  const onTimeMtd = onTimeRateBetween(all, mtdStart, mtdEnd);
  const onTimePrev = onTimeRateBetween(all, prevStart, mtdStart);
  const avgTransit = avgTransitBetween(all, mtdStart, mtdEnd);
  const avgTransitPrev = avgTransitBetween(all, prevStart, mtdStart);

  return {
    volumeMtd,
    volumeMtdDelta: pctDelta(volumeMtd, volumePrev),
    revenueMtd,
    revenueMtdDelta: pctDelta(revenueMtd, revenuePrev),
    onTimeRate: onTimeMtd,
    onTimeDelta:
      onTimeMtd != null && onTimePrev != null
        ? pctDelta(onTimeMtd, onTimePrev)
        : { text: "—", positive: true },
    avgTransitDays: avgTransit,
    avgTransitDelta:
      avgTransit != null && avgTransitPrev != null
        ? daysDelta(avgTransit, avgTransitPrev)
        : { text: "—", positive: true },
  };
}

export function computeThroughputByMode(all: Shipment[], months = 6): ThroughputDatum[] {
  const now = new Date();
  const start = addMonths(monthStart(now), -(months - 1));

  const buckets = new Map<string, ThroughputDatum>();
  for (let i = 0; i < months; i++) {
    const d = addMonths(start, i);
    buckets.set(monthKey(d), { month: monthLabel(d), sea: 0, air: 0, road: 0 });
  }

  for (const s of all) {
    if (s.createdAt < start) continue;
    const key = monthKey(s.createdAt);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    if (s.mode === "sea") bucket.sea += 1;
    if (s.mode === "air") bucket.air += 1;
    if (s.mode === "road") bucket.road += 1;
  }

  return [...buckets.values()];
}

export function computeRevenueByMonth(all: Shipment[], months = 6): RevenueDatum[] {
  const now = new Date();
  const start = addMonths(monthStart(now), -(months - 1));

  const buckets = new Map<string, RevenueDatum>();
  for (let i = 0; i < months; i++) {
    const d = addMonths(start, i);
    buckets.set(monthKey(d), { month: monthLabel(d), revenue: 0 });
  }

  for (const s of all) {
    if (s.createdAt < start) continue;
    const key = monthKey(s.createdAt);
    const bucket = buckets.get(key);
    if (bucket) bucket.revenue += Math.round((s.valueInr ?? 0) / 100_000);
  }

  return [...buckets.values()];
}

export function computeModeDistribution(all: Shipment[]): ModeDatum[] {
  const mtdStart = monthStart(new Date());
  const label: Record<string, string> = { sea: "Sea", air: "Air", road: "Road" };
  const counts = new Map<string, number>();

  for (const s of all) {
    if (s.createdAt < mtdStart) continue;
    counts.set(s.mode, (counts.get(s.mode) ?? 0) + 1);
  }

  return [...counts.entries()].map(([mode, value]) => ({
    name: label[mode] ?? mode,
    value,
  }));
}

export function computeCustomersWithStats(
  customers: Customer[],
  shipments: Shipment[],
): CustomerRow[] {
  const yearAgo = addMonths(monthStart(new Date()), -12);

  return customers
    .map((c) => {
      const related = shipments.filter(
        (s) => s.customerId === c.id && s.createdAt >= yearAgo,
      );
      return {
        id: c.id,
        name: c.name,
        tier: c.tier ?? "silver",
        since: String(c.createdAt.getFullYear()),
        shipments: related.length,
        revenueInr: related.reduce((sum, s) => sum + (s.valueInr ?? 0), 0),
        contact: c.primaryContact,
        contactEmail: c.contactEmail,
        location: c.location,
        health: c.healthScore ?? 80,
      };
    })
    .sort((a, b) => b.revenueInr - a.revenueInr);
}

export function computeCustomerTierSummary(
  customers: Customer[],
  shipments: Shipment[],
): TierSummary[] {
  const yearAgo = addMonths(monthStart(new Date()), -12);
  const order: Array<"platinum" | "gold" | "silver"> = ["platinum", "gold", "silver"];
  const map = new Map<TierSummary["tier"], TierSummary>();

  for (const tier of order) {
    map.set(tier, { tier, count: 0, revenueInr: 0 });
  }

  for (const c of customers) {
    const tier = c.tier ?? "silver";
    const entry = map.get(tier)!;
    entry.count += 1;
    entry.revenueInr += shipments
      .filter((s) => s.customerId === c.id && s.createdAt >= yearAgo)
      .reduce((sum, s) => sum + (s.valueInr ?? 0), 0);
  }

  return order.map((tier) => map.get(tier)!);
}
