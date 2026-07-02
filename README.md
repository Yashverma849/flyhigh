# Flyhigh — Worldwide Freight, Refined.

Production codebase for [flyhigh.in](https://flyhigh.in) — a Mumbai-based freight forwarding maison. A premium marketing site backed by an authenticated operations cockpit.

## Stack

| Layer           | Choice                                                               |
| --------------- | -------------------------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Turbopack), React 19, TypeScript strict      |
| Styling         | Tailwind v4 (CSS-first, `@theme` exposes design tokens) + custom CSS |
| UI primitives   | Lucide icons, Recharts                                               |
| Database        | Neon Postgres + Drizzle ORM                                          |
| Auth            | Auth.js v5 — Resend email magic-link only                            |
| Forms           | React Hook Form-style native forms + Zod (server-side validated)     |
| Mutations       | Server Actions (no tRPC)                                             |
| Rate-limiting   | Upstash Redis Ratelimit (public Server Actions)                      |
| Env validation  | `@t3-oss/env-nextjs`                                                 |
| Lint / Format   | ESLint flat config + Prettier (`prettier-plugin-tailwindcss`)        |
| Testing         | Vitest + Testing Library + Playwright                                |
| Package manager | pnpm                                                                 |
| Deploy target   | Vercel                                                               |

## Folder structure

```
src/
├── app/
│   ├── (marketing)/           # Public pages (Navbar + Footer + GrainOverlay + Cursor)
│   │   ├── page.tsx           # Home
│   │   ├── about/             # The house, timeline, leadership
│   │   ├── services/          # List + [slug] detail
│   │   ├── quote/             # RHF + Zod, posts createQuote action
│   │   ├── track/             # Public lookup → /track/[id]
│   │   ├── insights/          # List + [slug] detail
│   │   └── contact/           # ContactForm via submitContact action
│   ├── (admin)/admin/         # auth-gated cockpit (sidebar + topbar layout)
│   │   ├── page.tsx           # Dashboard: KPIs + Recharts + recent shipments
│   │   ├── shipments/, customers/, content/, analytics/, settings/
│   ├── login/                 # Magic-link sign-in
│   ├── api/auth/[...nextauth] # Auth.js Route Handler
│   ├── layout.tsx             # Root: fonts, metadata, html scaffolding
│   ├── globals.css            # @theme tokens + bespoke utility classes
│   ├── robots.ts, sitemap.ts  # Generated
│   └── opengraph-image.tsx    # Default OG card
├── components/
│   ├── ui/                    # Reserved for shadcn primitives as needed
│   ├── marketing/             # quote-form, contact-form, track-form
│   ├── admin/                 # sidebar, topbar, kpi-card, status-pill, charts/*
│   ├── layout/                # navbar, footer
│   └── shared/                # pill, marquee, section-label, custom-cursor, svg/*
├── server/
│   ├── db/
│   │   ├── client.ts          # Drizzle (Neon HTTP)
│   │   ├── schema.ts          # All tables + relations + Auth.js standard tables
│   │   └── seed/              # Single source of truth for static & seed data
│   ├── auth/                  # Session helpers (getSession, requireSession)
│   ├── actions/               # Server Actions: createQuote, submitContact, trackShipment
│   ├── queries/               # RSC-side reads
│   └── ratelimit.ts           # Upstash wrapper (public-form gate)
├── lib/
│   ├── utils.ts               # cn(), INR/date formatters, slugify
│   ├── fonts.ts               # next/font: Fraunces, Manrope, JetBrains Mono
│   ├── constants.ts           # NAV_ITEMS, ADMIN_NAV, ShipmentStatus/Mode types
│   └── validations.ts         # Zod schemas for QuoteSchema, ContactSchema, TrackSchema
├── auth.config.ts             # Edge-safe portion (used by middleware.ts)
├── auth.ts                    # Full Auth.js setup (DrizzleAdapter + Resend)
└── env.ts                     # @t3-oss/env-nextjs validated env

drizzle/                       # Generated migrations
e2e/                           # Playwright tests
tests/                         # Vitest unit + integration
middleware.ts                  # Auth gate for /admin/*
next.config.ts                 # remotePatterns, security headers, typedRoutes
drizzle.config.ts              # drizzle-kit config
```

