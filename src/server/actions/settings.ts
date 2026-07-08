"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, hasDatabaseUrl, isDbConfigured, supabase } from "@/server/db/client";
import { users } from "@/server/db/schema";
import {
  ResetPasswordSchema,
  UpdateGeneralSchema,
  UpdateNotificationsSchema,
  UpdateProfileSchema,
} from "@/lib/validations";
import type { UserPreferences } from "@/lib/user-preferences";
import { getCurrentUserProfile } from "@/server/queries/users";

export type SettingsActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

async function resolveProfileUserId() {
  const session = await auth();
  if (!session?.user) {
    return { ok: false as const, error: "You must be signed in." };
  }
  if (!isDbConfigured) {
    return { ok: false as const, error: "Database is not configured." };
  }

  const profile = await getCurrentUserProfile({
    id: session.user.id,
    email: session.user.email,
  });

  if (!profile) {
    return {
      ok: false as const,
      error: "Profile not found in the database. Sign up or contact an admin.",
    };
  }

  return { ok: true as const, userId: profile.id };
}

function revalidateSettings() {
  revalidatePath("/admin/settings");
  revalidatePath("/admin/settings/profile");
  revalidatePath("/admin/settings/general");
  revalidatePath("/admin/settings/notifications");
  revalidatePath("/admin/settings/team");
  revalidatePath("/admin/settings/security");
}

function readCheckbox(formData: FormData, name: string) {
  const values = formData.getAll(name);
  return values.at(-1) === "true" ? "true" : "false";
}

export async function updateProfile(
  _prev: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const resolved = await resolveProfileUserId();
  if (!resolved.ok) return { status: "error", message: resolved.error };

  const parsed = UpdateProfileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = {
    name: parsed.data.name.trim(),
    phone: parsed.data.phone?.trim() || null,
  };

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { error } = await supabase.from("user").update(payload).eq("id", resolved.userId);
      if (error) throw error;
    } else {
      await db.update(users).set(payload).where(eq(users.id, resolved.userId));
    }

    revalidateSettings();
    return { status: "success" };
  } catch (err) {
    console.error("updateProfile failed", err);
    return { status: "error", message: "Could not save profile. Please try again." };
  }
}

export async function updateGeneralSettings(
  _prev: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const resolved = await resolveProfileUserId();
  if (!resolved.ok) return { status: "error", message: resolved.error };

  const parsed = UpdateGeneralSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = {
    timezone: parsed.data.timezone?.trim() || null,
    language: parsed.data.language?.trim() || null,
    country: parsed.data.country?.trim() || null,
    city: parsed.data.city?.trim() || null,
  };

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { error } = await supabase.from("user").update(payload).eq("id", resolved.userId);
      if (error) throw error;
    } else {
      await db.update(users).set(payload).where(eq(users.id, resolved.userId));
    }

    revalidateSettings();
    return { status: "success" };
  } catch (err) {
    console.error("updateGeneralSettings failed", err);
    return { status: "error", message: "Could not save general settings. Please try again." };
  }
}

export async function updateNotificationSettings(
  _prev: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const resolved = await resolveProfileUserId();
  if (!resolved.ok) return { status: "error", message: resolved.error };

  const parsed = UpdateNotificationsSchema.safeParse({
    shipmentExceptions: readCheckbox(formData, "shipmentExceptions"),
    customsHolds: readCheckbox(formData, "customsHolds"),
    weeklyDigest: readCheckbox(formData, "weeklyDigest"),
    productUpdates: readCheckbox(formData, "productUpdates"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const profile = await getCurrentUserProfile({ id: resolved.userId });
  const existing = (profile?.preferences ?? {}) as UserPreferences;
  const preferences: UserPreferences = {
    ...existing,
    notifications: parsed.data,
  };

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { error } = await supabase
        .from("user")
        .update({ preferences })
        .eq("id", resolved.userId);
      if (error) throw error;
    } else {
      await db.update(users).set({ preferences }).where(eq(users.id, resolved.userId));
    }

    revalidateSettings();
    return { status: "success" };
  } catch (err) {
    console.error("updateNotificationSettings failed", err);
    return {
      status: "error",
      message:
        "Could not save notification preferences. Run SQL/settings-migration.sql in Supabase if this is your first time.",
    };
  }
}

export async function resetPassword(
  _prev: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const session = await auth();
  if (!session?.user) {
    return { status: "error", message: "You must be signed in." };
  }

  const parsed = ResetPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const profile = await getCurrentUserProfile({
    id: session.user.id,
    email: session.user.email,
  });

  if (!profile) {
    return {
      status: "error",
      message: "Password reset is not available for demo accounts.",
    };
  }

  if (!supabase) {
    return {
      status: "error",
      message: "Supabase is not configured. Cannot update password.",
    };
  }

  try {
    const { error } = await supabase.auth.admin.updateUserById(profile.id, {
      password: parsed.data.password,
    });
    if (error) throw error;

    revalidateSettings();
    return { status: "success" };
  } catch (err) {
    console.error("resetPassword failed", err);
    return {
      status: "error",
      message: "Could not update password. Please try again.",
    };
  }
}
