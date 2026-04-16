'use client';

import { useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PageHelpModalProps {
  open: boolean;
  onClose: () => void;
  helpKey: string;
}

export function PageHelpModal({ open, onClose, helpKey }: PageHelpModalProps) {
  const t = useTranslations('help');

  useEffect(() => {
    if (!open) return;
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="page-help-title"
        className="relative z-10 w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 id="page-help-title" className="text-base font-semibold text-zinc-900 dark:text-white">
            {t('pageHelp')}
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t(helpKey as Parameters<typeof t>[0])}
        </p>
      </div>
    </div>
  );
}
