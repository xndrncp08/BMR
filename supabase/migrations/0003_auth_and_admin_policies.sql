-- Staff profiles: extends auth.users with a role, used to gate admin UI.
create table if not exists public.staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'staff' check (role in ('admin', 'pharmacist', 'staff')),
  created_at timestamptz not null default now()
);

alter table public.staff_profiles enable row level security;

create policy "Staff can view their own profile"
  on public.staff_profiles for select
  using (auth.uid() = id);

-- Simplification for this project: any authenticated user is staff
-- (customers never get accounts — they only use the public forms).
-- If you later add customer accounts, tighten these policies to check
-- staff_profiles.role instead of just auth.role() = 'authenticated'.

create policy "Authenticated staff can manage products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated staff can view prescription requests"
  on public.prescription_requests for select
  using (auth.role() = 'authenticated');

create policy "Authenticated staff can update prescription requests"
  on public.prescription_requests for update
  using (auth.role() = 'authenticated');