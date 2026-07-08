import "server-only";
import { asc, eq } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured } from "@/server/db/client";
import {
  supabaseGetUserByEmail,
  supabaseGetUserById,
  supabaseListUsers,
} from "@/server/db/supabase-data";
import { users } from "@/server/db/schema";
import type { User } from "@/server/db/schema";

const DEMO_USER_IDS = new Set(["admin-user-id", "staff-user-id"]);

export async function getUserById(id: string): Promise<User | null> {
  if (!isDbConfigured || DEMO_USER_IDS.has(id)) return null;
  if (!hasDatabaseUrl || !db) return supabaseGetUserById(id);
  const row = await db.query.users.findFirst({ where: eq(users.id, id) });
  return row ?? null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  if (!isDbConfigured) return null;
  const normalized = email.toLowerCase().trim();
  if (!hasDatabaseUrl || !db) return supabaseGetUserByEmail(normalized);
  const row = await db.query.users.findFirst({ where: eq(users.email, normalized) });
  return row ?? null;
}

export async function getCurrentUserProfile(input: {
  id?: string | null;
  email?: string | null;
}): Promise<User | null> {
  if (input.id && !DEMO_USER_IDS.has(input.id)) {
    const byId = await getUserById(input.id);
    if (byId) return byId;
  }
  if (input.email) return getUserByEmail(input.email);
  return null;
}

export async function listTeamMembers(): Promise<User[]> {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) return supabaseListUsers();
  return db.select().from(users).orderBy(asc(users.createdAt));
}

export function formatUserRole(role: User["role"] | string | null | undefined) {
  if (!role) return "Staff";
  const normalized = String(role).trim();
  if (!normalized) return "Staff";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
