import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { OrganizationContent } from './OrganizationContent';

export default async function OrganizationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id, role')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (!membership) redirect('/dashboard');

  const { data: org } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', membership.organization_id)
    .single();

  const { data: members } = await supabase
    .from('organization_members')
    .select('*, profile:profiles!organization_members_user_id_profiles_fk(*)')
    .eq('organization_id', membership.organization_id);

  const { data: invitations } = await supabase
    .from('invitations')
    .select('*')
    .eq('organization_id', membership.organization_id)
    .eq('accepted', false);

  const { data: auditLog } = await supabase
    .from('audit_log')
    .select('*')
    .eq('organization_id', membership.organization_id)
    .order('created_at', { ascending: false })
    .limit(20);

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('organization_id', membership.organization_id)
    .order('name');

  return (
    <OrganizationContent
      organization={org}
      members={members ?? []}
      invitations={invitations ?? []}
      auditLog={auditLog ?? []}
      categories={categories ?? []}
      userRole={membership.role}
      currentUserId={user.id}
    />
  );
}
