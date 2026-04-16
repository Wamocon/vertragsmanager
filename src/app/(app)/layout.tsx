import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { RouteGuidance } from '@/components/layout/RouteGuidance';
import { OrgProvider } from '@/lib/OrgContext';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Superadmin should use the /admin area exclusively
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_superadmin')
    .eq('id', user.id)
    .single();

  if (profile?.is_superadmin) {
    redirect('/admin');
  }

  // Get unread notification count
  const { count } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('read', false);

  // Get user's organization for sidebar
  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  let orgName: string | undefined;
  let orgShortName: string | null = null;
  let orgLogoUrl: string | null = null;

  if (membership) {
    const { data: org } = await supabase
      .from('organizations')
      .select('name, short_name, logo_url')
      .eq('id', membership.organization_id)
      .single();
    orgName = org?.name ?? undefined;
    orgShortName = (org as Record<string, unknown> | null)?.short_name as string | null ?? null;
    orgLogoUrl = org?.logo_url ?? null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        organizationName={orgShortName || orgName}
        organizationLogoUrl={orgLogoUrl}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 flex-shrink-0 items-center justify-end border-b border-zinc-200 bg-white/70 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 lg:px-8">
          <TopBar unreadCount={count ?? 0} />
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-5 lg:px-8 lg:py-6">
          <OrgProvider
            organizationName={orgName ?? ''}
            organizationShortName={orgShortName}
          >
            <div className="mx-auto max-w-7xl">
              <RouteGuidance />
              {children}
            </div>
          </OrgProvider>
        </main>
      </div>
    </div>
  );
}
