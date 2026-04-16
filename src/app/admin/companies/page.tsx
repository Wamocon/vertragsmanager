import { createAdminClient } from '@/lib/supabase/admin';
import { CompaniesContent } from './CompaniesContent';

export default async function CompaniesPage() {
  const admin = createAdminClient();

  const { data: organizations } = await admin
    .from('organizations')
    .select('*')
    .order('name');

  // Get member counts per org
  const { data: members } = await admin
    .from('organization_members')
    .select('organization_id');

  const { data: contracts } = await admin
    .from('contracts')
    .select('organization_id');

  const orgStats = (organizations ?? []).map((org) => ({
    ...org,
    memberCount: members?.filter((m) => m.organization_id === org.id).length ?? 0,
    contractCount: contracts?.filter((c) => c.organization_id === org.id).length ?? 0,
  }));

  return <CompaniesContent organizations={orgStats} />;
}
