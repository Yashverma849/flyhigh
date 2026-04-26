"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/server/actions/contact";
import type { ActionState } from "@/server/actions/quote";

const initial: ActionState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{ background: "var(--ink-2)", border: "1px solid var(--line)" }}
      >
        <CheckCircle2 size={48} style={{ color: "var(--cargo)" }} className="mx-auto mb-4" />
        <h2 className="f-display text-3xl">Got it.</h2>
        <p className="mt-3 text-sm" style={{ color: "var(--ash)" }}>
          We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={action} className="space-y-4">
      {state.status === "error" && !fieldErrors && (
        <div
          className="rounded-xl p-4 text-sm"
          style={{
            background: "rgba(139, 58, 28, 0.1)",
            border: "1px solid rgba(139, 58, 28, 0.4)",
          }}
        >
          {state.message}
        </div>
      )}
      <input
        name="name"
        type="text"
        required
        autoComplete="name"
        placeholder="Your name"
        className="input"
        aria-invalid={Boolean(fieldErrors?.name)}
      />
      {fieldErrors?.name?.[0] && (
        <p className="text-xs" style={{ color: "var(--rust)" }}>
          {fieldErrors.name[0]}
        </p>
      )}
      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Work email"
        className="input"
        aria-invalid={Boolean(fieldErrors?.email)}
      />
      {fieldErrors?.email?.[0] && (
        <p className="text-xs" style={{ color: "var(--rust)" }}>
          {fieldErrors.email[0]}
        </p>
      )}
      <textarea
        name="message"
        rows={6}
        required
        placeholder="Origin, destination, mode, deadlines — anything that helps us route you."
        className="input"
        aria-invalid={Boolean(fieldErrors?.message)}
      />
      {fieldErrors?.message?.[0] && (
        <p className="text-xs" style={{ color: "var(--rust)" }}>
          {fieldErrors.message[0]}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Sending…" : "Send"} <ArrowRight size={14} />
      </button>
    </form>
  );
}
