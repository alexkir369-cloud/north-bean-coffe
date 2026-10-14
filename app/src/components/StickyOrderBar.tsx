import { useEffect, useState } from 'react';
import { t } from '../i18n';
import { useToast } from './toast-context';

// Phones only. It appears once the hero (with its own Order button) has scrolled away.
export default function StickyOrderBar() {
  const [visible, setVisible] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-5 bottom-4 z-40 flex justify-center md:hidden">
      <aside
        aria-label={t('sticky.label')}
        className={`pointer-events-auto flex w-full max-w-[420px] items-center justify-between gap-3 rounded-full bg-espresso py-2 pl-5 pr-2 text-paper shadow-[0_12px_30px_rgba(43,29,23,0.25)] transition-[opacity,transform,visibility] duration-300 ${
          visible ? '' : 'invisible translate-y-4 opacity-0'
        }`}
      >
        <p className="min-w-0">
          <span className="block truncate text-sm font-semibold">{t('sticky.usual')}</span>
          <span className="block truncate text-xs text-paper/70">{t('sticky.ready')}</span>
        </p>
        <button
          type="button"
          onClick={() => toast(t('toast.order'))}
          className="shrink-0 rounded-full bg-paper px-4 py-2.5 text-sm font-semibold text-espresso"
        >
          {t('sticky.order')}
        </button>
      </aside>
    </div>
  );
}
