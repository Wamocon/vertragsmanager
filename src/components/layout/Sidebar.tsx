'use client';

import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Clock,
  FileSignature,
  Settings,
  Building2,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { useState, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useTheme } from '@/hooks/useTheme';
import { setLocale } from '@/lib/actions/setLocale';
import Image from 'next/image';

const navItems = [
  { key: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'contracts', href: '/contracts', icon: FileText },
  { key: 'analytics', href: '/analytics', icon: BarChart3 },
  { key: 'deadlines', href: '/deadlines', icon: Clock },
  { key: 'templates', href: '/templates', icon: FileSignature },
] as const;

const bottomNavItems = [
  { key: 'organization', href: '/organization', icon: Building2 },
  { key: 'settings', href: '/settings', icon: Settings },
] as const;

interface SidebarProps {
  organizationName?: string;
  organizationLogoUrl?: string | null;
}

export function Sidebar({ organizationName, organizationLogoUrl }: SidebarProps) {
  const t = useTranslations('nav');
  const tSettings = useTranslations('settings');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  function handleLocaleChange(newLocale: 'de' | 'en') {
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh();
    });
  }

  const themeButtons = [
    { value: 'light' as const, icon: Sun, label: tSettings('light') },
    { value: 'dark' as const, icon: Moon, label: tSettings('dark') },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* App Name */}
      <div className="flex h-14 items-center gap-2 border-b border-zinc-200 bg-white/75 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white font-bold text-xs dark:text-zinc-950">
          VM
        </div>
        <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          Vertragsmanager
        </span>
      </div>

      {/* Organization */}
      {organizationName && (
        <div className="flex items-center gap-2 border-b border-zinc-200 bg-white/60 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/60">
          {organizationLogoUrl ? (
            <Image
              src={organizationLogoUrl}
              alt={organizationName}
              width={24}
              height={24}
              className="h-6 w-6 rounded object-cover"
            />
          ) : (
            <Building2 className="h-5 w-5 text-zinc-400" />
          )}
          <span className="truncate text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {organizationName}
          </span>
        </div>
      )}

      {/* Main nav */}
      <nav className="flex-1 space-y-1.5 px-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-brand-soft text-brand dark:bg-brand-soft/50 dark:text-brand'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
              )}
            >
              <item.icon className="h-5 w-5" />
              {t(item.key)}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="space-y-3 border-t border-zinc-200 bg-white/60 px-2 py-4 dark:border-zinc-800 dark:bg-zinc-900/60">
        {/* Theme toggle */}
        <div className="flex items-center justify-between rounded-lg px-3 py-1">
          <div className="flex gap-1 rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900">
            {themeButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setTheme(btn.value)}
                title={btn.label}
                className={cn(
                  'rounded-md p-1.5 transition-colors',
                  theme === btn.value
                    ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300',
                )}
              >
                <btn.icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
          {/* Language toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900">
            <Globe className="mx-1 h-3.5 w-3.5 text-zinc-400" />
            <button
              onClick={() => handleLocaleChange('de')}
              disabled={isPending}
              className={cn(
                'rounded-md px-1.5 py-1 text-xs font-medium transition-colors',
                locale === 'de'
                  ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300',
              )}
            >
              DE
            </button>
            <button
              onClick={() => handleLocaleChange('en')}
              disabled={isPending}
              className={cn(
                'rounded-md px-1.5 py-1 text-xs font-medium transition-colors',
                locale === 'en'
                  ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300',
              )}
            >
              EN
            </button>
          </div>
        </div>

        {/* Nav links */}
        <div className="space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-soft text-brand dark:bg-brand-soft/50 dark:text-brand'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1">{t(item.key)}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <LogOut className="h-5 w-5" />
            {t('logout')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-3 z-40 rounded-xl border border-zinc-200 bg-white/90 p-2 shadow-sm backdrop-blur lg:hidden dark:border-zinc-700 dark:bg-zinc-900/90"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 border-r border-zinc-200 bg-background/95 backdrop-blur dark:border-zinc-800 dark:bg-background/95">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-2 top-4 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-72 flex-shrink-0 border-r border-zinc-200 bg-background/85 backdrop-blur lg:block dark:border-zinc-800 dark:bg-background/80">
        {sidebarContent}
      </aside>
    </>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-zinc-900 dark:hover:text-zinc-100">
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-900 dark:text-zinc-100">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
