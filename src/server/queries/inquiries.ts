import "server-only";
import { desc } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured } from "@/server/db/client";
import {
  supabaseGetAllContactSubmissions,
  supabaseGetAllQuotes,
  supabaseGetRecentContactSubmissions,
  supabaseGetRecentQuotes,
} from "@/server/db/supabase-data";
import { contactSubmissions, quotes } from "@/server/db/schema";

export async function getRecentQuotes(limit = 5) {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) return supabaseGetRecentQuotes(limit);
  return db.select().from(quotes).orderBy(desc(quotes.createdAt)).limit(limit);
}

export async function getRecentContactSubmissions(limit = 5) {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) return supabaseGetRecentContactSubmissions(limit);
  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(limit);
}

export async function getAllQuotes() {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) return supabaseGetAllQuotes();
  return db.select().from(quotes).orderBy(desc(quotes.createdAt));
}

export async function getAllContactSubmissions() {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) return supabaseGetAllContactSubmissions();
  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}
