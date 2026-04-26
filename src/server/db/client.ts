import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { env } from "@/env";

// Database temporarily disabled. When DATABASE_URL is unset, the placeholder
// keeps module-load working and `isDbConfigured` lets queries/actions
// short-circuit instead of hitting a fake host. Reconnect by setting
// DATABASE_URL — no further code changes required.
export const isDbConfigured = Boolean(env.DATABASE_URL);

const url =
  env.DATABASE_URL ||
  "postgres://build-placeholder:build-placeholder@localhost:5432/build-placeholder";

const sql = neon(url);

export const db: NeonHttpDatabase<typeof schema> = drizzle(sql, {
  schema,
  casing: "snake_case",
});

export type Db = typeof db;
