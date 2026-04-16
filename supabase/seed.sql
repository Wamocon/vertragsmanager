-- ============================================================
-- Vertragsmanager — Seed Data with Pre-Created Test Users
-- ============================================================
-- All passwords: Test1234!
-- ============================================================

-- ============================================================
-- 1. Create Auth Users
-- ============================================================

-- Superadmin
insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
values ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'superadmin@vertragsmanager.de', crypt('Test1234!', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Super Admin"}', now(), now(), '', '');
insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
values ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', jsonb_build_object('sub', '00000000-0000-0000-0000-000000000001', 'email', 'superadmin@vertragsmanager.de', 'email_verified', true, 'phone_verified', false), 'email', '00000000-0000-0000-0000-000000000001', now(), now(), now());

-- WAMOCON Admin
insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
values ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000010', 'authenticated', 'authenticated', 'admin@wamocon.de', crypt('Test1234!', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Anna Weber", "company_name": "WAMOCON GmbH"}', now(), now(), '', '');
insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
values ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000010', jsonb_build_object('sub', '00000000-0000-0000-0000-000000000010', 'email', 'admin@wamocon.de', 'email_verified', true, 'phone_verified', false), 'email', '00000000-0000-0000-0000-000000000010', now(), now(), now());

-- WAMOCON Manager
insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
values ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000011', 'authenticated', 'authenticated', 'manager@wamocon.de', crypt('Test1234!', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Max Müller", "company_name": "WAMOCON GmbH"}', now(), now(), '', '');
insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
values ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000011', jsonb_build_object('sub', '00000000-0000-0000-0000-000000000011', 'email', 'manager@wamocon.de', 'email_verified', true, 'phone_verified', false), 'email', '00000000-0000-0000-0000-000000000011', now(), now(), now());

-- WAMOCON Reader
insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
values ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000012', 'authenticated', 'authenticated', 'leser@wamocon.de', crypt('Test1234!', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Lisa Schmidt", "company_name": "WAMOCON GmbH"}', now(), now(), '', '');
insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
values ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000012', jsonb_build_object('sub', '00000000-0000-0000-0000-000000000012', 'email', 'leser@wamocon.de', 'email_verified', true, 'phone_verified', false), 'email', '00000000-0000-0000-0000-000000000012', now(), now(), now());

-- TechCorp Admin
insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
values ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000020', 'authenticated', 'authenticated', 'admin@techcorp.de', crypt('Test1234!', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Thomas Richter", "company_name": "TechCorp AG"}', now(), now(), '', '');
insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
values ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000020', jsonb_build_object('sub', '00000000-0000-0000-0000-000000000020', 'email', 'admin@techcorp.de', 'email_verified', true, 'phone_verified', false), 'email', '00000000-0000-0000-0000-000000000020', now(), now(), now());

-- TechCorp Manager
insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
values ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000021', 'authenticated', 'authenticated', 'manager@techcorp.de', crypt('Test1234!', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Sandra Koch", "company_name": "TechCorp AG"}', now(), now(), '', '');
insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
values ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000021', jsonb_build_object('sub', '00000000-0000-0000-0000-000000000021', 'email', 'manager@techcorp.de', 'email_verified', true, 'phone_verified', false), 'email', '00000000-0000-0000-0000-000000000021', now(), now(), now());

-- TechCorp Reader
insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
values ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000022', 'authenticated', 'authenticated', 'leser@techcorp.de', crypt('Test1234!', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Peter Braun", "company_name": "TechCorp AG"}', now(), now(), '', '');
insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
values ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000022', jsonb_build_object('sub', '00000000-0000-0000-0000-000000000022', 'email', 'leser@techcorp.de', 'email_verified', true, 'phone_verified', false), 'email', '00000000-0000-0000-0000-000000000022', now(), now(), now());

-- ============================================================
-- 2. Fix auth.users columns GoTrue expects as non-NULL strings
-- ============================================================
update auth.users set
  email_change = coalesce(email_change, ''),
  email_change_token_new = coalesce(email_change_token_new, ''),
  email_change_token_current = coalesce(email_change_token_current, ''),
  email_change_confirm_status = coalesce(email_change_confirm_status, 0),
  phone_change = coalesce(phone_change, ''),
  phone_change_token = coalesce(phone_change_token, ''),
  reauthentication_token = coalesce(reauthentication_token, ''),
  is_sso_user = coalesce(is_sso_user, false),
  is_anonymous = coalesce(is_anonymous, false);

