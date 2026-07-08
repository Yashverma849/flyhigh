import "server-only";
import { supabase } from "@/server/db/client";
import type { Customer, Shipment, ShipmentEvent, InsightRow, User } from "@/server/db/schema";
import type { UserPreferences } from "@/lib/user-preferences";

type ShipmentRow = {
  id: string;
  customer_id: string | null;
  customer_name: string | null;
  origin: string;
  destination: string;
  mode: Shipment["mode"];
  status: Shipment["status"];
  eta: string | null;
  promised_at: string | null;
  delivered_at: string | null;
  value_inr: number | null;
  created_at: string;
  updated_at: string;
};

type CustomerRow = {
  id: string;
  name: string;
  contact_email: string | null;
  primary_contact: string | null;
  location: string | null;
  tier: Customer["tier"];
  health_score: number | null;
  created_at: string;
};

type ShipmentEventRow = {
  id: string;
  shipment_id: string;
  status: ShipmentEvent["status"];
  occurred_at: string;
  location: string | null;
  note: string | null;
};

type InsightDbRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  category: InsightRow["category"];
  hero_image: string | null;
  read_minutes: number;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
};

type UserDbRow = {
  id: string;
  name: string | null;
  email: string;
  email_verified: string | null;
  image: string | null;
  role: User["role"];
  phone: string | null;
  dob: string | null;
  gender: string | null;
  timezone: string | null;
  language: string | null;
  country: string | null;
  city: string | null;
  preferences: UserPreferences | null;
  created_at: string;
};

function mapShipment(row: ShipmentRow): Shipment {
  return {
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    origin: row.origin,
    destination: row.destination,
    mode: row.mode,
    status: row.status,
    eta: row.eta,
    promisedAt: row.promised_at ? new Date(row.promised_at) : null,
    deliveredAt: row.delivered_at ? new Date(row.delivered_at) : null,
    valueInr: row.value_inr,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

function mapCustomer(row: CustomerRow): Customer {
  return {
    id: row.id,
    name: row.name,
    contactEmail: row.contact_email,
    primaryContact: row.primary_contact,
    location: row.location,
    tier: row.tier ?? "silver",
    healthScore: row.health_score,
    createdAt: new Date(row.created_at),
  };
}

function mapShipmentEvent(row: ShipmentEventRow): ShipmentEvent {
  return {
    id: row.id,
    shipmentId: row.shipment_id,
    status: row.status,
    occurredAt: new Date(row.occurred_at),
    location: row.location,
    note: row.note,
  };
}

function mapInsight(row: InsightDbRow): InsightRow {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    bodyMd: row.body_md,
    category: row.category,
    heroImage: row.hero_image,
    readMinutes: row.read_minutes,
    publishedAt: row.published_at ? new Date(row.published_at) : null,
    authorId: row.author_id,
    createdAt: new Date(row.created_at),
  };
}

function mapUser(row: UserDbRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    emailVerified: row.email_verified ? new Date(row.email_verified) : null,
    image: row.image,
    role: row.role ?? "staff",
    phone: row.phone,
    dob: row.dob,
    gender: row.gender,
    timezone: row.timezone,
    language: row.language,
    country: row.country,
    city: row.city,
    preferences: row.preferences ?? {},
    createdAt: new Date(row.created_at),
  };
}

async function query<T>(
  run: () => PromiseLike<{ data: T | null; error: { message: string } | null }>,
) {
  if (!supabase) return null;
  const { data, error } = await run();
  if (error) throw new Error(error.message);
  return data;
}

export async function supabaseGetRecentShipments(limit: number) {
  const data = await query(() =>
    supabase!
      .from("shipment")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit),
  );
  return (data as ShipmentRow[] | null)?.map(mapShipment) ?? [];
}

export async function supabaseGetShipmentById(id: string) {
  const data = await query(() => supabase!.from("shipment").select("*").eq("id", id).maybeSingle());
  return data ? mapShipment(data as ShipmentRow) : null;
}

export async function supabaseGetShipmentEvents(shipmentId: string) {
  const data = await query(() =>
    supabase!
      .from("shipment_event")
      .select("*")
      .eq("shipment_id", shipmentId)
      .order("occurred_at", { ascending: false }),
  );
  return (data as ShipmentEventRow[] | null)?.map(mapShipmentEvent) ?? [];
}

export async function supabaseGetAllShipments() {
  const data = await query(() =>
    supabase!.from("shipment").select("*").order("created_at", { ascending: false }),
  );
  return (data as ShipmentRow[] | null)?.map(mapShipment) ?? [];
}

export async function supabaseGetAllCustomers() {
  const data = await query(() =>
    supabase!.from("customer").select("*").order("created_at", { ascending: true }),
  );
  return (data as CustomerRow[] | null)?.map(mapCustomer) ?? [];
}

export async function supabaseListAllInsights() {
  const data = await query(() =>
    supabase!.from("insight").select("*").order("created_at", { ascending: false }),
  );
  return (data as InsightDbRow[] | null)?.map(mapInsight) ?? [];
}

export async function supabaseListPublishedInsights() {
  const data = await query(() =>
    supabase!
      .from("insight")
      .select("*")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false }),
  );
  return (data as InsightDbRow[] | null)?.map(mapInsight) ?? [];
}

export async function supabaseGetInsightBySlug(slug: string) {
  const data = await query(() =>
    supabase!.from("insight").select("*").eq("slug", slug).maybeSingle(),
  );
  return data ? mapInsight(data as InsightDbRow) : null;
}

export async function supabaseGetUserById(id: string) {
  const data = await query(() => supabase!.from("user").select("*").eq("id", id).maybeSingle());
  return data ? mapUser(data as UserDbRow) : null;
}

export async function supabaseGetUserByEmail(email: string) {
  const data = await query(() =>
    supabase!.from("user").select("*").eq("email", email.toLowerCase()).maybeSingle(),
  );
  return data ? mapUser(data as UserDbRow) : null;
}

export async function supabaseListUsers() {
  const data = await query(() =>
    supabase!.from("user").select("*").order("created_at", { ascending: true }),
  );
  return (data as UserDbRow[] | null)?.map(mapUser) ?? [];
}
