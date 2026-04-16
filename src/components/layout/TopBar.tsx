'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, User, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageHelpModal } from '@/components/ui/PageHelpModal';

const HELP_KEY_MAP: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/contracts': 'contracts',
  '/analytics': 'analytics',
  '/deadlines': 'deadlines',
  '/templates': 'templates',
  '/notifications': 'notifications',
  '/organization': 'organization',
  '/profile': 'profile',
  '/settings': 'settings',
};

function getHelpKey(pathname: string): string {
  // Exact match first
  if (HELP_KEY_MAP[pathname]) return HELP_KEY_MAP[pathname];
  // Contract detail page
  if (pathname.startsWith('/contracts/') && pathname !== '/contracts/new') return 'contractDetail';
  // Fallback to parent segment
  const segment = '/' + pathname.split('/')[1];
  return HELP_KEY_MAP[segment] ?? 'dashboard';
}

interface TopBarProps {
  unreadCount: number;
}

export function TopBar({ unreadCount }: TopBarProps) {
  const pathname = usePathname();
  const [helpOpen, setHelpOpen] = useState(false);
  const helpKey = getHelpKey(pathname);

  return (
    <>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setHelpOpen(true)}
          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          title="Hilfe"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
        <Link
          href="/notifications"
          className={cn(
            'relative rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200',
            pathname === '/notifications' && 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
          )}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Link>
        <Link
          href="/profile"
          className={cn(
            'rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200',
            pathname === '/profile' && 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
          )}
        >
          <User className="h-5 w-5" />
        </Link>
      </div>
      <PageHelpModal open={helpOpen} onClose={() => setHelpOpen(false)} helpKey={helpKey} />
    </>
  );
}
