import type { ReactNode } from "react";

export function SettingsPanel({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section
      className="rounded-md border p-8"
      style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
    >
      <h2 className="f-display mb-1 text-2xl">{title}</h2>
      <p className="caption mb-8" style={{ color: "var(--ash)" }}>
        {description}
      </p>
      {children}
      {footer}
    </section>
  );
}

export function SettingsField({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  disabled = false,
  error,
}: {
  label: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className="input disabled:opacity-50"
      />
      {error && (
        <p className="caption mt-1.5" style={{ color: "var(--rust)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function SettingsSelect({
  label,
  name,
  defaultValue,
  options,
  error,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
}) {
  return (
    <div>
      <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
        {label}
      </label>
      <select name={name} defaultValue={defaultValue ?? ""} className="input">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
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

export function SettingsFormFooter({
  hint,
  pending,
  submitLabel,
}: {
  hint?: string;
  pending?: boolean;
  submitLabel: string;
}) {
  return (
    <div
      className="mt-8 flex items-center justify-between border-t pt-6"
      style={{ borderColor: "var(--line)" }}
    >
      {hint ? (
        <div className="caption" style={{ color: "var(--ash)" }}>
          {hint}
        </div>
      ) : (
        <span />
      )}
      <button type="submit" className="btn-primary text-sm" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </button>
    </div>
  );
}

export function SettingsToggle({
  label,
  description,
  name,
  defaultChecked,
}: {
  label: string;
  description: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-md border px-4 py-4" style={{ borderColor: "var(--line)" }}>
      <div>
        <div className="text-sm">{label}</div>
        <div className="caption mt-1" style={{ color: "var(--ash)" }}>
          {description}
        </div>
      </div>
      <input type="hidden" name={name} value="false" />
      <input
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 accent-[var(--cargo)]"
      />
    </label>
  );
}
