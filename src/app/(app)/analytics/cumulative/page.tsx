import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CumulativeChartContent } from './CumulativeChartContent';

export default async function CumulativeChartPage() {
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

  return <CumulativeChartContent contracts={contracts ?? []} categories={categories ?? []} />;
}
