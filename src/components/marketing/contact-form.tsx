"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/server/actions/contact";
import type { ActionState } from "@/server/actions/quote";

const initial: ActionState = { status: "idle" };

const SERVICE_OPTIONS = [
  "Sea Freight",
  "Air Freight",
  "Customs Clearance",
  "Warehousing",
  "Road Freight",
  "ATA Carnet",
] as const;

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

  async function handleSubmit(formData: FormData) {
    const first = String(formData.get("firstName") ?? "").trim();
    const last = String(formData.get("lastName") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    formData.set("name", [first, last].filter(Boolean).join(" "));
    formData.delete("firstName");
    formData.delete("lastName");

    if (service) {
      formData.set("message", `Service interest: ${service}\n\n${message}`);
    }
    formData.delete("service");

    return action(formData);
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {state.status === "error" && !fieldErrors && (
        <div
          className="rounded-xl p-4 text-sm"
          style={{
            background: "var(--rust-tint-10)",
            border: "1px solid var(--rust-border-40)",
          }}
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="First Name"
          name="firstName"
          required
          errors={fieldErrors?.name}
        />
        <Field label="Last Name" name="lastName" required errors={fieldErrors?.name} />
      </div>

      <Field
        label="Email Address"
        name="email"
        type="email"
        required
        autoComplete="email"
        errors={fieldErrors?.email}
      />

      <Select label="Which services are you looking for?" name="service">
        <option value="">Select a service</option>
        {SERVICE_OPTIONS.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </Select>

      <div>
        <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
          Comment or Message
          <span style={{ color: "var(--cargo)" }}> *</span>
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Origin, destination, mode, deadlines — anything that helps us route you."
          className="input"
          aria-invalid={Boolean(fieldErrors?.message)}
        />
        {fieldErrors?.message?.[0] && (
          <p className="mt-1 text-xs" style={{ color: "var(--rust)" }}>
            {fieldErrors.message[0]}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className="btn-primary w-full justify-center">
        {pending ? "Sending…" : "Send Message"} <ArrowRight size={14} />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
        {label}
        {required && <span style={{ color: "var(--cargo)" }}> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="input"
        aria-invalid={Boolean(errors?.length)}
      />
      {errors?.[0] && (
        <p className="mt-1 text-xs" style={{ color: "var(--rust)" }}>
          {errors[0]}
        </p>
      )}
    </div>
  );
}

function Select({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
        {label}
      </label>
      <select name={name} className="input" defaultValue="">
        {children}
      </select>
    </div>
  );
}
