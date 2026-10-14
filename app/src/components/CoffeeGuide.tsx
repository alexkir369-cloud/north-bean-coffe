import { useState } from 'react';
import { t, type CopyKey } from '../i18n';
import Cup, { type CupLayer } from './Cup';

const shot = '#3B2219';
const milk = '#E9D7BE';
const foam = '#FBF6EE';
const water = '#D9E4E8';
const choc = '#5A3324';

type DrinkId = 'espresso' | 'cortado' | 'flatWhite' | 'cappuccino' | 'latte' | 'americano' | 'mocha';

// Proportions from the design spec, bottom layer first.
const DRINKS: { id: DrinkId; layers: CupLayer[] }[] = [
  { id: 'espresso', layers: [{ color: shot, share: 100 }] },
  { id: 'cortado', layers: [{ color: shot, share: 50 }, { color: milk, share: 50 }] },
  { id: 'flatWhite', layers: [{ color: shot, share: 35 }, { color: milk, share: 55 }, { color: foam, share: 10 }] },
  { id: 'cappuccino', layers: [{ color: shot, share: 30 }, { color: milk, share: 30 }, { color: foam, share: 40 }] },
  { id: 'latte', layers: [{ color: shot, share: 22 }, { color: milk, share: 63 }, { color: foam, share: 15 }] },
  { id: 'americano', layers: [{ color: shot, share: 35 }, { color: water, share: 65 }] },
  { id: 'mocha', layers: [{ color: choc, share: 25 }, { color: shot, share: 30 }, { color: milk, share: 35 }, { color: foam, share: 10 }] },
];

const text = (id: DrinkId, field: 'name' | 'note' | 'text') => t(`cup.${id}.${field}` as CopyKey);

export default function CoffeeGuide() {
  const [active, setActive] = useState<DrinkId>('flatWhite');

  return (
    <section id="guide" aria-labelledby="guide-title" className="bg-cream py-14 md:py-20 xl:py-[120px]">
      <div className="wrap">
        <div data-reveal className="flex flex-col gap-5 xl:items-center xl:gap-3 xl:text-center">
          <p className="eyebrow">{t('guide.eyebrow')}</p>
          <h2 id="guide-title" className="h2">{t('guide.title')}</h2>
          <p className="text-[15px] text-muted xl:hidden">{t('guide.subTouch')}</p>
          <p className="hidden max-w-[640px] text-lg leading-[30px] text-muted xl:block">{t('guide.sub')}</p>
        </div>

        {/* Below xl the row becomes a scroll-snap carousel that bleeds to the screen edge. */}
        <div className="no-scrollbar -mx-5 mt-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto py-1 md:-mx-10 md:scroll-px-10 xl:mx-0 xl:mt-12 xl:overflow-visible xl:py-0">
          <ul aria-label={t('guide.list')} className="flex w-max gap-3 px-5 md:px-10 xl:mx-auto xl:gap-7 xl:px-0">
            {DRINKS.map(({ id, layers }) => {
              const isActive = id === active;
              return (
                <li key={id} className="snap-start">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="cup-description"
                    onMouseEnter={() => setActive(id)}
                    onFocus={() => setActive(id)}
                    onClick={() => setActive(id)}
                    className={`flex w-[121px] flex-col items-center gap-2.5 rounded-[22px] border-2 bg-paper px-3.5 py-4 transition-[background-color,box-shadow,border-color] duration-300 xl:w-[152px] xl:gap-3.5 xl:rounded-[28px] xl:border-0 xl:py-6 ${
                      isActive
                        ? 'border-espresso xl:shadow-[0_16px_40px_rgba(43,29,23,0.10)]'
                        : 'border-transparent xl:bg-transparent xl:hover:bg-paper/60'
                    }`}
                  >
                    <Cup layers={layers} animate={isActive} className="h-[90px] w-[93px] xl:h-[120px] xl:w-[124px]" />
                    <span className="whitespace-nowrap font-serif text-xl font-semibold xl:text-2xl">{text(id, 'name')}</span>
                    <span className="-mx-1 hidden w-[132px] text-[13px] leading-snug text-muted xl:block">{text(id, 'note')}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p
          id="cup-description"
          aria-live="polite"
          className="mt-5 rounded-[18px] bg-paper px-4 py-3.5 text-sm xl:mx-auto xl:mt-12 xl:w-fit xl:max-w-[960px] xl:rounded-full xl:px-5 xl:py-3"
        >
          <strong className="block font-semibold xl:mr-3 xl:inline">{text(active, 'name')}</strong>
          <span className="mt-1 block leading-5 text-muted xl:mt-0 xl:inline">{text(active, 'text')}</span>
        </p>
      </div>
    </section>
  );
}
