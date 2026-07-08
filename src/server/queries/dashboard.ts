import "server-only";
import { and, count, eq, gte, lt, ne, sql } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured } from "@/server/db/client";
import { supabaseGetAllCustomers, supabaseGetAllShipments } from "@/server/db/supabase-data";
import { customers, shipments } from "@/server/db/schema";
import {
  computeAnalyticsKPIs,
  computeCustomerTierSummary,
  computeCustomersWithStats,
  computeDashboardKPIs,
  computeModeDistribution,
  computeRevenueByMonth,
  computeThroughputByMode,
} from "@/server/queries/dashboard-supabase";

export type ThroughputDatum = { month: string; sea: number; air: number; road: number };
export type RevenueDatum = { month: string; revenue: number };
export type ModeDatum = { name: string; value: number };

export type DashboardKPIs = {
  activeShipments: number;
  activeShipmentsDelta: { text: string; positive: boolean };
  revenueMtd: number;
  revenueMtdDelta: { text: string; positive: boolean };
  onTimeRate: number | null;
  onTimeDelta: { text: string; positive: boolean };
  inCustoms: number;
  inCustomsDelta: { text: string; positive: boolean };
};

export type AnalyticsKPIs = {
  volumeMtd: number;
  volumeMtdDelta: { text: string; positive: boolean };
  revenueMtd: number;
  revenueMtdDelta: { text: string; positive: boolean };
  onTimeRate: number | null;
  onTimeDelta: { text: string; positive: boolean };
  avgTransitDays: number | null;
  avgTransitDelta: { text: string; positive: boolean };
};

export type CustomerRow = {
  id: string;
  name: string;
  tier: "platinum" | "gold" | "silver";
  since: string;
  shipments: number;
  revenueInr: number;
  contact: string | null;
  contactEmail: string | null;
  location: string | null;
  health: number;
};

export type TierSummary = {
  tier: "platinum" | "gold" | "silver";
  count: number;
  revenueInr: number;
};

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

async function countShipmentsBetween(start: Date, end: Date) {
  if (!db) return 0;
  const [row] = await db
    .select({ total: count() })
    .from(shipments)
    .where(and(gte(shipments.createdAt, start), lt(shipments.createdAt, end)));
  return row?.total ?? 0;
}

async function sumRevenueBetween(start: Date, end: Date) {
  if (!db) return 0;
  const [row] = await db
    .select({ total: sql<number>`coalesce(sum(${shipments.valueInr}), 0)` })
    .from(shipments)
    .where(and(gte(shipments.createdAt, start), lt(shipments.createdAt, end)));
  return Number(row?.total ?? 0);
}

async function getOnTimeRateBetween(start: Date, end: Date) {
  if (!db) return null;
  const rows = await db
    .select({
      deliveredAt: shipments.deliveredAt,
      promisedAt: shipments.promisedAt,
    })
    .from(shipments)
    .where(
      and(
        eq(shipments.status, "Delivered"),
        gte(shipments.deliveredAt, start),
        lt(shipments.deliveredAt, end),
        sql`${shipments.deliveredAt} IS NOT NULL`,
        sql`${shipments.promisedAt} IS NOT NULL`,
      ),
    );

  if (rows.length === 0) return null;
  const onTime = rows.filter(
    (r) => r.deliveredAt && r.promisedAt && r.deliveredAt <= r.promisedAt,
  ).length;
  return (onTime / rows.length) * 100;
}

async function getAvgTransitDaysBetween(start: Date, end: Date) {
  if (!db) return null;
  const [row] = await db
    .select({
      avgDays: sql<number>`avg(extract(epoch from (${shipments.deliveredAt} - ${shipments.createdAt})) / 86400.0)`,
    })
    .from(shipments)
    .where(
      and(
        eq(shipments.status, "Delivered"),
        gte(shipments.deliveredAt, start),
        lt(shipments.deliveredAt, end),
        sql`${shipments.deliveredAt} IS NOT NULL`,
      ),
    );
  const avg = row?.avgDays;
  return avg == null ? null : Number(avg);
}

