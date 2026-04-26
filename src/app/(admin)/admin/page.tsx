import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Box, Package, ShieldCheck, Wallet } from "lucide-react";
import { KPICard } from "@/components/admin/kpi-card";
import { StatusPill } from "@/components/admin/status-pill";
import { ThroughputArea } from "@/components/admin/charts/throughput-area";
import { getRecentShipments } from "@/server/queries/shipments";
import { formatINR } from "@/lib/utils";
import type { ShipmentStatus } from "@/lib/constants";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  // Best-effort fetch — falls back to empty when DB isn't connected (e.g., in
  // a fresh clone with no Neon URL). The cockpit still renders with chart demo data.
  let recent: Awaited<ReturnType<typeof getRecentShipments>> = [];
  try {
    recent = await getRecentShipments(8);
  } catch {
    recent = [];
  }

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
          value="324"
          delta="+12.4%"
          deltaPositive
          icon={Package}
          accent="rgba(210, 105, 30, 0.2)"
        />
        <KPICard
          label="Revenue MTD"
          value={formatINR(8420000)}
          delta="+8.1%"
          deltaPositive
          icon={Wallet}
          accent="rgba(201, 168, 118, 0.2)"
        />
        <KPICard
          label="On-time delivery"
          value="99.4%"
          delta="+0.2%"
          deltaPositive
          icon={ShieldCheck}
          accent="rgba(111, 129, 112, 0.2)"
        />
        <KPICard
          label="In customs"
          value="48"
          delta="-3.0%"
          deltaPositive={false}
          icon={Box}
          accent="rgba(139, 58, 28, 0.2)"
        />
      </section>

      <section
        className="rounded-md border p-6"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="caption" style={{ color: "var(--ash)" }}>
              VOLUME
            </div>
            <h2 className="f-display mt-1 text-2xl">Throughput by mode</h2>
          </div>
          <Link href="/admin/analytics" className="btn-link text-sm">
            Analytics <ArrowUpRight size={14} />
          </Link>
        </div>
        <ThroughputArea />
      </section>

      <section
        className="overflow-hidden rounded-md border"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        <div
          className="flex items-center justify-between border-b p-5"
          style={{ borderColor: "var(--line)" }}
        >
          <div>
            <div className="caption" style={{ color: "var(--ash)" }}>
              RECENT
            </div>
            <h2 className="f-display mt-1 text-2xl">Latest shipments</h2>
          </div>
          <Link href="/admin/shipments" className="btn-link text-sm">
            All shipments <ArrowUpRight size={14} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="caption p-10 text-center" style={{ color: "var(--ash)" }}>
            No shipments yet. Run <span className="f-mono text-[var(--brass)]">pnpm db:seed</span>{" "}
            with a real DATABASE_URL to populate demo data.
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--line)" }}>
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
                className="grid grid-cols-12 items-center gap-4 p-4 transition-colors hover:bg-white/[0.02]"
              >
                <div className="f-mono col-span-3 text-xs">{s.id}</div>
                <div className="col-span-3 text-sm">{s.customerName ?? "—"}</div>
                <div className="col-span-2 text-sm">
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
        )}
      </section>
    </div>
  );
}
