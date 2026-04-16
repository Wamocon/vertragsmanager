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
insert into public.organizations (id, name, slug) values
  ('00000000-0000-0000-0000-000000000100', 'WAMOCON GmbH', 'wamocon-gmbh'),
  ('00000000-0000-0000-0000-000000000200', 'TechCorp AG', 'techcorp-ag');

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
-- 6. Contracts (WAMOCON — created by admin)
-- ============================================================
insert into public.contracts (organization_id, category_id, created_by, name, provider, description, start_date, end_date, cancellation_period_days, auto_renew, amount, payment_interval, licenses_purchased, licenses_used, customer_number) values
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Microsoft 365 Business', 'Microsoft', 'Office-Suite inkl. Teams, SharePoint, OneDrive', '2025-01-01', '2026-01-01', 30, true, 22.00, 'monthly', 15, 12, 'MS-2025-001'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Adobe Creative Cloud', 'Adobe', 'Vollversion für Design-Team', '2025-03-15', '2026-03-15', 14, true, 65.49, 'monthly', 5, 5, 'ADO-88421'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Slack Pro', 'Slack/Salesforce', 'Team-Kommunikation', '2025-06-01', '2026-06-01', 30, true, 7.25, 'monthly', 15, 10, null),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'GitHub Enterprise', 'GitHub/Microsoft', 'Code-Repository und CI/CD', '2025-02-01', '2026-02-01', 30, true, 19.00, 'monthly', 8, 8, 'GH-ENT-5521'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'Jira Software', 'Atlassian', 'Projektmanagement', '2025-04-01', '2026-04-01', 30, true, 8.15, 'monthly', 10, 7, null),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000010', 'Telekom Mobilfunk', 'Deutsche Telekom', '10 Mobilfunkverträge Business L', '2024-07-01', '2026-07-01', 90, true, 49.95, 'monthly', 10, 10, 'TK-BIZ-7891'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000010', 'Betriebshaftpflicht', 'Allianz', 'Betriebshaftpflichtversicherung bis 5 Mio EUR', '2025-01-01', '2026-01-01', 90, true, 1850.00, 'yearly', null, null, 'ALZ-BH-2025'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000010', 'Büro Eschborn', 'Immobilienverwaltung Rhein-Main', 'Bürofläche 120m²', '2023-04-01', '2028-04-01', 180, false, 2800.00, 'monthly', null, null, 'MV-2023-077'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000010', 'BMW 320d Leasing', 'BMW Financial Services', 'Geschäftsfahrzeug', '2024-10-01', '2027-10-01', 90, false, 489.00, 'monthly', 1, 1, 'BMW-LS-44521'),
  ('00000000-0000-0000-0000-000000000100', 'a0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000011', 'DATEV Unternehmen Online', 'DATEV', 'Steuerberater-Schnittstelle', '2025-01-01', '2026-12-31', 90, true, 42.50, 'monthly', 2, 2, 'DTV-UO-2025');

-- ============================================================
-- 7. Contracts (TechCorp — created by admin)
-- ============================================================
insert into public.contracts (organization_id, category_id, created_by, name, provider, description, start_date, end_date, cancellation_period_days, auto_renew, amount, payment_interval, licenses_purchased, licenses_used, customer_number) values
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'Google Workspace', 'Google', 'E-Mail und Drive für das Team', '2025-03-01', '2026-03-01', 30, true, 13.80, 'monthly', 25, 20, 'GWS-TC-2025'),
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'AWS EC2', 'Amazon Web Services', 'Cloud-Infrastruktur', '2025-01-01', '2026-01-01', 30, true, 1200.00, 'monthly', null, null, 'AWS-TC-7712'),
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000021', 'Figma Enterprise', 'Figma', 'Design-Tool für UX-Team', '2025-06-01', '2026-06-01', 30, true, 45.00, 'monthly', 10, 8, null),
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000020', 'Vodafone Business Internet', 'Vodafone', 'Glasfaser Business 1000', '2025-01-01', '2027-01-01', 90, true, 89.99, 'monthly', 1, 1, 'VF-GLF-TC'),
  ('00000000-0000-0000-0000-000000000200', 'b0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000020', 'Cyber-Versicherung', 'HDI', 'Cyber-Risk inkl. Datenrettung', '2025-06-01', '2026-06-01', 60, true, 3200.00, 'yearly', null, null, 'HDI-CY-TC');

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
