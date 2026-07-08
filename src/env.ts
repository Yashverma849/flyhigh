import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // Postgres connection string (Supabase: Project Settings → Database → URI)
    DATABASE_URL: z.url().optional(),

    // Auth temporarily disabled — these are optional until auth is re-enabled.
    AUTH_SECRET: z.string().min(32).optional(),
    AUTH_URL: z.url().optional(),
    AUTH_TRUST_HOST: z
      .string()
      .optional()
      .transform((v) => v === "true"),

    AUTH_RESEND_KEY: z.string().min(1).optional(),
    AUTH_RESEND_FROM: z.string().min(1).optional(),

    UPSTASH_REDIS_REST_URL: z.url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    SENTRY_DSN: z.url().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),

    SUPABASE_URL: z.string().url().optional(),
    SUPABASE_SERVICE_KEY: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.url().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL:
      process.env.DATABASE_URL ||
      process.env.SUPABASE_DB_URL ||
      process.env.supabase_db_url,
    AUTH_SECRET: process.env.AUTH_SECRET || process.env.SUPABASE_SERVICE_KEY || process.env.supabase_service_key,
    AUTH_URL: process.env.AUTH_URL,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    AUTH_RESEND_FROM: process.env.AUTH_RESEND_FROM,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.supabase_url,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY || process.env.supabase_service_key,
  },
  emptyStringAsUndefined: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
