import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { t, type CopyKey } from '../i18n';
import LanguageSwitch from './LanguageSwitch';

const LINKS: { label: CopyKey; href: string }[] = [
  { label: 'nav.menu', href: '#menu' },
  { label: 'nav.guide', href: '#guide' },
  { label: 'nav.order', href: '#order' },
  { label: 'nav.story', href: '#story' },
  { label: 'nav.visit', href: '#visit' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1280px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-3 md:px-10 md:pt-5 xl:px-12 xl:pt-7">
      <div
        className={`mx-auto max-w-[1344px] rounded-[25px] border transition-[background-color,border-color,color,box-shadow] duration-300 xl:rounded-[32px] ${
          solid
            ? 'border-line bg-paper/95 text-espresso shadow-[0_12px_32px_rgba(43,29,23,0.10)] backdrop-blur-xl'
            : 'border-white/35 bg-paper/[0.18] text-paper backdrop-blur-[24px]'
        }`}
      >
        <div className="flex items-center justify-between gap-4 py-2 pl-[18px] pr-2 xl:py-3 xl:pl-7 xl:pr-4">
          <a href="#home" aria-label={t('a11y.home')} className="whitespace-nowrap rounded-full font-serif text-[22px] font-semibold xl:text-[26px]">
            North &amp; Bean
          </a>

          <nav aria-label={t('a11y.mainNav')} className="hidden xl:block">
            <ul className="flex items-center gap-9 text-[15px] font-medium">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="rounded-full py-2 opacity-95 transition-opacity hover:opacity-100 hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 xl:gap-4">
            <LanguageSwitch className="hidden text-sm xl:flex" />
            <a
              href="#order"
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors xl:px-5 xl:py-2.5 xl:text-sm ${
                solid ? 'bg-espresso text-paper hover:bg-espresso/90' : 'bg-paper text-espresso hover:bg-cream'
              }`}
            >
              <span className="xl:hidden">{t('header.orderShort')}</span>
              <span className="hidden xl:inline">{t('header.order')}</span>
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full xl:hidden"
            >
              {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div id="mobile-menu" hidden={!open} className="xl:hidden">
          <nav aria-label={t('a11y.mobileNav')} className="border-t border-line px-[18px] pb-4 pt-2">
            <ul>
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)} className="block rounded-xl py-3 text-base font-medium">
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitch long className="mt-2 gap-2 border-t border-line pt-3 text-sm" />
          </nav>
        </div>
      </div>
    </header>
  );
}
