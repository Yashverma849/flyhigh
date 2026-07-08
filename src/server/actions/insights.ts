"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured, supabase } from "@/server/db/client";
import { insights } from "@/server/db/schema";
import { CreateInsightSchema, UpdateInsightSchema } from "@/lib/validations";
import { requireSession } from "@/server/auth/session";
import { slugify } from "@/lib/utils";

export type InsightActionState =
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

function parsePublishedAt(value: string | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function revalidateContentPaths(slug?: string) {
  revalidatePath("/admin/content");
  revalidatePath("/insights");
  if (slug) revalidatePath(`/insights/${slug}`);
}

export async function createInsight(
  _prev: InsightActionState,
  formData: FormData,
): Promise<InsightActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };

  const parsed = CreateInsightSchema.safeParse(Object.fromEntries(formData));
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

  const publishedAt = parsePublishedAt(parsed.data.publishedAt);
  const row = {
    slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    body_md: parsed.data.bodyMd || "",
    category: parsed.data.category,
    hero_image: parsed.data.heroImage || null,
    read_minutes: parsed.data.readMinutes,
    published_at: publishedAt?.toISOString() ?? null,
  };

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { data, error } = await supabase.from("insight").insert(row).select("id").single();
      if (error) throw error;
      if (!data) throw new Error("Insert returned no row");
      revalidateContentPaths(slug);
      return { status: "success", id: data.id };
    }

    const [inserted] = await db
      .insert(insights)
      .values({
        slug,
        title: parsed.data.title,
        excerpt: parsed.data.excerpt,
        bodyMd: parsed.data.bodyMd || "",
        category: parsed.data.category,
        heroImage: parsed.data.heroImage || null,
        readMinutes: parsed.data.readMinutes,
        publishedAt,
      })
      .returning({ id: insights.id });

    if (!inserted) throw new Error("Insert returned no row");
    revalidateContentPaths(slug);
    return { status: "success", id: inserted.id };
  } catch (err) {
    console.error("createInsight failed", err);
    return {
      status: "error",
      message: "Could not create post. Check that the slug is unique and try again.",
    };
  }
}

export async function updateInsight(
  _prev: InsightActionState,
  formData: FormData,
): Promise<InsightActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };

  const parsed = UpdateInsightSchema.safeParse(Object.fromEntries(formData));
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

  const publishedAt = parsePublishedAt(fields.publishedAt);

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { data, error } = await supabase
        .from("insight")
        .update({
          slug,
          title: fields.title,
          excerpt: fields.excerpt,
          body_md: fields.bodyMd || "",
          category: fields.category,
          hero_image: fields.heroImage || null,
          read_minutes: fields.readMinutes,
          published_at: publishedAt?.toISOString() ?? null,
        })
        .eq("id", id)
        .select("id")
        .maybeSingle();
      if (error) throw error;
      if (!data) return { status: "error", message: "Post not found." };
    } else {
      const [updated] = await db
        .update(insights)
        .set({
          slug,
          title: fields.title,
          excerpt: fields.excerpt,
          bodyMd: fields.bodyMd || "",
          category: fields.category,
          heroImage: fields.heroImage || null,
          readMinutes: fields.readMinutes,
          publishedAt,
        })
        .where(eq(insights.id, id))
        .returning({ id: insights.id });
      if (!updated) return { status: "error", message: "Post not found." };
    }

    revalidateContentPaths(slug);
    return { status: "success", id };
  } catch (err) {
    console.error("updateInsight failed", err);
    return {
      status: "error",
      message: "Could not update post. Check that the slug is unique and try again.",
    };
  }
}
