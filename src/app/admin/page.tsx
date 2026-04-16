import { createAdminClient } from '@/lib/supabase/admin';
import { AdminDashboard } from './AdminDashboard';

export default async function AdminPage() {
  const admin = createAdminClient();

  const { count: totalOrgs } = await admin
    .from('organizations')
    .select('*', { count: 'exact', head: true });

  const { count: activeOrgs } = await admin
    .from('organizations')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { data: allProfiles } = await admin
    .from('profiles')
    .select('is_active, is_superadmin');

  const totalUsers = allProfiles?.filter((p) => !p.is_superadmin).length ?? 0;
  const activeUsers = allProfiles?.filter((p) => !p.is_superadmin && p.is_active).length ?? 0;

  const { data: recentOrgs } = await admin
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <AdminDashboard
      totalOrgs={totalOrgs ?? 0}
      activeOrgs={activeOrgs ?? 0}
      totalUsers={totalUsers}
      activeUsers={activeUsers}
      recentOrgs={recentOrgs ?? []}
    />
  );
}
