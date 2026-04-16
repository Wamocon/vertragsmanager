import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { MonthlyTrendContent } from './MonthlyTrendContent';

export default async function MonthlyTrendPage() {
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
    .select('*, category:categories(*)')
    .eq('organization_id', membership.organization_id);

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('organization_id', membership.organization_id);

  return <MonthlyTrendContent contracts={contracts ?? []} categories={categories ?? []} />;
}
