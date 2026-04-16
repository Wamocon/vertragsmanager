import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'surface-card rounded-2xl p-5 transition-all sm:p-6',
        'hover:shadow-[var(--shadow-medium)]',
        'dark:bg-surface-elevated/80',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn('mb-4 sm:mb-5', className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={cn('text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100', className)}>{children}</h3>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn('', className)}>{children}</div>;
}
