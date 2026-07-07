"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { createQuote, type ActionState } from "@/server/actions/quote";

const initial: ActionState = { status: "idle" };

const incoterms = ["EXW", "FCA", "CPT", "CIP", "DAP", "DPU", "DDP", "FOB", "CFR", "CIF"];

export function QuoteForm() {
  const [state, action, pending] = useActionState(createQuote, initial);

  if (state.status === "success") {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{ background: "var(--ink-2)", border: "1px solid var(--line)" }}
      >
        <CheckCircle2 size={48} style={{ color: "var(--cargo)" }} className="mx-auto mb-4" />
        <h2 className="f-display text-3xl">Received.</h2>
        <p className="mt-3 text-sm" style={{ color: "var(--ash)" }}>
          Reference {state.id.slice(0, 8)}. A planner, a customs broker, and the head of operations
          have your request. You&apos;ll hear back within ninety minutes.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-8">
      {state.status === "error" && (
        <div
          className="rounded-xl p-4 text-sm"
          style={{
            background: "var(--rust-tint-10)",
            border: "1px solid var(--rust-border-40)",
            color: "var(--bone)",
          }}
        >
          {state.message}
        </div>
      )}

      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="caption mb-3" style={{ color: "var(--brass)" }}>
          CONTACT
        </legend>
        <Field label="Full name" name="contactName" required errors={state} />
        <Field label="Work email" name="email" type="email" required errors={state} />
        <Field label="Phone" name="phone" type="tel" errors={state} />
        <Field label="Company" name="company" errors={state} />
      </fieldset>

      <fieldset className="grid gap-4 md:grid-cols-3">
        <legend className="caption mb-3" style={{ color: "var(--brass)" }}>
          SHIPMENT
        </legend>
        <Select label="Mode" name="mode" required errors={state}>
          <option value="sea">Sea</option>
          <option value="air">Air</option>
          <option value="road">Road</option>
        </Select>
        <Field label="Origin (city or port)" name="origin" required errors={state} />
        <Field label="Destination" name="destination" required errors={state} />
        <Field label="Weight (kg)" name="weightKg" type="number" min={0} errors={state} />
        <Field
          label="Volume (cbm)"
          name="volumeCbm"
          type="number"
          min={0}
          step="0.01"
          errors={state}
        />
        <Select label="Incoterm" name="incoterm" errors={state}>
          <option value="">—</option>
          {incoterms.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
      </fieldset>

      <div>
        <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
          NOTES
        </label>
        <textarea
          name="notes"
          rows={4}
          className="input"
          placeholder="Hazmat, temperature, deadlines, anything we should know."
        />
      </div>

      <button type="submit" disabled={pending} className="btn-primary w-full justify-center" data-cursor="SEND">
        {pending ? "Sending…" : "Request quote"} <ArrowRight size={14} />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  min,
  step,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: number;
  step?: string;
  errors: ActionState;
}) {
  const fieldErrors = errors.status === "error" ? (errors.fieldErrors?.[name] ?? []) : [];
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
        min={min}
        step={step}
        className="input"
        aria-invalid={fieldErrors.length > 0}
      />
      {fieldErrors[0] && (
        <p className="mt-1 text-xs" style={{ color: "var(--rust)" }}>
          {fieldErrors[0]}
        </p>
      )}
    </div>
  );
}

function Select({
  label,
  name,
  required = false,
  errors,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  errors: ActionState;
  children: React.ReactNode;
}) {
  const fieldErrors = errors.status === "error" ? (errors.fieldErrors?.[name] ?? []) : [];
  return (
    <div>
      <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
        {label}
        {required && <span style={{ color: "var(--cargo)" }}> *</span>}
      </label>
      <select
        name={name}
        required={required}
        className="input"
        aria-invalid={fieldErrors.length > 0}
      >
        {children}
      </select>
      {fieldErrors[0] && (
        <p className="mt-1 text-xs" style={{ color: "var(--rust)" }}>
          {fieldErrors[0]}
        </p>
      )}
    </div>
  );
}
