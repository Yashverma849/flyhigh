import type { Metadata } from "next";
import { Activity, Boxes, ShieldCheck, Wallet } from "lucide-react";
import { KPICard } from "@/components/admin/kpi-card";
import { ThroughputArea } from "@/components/admin/charts/throughput-area";
import { RevenueBar } from "@/components/admin/charts/revenue-bar";
import { ModePie } from "@/components/admin/charts/mode-pie";

export const metadata: Metadata = { title: "Analytics" };

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="caption mb-2" style={{ color: "var(--cargo)" }}>
          04 · LEDGER
        </div>
        <h1 className="f-display text-4xl">Analytics</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
          Operational health at a glance — volume, revenue, and on-time delivery.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPICard
          label="Volume MTD"
          value="894"
          delta="+11.2%"
          deltaPositive
          icon={Boxes}
          accent="var(--cargo-border-20)"
        />
        <KPICard
          label="Revenue MTD"
          value="₹114.4 L"
          delta="+13.1%"
          deltaPositive
          icon={Wallet}
          accent="var(--brass-border-20)"
        />
        <KPICard
          label="On-time"
          value="99.4%"
          delta="+0.2%"
          deltaPositive
          icon={ShieldCheck}
          accent="var(--sage-border-20)"
        />
        <KPICard
          label="Avg transit"
          value="14.2d"
          delta="-0.8d"
          deltaPositive
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
          <ThroughputArea />
        </section>
        <section
          className="rounded-md border p-6"
          style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
        >
          <div className="caption" style={{ color: "var(--ash)" }}>
            DISTRIBUTION
          </div>
          <h2 className="f-display mt-1 mb-6 text-2xl">By mode</h2>
          <ModePie />
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
        <RevenueBar />
      </section>
    </div>
  );
}
