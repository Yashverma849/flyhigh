import "server-only";
import { desc, eq } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured } from "@/server/db/client";
import {
  supabaseGetCaseStudyBySlug,
  supabaseListAllCaseStudies,
} from "@/server/db/supabase-data";
import { caseStudies, type DbCaseStudy } from "@/server/db/schema";
import { type CaseStudy } from "@/server/db/seed/case-studies";

export async function listPublishedCaseStudies(): Promise<readonly CaseStudy[]> {
  if (!isDbConfigured) return [];
  try {
    if (!hasDatabaseUrl || !db) {
      return await supabaseListAllCaseStudies();
    }
    return await db.select().from(caseStudies).orderBy(desc(caseStudies.date));
  } catch (err) {
    console.error("Failed to list case studies from DB", err);
    return [];
  }
}

export async function listAdminCaseStudies(): Promise<DbCaseStudy[]> {
  if (!isDbConfigured) return [];
  try {
    if (!hasDatabaseUrl || !db) {
      return await supabaseListAllCaseStudies();
    }
    return await db.select().from(caseStudies).orderBy(desc(caseStudies.date));
  } catch (err) {
    console.error("Failed to list admin case studies", err);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!isDbConfigured) return null;
  try {
    if (!hasDatabaseUrl || !db) {
      return await supabaseGetCaseStudyBySlug(slug);
    }
    const result = await db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.slug, slug))
      .limit(1);
    return result[0] ?? null;
  } catch (err) {
    console.error("Failed to get case study by slug", err);
    return null;
  }
}
