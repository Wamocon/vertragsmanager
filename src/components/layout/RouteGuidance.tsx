'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Compass, ArrowRight, X } from 'lucide-react';

interface GuidanceConfig {
  tipKey: string;
  primaryHref: string;
  primaryLabelKey: string;
  secondaryHref: string;
  secondaryLabelKey: string;
}

const DEFAULT_GUIDANCE: GuidanceConfig = {
  tipKey: 'tipDashboard',
  primaryHref: '/contracts/new',
  primaryLabelKey: 'actionCreateContract',
  secondaryHref: '/deadlines',
  secondaryLabelKey: 'actionOpenDeadlines',
};

const ROUTE_GUIDANCE: Record<string, GuidanceConfig> = {
  '/dashboard': {
    tipKey: 'tipDashboard',
    primaryHref: '/contracts/new',
    primaryLabelKey: 'actionCreateContract',
    secondaryHref: '/analytics',
    secondaryLabelKey: 'actionOpenAnalytics',
  },
  '/contracts': {
    tipKey: 'tipContracts',
    primaryHref: '/contracts/new',
    primaryLabelKey: 'actionCreateContract',
    secondaryHref: '/deadlines',
    secondaryLabelKey: 'actionOpenDeadlines',
  },
  '/analytics': {
    tipKey: 'tipAnalytics',
    primaryHref: '/contracts',
    primaryLabelKey: 'actionOpenContracts',
    secondaryHref: '/deadlines',
    secondaryLabelKey: 'actionOpenDeadlines',
  },
  '/deadlines': {
    tipKey: 'tipDeadlines',
    primaryHref: '/contracts',
    primaryLabelKey: 'actionOpenContracts',
    secondaryHref: '/templates',
    secondaryLabelKey: 'actionOpenTemplates',
  },
  '/templates': {
    tipKey: 'tipTemplates',
    primaryHref: '/contracts',
    primaryLabelKey: 'actionOpenContracts',
    secondaryHref: '/notifications',
    secondaryLabelKey: 'actionOpenNotifications',
  },
  '/notifications': {
    tipKey: 'tipNotifications',
    primaryHref: '/deadlines',
    primaryLabelKey: 'actionOpenDeadlines',
    secondaryHref: '/contracts',
    secondaryLabelKey: 'actionOpenContracts',
  },
  '/organization': {
    tipKey: 'tipOrganization',
    primaryHref: '/organization',
    primaryLabelKey: 'actionManageMembers',
    secondaryHref: '/contracts',
    secondaryLabelKey: 'actionOpenContracts',
  },
  '/profile': {
    tipKey: 'tipProfile',
    primaryHref: '/settings',
    primaryLabelKey: 'actionOpenSettings',
    secondaryHref: '/notifications',
    secondaryLabelKey: 'actionOpenNotifications',
  },
  '/settings': {
    tipKey: 'tipSettings',
    primaryHref: '/settings',
    primaryLabelKey: 'actionOpenSettings',
    secondaryHref: '/dashboard',
    secondaryLabelKey: 'actionOpenDashboard',
  },
};

function getGuidance(pathname: string): GuidanceConfig {
  if (pathname.startsWith('/contracts/new')) {
    return {
      tipKey: 'tipNewContract',
      primaryHref: '/contracts',
      primaryLabelKey: 'actionOpenContracts',
      secondaryHref: '/deadlines',
      secondaryLabelKey: 'actionOpenDeadlines',
    };
  }
  if (pathname.startsWith('/contracts/')) {
    return {
      tipKey: 'tipContractDetail',
      primaryHref: '/contracts',
      primaryLabelKey: 'actionOpenContracts',
      secondaryHref: '/templates',
      secondaryLabelKey: 'actionOpenTemplates',
    };
  }
  const segment = '/' + pathname.split('/')[1];
  return ROUTE_GUIDANCE[segment] ?? DEFAULT_GUIDANCE;
}

export function RouteGuidance() {
  const pathname = usePathname();
  const t = useTranslations('guidance');
  const [dismissedPath, setDismissedPath] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('guidanceEnabled') !== 'false';
  });

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === 'guidanceEnabled') {
        setEnabled(e.newValue !== 'false');
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const dismissed = dismissedPath === pathname;

  if (pathname === '/' || dismissed || !enabled) return null;

  const guidance = getGuidance(pathname);

  return (
    <div className="mb-5 rounded-2xl border border-brand/20 bg-brand-soft/55 px-4 py-3 dark:bg-brand-soft/30 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5">
          <Compass className="mt-0.5 h-4 w-4 text-brand" />
          <p className="text-sm text-zinc-700 dark:text-zinc-200">
            <span className="mr-1 font-semibold text-zinc-900 dark:text-white">{t('title')}:</span>
            {t(guidance.tipKey as Parameters<typeof t>[0])}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={guidance.primaryHref}
            className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-strong dark:text-zinc-950"
          >
            {t(guidance.primaryLabelKey as Parameters<typeof t>[0])}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={guidance.secondaryHref}
            className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {t(guidance.secondaryLabelKey as Parameters<typeof t>[0])}
          </Link>
          <button
            onClick={() => setDismissedPath(pathname)}
            className="ml-1 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-200/50 hover:text-zinc-600 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-300"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
