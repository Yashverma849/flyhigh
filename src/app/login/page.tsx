import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/shared/svg";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; callbackUrl?: string }>;
}) {
  const { status, callbackUrl } = await searchParams;
  const checkEmail = status === "check-email";

  return (
    <main
      className="topo flex min-h-screen items-center justify-center px-6"
      style={{ background: "var(--ink)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-10"
        style={{ background: "var(--ink-2)", border: "1px solid var(--line)" }}
      >
        <Link href="/" className="mb-8 flex items-center gap-3">
          <Logo size={36} />
          <div>
            <div className="f-display text-2xl">FLYHIGH</div>
            <div className="caption text-[10px]" style={{ color: "var(--brass)" }}>
              COCKPIT
            </div>
          </div>
        </Link>

        {checkEmail ? (
          <div>
            <h1 className="f-display text-3xl leading-tight">Check your email.</h1>
            <p className="mt-3 text-sm" style={{ color: "var(--ash)" }}>
              We&apos;ve sent a magic-link to your inbox. Click it to finish signing in.
            </p>
          </div>
        ) : (
          <>
            <h1 className="f-display text-3xl leading-tight">Sign in to the cockpit.</h1>
            <p className="mt-3 mb-8 text-sm" style={{ color: "var(--ash)" }}>
              Enter your work email. We&apos;ll send a magic-link — no password to remember.
            </p>
            <LoginForm callbackUrl={callbackUrl ?? "/admin"} />
          </>
        )}
      </div>
    </main>
  );
}
