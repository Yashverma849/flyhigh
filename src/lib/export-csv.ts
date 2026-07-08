import type { Shipment } from "@/server/db/schema";

function escapeCsvCell(value: string | number | null | undefined) {
  if (value == null) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function formatCsvDate(value: Date | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

export function exportShipmentsCsv(shipments: Shipment[], filenamePrefix = "flyhigh-shipments") {
  const headers = [
    "Reference",
    "Customer",
    "Origin",
    "Destination",
    "Mode",
    "ETA",
    "Declared value (INR)",
    "Status",
    "Promised at",
    "Delivered at",
    "Created at",
    "Updated at",
  ];

  const rows = shipments.map((s) =>
    [
      s.id,
      s.customerName,
      s.origin,
      s.destination,
      s.mode.toUpperCase(),
      s.eta,
      s.valueInr,
      s.status,
      formatCsvDate(s.promisedAt),
      formatCsvDate(s.deliveredAt),
      formatCsvDate(s.createdAt),
      formatCsvDate(s.updatedAt),
    ]
      .map(escapeCsvCell)
      .join(","),
  );

  const csv = `\uFEFF${headers.join(",")}\n${rows.join("\n")}`;
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${filenamePrefix}-${stamp}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export type CustomerExportRow = {
  name: string;
  tier: string;
  since: string;
  shipments: number;
  revenueInr: number;
  contact: string | null;
  contactEmail: string | null;
  location: string | null;
  health: number;
};

export function exportCustomersCsv(
  customers: CustomerExportRow[],
  filenamePrefix = "flyhigh-customers",
) {
  const headers = [
    "Customer",
    "Tier",
    "Customer since",
    "Shipments (12mo)",
    "Revenue (12mo INR)",
    "Primary contact",
    "Contact email",
    "Location",
    "Account health",
  ];

  const rows = customers.map((c) =>
    [
      c.name,
      c.tier,
      c.since,
      c.shipments,
      c.revenueInr,
      c.contact,
      c.contactEmail,
      c.location,
      c.health,
    ]
      .map(escapeCsvCell)
      .join(","),
  );

  const csv = `\uFEFF${headers.join(",")}\n${rows.join("\n")}`;
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${filenamePrefix}-${stamp}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
