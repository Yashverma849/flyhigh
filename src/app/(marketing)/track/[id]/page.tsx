import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Package } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { getShipmentById, getShipmentEvents } from "@/server/queries/shipments";
import { formatDate, formatINR } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: `Shipment ${id}` };
}

export default async function TrackDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shipment = await getShipmentById(id);
  if (!shipment) notFound();

  const events = await getShipmentEvents(shipment.id);

  const statusKind: "cargo" | "brass" | "sage" | "default" =
    shipment.status === "Delivered"
      ? "sage"
      : shipment.status === "In Transit"
        ? "brass"
        : shipment.status === "Customs"
          ? "cargo"
          : shipment.status === "Exception"
            ? "cargo"
            : "default";

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[960px] px-6 md:px-8">
        <Link href="/track" className="caption u-link mb-6 inline-flex items-center gap-2">
          ← All tracking
        </Link>
        <SectionLabel num="">SHIPMENT</SectionLabel>

        <div className="mt-4 mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="f-mono mb-2 text-sm" style={{ color: "var(--brass)" }}>
              {shipment.id}
            </div>
            <h1 className="f-display flex items-center gap-4 text-[56px] leading-[0.95] tracking-tight md:text-[72px]">
              {shipment.origin}
              <ArrowRight
                size={40}
                style={{ color: "var(--cargo)" }}
                className="hidden md:block"
              />
              <br className="md:hidden" />
              {shipment.destination}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Pill kind={statusKind}>{shipment.status}</Pill>
            <div className="caption" style={{ color: "var(--ash)" }}>
              ETA{" "}
              <span className="f-mono" style={{ color: "var(--bone)" }}>
                {shipment.eta}
              </span>
            </div>
          </div>
        </div>

        {/* Meta grid */}
        <div
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4"
          style={{ background: "var(--line)" }}
        >
          <Cell label="Customer" value={shipment.customerName ?? "—"} />
          <Cell label="Mode" value={shipment.mode.toUpperCase()} />
          <Cell label="Booked" value={formatDate(shipment.createdAt)} />
          <Cell
            label="Declared value"
            value={shipment.valueInr ? formatINR(shipment.valueInr) : "—"}
          />
        </div>

        {/* Timeline */}
        <h2 className="f-display mt-16 mb-6 text-3xl">Timeline</h2>
        <ol className="relative space-y-6 border-l pl-6" style={{ borderColor: "var(--line)" }}>
          {events.length === 0 && (
            <li className="caption" style={{ color: "var(--ash)" }}>
              No events yet — booking just confirmed.
            </li>
          )}
          {events.map((e) => (
            <li key={e.id} className="relative">
              <span
                className="absolute -left-[31px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full"
                style={{ background: "var(--cargo)" }}
              >
                <Package size={8} className="opacity-0" />
              </span>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">{e.status}</div>
                  {e.location && (
                    <div className="caption mt-1 flex items-center gap-1" style={{ color: "var(--ash)" }}>
                      <MapPin size={10} /> {e.location}
                    </div>
                  )}
                  {e.note && (
                    <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
                      {e.note}
                    </p>
                  )}
                </div>
                <div className="caption f-mono shrink-0" style={{ color: "var(--brass)" }}>
                  {formatDate(e.occurredAt, { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6" style={{ background: "var(--ink-2)" }}>
      <div className="caption" style={{ color: "var(--brass)" }}>
        {label}
      </div>
      <div className="f-display mt-2 text-2xl">{value}</div>
    </div>
  );
}
