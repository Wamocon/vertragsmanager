-- Fix trigger ordering: auto_update_contract_status fires BEFORE compute_contract_deadline
-- because PostgreSQL fires BEFORE triggers alphabetically ('a' < 'c').
-- Rename the status trigger so it fires AFTER the deadline computation.

drop trigger if exists auto_update_contract_status on public.contracts;

create trigger set_contract_status
  before insert or update on public.contracts
  for each row execute procedure public.update_contract_status();
