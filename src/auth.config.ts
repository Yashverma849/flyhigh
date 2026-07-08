import type { NextAuthConfig } from "next-auth";

/** Shared secret for JWT sessions — must match `src/auth.ts` and work on Edge middleware. */
export const authSecret =
  process.env.AUTH_SECRET ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.supabase_service_key ||
  "placeholder_auth_secret_must_be_32_characters_long_minimum";

/**
 * Edge-safe portion of the Auth.js config.
 * Used by `middleware.ts` (Edge runtime) — must NOT import the DB adapter,
 * Resend client, or anything Node-only.
 *
 * The full config (with adapter + providers) lives in `src/auth.ts`.
 */
export const authConfig = {
  secret: authSecret,
  trustHost: true,
  pages: {
    signIn: "/login",
    verifyRequest: "/login?status=check-email",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      if (isOnAdmin) return isLoggedIn;
      return true;
    },
    session({ session, token }) {
      if (session.user && token.role) {
        (session.user as typeof session.user & { role?: string }).role = token.role as string;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "staff";
      }
      return token;
    },
  },
  providers: [], // Real providers added in src/auth.ts
} satisfies NextAuthConfig;
