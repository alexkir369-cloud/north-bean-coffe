import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { t } from '../i18n';
import { ToastContext } from './toast-context';

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number>();

  const show = useCallback((text: string) => {
    setMessage(text);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 4000);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-28 z-[60] flex justify-center px-5 md:bottom-8">
        {message && (
          <div className="pointer-events-auto flex max-w-md items-center gap-3 rounded-3xl bg-espresso py-2 pl-5 pr-2 text-sm text-paper shadow-[0_16px_40px_rgba(43,29,23,0.25)]">
            <span>{message}</span>
            <button type="button" onClick={() => setMessage(null)} aria-label={t('toast.close')} className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-paper/10">
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
