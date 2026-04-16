-- Add counterparty (Vertragspartner) master data to contracts
-- These fields enable proper addressing of cancellation letters.

alter table public.contracts
  add column counterparty_name text,
  add column counterparty_address text,
  add column counterparty_zip text,
  add column counterparty_city text,
  add column counterparty_country text default 'Deutschland',
  add column counterparty_contact text,
  add column counterparty_email text,
  add column counterparty_phone text;
