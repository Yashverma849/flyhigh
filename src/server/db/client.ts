import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { env } from "@/env";

// During `next build`, page-data collection imports modules that transitively
// import the DB client. Without a real DATABASE_URL set, neon() throws.
// Use a syntactically-valid placeholder so module-load succeeds; real queries
// still surface a connection error at runtime.
const url =
  env.DATABASE_URL ||
  "postgres://build-placeholder:build-placeholder@localhost:5432/build-placeholder";

const sql = neon(url);

export const db: NeonHttpDatabase<typeof schema> = drizzle(sql, {
  schema,
  casing: "snake_case",
});

export type Db = typeof db;
