import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/env";

let publicLimiter: Ratelimit | null = null;

/**
 * Public-form rate limiter (IP-based) for /quote, /contact, /track Server Actions.
 * No-op when Upstash env vars aren't configured — call sites must check the
 * `enabled` flag before relying on it.
 */
export function getPublicLimiter() {
  if (publicLimiter) return publicLimiter;
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) return null;

  publicLimiter = new Ratelimit({
    redis: new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "rl:public",
  });
  return publicLimiter;
}

export async function consumePublicLimit(identifier: string) {
  const limiter = getPublicLimiter();
  if (!limiter) return { success: true, limit: Infinity, remaining: Infinity, reset: 0 };
  return limiter.limit(identifier);
}
