import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

// ────────────────────────────────────────────────────────────────────────
// Enums
// ────────────────────────────────────────────────────────────────────────

export const userRole = pgEnum("user_role", ["admin", "staff"]);
export const shipmentMode = pgEnum("shipment_mode", ["sea", "air", "road"]);
export const shipmentStatus = pgEnum("shipment_status", [
  "Booked",
  "In Transit",
  "Customs",
  "Delivered",
  "Exception",
]);
export const quoteStatus = pgEnum("quote_status", ["new", "contacted", "quoted", "won", "lost"]);
export const insightCategory = pgEnum("insight_category", [
  "OCEAN",
  "AIR",
  "CUSTOMS",
  "OPERATIONS",
  "POLICY",
  "INDUSTRY",
]);

// ────────────────────────────────────────────────────────────────────────
// Auth.js standard tables
// (shapes required by @auth/drizzle-adapter)
// ────────────────────────────────────────────────────────────────────────

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: userRole("role").default("staff").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [primaryKey({ columns: [account.provider, account.providerAccountId] })],
);

export const sessions = pgTable("session", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_token",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

// ────────────────────────────────────────────────────────────────────────
// Domain tables
// ────────────────────────────────────────────────────────────────────────

export const customers = pgTable("customer", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  contactEmail: text("contact_email"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const shipments = pgTable(
  "shipment",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // FH-YYMM-NNNNNN
    customerId: text("customer_id").references(() => customers.id, { onDelete: "set null" }),
    customerName: text("customer_name"), // denormalized for the table
    origin: text("origin").notNull(),
    destination: text("destination").notNull(),
    mode: shipmentMode("mode").notNull(),
    status: shipmentStatus("status").default("Booked").notNull(),
    eta: text("eta"),
    valueInr: integer("value_inr"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("shipment_id_idx").on(t.id)],
);

export const shipmentEvents = pgTable("shipment_event", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  shipmentId: varchar("shipment_id", { length: 32 })
    .notNull()
    .references(() => shipments.id, { onDelete: "cascade" }),
  status: shipmentStatus("status").notNull(),
  occurredAt: timestamp("occurred_at").defaultNow().notNull(),
  location: text("location"),
  note: text("note"),
});

export const quotes = pgTable("quote", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  mode: shipmentMode("mode").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  weightKg: integer("weight_kg"),
  volumeCbm: integer("volume_cbm"),
  incoterm: text("incoterm"),
  notes: text("notes"),
  status: quoteStatus("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submission", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insights = pgTable(
  "insight",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    bodyMd: text("body_md").default("").notNull(),
    category: insightCategory("category").notNull(),
    heroImage: text("hero_image"),
    readMinutes: integer("read_minutes").default(6).notNull(),
    publishedAt: timestamp("published_at", { mode: "date" }),
    authorId: text("author_id").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("insight_slug_idx").on(t.slug)],
);

export const auditLog = pgTable("audit_log", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  action: text("action").notNull(), // e.g. "shipment.update"
  entity: text("entity").notNull(), // e.g. "shipment"
  entityId: text("entity_id"),
  diff: jsonb("diff"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ────────────────────────────────────────────────────────────────────────
// Relations
// ────────────────────────────────────────────────────────────────────────

export const customersRelations = relations(customers, ({ many }) => ({
  shipments: many(shipments),
}));

export const shipmentsRelations = relations(shipments, ({ one, many }) => ({
  customer: one(customers, {
    fields: [shipments.customerId],
    references: [customers.id],
  }),
  events: many(shipmentEvents),
}));

export const shipmentEventsRelations = relations(shipmentEvents, ({ one }) => ({
  shipment: one(shipments, {
    fields: [shipmentEvents.shipmentId],
    references: [shipments.id],
  }),
}));

export const insightsRelations = relations(insights, ({ one }) => ({
  author: one(users, {
    fields: [insights.authorId],
    references: [users.id],
  }),
}));

// ────────────────────────────────────────────────────────────────────────
// Inferred types for app use
// ────────────────────────────────────────────────────────────────────────

export type Shipment = typeof shipments.$inferSelect;
export type NewShipment = typeof shipments.$inferInsert;
export type ShipmentEvent = typeof shipmentEvents.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsightRow = typeof insights.$inferSelect;
export type User = typeof users.$inferSelect;
export type AuditLog = typeof auditLog.$inferSelect;
