import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Edit3, MapPin } from "lucide-react";
import { StatusPill } from "@/components/admin/status-pill";
import type { ShipmentStatus } from "@/lib/constants";
import { formatDate, formatINR } from "@/lib/utils";
import { getShipmentById, getShipmentEvents } from "@/server/queries/shipments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: `${id} · Shipment` };
}

export default async function AdminShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shipment = await getShipmentById(id);
  if (!shipment) notFound();

  const events = await getShipmentEvents(shipment.id);

  return (
    <div className="space-y-8">
      <Link href="/admin/shipments" className="caption u-link flex items-center gap-1.5">
        <ChevronLeft size={12} /> ALL SHIPMENTS
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="caption mb-2" style={{ color: "var(--cargo)" }}>
            {shipment.id}
          </div>
          <h1 className="f-display text-[40px] leading-tight">
            {shipment.origin} → {shipment.destination}
          </h1>
          <p className="caption mt-2" style={{ color: "var(--ash)" }}>
            Booked {formatDate(shipment.createdAt)} · Last update{" "}
            {formatDate(shipment.updatedAt, { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusPill status={shipment.status as ShipmentStatus} />
          <button type="button" className="btn-ghost flex items-center gap-2 text-sm">
            <Edit3 size={13} /> Edit
          </button>
        </div>
      </header>

      <div
        className="grid grid-cols-2 gap-px overflow-hidden rounded-md md:grid-cols-4"
        style={{ background: "var(--line)" }}
      >
        {[
          { l: "CUSTOMER", v: shipment.customerName ?? "—" },
          { l: "MODE", v: shipment.mode.toUpperCase() },
          { l: "ETA", v: shipment.eta ?? "—" },
          {
            l: "DECLARED VALUE",
            v: shipment.valueInr ? formatINR(shipment.valueInr) : "—",
          },
        ].map((m) => (
          <div key={m.l} className="p-6" style={{ background: "var(--ink-2)" }}>
            <div className="caption" style={{ color: "var(--brass)" }}>
              {m.l}
            </div>
            <div className="f-display mt-2 text-2xl">{m.v}</div>
          </div>
        ))}
      </div>

      <section
        className="rounded-md border p-6"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="caption" style={{ color: "var(--ash)" }}>
              EVENTS
            </div>
            <h2 className="f-display mt-1 text-2xl">Timeline</h2>
          </div>
          <button type="button" className="btn-primary text-sm">
            Add event
          </button>
        </div>
        <ol className="relative space-y-6 border-l pl-6" style={{ borderColor: "var(--line)" }}>
          {events.length === 0 && (
            <li className="caption" style={{ color: "var(--ash)" }}>
              No events recorded yet.
            </li>
          )}
          {events.map((e) => (
            <li key={e.id} className="relative">
              <span
                className="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full"
                style={{ background: "var(--cargo)" }}
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">{e.status}</div>
                  {e.location && (
                    <div
                      className="caption mt-1 flex items-center gap-1"
                      style={{ color: "var(--ash)" }}
                    >
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
      </section>
    </div>
  );
}
