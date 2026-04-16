-- ============================================================
-- Vertragsmanager V1 — Database Schema (Roles & Permissions)
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. Organizations
-- ============================================================
create table public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 2. Organization Members
-- ============================================================
create type public.member_role as enum ('company_admin', 'manager', 'reader');

create table public.organization_members (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.member_role not null default 'manager',
  created_at timestamptz not null default now(),
  unique(organization_id, user_id)
);

-- ============================================================
-- 3. User Profiles
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  language text not null default 'de' check (language in ('de', 'en')),
  is_superadmin boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- FK so PostgREST can resolve  profile:profiles(*)  on organization_members
alter table public.organization_members
  add constraint organization_members_user_id_profiles_fk
  foreign key (user_id) references public.profiles(id) on delete cascade;

-- ============================================================
-- 4. Contract Categories
-- ============================================================
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  color text not null default '#6366f1',
  is_system boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 5. Contracts
-- ============================================================
create type public.contract_status as enum ('active', 'expiring_soon', 'expired', 'cancelled');
create type public.payment_interval as enum ('monthly', 'quarterly', 'yearly', 'one_time');

create table public.contracts (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  created_by uuid not null references auth.users(id),
  name text not null,
  provider text not null,
  description text,
  start_date date not null,
  end_date date,
  cancellation_period_days integer default 30,
  cancellation_deadline date,
  auto_renew boolean not null default true,
  amount numeric(12, 2) not null default 0,
  currency text not null default 'EUR',
  payment_interval public.payment_interval not null default 'monthly',
  licenses_purchased integer,
  licenses_used integer,
  status public.contract_status not null default 'active',
  document_url text,
  customer_number text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_contracts_org on public.contracts(organization_id);
create index idx_contracts_status on public.contracts(status);
create index idx_contracts_cancellation on public.contracts(cancellation_deadline);

-- ============================================================
-- 6. Reminders
-- ============================================================
create table public.reminders (
  id uuid primary key default uuid_generate_v4(),
  contract_id uuid not null references public.contracts(id) on delete cascade,
  days_before integer not null,
  remind_at date not null,
  sent boolean not null default false,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create index idx_reminders_remind_at on public.reminders(remind_at) where sent = false and enabled = true;

-- ============================================================
-- 7. Notifications
-- ============================================================
create type public.notification_type as enum ('reminder', 'invitation', 'system', 'comment', 'edit');

create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  type public.notification_type not null default 'system',
  title text not null,
  message text not null,
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_notifications_user on public.notifications(user_id, read);

-- ============================================================
-- 8. Organization Invitations
-- ============================================================
create table public.invitations (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  role public.member_role not null default 'manager',
  invited_by uuid not null references auth.users(id),
  token text unique not null default encode(gen_random_bytes(32), 'hex'),
  accepted boolean not null default false,
  expires_at timestamptz not null default (now() + interval '7 days'),
  created_at timestamptz not null default now()
);

-- ============================================================
-- 9. Audit Log
-- ============================================================
create table public.audit_log (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index idx_audit_org on public.audit_log(organization_id, created_at desc);

-- ============================================================
-- 10. Contract Comments
-- ============================================================
create table public.contract_comments (
  id uuid primary key default uuid_generate_v4(),
  contract_id uuid not null references public.contracts(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_comments_contract on public.contract_comments(contract_id, created_at desc);

-- FK so PostgREST can resolve comment author profile
alter table public.contract_comments
  add constraint contract_comments_user_id_profiles_fk
  foreign key (user_id) references public.profiles(id) on delete cascade;

-- ============================================================
-- 11. Contract Edit Log
-- ============================================================
create table public.contract_edit_log (
  id uuid primary key default uuid_generate_v4(),
  contract_id uuid not null references public.contracts(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  changes jsonb not null,
  security_confirmed boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_edit_log_contract on public.contract_edit_log(contract_id, created_at desc);

-- FK so PostgREST can resolve editor profile
alter table public.contract_edit_log
  add constraint contract_edit_log_user_id_profiles_fk
  foreign key (user_id) references public.profiles(id);

-- ============================================================
-- 12. RLS
-- ============================================================
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.contracts enable row level security;
alter table public.reminders enable row level security;
alter table public.notifications enable row level security;
alter table public.invitations enable row level security;
alter table public.audit_log enable row level security;
alter table public.contract_comments enable row level security;
alter table public.contract_edit_log enable row level security;

-- ── Helper functions (SECURITY DEFINER — bypass RLS) ──

create or replace function public.is_superadmin()
returns boolean as $$
  select coalesce(
    (select is_superadmin from public.profiles where id = auth.uid()),
    false
  );
$$ language sql security definer stable;

-- Returns the set of organization_ids the current user belongs to.
-- SECURITY DEFINER so it can read organization_members without triggering RLS.
create or replace function public.user_org_ids()
returns setof uuid as $$
  select organization_id from public.organization_members where user_id = auth.uid();
$$ language sql security definer stable;

-- Returns the role of the current user in a given org (or NULL).
create or replace function public.user_role_in_org(p_org_id uuid)
returns public.member_role as $$
  select role from public.organization_members
  where user_id = auth.uid() and organization_id = p_org_id
  limit 1;
$$ language sql security definer stable;

-- ── Profiles ──
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_select_superadmin" on public.profiles for select using (public.is_superadmin());
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_update_superadmin" on public.profiles for update using (public.is_superadmin());
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
-- Members of the same org can see each other's profiles
create policy "profiles_select_same_org" on public.profiles for select using (
  id in (select user_id from public.organization_members where organization_id in (select public.user_org_ids()))
);

-- ── Organizations ──
create policy "org_select_member" on public.organizations for select using (
  id in (select public.user_org_ids()) or public.is_superadmin()
);
create policy "org_insert" on public.organizations for insert with check (true);
create policy "org_update" on public.organizations for update using (
  public.user_role_in_org(id) = 'company_admin' or public.is_superadmin()
);

-- ── Organization Members ──
create policy "members_select" on public.organization_members for select using (
  organization_id in (select public.user_org_ids()) or public.is_superadmin()
);
create policy "members_insert" on public.organization_members for insert with check (
  public.user_role_in_org(organization_id) = 'company_admin'
  or not exists (select 1 from public.organization_members where organization_id = organization_members.organization_id)
  or public.is_superadmin()
);
create policy "members_update" on public.organization_members for update using (
  public.user_role_in_org(organization_id) = 'company_admin' or public.is_superadmin()
);
create policy "members_delete" on public.organization_members for delete using (
  public.user_role_in_org(organization_id) = 'company_admin' or public.is_superadmin()
);

-- ── Categories ──
create policy "categories_select" on public.categories for select using (
  organization_id in (select public.user_org_ids()) or public.is_superadmin()
);
create policy "categories_insert" on public.categories for insert with check (
  public.user_role_in_org(organization_id) in ('company_admin', 'manager')
);
create policy "categories_update" on public.categories for update using (
  public.user_role_in_org(organization_id) in ('company_admin', 'manager')
);
create policy "categories_delete" on public.categories for delete using (
  public.user_role_in_org(organization_id) = 'company_admin'
);

-- ── Contracts ──
create policy "contracts_select" on public.contracts for select using (
  organization_id in (select public.user_org_ids()) or public.is_superadmin()
);
create policy "contracts_insert" on public.contracts for insert with check (
  public.user_role_in_org(organization_id) in ('company_admin', 'manager')
);
create policy "contracts_update" on public.contracts for update using (
  public.user_role_in_org(organization_id) in ('company_admin', 'manager')
);
create policy "contracts_delete" on public.contracts for delete using (
  public.user_role_in_org(organization_id) = 'company_admin'
);

-- ── Reminders ──
create policy "reminders_select" on public.reminders for select using (
  contract_id in (select id from public.contracts where organization_id in (select public.user_org_ids()))
);
create policy "reminders_insert" on public.reminders for insert with check (
  contract_id in (select id from public.contracts where organization_id in (
    select om.organization_id from public.organization_members om where om.user_id = auth.uid() and om.role in ('company_admin', 'manager')
  ))
);
create policy "reminders_update" on public.reminders for update using (
  contract_id in (select id from public.contracts where organization_id in (
    select om.organization_id from public.organization_members om where om.user_id = auth.uid() and om.role in ('company_admin', 'manager')
  ))
);
create policy "reminders_delete" on public.reminders for delete using (
  contract_id in (select id from public.contracts where organization_id in (
    select om.organization_id from public.organization_members om where om.user_id = auth.uid() and om.role in ('company_admin', 'manager')
  ))
);

-- ── Notifications ──
create policy "notifications_select_own" on public.notifications for select using (auth.uid() = user_id);
create policy "notifications_update_own" on public.notifications for update using (auth.uid() = user_id);
create policy "notifications_insert" on public.notifications for insert with check (true);

-- ── Invitations ──
create policy "invitations_select" on public.invitations for select using (
  public.user_role_in_org(organization_id) = 'company_admin'
  or email = (select email from auth.users where id = auth.uid())
  or public.is_superadmin()
);
create policy "invitations_insert" on public.invitations for insert with check (
  public.user_role_in_org(organization_id) = 'company_admin'
);

-- ── Audit Log ──
create policy "audit_select" on public.audit_log for select using (
  organization_id in (select public.user_org_ids()) or public.is_superadmin()
);
create policy "audit_insert" on public.audit_log for insert with check (
  organization_id in (select public.user_org_ids())
);

-- ── Contract Comments ──
create policy "comments_select" on public.contract_comments for select using (
  organization_id in (select public.user_org_ids()) or public.is_superadmin()
);
create policy "comments_insert" on public.contract_comments for insert with check (
  organization_id in (select public.user_org_ids())
);
create policy "comments_update_own" on public.contract_comments for update using (user_id = auth.uid());
create policy "comments_delete" on public.contract_comments for delete using (
  user_id = auth.uid()
  or public.user_role_in_org(organization_id) = 'company_admin'
);

-- ── Contract Edit Log ──
create policy "edit_log_select" on public.contract_edit_log for select using (
  organization_id in (select public.user_org_ids()) or public.is_superadmin()
);
create policy "edit_log_insert" on public.contract_edit_log for insert with check (
  public.user_role_in_org(organization_id) in ('company_admin', 'manager')
);

-- ============================================================
-- 13. Functions & Triggers
-- ============================================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, company_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'company_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Compute cancellation deadline
create or replace function public.compute_cancellation_deadline()
returns trigger as $$
begin
  if new.end_date is not null and new.cancellation_period_days is not null then
    new.cancellation_deadline := new.end_date - (new.cancellation_period_days || ' days')::interval;
  else
    new.cancellation_deadline := null;
  end if;
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

create trigger compute_contract_deadline
  before insert or update on public.contracts
  for each row execute procedure public.compute_cancellation_deadline();

-- Auto-update contract status
create or replace function public.update_contract_status()
returns trigger as $$
begin
  if new.status = 'cancelled' then return new; end if;
  if new.end_date is not null and new.end_date < current_date then
    new.status := 'expired';
  elsif new.cancellation_deadline is not null and new.cancellation_deadline <= (current_date + interval '30 days') then
    new.status := 'expiring_soon';
  else
    new.status := 'active';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger auto_update_contract_status
  before insert or update on public.contracts
  for each row execute procedure public.update_contract_status();

-- Auto-generate default reminders
create or replace function public.create_default_reminders()
returns trigger as $$
declare
  days_arr integer[] := array[90, 60, 30, 14, 7];
  d integer;
  remind date;
begin
  if new.cancellation_deadline is not null then
    foreach d in array days_arr loop
      remind := new.cancellation_deadline - (d || ' days')::interval;
      if remind > current_date then
        insert into public.reminders (contract_id, days_before, remind_at)
        values (new.id, d, remind);
      end if;
    end loop;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger create_contract_reminders
  after insert on public.contracts
  for each row execute procedure public.create_default_reminders();

-- Notify on comment
create or replace function public.notify_on_comment()
returns trigger as $$
declare
  v_contract_name text;
  v_commenter_name text;
begin
  select name into v_contract_name from public.contracts where id = new.contract_id;
  select full_name into v_commenter_name from public.profiles where id = new.user_id;

  insert into public.notifications (user_id, organization_id, type, title, message, link)
  select om.user_id, new.organization_id, 'comment',
    'Neuer Kommentar: ' || coalesce(v_contract_name, 'Vertrag'),
    coalesce(v_commenter_name, 'Ein Benutzer') || ' hat einen Kommentar hinzugefügt.',
    '/contracts/' || new.contract_id
  from public.organization_members om
  where om.organization_id = new.organization_id
    and om.role in ('company_admin', 'manager')
    and om.user_id != new.user_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_comment_added
  after insert on public.contract_comments
  for each row execute procedure public.notify_on_comment();

-- Notify admins when manager edits contract
create or replace function public.notify_on_contract_edit()
returns trigger as $$
declare
  v_contract_name text;
  v_editor_name text;
  v_editor_role text;
begin
  select name into v_contract_name from public.contracts where id = new.contract_id;
  select full_name into v_editor_name from public.profiles where id = new.user_id;
  select role::text into v_editor_role from public.organization_members
    where user_id = new.user_id and organization_id = new.organization_id limit 1;

  if v_editor_role = 'manager' then
    insert into public.notifications (user_id, organization_id, type, title, message, link)
    select om.user_id, new.organization_id, 'edit',
      'Vertrag bearbeitet: ' || coalesce(v_contract_name, 'Vertrag'),
      coalesce(v_editor_name, 'Ein Vertragsmanager') || ' hat Vertragsdaten geändert.',
      '/contracts/' || new.contract_id
    from public.organization_members om
    where om.organization_id = new.organization_id
      and om.role = 'company_admin'
      and om.user_id != new.user_id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_contract_edit_logged
  after insert on public.contract_edit_log
  for each row execute procedure public.notify_on_contract_edit();

-- Setup organization for new user (called on first login when no org exists)
create or replace function public.setup_user_org(p_user_id uuid, p_org_name text default 'Mein Unternehmen')
returns uuid as $$
declare
  v_org_id uuid;
begin
  insert into public.organizations (name, slug)
  values (p_org_name, lower(replace(replace(p_org_name, ' ', '-'), '.', '')))
  returning id into v_org_id;

  insert into public.organization_members (organization_id, user_id, role)
  values (v_org_id, p_user_id, 'company_admin');

  insert into public.categories (organization_id, name, color, is_system) values
    (v_org_id, 'Software & SaaS', '#6366f1', true),
    (v_org_id, 'Kommunikation', '#06b6d4', true),
    (v_org_id, 'Versicherungen', '#f59e0b', true),
    (v_org_id, 'Miete & Immobilien', '#10b981', true),
    (v_org_id, 'Fahrzeuge & Leasing', '#ef4444', true),
    (v_org_id, 'Marketing & Werbung', '#ec4899', true),
    (v_org_id, 'Sonstiges', '#8b5cf6', true);

  insert into public.notifications (user_id, organization_id, type, title, message, link)
  values (p_user_id, v_org_id, 'system', 'Willkommen bei Vertragsmanager!', 'Ihr Konto wurde erfolgreich eingerichtet.', '/dashboard');

  return v_org_id;
end;
$$ language plpgsql security definer;