-- ============================================================
-- 3. Profiles (created by trigger, update superadmin flag)
-- ============================================================
update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-000000000001';

-- ============================================================
-- 4. Organizations
-- ============================================================
insert into public.organizations (id, name, slug, short_name) values
  ('00000000-0000-0000-0000-000000000100', 'WAMOCON GmbH', 'wamocon-gmbh', 'WMC'),
  ('00000000-0000-0000-0000-000000000200', 'TechCorp AG', 'techcorp-ag', 'TC');

-- ============================================================
-- 4. Organization Members
-- ============================================================
insert into public.organization_members (organization_id, user_id, role) values
  -- WAMOCON
  ('00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000010', 'company_admin'),
  ('00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000011', 'manager'),
  ('00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000012', 'reader'),
  -- TechCorp
  ('00000000-0000-0000-0000-000000000200', '00000000-0000-0000-0000-000000000020', 'company_admin'),
  ('00000000-0000-0000-0000-000000000200', '00000000-0000-0000-0000-000000000021', 'manager'),
  ('00000000-0000-0000-0000-000000000200', '00000000-0000-0000-0000-000000000022', 'reader');

-- ============================================================
-- 5. Categories
-- ============================================================
insert into public.categories (id, organization_id, name, color, is_system) values
  -- WAMOCON
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000100', 'Software & SaaS', '#6366f1', true),
  ('a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000100', 'Kommunikation', '#06b6d4', true),
  ('a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000100', 'Versicherungen', '#f59e0b', true),
  ('a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000100', 'Miete & Immobilien', '#10b981', true),
  ('a0000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000100', 'Fahrzeuge & Leasing', '#ef4444', true),
  ('a0000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000100', 'Marketing & Werbung', '#ec4899', true),
  ('a0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000100', 'Sonstiges', '#8b5cf6', true),
  -- TechCorp
  ('b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000200', 'Software & SaaS', '#6366f1', true),
  ('b0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000200', 'Kommunikation', '#06b6d4', true),
  ('b0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000200', 'Versicherungen', '#f59e0b', true),
  ('b0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000200', 'Miete & Immobilien', '#10b981', true),
  ('b0000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000200', 'Fahrzeuge & Leasing', '#ef4444', true),
  ('b0000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000200', 'Marketing & Werbung', '#ec4899', true),
  ('b0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000200', 'Sonstiges', '#8b5cf6', true);

