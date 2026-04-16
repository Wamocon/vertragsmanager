'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { useOrgDisplayName } from '@/lib/OrgContext';
import type { Notification } from '@/types/database';
import { Bell, CheckCheck } from 'lucide-react';
import Link from 'next/link';

interface NotificationsContentProps {
  notifications: Notification[];
}

export function NotificationsContent({ notifications }: NotificationsContentProps) {
  const t = useTranslations('notifications');
  const router = useRouter();
  const orgDisplayName = useOrgDisplayName();

  async function markAsRead(id: string) {
    const supabase = createClient();
    await supabase.from('notifications').update({ read: true }).eq('id', id);
    router.refresh();
  }

  async function markAllRead() {
    const supabase = createClient();
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length > 0) {
      await supabase.from('notifications').update({ read: true }).in('id', unreadIds);
      router.refresh();
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: orgDisplayName, href: '/dashboard' }, { label: t('title') }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
          {unreadCount > 0 && (
            <p className="mt-1 text-sm text-zinc-500">{unreadCount} {t('unread')}</p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead}>
            <CheckCheck className="mr-1.5 h-4 w-4" /> {t('markAllRead')}
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Bell className="mx-auto h-8 w-8 text-zinc-300" />
            <p className="mt-2 text-zinc-500">{t('noNotifications')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-lg border p-4 transition-colors ${
                notification.read
                  ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                  : 'border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/10'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium text-zinc-900 dark:text-white">{notification.title}</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{notification.message}</p>
                  <p className="mt-2 text-xs text-zinc-400">
                    {new Date(notification.created_at).toLocaleString('de-DE')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {notification.link && (
                    <Link href={notification.link} className="text-sm text-indigo-600 hover:text-indigo-500">
                      {t('open')}
                    </Link>
                  )}
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-zinc-500 hover:text-zinc-700"
                    >
                      {t('markRead')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
