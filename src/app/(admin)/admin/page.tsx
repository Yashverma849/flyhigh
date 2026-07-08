import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Box, Package, ShieldCheck, Wallet } from "lucide-react";
import { KPICard } from "@/components/admin/kpi-card";
import { StatusPill } from "@/components/admin/status-pill";
import { ThroughputArea } from "@/components/admin/charts/throughput-area";
import { getDashboardKPIs, getThroughputByMode } from "@/server/queries/dashboard";
import { getRecentShipments } from "@/server/queries/shipments";
import { formatINR } from "@/lib/utils";
import type { ShipmentStatus } from "@/lib/constants";

export const metadata: Metadata = { title: "Dashboard" };

const DASHBOARD_RECENT_SHIPMENTS = 4;

export default async function AdminDashboard() {
  let recent: Awaited<ReturnType<typeof getRecentShipments>> = [];
  let kpis: Awaited<ReturnType<typeof getDashboardKPIs>> | null = null;
  let throughput: Awaited<ReturnType<typeof getThroughputByMode>> = [];

  try {
    [recent, kpis, throughput] = await Promise.all([
      getRecentShipments(DASHBOARD_RECENT_SHIPMENTS),
      getDashboardKPIs(),
      getThroughputByMode(),
    ]);
  } catch {
    recent = [];
    kpis = null;
    throughput = [];
  }

  const stats = kpis ?? {
    activeShipments: 0,
    activeShipmentsDelta: { text: "0%", positive: true },
    revenueMtd: 0,
    revenueMtdDelta: { text: "0%", positive: true },
    onTimeRate: null,
    onTimeDelta: { text: "—", positive: true },
    inCustoms: 0,
    inCustomsDelta: { text: "0%", positive: true },
  };

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="f-display text-[40px] leading-tight">Cockpit</h1>
          <p className="caption mt-1" style={{ color: "var(--ash)" }}>
            Operations · Mumbai · {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPICard
          label="Active shipments"
          value={String(stats.activeShipments)}
          delta={stats.activeShipmentsDelta.text}
          deltaPositive={stats.activeShipmentsDelta.positive}
          icon={Package}
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
          label="On-time delivery"
          value={stats.onTimeRate != null ? `${stats.onTimeRate.toFixed(1)}%` : "—"}
          delta={stats.onTimeDelta.text}
          deltaPositive={stats.onTimeDelta.positive}
          icon={ShieldCheck}
          accent="var(--sage-border-20)"
        />
        <KPICard
          label="In customs"
          value={String(stats.inCustoms)}
          delta={stats.inCustomsDelta.text}
          deltaPositive={stats.inCustomsDelta.positive}
          icon={Box}
          accent="var(--rust-border-20)"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:items-stretch">
        <div
          className="flex h-full flex-col rounded-md border p-6"
          style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="caption" style={{ color: "var(--ash)" }}>
                VOLUME
              </div>
              <h2 className="f-display mt-1 text-2xl">Throughput by mode</h2>
            </div>
            <Link href="/admin/analytics" className="btn-link shrink-0 text-sm">
              Analytics <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="flex-1">
            <ThroughputArea data={throughput} />
          </div>
        </div>

        <div
          className="flex h-full flex-col overflow-hidden rounded-md border"
          style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
        >
          <div
            className="flex shrink-0 items-center justify-between gap-4 border-b p-6 pb-5"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <div className="caption" style={{ color: "var(--ash)" }}>
                RECENT
              </div>
              <h2 className="f-display mt-1 text-2xl">Latest shipments</h2>
            </div>
            <Link href="/admin/shipments" className="btn-link shrink-0 text-sm">
              All shipments <ArrowUpRight size={14} />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div
              className="caption flex flex-1 items-center justify-center p-10 text-center"
              style={{ color: "var(--ash)", minHeight: 280 }}
            >
              No shipments yet. Add data via Supabase or run{" "}
              <span className="f-mono text-[var(--brass)]">pnpm db:seed</span>.
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto overflow-y-hidden">
              <div className="min-w-[36rem] divide-y" style={{ borderColor: "var(--line)" }}>
                <div
                  className="caption grid grid-cols-12 gap-4 border-b p-4"
                  style={{ borderColor: "var(--line)", color: "var(--brass)" }}
                >
                  <div className="col-span-3">SHIPMENT</div>
                  <div className="col-span-3">CUSTOMER</div>
                  <div className="col-span-2">ROUTE</div>
                  <div className="col-span-2">STATUS</div>
                  <div className="col-span-2 text-right">VALUE</div>
                </div>
                {recent.map((s) => (
                  <Link
                    key={s.id}
                    href={`/admin/shipments/${s.id}`}
                    className="grid grid-cols-12 items-center gap-4 p-4 transition-colors hover:bg-[var(--surface-tint-2)]"
                  >
                    <div className="f-mono col-span-3 text-xs">{s.id}</div>
                    <div className="col-span-3 truncate text-sm">{s.customerName ?? "—"}</div>
                    <div className="col-span-2 truncate text-sm">
                      {s.origin} → {s.destination}
                    </div>
                    <div className="col-span-2">
                      <StatusPill status={s.status as ShipmentStatus} />
                    </div>
                    <div className="f-mono tabular col-span-2 text-right text-sm">
                      {s.valueInr ? formatINR(s.valueInr) : "—"}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