-- ============================================================
-- 6. Contracts (WAMOCON — 10 Jahre realistische Daten 2016–2026)
-- ============================================================
insert into public.contracts (organization_id, category_id, created_by, name, provider, description, start_date, end_date, cancellation_period_days, auto_renew, amount, payment_interval, is_gross, tax_rate, status, licenses_purchased, licenses_used, customer_number) values
  -- AKTIVE VERTRÄGE
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000010', 'Büro Eschborn', 'Immobilienverwaltung Rhein-Main', 'Bürofläche 120m², 1. OG, 3 Räume + Küche', '2019-04-01', '2029-03-31', 180, false, 2800.00, 'monthly', false, 19, 'active', null, null, 'MV-2019-077'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Microsoft 365 Business', 'Microsoft', 'Office-Suite inkl. Teams, SharePoint, OneDrive', '2020-01-01', '2027-01-01', 30, true, 22.00, 'monthly', false, 19, 'active', 15, 12, 'MS-2020-001'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Adobe Creative Cloud', 'Adobe', 'Vollversion für Design-Team', '2021-03-15', '2027-03-15', 14, true, 65.49, 'monthly', true, 19, 'active', 5, 5, 'ADO-88421'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'GitHub Enterprise', 'GitHub/Microsoft', 'Code-Repository und CI/CD', '2019-02-01', '2027-02-01', 30, true, 228.00, 'yearly', false, 19, 'active', 8, 8, 'GH-ENT-5521'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Slack Pro', 'Slack/Salesforce', 'Team-Kommunikation', '2022-06-01', '2026-06-01', 30, true, 7.25, 'monthly', false, 19, 'active', 15, 10, null),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'Jira Software', 'Atlassian', 'Projektmanagement', '2020-04-01', '2027-04-01', 30, true, 97.80, 'quarterly', false, 19, 'active', 10, 7, null),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000010', 'Telekom Mobilfunk', 'Deutsche Telekom', '10 Mobilfunkverträge Business L', '2021-07-01', '2026-07-01', 90, true, 594.41, 'monthly', true, 19, 'active', 10, 10, 'TK-BIZ-7891'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000010', 'Betriebshaftpflicht', 'Allianz', 'Betriebshaftpflichtversicherung bis 5 Mio EUR', '2017-01-01', '2027-01-01', 90, true, 1850.00, 'yearly', true, 19, 'active', null, null, 'ALZ-BH-2017'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000010', 'BMW 320d Leasing', 'BMW Financial Services', 'Geschäftsfahrzeug GF', '2024-10-01', '2027-10-01', 90, false, 489.00, 'monthly', true, 19, 'active', 1, 1, 'BMW-LS-44521'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000011', 'DATEV Unternehmen Online', 'DATEV', 'Steuerberater-Schnittstelle und Buchhaltung', '2018-01-01', '2026-12-31', 90, true, 42.50, 'monthly', false, 19, 'active', 2, 2, 'DTV-UO-2018'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000010', 'Google Ads Kampagne', 'Google', 'Suchmaschinenwerbung Q1-Q4', '2025-01-01', '2026-05-15', 30, false, 500.00, 'monthly', false, 19, 'expiring_soon', null, null, 'GADS-WMC-2025'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'AWS Cloud Hosting', 'Amazon Web Services', 'EC2 + S3 + RDS Infrastruktur', '2020-03-01', '2027-03-01', 30, true, 780.00, 'monthly', false, 19, 'active', null, null, 'AWS-WMC-2020'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Notion Team', 'Notion Labs', 'Wissensmanagement und Dokumentation', '2023-01-01', '2027-01-01', 30, true, 10.00, 'monthly', false, 19, 'active', 15, 13, 'NOT-WMC-2023'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Figma Professional', 'Figma', 'UI/UX Design-Tool', '2022-09-01', '2026-09-01', 30, true, 15.00, 'monthly', false, 19, 'active', 5, 4, 'FIG-WMC-2022'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000010', 'Telekom Glasfaser', 'Deutsche Telekom', 'Glasfaser Business 500 Mbit/s', '2021-11-01', '2026-11-01', 90, true, 99.95, 'monthly', true, 19, 'active', 1, 1, 'TK-GLF-WMC'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000010', 'D&O-Versicherung', 'AXA', 'Directors & Officers Haftpflicht', '2018-06-01', '2026-06-01', 90, true, 2400.00, 'yearly', true, 19, 'active', null, null, 'AXA-DO-WMC'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000010', 'Rechtsschutzversicherung', 'ARAG', 'Firmen-Rechtsschutz Premium', '2019-01-01', '2027-01-01', 90, true, 1650.00, 'yearly', true, 19, 'active', null, null, 'ARAG-RS-WMC'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000010', 'VW Caddy Leasing', 'Volkswagen Financial Services', 'Servicefahrzeug Außendienst', '2023-03-01', '2027-03-01', 90, false, 329.00, 'monthly', true, 19, 'active', 1, 1, 'VW-LS-78332'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000011', 'LinkedIn Recruiter Lite', 'LinkedIn/Microsoft', 'Recruiting und Employer Branding', '2024-01-01', '2027-01-01', 30, true, 135.00, 'monthly', false, 19, 'active', 2, 2, 'LNKD-WMC-2024'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000010', 'Konica Minolta Drucker', 'Konica Minolta', 'Multifunktionsgerät bizhub C250i inkl. Wartung', '2022-01-01', '2027-01-01', 90, false, 189.00, 'monthly', true, 19, 'active', 1, 1, 'KM-BIZ-WMC'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000010', 'Steuerberatung Pauschale', 'Kanzlei Dr. Fischer & Partner', 'Laufende Buchhaltung und Jahresabschluss', '2016-04-01', '2027-04-01', 90, true, 850.00, 'monthly', false, 19, 'active', null, null, 'STB-FP-WMC'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000010', 'Büroreinigung', 'Clean Office GmbH', 'Reinigung 3x/Woche, Bürofläche Eschborn', '2019-08-01', '2026-08-01', 60, true, 380.00, 'monthly', true, 19, 'active', null, null, 'CO-WMC-2019'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Salesforce Professional', 'Salesforce', 'CRM für Vertriebsteam', '2023-07-01', '2026-07-01', 30, true, 75.00, 'monthly', false, 19, 'active', 5, 4, 'SF-WMC-2023'),
  -- GEKÜNDIGTE / ABGELAUFENE VERTRÄGE
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Dropbox Business', 'Dropbox', 'Cloud-Speicher (abgelöst durch OneDrive)', '2018-01-01', '2024-01-01', 30, false, 12.50, 'monthly', false, 19, 'cancelled', 15, 0, 'DB-WMC-2018'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000010', 'Vodafone Festnetz & DSL', 'Vodafone', 'VDSL 100 Business (abgelöst durch Glasfaser)', '2017-06-01', '2021-06-01', 90, false, 49.99, 'monthly', true, 19, 'expired', null, null, 'VF-FN-WMC'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000010', 'Büro Frankfurt-Bockenheim', 'GWH Immobilien', 'Bürofläche 60m² (Umzug nach Eschborn)', '2016-01-01', '2019-03-31', 90, false, 1250.00, 'monthly', false, 19, 'expired', null, null, 'MV-2016-033'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000010', 'Audi A4 Leasing', 'Audi Financial Services', 'Geschäftsfahrzeug GF (Rückgabe)', '2018-06-01', '2021-06-01', 90, false, 420.00, 'monthly', true, 19, 'expired', 1, 0, 'AUDI-LS-33210'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'Strato HiDrive', 'Strato', 'Cloud-Backup 500GB (abgelöst durch AWS S3)', '2017-01-01', '2020-01-01', 30, false, 9.90, 'monthly', true, 19, 'expired', null, null, 'STR-HD-WMC'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'Hetzner Root Server', 'Hetzner', 'Dedicated Server (Migration zu AWS)', '2016-07-01', '2020-02-28', 30, false, 49.00, 'monthly', true, 19, 'expired', null, null, 'HZ-RS-WMC'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000010', 'Sipgate Team', 'sipgate', 'VoIP-Telefonanlage (abgelöst durch Teams)', '2016-03-01', '2020-12-31', 30, false, 29.95, 'monthly', true, 19, 'expired', 5, 0, 'SG-WMC-2016'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000010', 'Facebook Ads Budget', 'Meta/Facebook', 'Social Media Werbung (B2B ineffektiv, eingestellt)', '2019-03-01', '2021-03-01', 0, false, 300.00, 'monthly', false, 19, 'cancelled', null, null, 'FB-WMC-2019'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Kaspersky Endpoint Security', 'Kaspersky', 'Antiviruslösung (abgelöst durch MS Defender)', '2016-01-01', '2022-01-01', 30, false, 4.50, 'monthly', false, 19, 'cancelled', 10, 0, 'KAS-WMC-2016'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000010', 'Securitas Alarmanlage', 'Securitas', 'Büro-Alarmsystem Frankfurt (Standort geschlossen)', '2017-01-01', '2019-03-31', 90, false, 79.00, 'monthly', true, 19, 'expired', null, null, 'SEC-WMC-2017'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000011', 'XING Recruiter', 'New Work SE', 'Recruiting-Plattform (auf LinkedIn gewechselt)', '2018-01-01', '2023-12-31', 30, false, 89.00, 'monthly', false, 19, 'cancelled', 1, 0, 'XING-WMC-2018');

