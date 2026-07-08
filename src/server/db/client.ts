import postgres from "postgres";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { createClient } from "@supabase/supabase-js";
import * as schema from "./schema";
import { env } from "@/env";

export const hasDatabaseUrl = Boolean(env.DATABASE_URL);

export const supabase =
  env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY
    ? createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
        auth: { persistSession: false },
      })
    : null;

/** True when Drizzle (DATABASE_URL) or Supabase service client is available. */
export const isDbConfigured = hasDatabaseUrl || Boolean(supabase);

function createDrizzleClient(): PostgresJsDatabase<typeof schema> | null {
  if (!env.DATABASE_URL) return null;

  const client = postgres(env.DATABASE_URL, {
    prepare: false,
    ssl: env.DATABASE_URL.includes("supabase") ? "require" : undefined,
  });

  return drizzle(client, { schema, casing: "snake_case" });
}

export const db = createDrizzleClient();

/** Drizzle client — throws if DATABASE_URL is not configured. */
export function requireDb(): Db {
  if (!db) {
    throw new Error("DATABASE_URL is required. Add your Supabase Postgres URI to .env.local.");
  }
  return db;
}

export type Db = NonNullable<typeof db>;
