import { ArrowRight } from 'lucide-react';
import { t, type CopyKey } from '../i18n';
import { photo } from '../images';
import { useToast } from './toast-context';

const NOTES = ['blueberry', 'jasmine', 'honey', 'bergamot'] as const;
const ROAST = { level: 2, of: 5 };

export default function BeanOfMonth() {
  const toast = useToast();

  return (
    <section id="bean" aria-labelledby="bean-title" className="bg-cream py-14 md:py-20 xl:py-[120px]">
      {/* Mobile order: heading → photo → body; from lg the photo sits in its own column. */}
      <div className="wrap grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-x-14 lg:gap-y-6 xl:grid-cols-[500px_560px] xl:gap-x-20">
        <div data-reveal className="flex flex-col items-start gap-5 lg:self-end xl:gap-6">
          <p className="eyebrow">{t('bean.eyebrow')}</p>
          <h2 id="bean-title" className="h2 whitespace-pre-line">{t('bean.title')}</h2>
        </div>

        <img
          {...photo('v60-pour-over', 1024)}
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 50vw, 100vw"
          alt={t('bean.alt')}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="h-[300px] w-full rounded-[22px] object-cover md:h-[460px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-square lg:h-auto xl:rounded-[28px]"
        />

        <div className="flex flex-col items-start gap-5 lg:self-start xl:gap-6">
          <p className="text-base leading-[25px] text-muted md:hidden">{t('bean.textShort')}</p>
          <p className="hidden text-lg leading-[30px] text-muted md:block">{t('bean.text')}</p>

          <ul aria-label={t('bean.notes')} className="flex flex-wrap gap-2 xl:gap-2.5">
            {NOTES.map((note) => (
              <li key={note} className={`rounded-full bg-paper px-3.5 py-2 text-sm font-medium xl:px-[18px] xl:py-2.5 xl:text-[15px] ${note === 'bergamot' ? 'hidden md:block' : ''}`}>
                {t(`bean.note.${note}` as CopyKey)}
              </li>
            ))}
          </ul>

          <div className="hidden w-[344px] flex-col gap-2.5 md:flex">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t('bean.roast')}</p>
            <div role="img" aria-label={t('bean.roastLevel')} className="flex gap-1.5">
              {Array.from({ length: ROAST.of }, (_, i) => (
                <span key={i} className={`h-2 flex-1 rounded ${i < ROAST.level ? 'bg-rust' : 'bg-line'}`} />
              ))}
            </div>
            <div aria-hidden="true" className="flex justify-between text-[13px] text-muted">
              <span>{t('bean.light')}</span>
              <span>{t('bean.dark')}</span>
            </div>
          </div>

          <div className="flex w-full flex-wrap gap-3.5 md:w-auto">
            <button
              type="button"
              onClick={() => toast(t('toast.order'))}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-[26px] py-[15px] font-semibold text-paper transition-colors hover:bg-espresso/90 md:w-auto"
            >
              {t('bean.order')} <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => toast(t('toast.order'))}
              className="hidden rounded-full border border-espresso px-[26px] py-[15px] font-semibold transition-colors hover:bg-espresso/5 md:inline-flex"
            >
              {t('bean.buy')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
