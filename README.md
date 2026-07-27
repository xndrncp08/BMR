# BMR Pharmacy

Production web application for BMR Pharmacy — Next.js (App Router), TypeScript, Tailwind CSS, and Supabase.

## Project Overview

A full pharmacy website: marketing pages (home, about, services), a searchable product catalog, a prescription refill request system, a contact form, and a staff-only admin dashboard for managing products and prescription requests.

### Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes + Server Actions
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security, Supabase Auth)
- **Validation:** Zod (shared between client forms and server routes)
- **Testing:** Vitest
- **Deployment target:** Vercel

### Folder Structure

```
src/
├── app/                  # Routes (App Router)
│   ├── admin/            # Staff-only dashboard (protected by middleware)
│   ├── api/              # API routes (prescriptions, contact)
│   ├── products/         # Public catalog + product detail
│   └── ...               # Marketing pages (about, services, contact, login)
├── components/
│   ├── ui/               # Design system primitives (Button, Card, Container, Section)
│   ├── layout/           # Navbar, Footer, MobileNav
│   └── shared/           # Cross-feature components (FormField, SectionHeading)
├── features/
│   ├── products/         # Catalog data, service layer, filters, cards
│   ├── services/         # Services data
│   ├── contact/           # Contact form + schema
│   ├── prescriptions/     # Refill form + schema
│   ├── dashboard/         # Admin server actions
│   └── auth/              # Login form + sign-out action
├── lib/                  # Supabase clients, fonts, cn() utility
├── types/                # Product, Database (Supabase schema) types
└── middleware.ts         # Protects /admin routes
```

## Installation

```bash
npm install
```

## Environment Setup

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | Where to find it | Required for |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL (or `http://localhost:3000` locally) | — |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL | Everything database-related |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page → `anon` `public` key | Everything database-related |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page → `service_role` key (**never expose to the client**) | Reserved for future server-only admin tooling |
| `AUTH_SECRET` | Generate with `openssl rand -base64 32` | Only if you add custom session signing beyond Supabase Auth |

Never commit `.env.local` — it's already in `.gitignore`.

## Database Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Dashboard → **SQL Editor**, run each file in `supabase/migrations/` **in order**:
   - `0001_init.sql` — `products` and `prescription_requests` tables
   - `0002_contact.sql` — `contact_messages` table
   - `0003_auth_and_admin_policies.sql` — `staff_profiles` table + admin RLS policies
3. Create your first staff account: Dashboard → **Authentication → Users → Add User** (email + password). This is the account you'll use to log in at `/login` and access `/admin`.
4. (Optional) Insert a row into `staff_profiles` for that user if you want a display name / role recorded — the middleware only checks for *any* authenticated user, so this step isn't required to access the dashboard.

### Row Level Security summary

- `products` — publicly readable, writable only by authenticated (staff) users
- `prescription_requests` — publicly **insertable** (the refill form), readable/updatable only by staff
- `contact_messages` — publicly **insertable** (the contact form), readable only by staff
- `staff_profiles` — each user can read their own row only

This project treats **any authenticated user as staff**, since customers never get accounts — they only use the public forms. If you later add customer accounts, tighten the policies in `0003_auth_and_admin_policies.sql` to check `staff_profiles.role` instead of just `auth.role() = 'authenticated'`.

## Development Workflow

```bash
npm run dev          # start dev server at http://localhost:3000
npm run type-check   # TypeScript, no emit
npm run lint         # ESLint
npm test             # Vitest unit tests
npm run build        # production build
```

Admin dashboard: log in at `/login`, then visit `/admin`.

## Deployment (Vercel)

1. Push this repo to GitHub/GitLab/Bitbucket
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add the same environment variables from `.env.local` in Vercel's Project Settings → Environment Variables
4. Deploy — Vercel auto-detects Next.js, no build config needed

## Known Limitations / Next Steps

- Product images are placeholder colored blocks — wire up Supabase Storage for real product photos
- Role-based permissions (`admin` / `pharmacist` / `staff`) are stored in `staff_profiles` but not yet enforced differently — currently any staff login has full admin access
- No automated end-to-end tests yet (Playwright would be a natural addition alongside the existing Vitest unit tests)
- Contact/hours/address in the Footer and Contact page are placeholders — update with real business details before launch
