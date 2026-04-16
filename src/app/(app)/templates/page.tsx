import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { TemplatesContent } from './TemplatesContent';

export default async function TemplatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (!membership) redirect('/dashboard');

  const { data: contracts } = await supabase
    .from('contracts')
    .select('*')
    .eq('organization_id', membership.organization_id)
    .in('status', ['active', 'expiring_soon'])
    .order('name');

  const { data: org } = await supabase
    .from('organizations')
    .select('name')
    .eq('id', membership.organization_id)
    .single();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <TemplatesContent
      contracts={contracts ?? []}
      orgName={org?.name ?? ''}
      profile={profile}
    />
  );
}
