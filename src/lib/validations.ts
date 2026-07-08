import { z } from "zod";

export const QuoteSchema = z.object({
  contactName: z.string().min(2, "Name is required"),
  email: z.email("Valid email is required"),
  phone: z.string().min(6).optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  mode: z.enum(["sea", "air", "road"]),
  origin: z.string().min(2),
  destination: z.string().min(2),
  weightKg: z.coerce.number().int().nonnegative().optional(),
  volumeCbm: z.coerce.number().nonnegative().optional(),
  incoterm: z
    .enum(["EXW", "FCA", "CPT", "CIP", "DAP", "DPU", "DDP", "FOB", "CFR", "CIF"])
    .optional(),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof QuoteSchema>;

export const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email is required"),
  message: z.string().min(10, "A short message helps us route to the right desk").max(4000),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const TrackSchema = z.object({
  id: z
    .string()
    .trim()
    .regex(/^FH-[A-Z0-9-]+$/i, "Tracking IDs look like FH-2403-001892"),
});

export type TrackInput = z.infer<typeof TrackSchema>;

export const CreateShipmentSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  origin: z.string().min(2, "Origin is required"),
  destination: z.string().min(2, "Destination is required"),
  mode: z.enum(["sea", "air", "road"]),
  status: z.enum(["Booked", "In Transit", "Customs", "Delivered", "Exception"]).default("Booked"),
  eta: z.string().max(32).optional().or(z.literal("")),
  valueInr: z.preprocess(
    (val) => (val === "" || val == null ? undefined : Number(val)),
    z.number().int().nonnegative().optional(),
  ),
  promisedAt: z.string().optional().or(z.literal("")),
});

export type CreateShipmentInput = z.infer<typeof CreateShipmentSchema>;

export const UpdateShipmentSchema = CreateShipmentSchema.extend({
  id: z.string().trim().regex(/^FH-[A-Z0-9-]+$/i, "Invalid shipment reference"),
});

export type UpdateShipmentInput = z.infer<typeof UpdateShipmentSchema>;

export const CreateCustomerSchema = z.object({
  name: z.string().min(2, "Customer name is required"),
  contactEmail: z.union([z.literal(""), z.email("Valid email is required")]).optional(),
  primaryContact: z.string().max(120).optional().or(z.literal("")),
  location: z.string().max(120).optional().or(z.literal("")),
  tier: z.enum(["platinum", "gold", "silver"]).default("silver"),
  healthScore: z.preprocess(
    (val) => (val === "" || val == null ? undefined : Number(val)),
    z.number().int().min(0).max(100).optional(),
  ),
});

export const UpdateCustomerSchema = CreateCustomerSchema.extend({
  id: z.string().min(1, "Customer id is required"),
});

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>;

const insightCategories = [
  "OCEAN",
  "AIR",
  "CUSTOMS",
  "OPERATIONS",
  "POLICY",
  "INDUSTRY",
] as const;

export const CreateInsightSchema = z.object({
  title: z.string().min(4, "Title is required"),
  slug: z.string().max(120).optional().or(z.literal("")),
  excerpt: z.string().min(10, "Excerpt is required"),
  bodyMd: z.string().max(50000).optional().or(z.literal("")),
  category: z.enum(insightCategories),
  heroImage: z.union([z.literal(""), z.string().url("Enter a valid image URL")]).optional(),
  readMinutes: z.preprocess(
    (val) => (val === "" || val == null ? 6 : Number(val)),
    z.number().int().min(1).max(60),
  ),
  publishedAt: z.string().optional().or(z.literal("")),
});

export const UpdateInsightSchema = CreateInsightSchema.extend({
  id: z.string().min(1, "Post id is required"),
});

export type CreateInsightInput = z.infer<typeof CreateInsightSchema>;
export type UpdateInsightInput = z.infer<typeof UpdateInsightSchema>;

export const CreateCaseStudySchema = z.object({
  title: z.string().min(4, "Title is required"),
  slug: z.string().max(120).optional().or(z.literal("")),
  client: z.string().min(2, "Client is required"),
  industry: z.string().min(2, "Industry is required"),
  industrySlug: z.string().min(2, "Industry slug is required"),
  serviceSlug: z.string().min(2, "Service slug is required"),
  region: z.string().min(2, "Region is required"),
  challenge: z.string().min(10, "Challenge is required"),
  approach: z.string().min(10, "Approach is required"),
  outcome: z.string().min(10, "Outcome is required"),
  metricsJson: z.string().refine((val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) && parsed.every((m: any) => typeof m.l === "string" && typeof m.v === "string");
    } catch {
      return false;
    }
  }, "Metrics must be a valid JSON array of label/value objects"),
  date: z.string().min(10, "Date is required"),
  read: z.string().min(2, "Read time is required"),
  image: z.union([z.literal(""), z.string().url("Enter a valid image URL")]).optional(),
  excerpt: z.string().min(10, "Excerpt is required"),
});

export const UpdateCaseStudySchema = CreateCaseStudySchema.extend({
  id: z.string().min(1, "Case study id is required"),
});

export type CreateCaseStudyInput = z.infer<typeof CreateCaseStudySchema>;
export type UpdateCaseStudyInput = z.infer<typeof UpdateCaseStudySchema>;


export const UpdateProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().max(32).optional().or(z.literal("")),
});

export const UpdateGeneralSchema = z.object({
  timezone: z.string().max(64).optional().or(z.literal("")),
  language: z.string().max(32).optional().or(z.literal("")),
  country: z.string().max(64).optional().or(z.literal("")),
  city: z.string().max(64).optional().or(z.literal("")),
});

export const UpdateNotificationsSchema = z.object({
  shipmentExceptions: z.enum(["true", "false"]).transform((v) => v === "true"),
  customsHolds: z.enum(["true", "false"]).transform((v) => v === "true"),
  weeklyDigest: z.enum(["true", "false"]).transform((v) => v === "true"),
  productUpdates: z.enum(["true", "false"]).transform((v) => v === "true"),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type UpdateGeneralInput = z.infer<typeof UpdateGeneralSchema>;
export type UpdateNotificationsInput = z.infer<typeof UpdateNotificationsSchema>;

export const ResetPasswordSchema = z
  .object({
    password: z.string().trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    const missing: string[] = [];
    if (data.password.length < 8) missing.push("less than 8 characters");
    if (!/[A-Z]/.test(data.password)) missing.push("no capital letter");
    if (!/[0-9]/.test(data.password)) missing.push("no number");
    if (!/[^a-zA-Z0-9]/.test(data.password)) missing.push("no special character");

    if (missing.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid password: ${missing.join(", ")}`,
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

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
