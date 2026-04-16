-- V3: Add short_name to organizations
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS short_name TEXT;
