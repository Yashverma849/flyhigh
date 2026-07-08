import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// The `authorized` callback in authConfig handles the gate; we just export
// the bound middleware so Next.js picks it up.
export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  matcher: ["/admin/:path*"],
};

