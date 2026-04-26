import "server-only";
import { desc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/server/db/client";
import { insights } from "@/server/db/schema";

export async function listPublishedInsights() {
  return db
    .select()
    .from(insights)
    .where(isNotNull(insights.publishedAt))
    .orderBy(desc(insights.publishedAt));
}

export async function getInsightBySlug(slug: string) {
  const result = await db.select().from(insights).where(eq(insights.slug, slug)).limit(1);
  return result[0] ?? null;
}