export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  const empty: DashboardKPIs = {
    activeShipments: 0,
    activeShipmentsDelta: { text: "0%", positive: true },
    revenueMtd: 0,
    revenueMtdDelta: { text: "0%", positive: true },
    onTimeRate: null,
    onTimeDelta: { text: "—", positive: true },
    inCustoms: 0,
    inCustomsDelta: { text: "0%", positive: true },
  };
  if (!isDbConfigured) return empty;
  if (!hasDatabaseUrl || !db) {
    const all = await supabaseGetAllShipments();
    return computeDashboardKPIs(all);
  }

  const now = new Date();
  const mtdStart = monthStart(now);
  const prevStart = addMonths(mtdStart, -1);

  const [activeRow] = await db
    .select({ total: count() })
    .from(shipments)
    .where(ne(shipments.status, "Delivered"));

  const [prevActiveRow] = await db
    .select({ total: count() })
    .from(shipments)
    .where(and(ne(shipments.status, "Delivered"), lt(shipments.createdAt, mtdStart)));

  const [customsRow] = await db
    .select({ total: count() })
    .from(shipments)
    .where(eq(shipments.status, "Customs"));

  const [prevCustomsRow] = await db
    .select({ total: count() })
    .from(shipments)
    .where(and(eq(shipments.status, "Customs"), lt(shipments.updatedAt, mtdStart)));

  const revenueMtd = await sumRevenueBetween(mtdStart, addMonths(mtdStart, 1));
  const revenuePrev = await sumRevenueBetween(prevStart, mtdStart);

  const onTimeMtd = await getOnTimeRateBetween(mtdStart, addMonths(mtdStart, 1));
  const onTimePrev = await getOnTimeRateBetween(prevStart, mtdStart);

  const activeShipments = activeRow?.total ?? 0;
  const prevActive = prevActiveRow?.total ?? 0;
  const inCustoms = customsRow?.total ?? 0;
  const prevCustoms = prevCustomsRow?.total ?? 0;

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

export async function getAnalyticsKPIs(): Promise<AnalyticsKPIs> {
  const empty: AnalyticsKPIs = {
    volumeMtd: 0,
    volumeMtdDelta: { text: "0%", positive: true },
    revenueMtd: 0,
    revenueMtdDelta: { text: "0%", positive: true },
    onTimeRate: null,
    onTimeDelta: { text: "—", positive: true },
    avgTransitDays: null,
    avgTransitDelta: { text: "—", positive: true },
  };
  if (!isDbConfigured) return empty;
  if (!hasDatabaseUrl || !db) {
    const all = await supabaseGetAllShipments();
    return computeAnalyticsKPIs(all);
  }

  const now = new Date();
  const mtdStart = monthStart(now);
  const prevStart = addMonths(mtdStart, -1);
  const mtdEnd = addMonths(mtdStart, 1);

  const volumeMtd = await countShipmentsBetween(mtdStart, mtdEnd);
  const volumePrev = await countShipmentsBetween(prevStart, mtdStart);
  const revenueMtd = await sumRevenueBetween(mtdStart, mtdEnd);
  const revenuePrev = await sumRevenueBetween(prevStart, mtdStart);
  const onTimeMtd = await getOnTimeRateBetween(mtdStart, mtdEnd);
  const onTimePrev = await getOnTimeRateBetween(prevStart, mtdStart);
  const avgTransit = await getAvgTransitDaysBetween(mtdStart, mtdEnd);
  const avgTransitPrev = await getAvgTransitDaysBetween(prevStart, mtdStart);

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

export async function getThroughputByMode(months = 6): Promise<ThroughputDatum[]> {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) {
    const all = await supabaseGetAllShipments();
    return computeThroughputByMode(all, months);
  }

  const now = new Date();
  const start = addMonths(monthStart(now), -(months - 1));

  const rows = await db
    .select({
      month: sql<string>`to_char(date_trunc('month', ${shipments.createdAt}), 'YYYY-MM')`,
      mode: shipments.mode,
      total: count(),
    })
    .from(shipments)
    .where(gte(shipments.createdAt, start))
    .groupBy(sql`date_trunc('month', ${shipments.createdAt})`, shipments.mode)
    .orderBy(sql`date_trunc('month', ${shipments.createdAt})`);

  const buckets = new Map<string, ThroughputDatum>();
  for (let i = 0; i < months; i++) {
    const d = addMonths(start, i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    buckets.set(key, { month: monthLabel(d), sea: 0, air: 0, road: 0 });
  }

  for (const row of rows) {
    const bucket = buckets.get(row.month);
    if (!bucket) continue;
    if (row.mode === "sea") bucket.sea = row.total;
    if (row.mode === "air") bucket.air = row.total;
    if (row.mode === "road") bucket.road = row.total;
  }

  return [...buckets.values()];
}

export async function getRevenueByMonth(months = 6): Promise<RevenueDatum[]> {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) {
    const all = await supabaseGetAllShipments();
    return computeRevenueByMonth(all, months);
  }

  const now = new Date();
  const start = addMonths(monthStart(now), -(months - 1));

  const rows = await db
    .select({
      month: sql<string>`to_char(date_trunc('month', ${shipments.createdAt}), 'YYYY-MM')`,
      revenue: sql<number>`coalesce(sum(${shipments.valueInr}), 0)`,
    })
    .from(shipments)
    .where(gte(shipments.createdAt, start))
    .groupBy(sql`date_trunc('month', ${shipments.createdAt})`)
    .orderBy(sql`date_trunc('month', ${shipments.createdAt})`);

  const buckets = new Map<string, RevenueDatum>();
  for (let i = 0; i < months; i++) {
    const d = addMonths(start, i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    buckets.set(key, { month: monthLabel(d), revenue: 0 });
  }

  for (const row of rows) {
    const bucket = buckets.get(row.month);
    if (bucket) bucket.revenue = Math.round(Number(row.revenue) / 100_000);
  }

  return [...buckets.values()];
}

export async function getModeDistribution(): Promise<ModeDatum[]> {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) {
    const all = await supabaseGetAllShipments();
    return computeModeDistribution(all);
  }

  const now = new Date();
  const mtdStart = monthStart(now);

  const rows = await db
    .select({ mode: shipments.mode, total: count() })
    .from(shipments)
    .where(gte(shipments.createdAt, mtdStart))
    .groupBy(shipments.mode);

  const label: Record<string, string> = { sea: "Sea", air: "Air", road: "Road" };
  return rows.map((r) => ({
    name: label[r.mode] ?? r.mode,
    value: r.total,
  }));
}

