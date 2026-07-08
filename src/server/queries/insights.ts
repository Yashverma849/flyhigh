import "server-only";
import { desc, eq, isNotNull } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured } from "@/server/db/client";
import {
  supabaseGetInsightBySlug,
  supabaseListAllInsights,
  supabaseListPublishedInsights,
} from "@/server/db/supabase-data";
import { insights, type InsightRow } from "@/server/db/schema";

export type MappedInsight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  bodyMd: string;
  category: InsightRow["category"];
  image: string;
  read: string;
  date: string;
};

export function mapInsightRow(row: InsightRow): MappedInsight {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    bodyMd: row.bodyMd,
    category: row.category,
    image: row.heroImage || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600",
    read: `${row.readMinutes} min`,
    date: row.publishedAt ? (row.publishedAt.toISOString().split("T")[0] ?? "") : "",
  };
}

export async function listPublishedInsights(): Promise<MappedInsight[]> {
  if (!isDbConfigured) return [];
  try {
    let rows: InsightRow[] = [];
    if (!hasDatabaseUrl || !db) {
      rows = await supabaseListPublishedInsights();
    } else {
      rows = await db
        .select()
        .from(insights)
        .where(isNotNull(insights.publishedAt))
        .orderBy(desc(insights.publishedAt));
    }
    return rows.map(mapInsightRow);
  } catch (err) {
    console.error("Failed to list published insights", err);
    return [];
  }
}

export async function listAdminInsights(): Promise<InsightRow[]> {
  if (!isDbConfigured) return [];
  try {
    if (!hasDatabaseUrl || !db) {
      return await supabaseListAllInsights();
    }
    return await db.select().from(insights).orderBy(desc(insights.createdAt));
  } catch (err) {
    console.error("Failed to list admin insights", err);
    return [];
  }
}

export async function getInsightBySlug(slug: string): Promise<MappedInsight | null> {
  if (!isDbConfigured) return null;
  try {
    let row: InsightRow | null = null;
    if (!hasDatabaseUrl || !db) {
      row = await supabaseGetInsightBySlug(slug);
    } else {
      const result = await db
        .select()
        .from(insights)
        .where(eq(insights.slug, slug))
        .limit(1);
      row = result[0] ?? null;
    }
    return row ? mapInsightRow(row) : null;
  } catch (err) {
    console.error("Failed to get insight by slug", err);
    return null;
  }
}

export async function getRelatedInsights(
  slug: string,
  category: string,
  limit: number = 3,
): Promise<MappedInsight[]> {
  try {
    const all = await listPublishedInsights();
    return all
      .filter((i) => i.slug !== slug && i.category === category)
      .concat(all.filter((i) => i.slug !== slug && i.category !== category))
      .slice(0, limit);
  } catch (err) {
    console.error("Failed to get related insights", err);
    return [];
  }
}
