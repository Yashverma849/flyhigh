/**
 * Seed script — `pnpm db:seed`.
 * Idempotent: re-running upserts the canonical content (insights, services data
 * lives in code, not DB) and inserts demo shipments/customers if missing.
 */
import "dotenv/config";
import { db } from "../client";
import { customers, insights, shipmentEvents, shipments } from "../schema";
import { INSIGHTS } from "./insights";
import { SHIPMENTS_SEED } from "./shipments";

async function main() {
  console.log("Seeding insights…");
  for (const i of INSIGHTS) {
    await db
      .insert(insights)
      .values({
        slug: i.slug,
        title: i.title,
        excerpt: i.excerpt,
        bodyMd: `# ${i.title}\n\n${i.excerpt}\n\n_Body coming soon._`,
        category: i.category,
        heroImage: i.image,
        readMinutes: parseInt(i.read, 10) || 6,
        publishedAt: new Date(i.date),
      })
      .onConflictDoNothing({ target: insights.slug });
  }

  console.log("Seeding customers + shipments…");
  const seenCustomers = new Set<string>();
  const customerMap = new Map<string, string>();

  for (const s of SHIPMENTS_SEED) {
    if (!seenCustomers.has(s.customer)) {
      seenCustomers.add(s.customer);
      const [row] = await db
        .insert(customers)
        .values({ name: s.customer, location: s.origin })
        .returning({ id: customers.id });
      if (row) customerMap.set(s.customer, row.id);
    }
  }

  for (const s of SHIPMENTS_SEED) {
    const mode = (s.mode as string).toLowerCase() as "sea" | "air" | "road";
    await db
      .insert(shipments)
      .values({
        id: s.id,
        customerId: customerMap.get(s.customer) ?? null,
        customerName: s.customer,
        origin: s.origin,
        destination: s.destination,
        mode: mode === "sea" || mode === "air" || mode === "road" ? mode : "sea",
        status: s.status,
        eta: s.eta,
        valueInr: s.valueInr,
      })
      .onConflictDoNothing({ target: shipments.id });

    await db
      .insert(shipmentEvents)
      .values({
        shipmentId: s.id,
        status: "Booked",
        location: s.origin,
        note: "Booking confirmed.",
      })
      .onConflictDoNothing();
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
