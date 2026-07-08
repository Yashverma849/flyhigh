import "server-only";

/** FH-YYMM-NNNNNN — e.g. FH-2607-000609 */
export function shipmentIdPrefix(date = new Date()) {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `FH-${yy}${mm}-`;
}

export function formatShipmentId(prefix: string, sequence: number) {
  return `${prefix}${String(sequence).padStart(6, "0")}`;
}

export function parseShipmentSequence(id: string, prefix: string) {
  if (!id.startsWith(prefix)) return 0;
  const seq = Number.parseInt(id.slice(prefix.length), 10);
  return Number.isFinite(seq) ? seq : 0;
}
