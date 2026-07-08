import "server-only";
import { desc, eq, isNotNull } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured } from "@/server/db/client";
import {
  supabaseGetInsightBySlug,
  supabaseListAllInsights,
  supabaseListPublishedInsights,
} from "@/server/db/supabase-data";
import { insights } from "@/server/db/schema";

export async function listPublishedInsights() {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) return supabaseListPublishedInsights();
  return db
    .select()
    .from(insights)
    .where(isNotNull(insights.publishedAt))
    .orderBy(desc(insights.publishedAt));
}

export async function listAdminInsights() {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) return supabaseListAllInsights();
  return db.select().from(insights).orderBy(desc(insights.createdAt));
}

export async function getInsightBySlug(slug: string) {
  if (!isDbConfigured) return null;
  if (!hasDatabaseUrl || !db) return supabaseGetInsightBySlug(slug);
  const result = await db.select().from(insights).where(eq(insights.slug, slug)).limit(1);
  return result[0] ?? null;
}
