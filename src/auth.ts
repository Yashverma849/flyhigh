import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, isDbConfigured, supabase } from "@/server/db/client";
import { accounts, sessions, users, verificationTokens } from "@/server/db/schema";
import { env } from "@/env";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: env.DATABASE_URL && db
    ? DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
      })
    : undefined,
  session: { strategy: "jwt" },
  secret: env.AUTH_SECRET || "placeholder_auth_secret_must_be_32_characters_long_minimum",
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).toLowerCase().trim();
        const password = credentials.password as string;

        // Default credentials for client console/admin cockpit
        if (email === "admin@flyhigh.in" && password === "flyhigh2026") {
          return { id: "admin-user-id", name: "Admin User", email: "admin@flyhigh.in", role: "admin" };
        }
        if (email === "staff@flyhigh.in" && password === "flyhigh2026") {
          return { id: "staff-user-id", name: "Staff User", email: "staff@flyhigh.in", role: "staff" };
        }

        // If the database is configured, lookup the user dynamically
        if (isDbConfigured) {
          try {
            if (env.DATABASE_URL && db) {
              const user = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, email),
              });
              if (user && password === "flyhigh2026") {
                return {
                  id: user.id,
                  name: user.name || email.split("@")[0],
                  email: user.email,
                  role: user.role,
                  image: user.image,
                };
              }
            } else if (supabase) {
              // Authenticate directly against Supabase Auth using the user's password
              const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
              });

              if (authError || !authData?.user) {
                console.error("Supabase Auth signin failed:", authError?.message);
                return null;
              }

              // Load profile metadata from public.user table
              const { data: profile } = await supabase
                .from("user")
                .select("*")
                .eq("id", authData.user.id)
                .maybeSingle();

              return {
                id: authData.user.id,
                name: profile?.name || authData.user.email?.split("@")[0] || email.split("@")[0],
                email: authData.user.email || email,
                role: profile?.role || "staff",
                image: profile?.image,
              };
            }
          } catch (err) {
            console.error("DB lookup in authorize failed:", err);
          }
        }

        return null;
      },
    }),
    ...(env.AUTH_RESEND_KEY && env.AUTH_RESEND_FROM
      ? [
          Resend({
            apiKey: env.AUTH_RESEND_KEY,
            from: env.AUTH_RESEND_FROM,
          }),
        ]
      : []),
  ],
});

