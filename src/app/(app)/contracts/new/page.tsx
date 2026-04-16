import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ContractForm } from '../ContractForm';

export default async function NewContractPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id, role')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (!membership || membership.role === 'reader') redirect('/contracts');

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('organization_id', membership.organization_id)
    .order('name');

  return (
    <ContractForm
      categories={categories ?? []}
      organizationId={membership.organization_id}
      userId={user.id}
    />
  );
}
