import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardContent } from './DashboardContent';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Get the user's organization
  let membership = (await supabase
    .from('organization_members')
    .select('organization_id, role')
    .eq('user_id', user.id)
    .limit(1)
    .single()).data;

  // First login: no org yet → create one via RPC
  if (!membership) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('company_name')
      .eq('id', user.id)
      .single();

    await supabase.rpc('setup_user_org', {
      p_user_id: user.id,
      p_org_name: profile?.company_name || 'Mein Unternehmen',
    });

    membership = (await supabase
      .from('organization_members')
      .select('organization_id, role')
      .eq('user_id', user.id)
      .limit(1)
      .single()).data;

    if (!membership) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-zinc-500">Keine Organisation gefunden. Bitte kontaktieren Sie den Support.</p>
        </div>
      );
    }
  }

  // Fetch contracts
  const { data: contracts } = await supabase
    .from('contracts')
    .select('*, category:categories(*)')
    .eq('organization_id', membership.organization_id)
    .order('updated_at', { ascending: false });

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('organization_id', membership.organization_id);

  // Fetch upcoming notifications
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .eq('read', false)
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <DashboardContent
      contracts={contracts ?? []}
      categories={categories ?? []}
      notifications={notifications ?? []}
      profile={profile}
      userRole={membership.role}
    />
  );
}
