-- Enable uuid generator (usually enabled in Supabase, but safe)
create extension if not exists "pgcrypto";

-- ========= ENUMS =========
do $$ begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('Admin', 'Customer');
  end if;

  if not exists (select 1 from pg_type where typname = 'event_status') then
    create type event_status as enum ('active', 'draft', 'completed', 'cancelled');
  end if;

  if not exists (select 1 from pg_type where typname = 'rsvp_status') then
    create type rsvp_status as enum ('pending', 'yes', 'no', 'maybe');
  end if;
end $$;

-- ========= updated_at trigger =========
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ========= PROFILES (replaces your ERD User table) =========
-- Links to Supabase Auth user id
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role user_role not null default 'Customer',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- (Optional but common) auto-create profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), 'Customer')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ========= TEMPLATES =========
create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

drop trigger if exists trg_templates_updated_at on public.templates;
create trigger trg_templates_updated_at
before update on public.templates
for each row execute function public.set_updated_at();

-- ========= EVENTS =========
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),

  -- owner is an authenticated user
  owner_user_id uuid not null references auth.users(id) on delete cascade,

  ui_template_id uuid references public.templates(id) on delete set null,

  start_time timestamptz,
  description text,

  address text,
  city text,
  state text,
  postal_code text,
  country text,

  status event_status not null default 'draft',

  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_events_owner_user_id on public.events(owner_user_id);
create index if not exists idx_events_ui_template_id on public.events(ui_template_id);

drop trigger if exists trg_events_updated_at on public.events;
create trigger trg_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

-- ========= GUESTS / RSVP =========
-- Guests are usually NOT auth users, so we store email/name.
-- If a guest *is* logged in, guest_user_id can link to auth.users.
create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),

  event_id uuid not null references public.events(id) on delete cascade,

  guest_user_id uuid references auth.users(id) on delete set null,
  guest_email text not null,
  guest_name text,

  rsvp_status rsvp_status not null default 'pending',
  rsvp_response_time timestamptz,

  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),

  -- Uniqueness per event per guest email (works for non-auth guests)
  constraint uq_guests_event_email unique (event_id, guest_email)
);

create index if not exists idx_guests_event_id on public.guests(event_id);
create index if not exists idx_guests_guest_user_id on public.guests(guest_user_id);

drop trigger if exists trg_guests_updated_at on public.guests;
create trigger trg_guests_updated_at
before update on public.guests
for each row execute function public.set_updated_at();
