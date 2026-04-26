import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe portion of the Auth.js config.
 * Used by `middleware.ts` (Edge runtime) — must NOT import the DB adapter,
 * Resend client, or anything Node-only.
 *
 * The full config (with adapter + providers) lives in `src/auth.ts`.
 */
export const authConfig = {
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