-- ============================================================
-- 7. Contracts (TechCorp — created by admin)
-- ============================================================
insert into public.contracts (organization_id, category_id, created_by, name, provider, description, start_date, end_date, cancellation_period_days, auto_renew, amount, payment_interval, is_gross, tax_rate, status, licenses_purchased, licenses_used, customer_number) values
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'Google Workspace', 'Google', 'E-Mail und Drive für das Team', '2025-03-01', '2027-03-01', 30, true, 13.80, 'monthly', false, 19, 'active', 25, 20, 'GWS-TC-2025'),
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'AWS EC2', 'Amazon Web Services', 'Cloud-Infrastruktur', '2025-01-01', '2027-01-01', 30, true, 1200.00, 'monthly', false, 19, 'active', null, null, 'AWS-TC-7712'),
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000021', 'Figma Enterprise', 'Figma', 'Design-Tool für UX-Team', '2025-06-01', '2026-06-01', 30, true, 540.00, 'quarterly', true, 19, 'active', 10, 8, null),
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000020', 'Vodafone Business Internet', 'Vodafone', 'Glasfaser Business 1000', '2025-01-01', '2027-01-01', 90, true, 89.99, 'monthly', true, 19, 'active', 1, 1, 'VF-GLF-TC'),
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000020', 'Cyber-Versicherung', 'HDI', 'Cyber-Risk inkl. Datenrettung', '2025-06-01', '2026-06-01', 60, true, 3200.00, 'yearly', true, 19, 'active', null, null, 'HDI-CY-TC'),
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'Heroku Dynos', 'Salesforce/Heroku', 'Legacy-App-Hosting (gekündigt)', '2023-01-01', '2025-03-01', 30, false, 250.00, 'monthly', false, 19, 'cancelled', null, null, 'HRK-TC-2023');

