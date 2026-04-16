import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import { CompanyDetail } from './CompanyDetail';

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = createAdminClient();

  const { data: org } = await admin
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single();

  if (!org) notFound();

  const { data: members } = await admin
    .from('organization_members')
    .select('*, profile:profiles!organization_members_user_id_profiles_fk(*)')
    .eq('organization_id', id)
    .order('role');

  // Get emails from auth
  const { data: { users: authUsers } } = await admin.auth.admin.listUsers();
  const emailMap = new Map(authUsers?.map((u) => [u.id, u.email]) ?? []);

  const membersWithEmail = (members ?? []).map((m) => ({
    ...m,
    email: emailMap.get(m.user_id) ?? 'Unbekannt',
  }));

  const { data: contracts } = await admin
    .from('contracts')
    .select('id, name, provider, amount, payment_interval, status')
    .eq('organization_id', id)
    .order('name');

  return (
    <CompanyDetail
      organization={org}
      members={membersWithEmail}
      contracts={contracts ?? []}
    />
  );
}
