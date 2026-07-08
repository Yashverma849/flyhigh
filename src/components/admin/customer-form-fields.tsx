"use client";

function Field({
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
        className="input"
      />
      {error && (
        <p className="caption mt-1.5" style={{ color: "var(--rust)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
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

const TIERS = [
  { value: "platinum", label: "Platinum" },
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
];

export function CustomerFormFields({
  fieldErrors,
  defaults,
}: {
  fieldErrors?: Record<string, string[]>;
  defaults?: {
    name?: string;
    contactEmail?: string | null;
    primaryContact?: string | null;
    location?: string | null;
    tier?: "platinum" | "gold" | "silver";
    health?: number;
  };
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <Field
          label="Customer name"
          name="name"
          placeholder="e.g. Lumin Pharma"
          required
          defaultValue={defaults?.name ?? ""}
          error={fieldErrors?.name?.[0]}
        />
      </div>
      <Field
        label="Primary contact"
        name="primaryContact"
        placeholder="Dr. Kavita Iyer"
        defaultValue={defaults?.primaryContact ?? ""}
        error={fieldErrors?.primaryContact?.[0]}
      />
      <Field
        label="Contact email"
        name="contactEmail"
        type="email"
        placeholder="ops@company.com"
        defaultValue={defaults?.contactEmail ?? ""}
        error={fieldErrors?.contactEmail?.[0]}
      />
      <Field
        label="Location"
        name="location"
        placeholder="Mumbai"
        defaultValue={defaults?.location ?? ""}
        error={fieldErrors?.location?.[0]}
      />
      <SelectField
        label="Tier"
        name="tier"
        defaultValue={defaults?.tier ?? "silver"}
        options={TIERS}
        error={fieldErrors?.tier?.[0]}
      />
      <Field
        label="Account health"
        name="healthScore"
        type="number"
        min="0"
        max="100"
        step="1"
        defaultValue={defaults?.health != null ? String(defaults.health) : "80"}
        error={fieldErrors?.healthScore?.[0]}
      />
    </div>
  );
}
