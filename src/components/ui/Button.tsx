import { cn } from '@/lib/utils';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' && 'bg-brand text-white shadow-sm hover:bg-brand-strong hover:shadow-md dark:text-zinc-950',
        variant === 'secondary' && 'border border-zinc-300 bg-white text-zinc-900 hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
        variant === 'danger' && 'bg-danger text-white hover:bg-red-700 focus-visible:ring-danger',
        variant === 'ghost' && 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
        size === 'sm' && 'h-9 px-3 text-sm',
        size === 'md' && 'h-10 px-4 text-sm',
        size === 'lg' && 'h-12 px-6 text-base',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