-- ============================================================
-- 6b. License types & cost per unit (WAMOCON contracts)
-- ============================================================
update public.contracts set license_type = 'bundle', license_cost_per_unit = 22.00 where customer_number = 'MS-2020-001';
update public.contracts set license_type = 'single', license_cost_per_unit = 65.49 where customer_number = 'ADO-88421';
update public.contracts set license_type = 'bundle', license_cost_per_unit = 28.50 where customer_number = 'GH-ENT-5521';
update public.contracts set license_type = 'bundle', license_cost_per_unit = 7.25 where name = 'Slack Pro' and organization_id = '00000000-0000-0000-0000-000000000100';
update public.contracts set license_type = 'bundle', license_cost_per_unit = 9.78 where name = 'Jira Software' and organization_id = '00000000-0000-0000-0000-000000000100';
update public.contracts set license_type = 'bundle', license_cost_per_unit = 59.44 where customer_number = 'TK-BIZ-7891';
update public.contracts set license_type = 'single', license_cost_per_unit = 42.50 where customer_number = 'DTV-UO-2018';
update public.contracts set license_type = 'bundle', license_cost_per_unit = 10.00 where customer_number = 'NOT-WMC-2023';
update public.contracts set license_type = 'single', license_cost_per_unit = 15.00 where customer_number = 'FIG-WMC-2022';
update public.contracts set license_type = 'bundle', license_cost_per_unit = 67.50 where customer_number = 'LNKD-WMC-2024';
update public.contracts set license_type = 'single', license_cost_per_unit = 75.00 where customer_number = 'SF-WMC-2023';
update public.contracts set license_type = 'single', license_cost_per_unit = 489.00 where customer_number = 'BMW-LS-44521';

