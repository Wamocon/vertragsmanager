-- Add license_type and license_cost_per_unit columns to contracts
create type public.license_type as enum ('single', 'bundle', 'unlimited');

alter table public.contracts
  add column license_type public.license_type default null,
  add column license_cost_per_unit numeric(12,2) default null;
