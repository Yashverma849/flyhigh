/**
 * Next.js instrumentation hook (Node + Edge).
 * Initializes Sentry only when SENTRY_DSN is configured — keeps fresh clones
 * and CI builds from depending on third-party env.
 *
 * https://nextjs.org/docs/app/guides/instrumentation
 */
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (!process.env.SENTRY_DSN) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
