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
      className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src="/herosection.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay with backdrop blur */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(circle, rgba(28, 24, 20, 0.4) 0%, rgba(12, 10, 9, 0.8) 100%)",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Logo on the top left corner */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="flex items-center gap-3">
          <div style={{ color: "#FAF8F5" }}>
            <Logo size={36} />
          </div>
          <div>
            <div className="f-display text-2xl" style={{ color: "#FAF8F5" }}>FLYHIGH</div>
            <div className="caption text-[10px]" style={{ color: "var(--brass)" }}>
              COCKPIT
            </div>
          </div>
        </Link>
      </div>

      <div
        className="relative w-full max-w-md rounded-2xl p-10 z-20"
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        }}
      >

        {checkEmail ? (
          <div>
            <h1 className="f-display text-3xl leading-tight">Check your email.</h1>
            <p className="mt-3 text-sm" style={{ color: "var(--ash)" }}>
              We&apos;ve sent a magic-link to your inbox. Click it to finish signing in.
            </p>
          </div>
        ) : (
          <LoginForm callbackUrl={callbackUrl ?? "/admin"} />
        )}
      </div>
    </main>
  );
}
