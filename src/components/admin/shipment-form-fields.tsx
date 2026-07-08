"use client";

import type { ShipmentMode, ShipmentStatus } from "@/lib/constants";

export const SHIPMENT_MODES: ShipmentMode[] = ["sea", "air", "road"];
export const SHIPMENT_STATUSES: ShipmentStatus[] = [
  "Booked",
  "In Transit",
  "Customs",
  "Delivered",
  "Exception",
];

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
  error,
  min,
  max,
  step,
  readOnly,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
  min?: string;
  max?: string;
  step?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        readOnly={readOnly}
        className="input read-only:opacity-70"
      />
      {error && (
        <p className="caption mt-1.5" style={{ color: "var(--rust)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
        {label}
      </label>
      <select name={name} defaultValue={defaultValue} className="input">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="caption mt-1.5" style={{ color: "var(--rust)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function toDateInputValue(value: Date | null | undefined) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function ShipmentFormFields({
  fieldErrors,
  defaults,
  showReference,
}: {
  fieldErrors?: Record<string, string[]>;
  defaults?: {
    id?: string;
    customerName?: string | null;
    origin?: string;
    destination?: string;
    mode?: ShipmentMode;
    status?: ShipmentStatus;
    eta?: string | null;
    valueInr?: number | null;
    promisedAt?: Date | null;
  };
  showReference?: boolean;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {showReference && defaults?.id && (
        <div className="md:col-span-2">
          <div className="caption mb-2" style={{ color: "var(--brass)" }}>
            Reference
          </div>
          <div
            className="f-mono input flex items-center opacity-70"
            style={{ color: "var(--cargo)" }}
          >
            {defaults.id}
          </div>
        </div>
      )}
      <div className="md:col-span-2">
        <Field
          label="Customer"
          name="customerName"
          placeholder="e.g. Lumin Pharma"
          required
          defaultValue={defaults?.customerName ?? ""}
          error={fieldErrors?.customerName?.[0]}
        />
      </div>
      <Field
        label="Origin"
        name="origin"
        placeholder="Mumbai"
        required
        defaultValue={defaults?.origin ?? ""}
        error={fieldErrors?.origin?.[0]}
      />
      <Field
        label="Destination"
        name="destination"
        placeholder="Rotterdam"
        required
        defaultValue={defaults?.destination ?? ""}
        error={fieldErrors?.destination?.[0]}
      />
      <SelectField
        label="Mode"
        name="mode"
        defaultValue={defaults?.mode ?? "sea"}
        options={SHIPMENT_MODES.map((m) => ({ value: m, label: m.toUpperCase() }))}
        error={fieldErrors?.mode?.[0]}
      />
      <SelectField
        label="Status"
        name="status"
        defaultValue={defaults?.status ?? "Booked"}
        options={SHIPMENT_STATUSES.map((s) => ({ value: s, label: s }))}
        error={fieldErrors?.status?.[0]}
      />
      <Field
        label="ETA"
        name="eta"
        placeholder="Apr 18"
        defaultValue={defaults?.eta ?? ""}
        error={fieldErrors?.eta?.[0]}
      />
      <Field
        label="Declared value (INR)"
        name="valueInr"
        type="number"
        min="0"
        step="1"
        placeholder="1420000"
        defaultValue={defaults?.valueInr != null ? String(defaults.valueInr) : ""}
        error={fieldErrors?.valueInr?.[0]}
      />
      <Field
        label="Promised delivery"
        name="promisedAt"
        type="date"
        defaultValue={toDateInputValue(defaults?.promisedAt)}
        error={fieldErrors?.promisedAt?.[0]}
      />
    </div>
  );
}
