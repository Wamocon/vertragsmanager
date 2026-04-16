'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function requireSuperadmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_superadmin')
    .eq('id', user.id)
    .single();
  if (!profile?.is_superadmin) throw new Error('Not authorized');
  return user;
}

export async function toggleUserActive(userId: string, isActive: boolean) {
  await requireSuperadmin();
  const admin = createAdminClient();
  await admin.from('profiles').update({ is_active: isActive }).eq('id', userId);
  // Also ban/unban in Supabase Auth
  if (!isActive) {
    await admin.auth.admin.updateUserById(userId, { ban_duration: '876000h' }); // ~100 years
  } else {
    await admin.auth.admin.updateUserById(userId, { ban_duration: 'none' });
  }
  revalidatePath('/admin');
}

export async function resetUserPassword(userId: string, newPassword: string) {
  await requireSuperadmin();
  const admin = createAdminClient();
  await admin.auth.admin.updateUserById(userId, { password: newPassword });
  revalidatePath('/admin/users');
}

export async function toggleOrgActive(orgId: string, isActive: boolean) {
  await requireSuperadmin();
  const admin = createAdminClient();
  await admin.from('organizations').update({ is_active: isActive }).eq('id', orgId);
  revalidatePath('/admin');
}