## Setup

```sh
pnpm install
cp .env.example .env.local
# Fill in DATABASE_URL, AUTH_SECRET, AUTH_RESEND_KEY, AUTH_RESEND_FROM
pnpm db:push           # Apply schema to Neon
pnpm db:seed           # Seed insights + demo shipments
pnpm dev               # http://localhost:3000
```

### Required env vars (`.env.local`)

```sh
DATABASE_URL="postgres://...neon.tech/...?sslmode=require"
AUTH_SECRET="$(openssl rand -base64 32)"
AUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"
AUTH_RESEND_KEY="re_..."
AUTH_RESEND_FROM="Flyhigh <auth@yourdomain.com>"
# Optional
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
SENTRY_DSN="..."
NEXT_PUBLIC_SENTRY_DSN="..."
```

Without Upstash, public forms still work but skip rate-limiting (logged at the call site).

## Scripts

| Command            | Action                                         |
| ------------------ | ---------------------------------------------- |
| `pnpm dev`         | Dev server with Turbopack                      |
| `pnpm build`       | Production build (`next build` with Turbopack) |
| `pnpm typecheck`   | `tsc --noEmit`                                 |
| `pnpm lint`        | ESLint                                         |
| `pnpm format`      | Prettier (writes)                              |
| `pnpm test`        | Vitest (unit/integration)                      |
| `pnpm test:e2e`    | Playwright                                     |
| `pnpm db:generate` | Generate Drizzle migration from schema         |
| `pnpm db:push`     | Push schema to DB (skip migrations)            |
| `pnpm db:migrate`  | Run pending migrations                         |
| `pnpm db:seed`     | Seed insights + demo shipments                 |
| `pnpm db:studio`   | Drizzle Studio                                 |

## Key architectural decisions

- **Single source of truth**: `src/server/db/seed/*.ts` exports typed constants used at build time (in marketing pages) and at seed time (into Postgres). No drift between marketing copy and DB.
- **Edge-safe auth split**: `src/auth.config.ts` is Edge-safe and consumed by `middleware.ts`; `src/auth.ts` adds the Drizzle adapter and Resend provider for Node-side handlers.
- **Lazy DB client**: `src/server/db/client.ts` uses a placeholder URL when `DATABASE_URL` is unset so `next build` can collect page data without a live database — real queries still surface a connection error at runtime.
- **Tailwind v4 `@theme` + alias compatibility**: design tokens live once in `globals.css` under `@theme` (becoming `bg-ink`, `text-bone`, etc.) AND under `:root` as short aliases (`--ink`, `--bone`) so prototype-style `style={{ background: "var(--ink)" }}` keeps working during incremental migration.
- **Server Actions over API routes**: `createQuote`, `submitContact`, `trackShipment` are all Server Actions called via React's `useActionState`. Validation runs server-side (Zod) regardless of client trust.
- **Rate limit at the action**, not the route: protects against form-spam without blocking the route from being reached for the success page.
- **Typed routes**: `next.config.ts` enables `typedRoutes` — `Link href` is type-checked against the actual route map.

## Visual regressions

The bespoke design system lives in `src/app/globals.css`. When porting visual elements from the original prototype (`flyhigh-website_1.jsx`, kept in Downloads), preserve:

- The TOKEN palette: `--ink`, `--bone`, `--cargo`, `--brass`, `--ash` and friends.
- The font triplet: Fraunces (display), Manrope (body), JetBrains Mono (mono).
- The grain overlay (`<body class="grain">`), the `f-display`/`f-body`/`f-mono` classes, the `.btn-primary` / `.btn-ghost` / `.btn-link` triad.
- Animations: `fade-up`, `marquee-track`, `float-y`, `compass-spin`.

All of these are referenced by the prototype's `style={{ ... }}` blocks; keeping the alias `:root` block in `globals.css` lets ports happen incrementally.

## Deploy

This app is built for Vercel. The middleware runs on the Edge runtime; the auth handlers and DB queries run on Node. Set the env vars above in the Vercel dashboard. Neon's pooled connection string is the right one to use here.
#   f l y h i g h  
 