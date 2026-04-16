import { createAdminClient } from '@/lib/supabase/admin';
import { UsersContent } from './UsersContent';

export default async function UsersPage() {
  const admin = createAdminClient();

  const { data: profiles } = await admin
    .from('profiles')
    .select('*')
    .eq('is_superadmin', false)
    .order('full_name');

  const { data: memberships } = await admin
    .from('organization_members')
    .select('user_id, role, organization:organizations(name)')
    .order('role');

  const { data: { users: authUsers } } = await admin.auth.admin.listUsers();
  const emailMap = new Map(authUsers?.map((u) => [u.id, u.email]) ?? []);

  const usersWithDetails = (profiles ?? []).map((profile) => {
    const membership = memberships?.find((m) => m.user_id === profile.id);
    return {
      ...profile,
      email: emailMap.get(profile.id) ?? 'Unbekannt',
      role: membership?.role ?? null,
      organizationName: (membership?.organization as unknown as { name: string } | null)?.name ?? '-',
    };
  });

  return <UsersContent users={usersWithDetails} />;
}
