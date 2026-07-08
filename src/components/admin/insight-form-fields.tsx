"use client";

import { Field, SelectField, toDateInputValue } from "@/components/admin/shipment-form-fields";

const CATEGORIES = [
  "OCEAN",
  "AIR",
  "CUSTOMS",
  "OPERATIONS",
  "POLICY",
  "INDUSTRY",
] as const;

export function InsightFormFields({
  fieldErrors,
  defaults,
}: {
  fieldErrors?: Record<string, string[]>;
  defaults?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    bodyMd?: string;
    category?: (typeof CATEGORIES)[number];
    heroImage?: string | null;
    readMinutes?: number;
    publishedAt?: Date | null;
  };
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <Field
          label="Title"
          name="title"
          placeholder="The new geography of the Red Sea"
          required
          defaultValue={defaults?.title ?? ""}
          error={fieldErrors?.title?.[0]}
        />
      </div>
      <Field
        label="Slug"
        name="slug"
        placeholder="new-geography-of-the-red-sea"
        defaultValue={defaults?.slug ?? ""}
        error={fieldErrors?.slug?.[0]}
      />
      <SelectField
        label="Category"
        name="category"
        defaultValue={defaults?.category ?? "OCEAN"}
        options={CATEGORIES.map((c) => ({ value: c, label: c }))}
        error={fieldErrors?.category?.[0]}
      />
      <div className="md:col-span-2">
        <Field
          label="Excerpt"
          name="excerpt"
          placeholder="Short summary for the index and CMS table"
          required
          defaultValue={defaults?.excerpt ?? ""}
          error={fieldErrors?.excerpt?.[0]}
        />
      </div>
      <div className="md:col-span-2">
        <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
          Body (Markdown)
        </label>
        <textarea
          name="bodyMd"
          rows={8}
          defaultValue={defaults?.bodyMd ?? ""}
          placeholder="# Heading&#10;&#10;Article body in Markdown…"
          className="input min-h-[180px] resize-y"
        />
        {fieldErrors?.bodyMd?.[0] && (
          <p className="caption mt-1.5" style={{ color: "var(--rust)" }}>
            {fieldErrors.bodyMd[0]}
          </p>
        )}
      </div>
      <Field
        label="Hero image URL"
        name="heroImage"
        placeholder="https://images.unsplash.com/..."
        defaultValue={defaults?.heroImage ?? ""}
        error={fieldErrors?.heroImage?.[0]}
      />
      <Field
        label="Read time (minutes)"
        name="readMinutes"
        type="number"
        min="1"
        max="60"
        step="1"
        defaultValue={defaults?.readMinutes != null ? String(defaults.readMinutes) : "6"}
        error={fieldErrors?.readMinutes?.[0]}
      />
      <Field
        label="Publish date"
        name="publishedAt"
        type="date"
        defaultValue={toDateInputValue(defaults?.publishedAt)}
        error={fieldErrors?.publishedAt?.[0]}
      />
    </div>
  );
}
