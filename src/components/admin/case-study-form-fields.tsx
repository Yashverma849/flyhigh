"use client";

import { useState } from "react";
import { Field } from "@/components/admin/shipment-form-fields";
import { ImageUploader } from "@/components/admin/image-uploader";
import { DEFAULT_CASE_STUDY_METRICS_JSON } from "@/lib/validations";

export function CaseStudyFormFields({
  fieldErrors,
  defaults,
}: {
  fieldErrors?: Record<string, string[]>;
  defaults?: {
    title?: string;
    slug?: string;
    client?: string;
    industry?: string;
    industrySlug?: string;
    serviceSlug?: string;
    region?: string;
    challenge?: string;
    approach?: string;
    outcome?: string;
    metricsJson?: string;
    date?: string;
    read?: string;
    image?: string;
    excerpt?: string;
  };
}) {
  const [image, setImage] = useState(defaults?.image ?? "");
  const [metricsJson, setMetricsJson] = useState(
    defaults?.metricsJson?.trim() || DEFAULT_CASE_STUDY_METRICS_JSON,
  );

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <Field
          label="Title"
          name="title"
          placeholder="Alphonso mango air-lift to Japan"
          required
          defaultValue={defaults?.title ?? ""}
          error={fieldErrors?.title?.[0]}
        />
      </div>
      <Field
        label="Slug"
        name="slug"
        placeholder="alphonso-mango-airlift-japan"
        defaultValue={defaults?.slug ?? ""}
        error={fieldErrors?.slug?.[0]}
      />
      <Field
        label="Client"
        name="client"
        placeholder="Premium fruit consortium, Ratnagiri"
        required
        defaultValue={defaults?.client ?? ""}
        error={fieldErrors?.client?.[0]}
      />
      <Field
        label="Industry"
        name="industry"
        placeholder="Perishables & Cold Chain"
        required
        defaultValue={defaults?.industry ?? ""}
        error={fieldErrors?.industry?.[0]}
      />
      <Field
        label="Industry Slug"
        name="industrySlug"
        placeholder="perishables-cold-chain"
        required
        defaultValue={defaults?.industrySlug ?? ""}
        error={fieldErrors?.industrySlug?.[0]}
      />
      <Field
        label="Service Slug"
        name="serviceSlug"
        placeholder="air"
        required
        defaultValue={defaults?.serviceSlug ?? ""}
        error={fieldErrors?.serviceSlug?.[0]}
      />
      <Field
        label="Region"
        name="region"
        placeholder="Asia-Pacific"
        required
        defaultValue={defaults?.region ?? ""}
        error={fieldErrors?.region?.[0]}
      />
      <Field
        label="Published Date"
        name="date"
        placeholder="2025-08-12"
        required
        defaultValue={defaults?.date ?? ""}
        error={fieldErrors?.date?.[0]}
      />
      <Field
        label="Read Time"
        name="read"
        placeholder="9 min"
        required
        defaultValue={defaults?.read ?? "8 min"}
        error={fieldErrors?.read?.[0]}
      />
      <div className="md:col-span-2">
        <Field
          label="Excerpt"
          name="excerpt"
          placeholder="Pre-cooled belly-cargo with origin VHT chambers..."
          required
          defaultValue={defaults?.excerpt ?? ""}
          error={fieldErrors?.excerpt?.[0]}
        />
      </div>
      <div className="md:col-span-2">
        <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
          Challenge
        </label>
        <textarea
          name="challenge"
          rows={3}
          required
          minLength={10}
          defaultValue={defaults?.challenge ?? ""}
          placeholder="Describe the logistics challenge..."
          className="input min-h-[80px] resize-y w-full"
        />
        {fieldErrors?.challenge?.[0] && (
          <p className="caption mt-1.5" style={{ color: "var(--rust)" }}>
            {fieldErrors.challenge[0]}
          </p>
        )}
      </div>
      <div className="md:col-span-2">
        <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
          Approach
        </label>
        <textarea
          name="approach"
          rows={3}
          required
          minLength={10}
          defaultValue={defaults?.approach ?? ""}
          placeholder="Describe our logistics approach..."
          className="input min-h-[80px] resize-y w-full"
        />
        {fieldErrors?.approach?.[0] && (
          <p className="caption mt-1.5" style={{ color: "var(--rust)" }}>
            {fieldErrors.approach[0]}
          </p>
        )}
      </div>
      <div className="md:col-span-2">
        <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
          Outcome
        </label>
        <textarea
          name="outcome"
          rows={3}
          required
          minLength={10}
          defaultValue={defaults?.outcome ?? ""}
          placeholder="Describe the final outcome..."
          className="input min-h-[80px] resize-y w-full"
        />
        {fieldErrors?.outcome?.[0] && (
          <p className="caption mt-1.5" style={{ color: "var(--rust)" }}>
            {fieldErrors.outcome[0]}
          </p>
        )}
      </div>
      <div className="md:col-span-2">
        <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
          Metrics (JSON Array)
        </label>
        <textarea
          name="metricsJson"
          rows={4}
          required
          value={metricsJson}
          onChange={(e) => setMetricsJson(e.target.value)}
          placeholder='[ { "l": "LABEL", "v": "VALUE" } ]'
          className="input min-h-[100px] resize-y w-full f-mono text-xs"
        />
        <p className="caption mt-1.5" style={{ color: "var(--ash)" }}>
          Use <span className="f-mono">l</span> for label and <span className="f-mono">v</span> for
          value. Numbers are allowed for values.
        </p>
        {fieldErrors?.metricsJson?.[0] && (
          <p className="caption mt-1.5" style={{ color: "var(--rust)" }}>
            {fieldErrors.metricsJson[0]}
          </p>
        )}
      </div>
      <div className="md:col-span-2">
        <ImageUploader
          label="Featured Image"
          name="image"
          bucket="case study"
          value={image}
          onChange={setImage}
          error={fieldErrors?.image?.[0]}
        />
      </div>
    </div>
  );
}
