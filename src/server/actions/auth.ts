"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db, isDbConfigured, supabase } from "@/server/db/client";
import { users } from "@/server/db/schema";
import { env } from "@/env";
import { z } from "zod";

export type LoginState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9])/; // At least one number, one special character

const SignupSchema = z.object({
  firstName: z.string().min(1, "First name is required.").trim(),
  lastName: z.string().optional().transform(val => val || ""),
  email: z.string().email("Please enter a valid email address.").toLowerCase().trim(),
  password: z.string().trim(),
  confirmPassword: z.string().trim(),
  acceptTerms: z.literal("true", {
    message: "You must accept the terms & privacy policy.",
  }),
  profilePicture: z.string().optional(),
  phone: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
}).superRefine((data, ctx) => {
  const missing: string[] = [];
  if (data.password.length < 8) {
    missing.push("less than 8 characters");
  }
  if (!/[A-Z]/.test(data.password)) {
    missing.push("no capital letter");
  }
  if (!/[0-9]/.test(data.password)) {
    missing.push("no number");
  }
  if (!/[^a-zA-Z0-9]/.test(data.password)) {
    missing.push("no special character");
  }

  if (missing.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `invalid password: ${missing.join(", ")}`,
      path: ["password"],
    });
  }

  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });
  }
});

export async function loginWithCredentials(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/admin";

  if (!email || !password) {
    return { status: "error", message: "Email and password are required." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
    return { status: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", message: "Invalid email or password." };
        default:
          return { status: "error", message: "Authentication failed. Please try again." };
      }
    }

    // Auth.js redirects by throwing redirect error from NextJS navigation under the hood.
    // In NextJS, dynamic redirects work by throwing a special RedirectError.
    // We must let it bubble up out of the Server Action so NextJS can handle the redirect correctly.
    const digest = (error as any)?.digest;
    if (typeof digest === "string" && digest.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    if (error instanceof Error && (error.constructor.name === "RedirectError" || error.message.includes("redirect"))) {
      throw error;
    }

    console.error("Login failed:", error);
    return { status: "error", message: "Authentication failed. Please try again." };
  }
}

export async function signUpWithCredentials(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const fields = Object.fromEntries(formData.entries());
  
  // Parse inputs using the validation schema
  const parsed = SignupSchema.safeParse({
    ...fields,
    acceptTerms: fields.acceptTerms === "on" ? "true" : "false", // checkbox returns 'on' when checked
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message ?? "Invalid signup details.";
    return { status: "error", message: errorMsg };
  }

  const { firstName, lastName, email, password, profilePicture, phone, dob, gender, timezone, language, country, city } = parsed.data;
  const fullName = `${firstName} ${lastName}`.trim();

  try {
    if (isDbConfigured) {
      let existing = null;
      if (env.DATABASE_URL && db) {
        existing = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, email),
        });
      } else if (supabase) {
        const { data, error } = await supabase
          .from("user")
          .select("*")
          .eq("email", email)
          .maybeSingle();
        if (error) throw error;
        existing = data;
      }

      if (existing) {
        return { status: "error", message: "A user with this email already exists." };
      }

      // 1. Always create the user in Supabase Auth first (if credentials client is configured)
      let authUserId = null;
      if (supabase) {
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { name: fullName }
        });

        if (authError) {
          return { status: "error", message: authError.message };
        }

        if (!authData?.user) {
          return { status: "error", message: "Failed to create user credentials in Supabase Auth." };
        }

        authUserId = authData.user.id;
      }

      // 2. Setup user profile linked to the Auth UUID
      const userData: any = {
        id: authUserId || undefined,
        email,
        name: fullName,
        image: profilePicture || null,
        role: "staff" as const,
        phone: phone || null,
        dob: dob || null,
        gender: gender || null,
        timezone: timezone || null,
        language: language || null,
        country: country || null,
        city: city || null,
      };

      if (env.DATABASE_URL && db) {
        try {
          await db.insert(users).values(userData);
        } catch (dbErr) {
          if (supabase && authUserId) {
            await supabase.auth.admin.deleteUser(authUserId);
          }
          throw dbErr;
        }
      } else if (supabase) {
        const { error: profileError } = await supabase.from("user").insert([userData]);
        if (profileError) {
          if (authUserId) {
            await supabase.auth.admin.deleteUser(authUserId);
          }
          throw profileError;
        }
      }
    }

    return { status: "success" };
  } catch (error) {
    console.error("Signup failed:", error);
    return { status: "error", message: "Failed to create account. Please try again." };
  }
}
