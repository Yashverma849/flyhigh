"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured, supabase } from "@/server/db/client";
import { caseStudies } from "@/server/db/schema";
import { CreateCaseStudySchema, UpdateCaseStudySchema } from "@/lib/validations";
import { requireSession } from "@/server/auth/session";
import { slugify } from "@/lib/utils";

export type CaseStudyActionState =
  | { status: "idle" }
  | { status: "success"; id: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

async function requireAuth() {
  try {
    await requireSession();
  } catch {
    return { ok: false as const, error: "You must be signed in." };
  }
  if (!isDbConfigured) {
    return { ok: false as const, error: "Database is not configured." };
  }
  return { ok: true as const };
}

function revalidateContentPaths(slug?: string) {
  revalidatePath("/admin/content");
  revalidatePath("/case-studies");
  if (slug) revalidatePath(`/case-studies/${slug}`);
}

export async function createCaseStudy(
  _prev: CaseStudyActionState,
  formData: FormData,
): Promise<CaseStudyActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };

  const parsed = CreateCaseStudySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const slug = parsed.data.slug?.trim() || slugify(parsed.data.title);
  if (!slug) {
    return { status: "error", message: "Could not generate a valid slug from the title." };
  }

  let metrics = [];
  try {
    metrics = JSON.parse(parsed.data.metricsJson);
  } catch (err) {
    return { status: "error", message: "Invalid JSON format for metrics" };
  }

  const row = {
    slug,
    title: parsed.data.title,
    client: parsed.data.client,
    industry: parsed.data.industry,
    industry_slug: parsed.data.industrySlug,
    service_slug: parsed.data.serviceSlug,
    region: parsed.data.region,
    challenge: parsed.data.challenge,
    approach: parsed.data.approach,
    outcome: parsed.data.outcome,
    metrics,
    date: parsed.data.date,
    read: parsed.data.read,
    image: parsed.data.image || "",
    excerpt: parsed.data.excerpt,
  };

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { data, error } = await supabase.from("case_study").insert(row).select("id").single();
      if (error) throw error;
      if (!data) throw new Error("Insert returned no row");
      revalidateContentPaths(slug);
      return { status: "success", id: data.id };
    }

    const [inserted] = await db
      .insert(caseStudies)
      .values({
        slug,
        title: parsed.data.title,
        client: parsed.data.client,
        industry: parsed.data.industry,
        industrySlug: parsed.data.industrySlug,
        serviceSlug: parsed.data.serviceSlug,
        region: parsed.data.region,
        challenge: parsed.data.challenge,
        approach: parsed.data.approach,
        outcome: parsed.data.outcome,
        metrics,
        date: parsed.data.date,
        read: parsed.data.read,
        image: parsed.data.image || "",
        excerpt: parsed.data.excerpt,
      })
      .returning({ id: caseStudies.id });

    if (!inserted) throw new Error("Insert returned no row");
    revalidateContentPaths(slug);
    return { status: "success", id: inserted.id };
  } catch (err) {
    console.error("createCaseStudy failed", err);
    return {
      status: "error",
      message: "Could not create case study. Check that the slug is unique and try again.",
    };
  }
}

export async function updateCaseStudy(
  _prev: CaseStudyActionState,
  formData: FormData,
): Promise<CaseStudyActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };

  const parsed = UpdateCaseStudySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, ...fields } = parsed.data;
  const slug = fields.slug?.trim() || slugify(fields.title);
  if (!slug) {
    return { status: "error", message: "Could not generate a valid slug from the title." };
  }

  let metrics = [];
  try {
    metrics = JSON.parse(fields.metricsJson);
  } catch (err) {
    return { status: "error", message: "Invalid JSON format for metrics" };
  }

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { data, error } = await supabase
        .from("case_study")
        .update({
          slug,
          title: fields.title,
          client: fields.client,
          industry: fields.industry,
          industry_slug: fields.industrySlug,
          service_slug: fields.serviceSlug,
          region: fields.region,
          challenge: fields.challenge,
          approach: fields.approach,
          outcome: fields.outcome,
          metrics,
          date: fields.date,
          read: fields.read,
          image: fields.image || "",
          excerpt: fields.excerpt,
        })
        .eq("id", id)
        .select("id")
        .maybeSingle();
      if (error) throw error;
      if (!data) return { status: "error", message: "Case study not found." };
    } else {
      const [updated] = await db
        .update(caseStudies)
        .set({
          slug,
          title: fields.title,
          client: fields.client,
          industry: fields.industry,
          industrySlug: fields.industrySlug,
          serviceSlug: fields.serviceSlug,
          region: fields.region,
          challenge: fields.challenge,
          approach: fields.approach,
          outcome: fields.outcome,
          metrics,
          date: fields.date,
          read: fields.read,
          image: fields.image || "",
          excerpt: fields.excerpt,
        })
        .where(eq(caseStudies.id, id))
        .returning({ id: caseStudies.id });
      if (!updated) return { status: "error", message: "Case study not found." };
    }

    revalidateContentPaths(slug);
    return { status: "success", id };
  } catch (err) {
    console.error("updateCaseStudy failed", err);
    return {
      status: "error",
      message: "Could not update case study. Check that the slug is unique and try again.",
    };
  }
}
