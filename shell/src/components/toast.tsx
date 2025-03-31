import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  className?: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  onClose?: () => void;
  icon?: React.ReactNode;
  isVisible?: boolean;
}

const toastTypeStyles = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-500',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-500',
  warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-500',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500',
};

const toastTypeIconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
};

export function Toast({
  className,
  title,
  message,
  type = 'info',
  duration = 5000,
  position = 'bottom-right',
  onClose,
  icon,
  isVisible = true,
  ...props
}: ToastProps & Omit<React.ComponentPropsWithoutRef<'div'>, 'onClose'>) {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const defaultIcons = {
    success: (
      <svg className={`h-5 w-5 ${toastTypeIconColors.success}`} viewBox="0 0 20 20" fill="currentColor">
        <title>Success</title>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className={`h-5 w-5 ${toastTypeIconColors.error}`} viewBox="0 0 20 20" fill="currentColor">
        <title>Error</title>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className={`h-5 w-5 ${toastTypeIconColors.warning}`} viewBox="0 0 20 20" fill="currentColor">
        <title>Warning</title>
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className={`h-5 w-5 ${toastTypeIconColors.info}`} viewBox="0 0 20 20" fill="currentColor">
        <title>Info</title>
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <Headless.Transition
      show={visible}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-2"
      as="div"
      className={clsx(
        'fixed z-50',
        positionClasses[position],
        className
      )}
    >
      <div
        {...props}
        className={clsx(
          'flex items-start gap-3 rounded-lg p-4 shadow-lg border-l-4',
          toastTypeStyles[type],
          'max-w-sm bg-white dark:bg-zinc-800'
        )}
      >
        <div className="flex-shrink-0">
          {icon || defaultIcons[type]}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className="font-medium text-zinc-950 dark:text-white">
              {title}
            </h3>
          )}
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          className="flex-shrink-0 rounded-md p-1 text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400"
        >
          <span className="sr-only">Cerrar</span>
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <title>Cerrar</title>
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Headless.Transition>
  );
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-end justify-end p-4 pointer-events-none">
      <div className="flex flex-col items-end space-y-4 w-full max-w-sm pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
