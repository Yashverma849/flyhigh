"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";

type Props = { callbackUrl: string };

export function LoginForm({ callbackUrl }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    try {
      await signIn("resend", {
        email: formData.get("email") as string,
        callbackUrl,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@yourcompany.com"
        className="input"
        aria-label="Work email"
      />
      <button type="submit" disabled={pending} className="btn-primary w-full justify-center">
        {pending ? "Sending…" : "Send magic-link"} <ArrowRight size={14} />
      </button>
      {error && (
        <p className="text-sm" style={{ color: "var(--rust)" }}>
          {error}
        </p>
      )}
    </form>
  );
}
