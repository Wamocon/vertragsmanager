import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { ContractDetail } from './ContractDetail';

export default async function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: contract } = await supabase
    .from('contracts')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single();

  if (!contract) notFound();

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id, role')
    .eq('user_id', user.id)
    .eq('organization_id', contract.organization_id)
    .single();

  if (!membership) notFound();

  const { data: reminders } = await supabase
    .from('reminders')
    .select('*')
    .eq('contract_id', id)
    .order('days_before', { ascending: false });

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('organization_id', membership.organization_id);

  const { data: comments } = await supabase
    .from('contract_comments')
    .select('*, profile:profiles!contract_comments_user_id_profiles_fk(*)')
    .eq('contract_id', id)
    .order('created_at', { ascending: true });

  // Fetch org members for role badges on comments
  const { data: orgMembers } = await supabase
    .from('organization_members')
    .select('user_id, role')
    .eq('organization_id', membership.organization_id);

  return (
    <ContractDetail
      contract={contract}
      reminders={reminders ?? []}
      categories={categories ?? []}
      comments={comments ?? []}
      orgMembers={orgMembers ?? []}
      userRole={membership.role}
      userId={user.id}
      organizationId={membership.organization_id}
    />
  );
}
