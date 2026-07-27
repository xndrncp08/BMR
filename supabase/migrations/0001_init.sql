-- BMR Pharmacy — Initial schema
-- Run this in Supabase Dashboard > SQL Editor, or via:
--   supabase db push
-- (if you're using the Supabase CLI with this file under supabase/migrations/)

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  category text not null,
  price numeric(10, 2) not null check (price >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);

-- ---------------------------------------------------------------------
-- prescription_requests
-- ---------------------------------------------------------------------
create table if not exists public.prescription_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text not null,
  medicine_name text not null,
  prescription_number text,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'ready', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists prescription_requests_status_idx on public.prescription_requests (status);
create index if not exists prescription_requests_email_idx on public.prescription_requests (email);

-- ---------------------------------------------------------------------
-- Auto-update `updated_at` on every row update, on both tables
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists set_prescription_requests_updated_at on public.prescription_requests;
create trigger set_prescription_requests_updated_at
  before update on public.prescription_requests
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.products enable row level security;
alter table public.prescription_requests enable row level security;

-- Products: anyone can browse the catalog (public marketing site).
-- Writes are NOT allowed from the client — only via the service role key,
-- which the admin dashboard (Milestone 12) will use from server-side code.
create policy "Products are publicly readable"
  on public.products for select
  using (true);

-- Prescription requests: anyone can submit a refill request (the public
-- form in Milestone 9), but nobody can read, update, or delete requests
-- from the client — that's staff-only, handled server-side once
-- authentication (Milestone 11) is in place.
create policy "Anyone can submit a prescription request"
  on public.prescription_requests for insert
  with check (true);