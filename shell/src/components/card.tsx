import clsx from 'clsx';
import type React from 'react';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'rounded-lg shadow-md ring-1 ring-zinc-950/5 dark:ring-white/10',
        'bg-white dark:bg-zinc-800',
        'overflow-hidden'
      )}
    />
  );
}
