import { ArrowRight } from 'lucide-react';
import { t, type CopyKey } from '../i18n';
import { photo } from '../images';
import { useToast } from './toast-context';

type EventId = 'cupping' | 'latteArt' | 'baking';

// Dates as in the design spec; the year is intentionally not shown.
const EVENTS: { id: EventId; day: string; month: CopyKey; full?: boolean }[] = [
  { id: 'cupping', day: '18', month: 'events.oct' },
  { id: 'latteArt', day: '25', month: 'events.oct' },
  { id: 'baking', day: '01', month: 'events.nov', full: true },
];

const text = (id: EventId, field: 'title' | 'meta' | 'metaShort' | 'status') => t(`event.${id}.${field}` as CopyKey);

export default function Events() {
  const toast = useToast();
  const book = () => toast(t('toast.event'));

  return (
    <section id="events" aria-labelledby="events-title" className="py-14 md:py-20 xl:py-[120px]">
      <div className="wrap">
        <div data-reveal className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-5 xl:gap-3">
            <p className="eyebrow">{t('events.eyebrow')}</p>
            <h2 id="events-title" className="h2">{t('events.title')}</h2>
          </div>
          <button type="button" onClick={book} className="mb-2 hidden shrink-0 items-center gap-2 rounded-full font-semibold text-rust hover:underline hover:underline-offset-4 md:inline-flex">
            {t('events.all')} <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 grid gap-5 xl:mt-10 xl:grid-cols-[720px_minmax(0,504px)] xl:items-start xl:gap-6">
          <img
            {...photo('cupping', 1200)}
            sizes="(min-width: 1280px) 720px, 100vw"
            alt={t('events.alt')}
            width={1200}
            height={896}
            loading="lazy"
            decoding="async"
            className="h-[220px] w-full rounded-[22px] object-cover md:h-[380px] xl:h-[440px] xl:rounded-[28px]"
          />
          <ul className="flex flex-col gap-5 xl:gap-4">
            {EVENTS.map((event) => (
              // The fully booked event is left out on phones, as in the mobile design.
              <li key={event.id} className={event.full ? 'hidden md:block' : undefined}>
                <button
                  type="button"
                  onClick={book}
                  className="flex w-full items-center gap-3.5 rounded-[20px] bg-cream p-3.5 text-left transition-colors hover:bg-line/70 xl:gap-5 xl:rounded-3xl xl:p-5"
                >
                  <span className="flex shrink-0 flex-col items-center rounded-xl bg-paper px-2.5 py-1.5 font-semibold xl:rounded-2xl xl:px-3.5 xl:py-2.5">
                    <span className="font-serif text-[26px] leading-tight xl:text-[32px]">{event.day}</span>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-rust xl:text-[11px]">{t(event.month)}</span>
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5 xl:gap-1">
                    <span className="font-serif text-xl font-semibold leading-tight xl:text-2xl">{text(event.id, 'title')}</span>
                    <span className="text-[13px] text-muted md:hidden">{text(event.id, 'metaShort')}</span>
                    <span className="hidden text-sm text-muted md:block">{text(event.id, 'meta')}</span>
                    <span className={`text-xs font-semibold xl:text-[13px] ${event.full ? 'text-muted' : 'text-green'}`}>{text(event.id, 'status')}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