export async function getCustomersWithStats(): Promise<CustomerRow[]> {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) {
    const [allCustomers, allShipments] = await Promise.all([
      supabaseGetAllCustomers(),
      supabaseGetAllShipments(),
    ]);
    return computeCustomersWithStats(allCustomers, allShipments);
  }

  const yearAgo = addMonths(monthStart(new Date()), -12);

  const rows = await db
    .select({
      id: customers.id,
      name: customers.name,
      tier: customers.tier,
      createdAt: customers.createdAt,
      primaryContact: customers.primaryContact,
      contactEmail: customers.contactEmail,
      location: customers.location,
      healthScore: customers.healthScore,
      shipments: sql<number>`count(${shipments.id})`,
      revenueInr: sql<number>`coalesce(sum(${shipments.valueInr}), 0)`,
    })
    .from(customers)
    .leftJoin(
      shipments,
      and(eq(shipments.customerId, customers.id), gte(shipments.createdAt, yearAgo)),
    )
    .groupBy(customers.id)
    .orderBy(sql`coalesce(sum(${shipments.valueInr}), 0) desc`);

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    tier: r.tier ?? "silver",
    since: String(r.createdAt.getFullYear()),
    shipments: Number(r.shipments),
    revenueInr: Number(r.revenueInr),
    contact: r.primaryContact,
    contactEmail: r.contactEmail,
    location: r.location,
    health: r.healthScore ?? 80,
  }));
}

export async function getCustomerTierSummary(): Promise<TierSummary[]> {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) {
    const [allCustomers, allShipments] = await Promise.all([
      supabaseGetAllCustomers(),
      supabaseGetAllShipments(),
    ]);
    return computeCustomerTierSummary(allCustomers, allShipments);
  }

  const yearAgo = addMonths(monthStart(new Date()), -12);

  const rows = await db
    .select({
      tier: customers.tier,
      count: count(customers.id),
      revenueInr: sql<number>`coalesce(sum(${shipments.valueInr}), 0)`,
    })
    .from(customers)
    .leftJoin(
      shipments,
      and(eq(shipments.customerId, customers.id), gte(shipments.createdAt, yearAgo)),
    )
    .groupBy(customers.tier);

  const order: Array<"platinum" | "gold" | "silver"> = ["platinum", "gold", "silver"];
  const map = new Map(rows.map((r) => [r.tier ?? "silver", r]));

  return order.map((tier) => {
    const row = map.get(tier);
    return {
      tier,
      count: row?.count ?? 0,
      revenueInr: Number(row?.revenueInr ?? 0),
    };
  });
}
