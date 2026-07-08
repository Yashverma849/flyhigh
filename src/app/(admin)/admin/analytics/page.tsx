import type { Metadata } from "next";
import { Activity, Boxes, ShieldCheck, Wallet } from "lucide-react";
import { KPICard } from "@/components/admin/kpi-card";
import { ThroughputArea } from "@/components/admin/charts/throughput-area";
import { RevenueBar } from "@/components/admin/charts/revenue-bar";
import { ModePie } from "@/components/admin/charts/mode-pie";
import {
  getAnalyticsKPIs,
  getModeDistribution,
  getRevenueByMonth,
  getThroughputByMode,
} from "@/server/queries/dashboard";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = { title: "Analytics" };

export default async function AdminAnalyticsPage() {
  let kpis: Awaited<ReturnType<typeof getAnalyticsKPIs>> | null = null;
  let throughput: Awaited<ReturnType<typeof getThroughputByMode>> = [];
  let modeData: Awaited<ReturnType<typeof getModeDistribution>> = [];
  let revenue: Awaited<ReturnType<typeof getRevenueByMonth>> = [];

  try {
    [kpis, throughput, modeData, revenue] = await Promise.all([
      getAnalyticsKPIs(),
      getThroughputByMode(),
      getModeDistribution(),
      getRevenueByMonth(),
    ]);
  } catch {
    kpis = null;
    throughput = [];
    modeData = [];
    revenue = [];
  }

  const stats = kpis ?? {
    volumeMtd: 0,
    volumeMtdDelta: { text: "0%", positive: true },
    revenueMtd: 0,
    revenueMtdDelta: { text: "0%", positive: true },
    onTimeRate: null,
    onTimeDelta: { text: "—", positive: true },
    avgTransitDays: null,
    avgTransitDelta: { text: "—", positive: true },
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="f-display text-4xl">Analytics</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
          Operational health at a glance — volume, revenue, and on-time delivery.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPICard
          label="Volume MTD"
          value={String(stats.volumeMtd)}
          delta={stats.volumeMtdDelta.text}
          deltaPositive={stats.volumeMtdDelta.positive}
          icon={Boxes}
          accent="var(--cargo-border-20)"
        />
        <KPICard
          label="Revenue MTD"
          value={formatINR(stats.revenueMtd)}
          delta={stats.revenueMtdDelta.text}
          deltaPositive={stats.revenueMtdDelta.positive}
          icon={Wallet}
          accent="var(--brass-border-20)"
        />
        <KPICard
          label="On-time"
          value={stats.onTimeRate != null ? `${stats.onTimeRate.toFixed(1)}%` : "—"}
          delta={stats.onTimeDelta.text}
          deltaPositive={stats.onTimeDelta.positive}
          icon={ShieldCheck}
          accent="var(--sage-border-20)"
        />
        <KPICard
          label="Avg transit"
          value={stats.avgTransitDays != null ? `${stats.avgTransitDays.toFixed(1)}d` : "—"}
          delta={stats.avgTransitDelta.text}
          deltaPositive={stats.avgTransitDelta.positive}
          icon={Activity}
          accent="var(--rust-border-20)"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section
          className="rounded-md border p-6 lg:col-span-2"
          style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
        >
          <div className="caption" style={{ color: "var(--ash)" }}>
            VOLUME
          </div>
          <h2 className="f-display mt-1 mb-6 text-2xl">Throughput by mode</h2>
          <ThroughputArea data={throughput} />
        </section>
        <section
          className="rounded-md border p-6"
          style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
        >
          <div className="caption" style={{ color: "var(--ash)" }}>
            DISTRIBUTION
          </div>
          <h2 className="f-display mt-1 mb-6 text-2xl">By mode</h2>
          <ModePie data={modeData} />
        </section>
      </div>

      <section
        className="rounded-md border p-6"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        <div className="caption" style={{ color: "var(--ash)" }}>
          MONEY
        </div>
        <h2 className="f-display mt-1 mb-6 text-2xl">Revenue by month (₹ lakh)</h2>
        <RevenueBar data={revenue} />
      </section>
    </div>
  );
}
