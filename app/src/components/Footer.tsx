import { t, type CopyKey } from '../i18n';
import LanguageSwitch from './LanguageSwitch';
import { useToast } from './toast-context';

const LINKS: { label: CopyKey; href: string }[] = [
  { label: 'nav.menu', href: '#menu' },
  { label: 'nav.order', href: '#order' },
  { label: 'footer.events', href: '#events' },
];

export default function Footer() {
  const toast = useToast();

  return (
    // Extra bottom padding on phones keeps the note clear of the floating order bar.
    <footer className="bg-espresso pb-[120px] pt-14 text-paper md:py-14">
      <div className="wrap flex flex-col items-start gap-5 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
        <div className="flex flex-col gap-5 md:gap-1.5">
          <p className="font-serif text-[30px] font-semibold leading-tight xl:text-[32px]">North &amp; Bean</p>
          <p className="font-serif text-lg font-medium italic text-latte">{t('footer.tagline')}</p>
        </div>

        <nav aria-label={t('footer.nav')}>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-paper/85 xl:gap-x-7 xl:text-[15px]">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="rounded-full py-2 hover:text-paper hover:underline hover:underline-offset-4">{t(link.label)}</a>
              </li>
            ))}
            <li className="hidden md:block">
              <button type="button" onClick={() => toast(t('toast.instagram'))} className="rounded-full py-2 hover:text-paper hover:underline hover:underline-offset-4">
                Instagram
              </button>
            </li>
            <li>
              <LanguageSwitch className="-mx-1.5" />
            </li>
          </ul>
        </nav>

        <p className="text-xs text-paper/50 xl:text-[13px]">{t('footer.note')}</p>
      </div>
    </footer>
  );
}
