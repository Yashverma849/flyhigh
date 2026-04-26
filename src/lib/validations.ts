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