-- ============================================================
-- 6c. Counterparty master data (WAMOCON contracts)
-- ============================================================
update public.contracts set counterparty_name = 'Microsoft Deutschland GmbH', counterparty_address = 'Walter-Gropius-Straße 5', counterparty_zip = '80807', counterparty_city = 'München', counterparty_country = 'Deutschland', counterparty_contact = 'Enterprise Support', counterparty_email = 'support@microsoft.com', counterparty_phone = '+49 89 3176-0' where customer_number = 'MS-2020-001';
update public.contracts set counterparty_name = 'Adobe Systems Software Ireland Ltd.', counterparty_address = '4-6 Riverwalk', counterparty_zip = 'D24', counterparty_city = 'Dublin', counterparty_country = 'Irland', counterparty_contact = 'Account Management', counterparty_email = 'enterprise@adobe.com' where customer_number = 'ADO-88421';
update public.contracts set counterparty_name = 'GitHub Inc. / Microsoft', counterparty_address = '88 Colin P Kelly Jr St', counterparty_zip = 'CA 94107', counterparty_city = 'San Francisco', counterparty_country = 'USA', counterparty_email = 'enterprise@github.com' where customer_number = 'GH-ENT-5521';
update public.contracts set counterparty_name = 'Deutsche Telekom GmbH', counterparty_address = 'Friedrich-Ebert-Allee 140', counterparty_zip = '53113', counterparty_city = 'Bonn', counterparty_contact = 'Geschäftskundenbetreuung', counterparty_email = 'business@telekom.de', counterparty_phone = '0800 330 1300' where customer_number = 'TK-BIZ-7891';
update public.contracts set counterparty_name = 'Allianz Versicherungs-AG', counterparty_address = 'Königinstraße 28', counterparty_zip = '80802', counterparty_city = 'München', counterparty_contact = 'Firmenkunden Haftpflicht', counterparty_email = 'firmen@allianz.de', counterparty_phone = '+49 89 3800-0' where customer_number = 'ALZ-BH-2017';
update public.contracts set counterparty_name = 'BMW Financial Services GmbH', counterparty_address = 'Lilienthalallee 26', counterparty_zip = '80939', counterparty_city = 'München', counterparty_contact = 'Leasing-Abteilung', counterparty_email = 'leasing@bmwfs.de', counterparty_phone = '+49 89 318-0' where customer_number = 'BMW-LS-44521';
update public.contracts set counterparty_name = 'Immobilienverwaltung Rhein-Main GmbH', counterparty_address = 'Frankfurter Str. 42', counterparty_zip = '65760', counterparty_city = 'Eschborn', counterparty_contact = 'Herr Müller', counterparty_email = 'verwaltung@immo-rheinmain.de', counterparty_phone = '06196 77 88 99' where customer_number = 'MV-2019-077';
update public.contracts set counterparty_name = 'Amazon Web Services EMEA SARL', counterparty_address = '38 Avenue John F. Kennedy', counterparty_zip = 'L-1855', counterparty_city = 'Luxembourg', counterparty_country = 'Luxemburg', counterparty_email = 'aws-sales@amazon.com' where customer_number = 'AWS-WMC-2020';
update public.contracts set counterparty_name = 'DATEV eG', counterparty_address = 'Paumgartnerstraße 6-14', counterparty_zip = '90429', counterparty_city = 'Nürnberg', counterparty_contact = 'Anwendungsbetreuung', counterparty_email = 'info@datev.de', counterparty_phone = '0800 328 3872' where customer_number = 'DTV-UO-2018';

-- ============================================================
-- 8. Sample Comments
-- ============================================================
do $$
declare
  v_contract_id uuid;
begin
  -- Get first WAMOCON contract
  select id into v_contract_id from public.contracts
    where organization_id = '00000000-0000-0000-0000-000000000100' limit 1;

  if v_contract_id is not null then
    insert into public.contract_comments (contract_id, organization_id, user_id, content) values
      (v_contract_id, '00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000012', 'Bitte die Lizenzanzahl prüfen — wir haben 3 neue Mitarbeiter.'),
      (v_contract_id, '00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000011', 'Danke für den Hinweis, werde das anpassen.');
  end if;
end $$;

-- ============================================================
-- 9. Welcome Notifications
-- ============================================================
insert into public.notifications (user_id, organization_id, type, title, message, link) values
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000100', 'system', 'Willkommen bei Vertragsmanager!', 'Ihr WAMOCON GmbH Konto ist eingerichtet.', '/dashboard'),
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000100', 'system', 'Willkommen bei Vertragsmanager!', 'Sie wurden als Vertragsmanager bei WAMOCON GmbH hinzugefügt.', '/dashboard'),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000100', 'system', 'Willkommen bei Vertragsmanager!', 'Sie haben Leserechte bei WAMOCON GmbH.', '/dashboard'),
  ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000200', 'system', 'Willkommen bei Vertragsmanager!', 'Ihr TechCorp AG Konto ist eingerichtet.', '/dashboard'),
  ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000200', 'system', 'Willkommen bei Vertragsmanager!', 'Sie wurden als Vertragsmanager bei TechCorp AG hinzugefügt.', '/dashboard'),
  ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000200', 'system', 'Willkommen bei Vertragsmanager!', 'Sie haben Leserechte bei TechCorp AG.', '/dashboard');
