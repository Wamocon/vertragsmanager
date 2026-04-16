-- Migration: V2 enhancements
-- Adds: tax fields, renewal tracking, org logos, profile avatars, storage buckets

-- ============================================================
-- 1. Extended contract fields
-- ============================================================

-- Tax rate (e.g. 19 for 19% MwSt)
alter table public.contracts add column if not exists tax_rate numeric(5,2) default 19.00;

-- Whether the stored amount is gross (brutto) or net (netto)
alter table public.contracts add column if not exists is_gross boolean not null default true;

-- How many times this contract has been auto-renewed
alter table public.contracts add column if not exists renewal_count integer not null default 0;

-- Maximum number of auto-renewals allowed (null = unlimited)
alter table public.contracts add column if not exists max_renewals integer;

-- ============================================================
-- 2. Organization logo
-- ============================================================
alter table public.organizations add column if not exists logo_url text;

-- ============================================================
-- 3. Profile avatar
-- ============================================================
alter table public.profiles add column if not exists avatar_url text;

-- ============================================================
-- 4. Supabase Storage buckets
-- ============================================================

-- Create storage buckets (idempotent via on conflict)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('logos', 'logos', true, 2097152, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('contracts', 'contracts', false, 52428800, array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- Storage RLS policies: avatars (public read, authenticated upload)
create policy "Anyone can view avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Authenticated users can upload avatars"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'avatars');

create policy "Users can update own avatar"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete own avatar"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Storage RLS policies: logos (public read, org admins upload)
create policy "Anyone can view logos"
  on storage.objects for select
  using (bucket_id = 'logos');

create policy "Authenticated users can upload logos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'logos');

create policy "Authenticated users can update logos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'logos');

create policy "Authenticated users can delete logos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'logos');

-- Storage RLS policies: contracts (org members only)
create policy "Org members can view contract files"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'contracts');

create policy "Authenticated users can upload contract files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'contracts');

create policy "Authenticated users can update contract files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'contracts');

create policy "Authenticated users can delete contract files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'contracts');
