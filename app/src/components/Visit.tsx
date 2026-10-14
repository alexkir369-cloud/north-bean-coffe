import { t, type CopyKey } from '../i18n';
import { photo } from '../images';

// "Usually busy" from the spec: share of peak for each hour 7–17; 10:00 is highlighted as "now".
const BUSY = [35, 95, 80, 45, 40, 70, 65, 35, 50, 55, 30];
const FIRST_HOUR = 7;
const NOW_HOUR = 10;

const INFO: { label: CopyKey; value: CopyKey; joiner: string }[] = [
  { label: 'visit.address', value: 'visit.addressText', joiner: ', ' },
  { label: 'visit.hours', value: 'visit.hoursText', joiner: ' · ' },
];

export default function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="bg-cream py-14 md:py-20 xl:py-[120px]">
      <div className="wrap grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-14 xl:grid-cols-[557px_560px] xl:gap-20">
        <div className="flex flex-col items-start gap-5 xl:gap-7">
          <div data-reveal className="flex flex-col gap-5 xl:gap-7">
            <p className="eyebrow">{t('visit.eyebrow')}</p>
            <h2 id="visit-title" className="h2">{t('visit.title')}</h2>
          </div>

          <dl className="flex flex-col gap-5 md:flex-row md:flex-wrap md:gap-x-12 md:gap-y-5">
            {INFO.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 md:gap-2">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted md:text-xs">{t(item.label)}</dt>
                <dd className="text-[15px] font-medium md:text-base md:leading-[26px]">
                  <span className="md:hidden">{t(item.value).replace('\n', item.joiner)}</span>
                  <span className="hidden whitespace-pre-line md:inline">{t(item.value)}</span>
                </dd>
              </div>
            ))}
            <div className="flex flex-col gap-1 md:gap-2">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted md:text-xs">{t('visit.contact')}</dt>
              <dd className="text-[15px] font-medium md:text-base md:leading-[26px]">hello@northbean.dk</dd>
            </div>
          </dl>

          <div className="flex w-full flex-col gap-3 rounded-[20px] bg-paper p-4 md:w-auto md:gap-3.5 md:rounded-3xl md:px-6 md:py-[22px]">
            <div className="flex items-center justify-between gap-6 font-semibold">
              <p className="text-sm md:text-[15px]">{t('visit.busy')}</p>
              <p className="text-xs text-green md:text-[13px]">{t('visit.now')}</p>
            </div>
            <div role="img" aria-label={t('visit.chart')} className="flex items-end gap-1.5 [--busy-peak:70px] md:gap-2 md:[--busy-peak:90px]">
              {BUSY.map((share, i) => {
                const hour = FIRST_HOUR + i;
                return (
                  <div key={hour} className="flex flex-col items-center gap-1 md:gap-1.5">
                    <span
                      className={`block w-5 rounded-[5px] md:w-[30px] md:rounded-md ${hour === NOW_HOUR ? 'bg-espresso' : 'bg-latte/55'}`}
                      // --busy-peak (set on the chart) is the 100% height: 70 px on phones, 90 px from md.
                      style={{ height: `calc(var(--busy-peak) * ${share / 100})` }}
                    />
                    <span aria-hidden="true" className="text-[10px] text-muted md:text-[11px]">{hour}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-muted">{t('visit.note')}</p>
          </div>
        </div>

        <img
          {...photo('cafe-interior', 1200)}
          sizes="(min-width: 1280px) 750px, (min-width: 1024px) 60vw, 100vw"
          alt={t('visit.alt')}
          width={1200}
          height={896}
          loading="lazy"
          decoding="async"
          className="h-[240px] w-full rounded-[22px] object-cover md:h-[420px] lg:aspect-square lg:h-auto xl:rounded-[28px]"
        />
      </div>
    </section>
  );
}
