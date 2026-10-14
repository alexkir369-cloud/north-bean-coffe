import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Check, Leaf, Plus } from 'lucide-react';
import { formatPrice, t, type CopyKey } from '../i18n';
import { photo } from '../images';
import { CATEGORIES, DIETS, LIST_COLUMNS, MENU, type Category, type Diet, type MenuItem } from '../data/menu';
import { useToast } from './toast-context';

type Tab = 'all' | Category;
const TABS: Tab[] = ['all', ...CATEGORIES];

const itemName = (item: MenuItem) => t(`item.${item.id}` as CopyKey);
const cardText = (item: MenuItem, field: 'text' | 'alt') => t(`card.${item.id}.${field}` as CopyKey);

export default function Menu() {
  const [tab, setTab] = useState<Tab>('all');
  const [diets, setDiets] = useState<Diet[]>([]);
  const [fullOpen, setFullOpen] = useState(false);
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const toast = useToast();

  const matches = (item: MenuItem) =>
    (tab === 'all' || item.categories.includes(tab)) && diets.every((diet) => item.diet.includes(diet));
  const cards = MENU.filter((item) => item.card && matches(item));
  // "All" mirrors the design (featured cards only); a category also lists its items without photos.
  const rows = tab === 'all' ? [] : MENU.filter((item) => !item.card && matches(item));

  const toggleDiet = (diet: Diet) =>
    setDiets((current) => (current.includes(diet) ? current.filter((d) => d !== diet) : [...current, diet]));

  // ARIA tabs pattern with automatic activation: arrows, Home and End move between tabs.
  const onTabKeyDown = (event: KeyboardEvent) => {
    const index = TABS.indexOf(tab);
    const next = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: TABS.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const wrapped = (next + TABS.length) % TABS.length;
    setTab(TABS[wrapped]);
    tabButtons.current[wrapped]?.focus();
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="py-14 md:py-20 xl:py-[120px]">
      <div className="wrap">
        <div data-reveal className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-5 xl:gap-3">
            <p className="eyebrow">{t('menu.eyebrow')}</p>
            <h2 id="menu-title" className="h2 max-w-[260px] md:max-w-none">{t('menu.title')}</h2>
          </div>
          <a href="#full-menu" className="mb-2 hidden shrink-0 items-center gap-2 rounded-full font-semibold text-rust hover:underline hover:underline-offset-4 md:inline-flex">
            {t('menu.fullLink')} <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-5 flex flex-col gap-3 xl:mt-10 xl:flex-row xl:flex-wrap xl:items-center xl:justify-between xl:gap-x-6 xl:gap-y-4">
          <div className="no-scrollbar -mx-5 -my-1 overflow-x-auto px-5 py-1 md:mx-0 md:px-0 xl:shrink-0 xl:overflow-visible">
            <div role="tablist" aria-label={t('menu.tabs')} onKeyDown={onTabKeyDown} className="flex w-max gap-2 xl:gap-2.5">
              {TABS.map((id, i) => {
                const selected = id === tab;
                return (
                  <button
                    key={id}
                    ref={(el) => { tabButtons.current[i] = el; }}
                    type="button"
                    role="tab"
                    id={`menu-tab-${id}`}
                    aria-selected={selected}
                    aria-controls="menu-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(id)}
                    className={`whitespace-nowrap rounded-full border px-3.5 py-[9px] text-sm font-medium transition-colors xl:px-[22px] xl:py-3 xl:text-[15px] ${
                      selected ? 'border-espresso bg-espresso text-paper' : 'border-line hover:border-espresso/40'
                    }`}
                  >
                    {t(`menu.tab.${id}` as CopyKey)}
                  </button>
                );
              })}
            </div>
          </div>

          <div role="group" aria-label={t('menu.filters')} className="flex flex-wrap items-center gap-2">
            <span className="hidden text-sm font-medium text-muted xl:inline">{t('menu.filterLabel')}</span>
            {DIETS.map((diet) => {
              const on = diets.includes(diet);
              return (
                <button
                  key={diet}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleDiet(diet)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors xl:px-3.5 xl:py-2 xl:text-[13px] ${
                    on ? 'border-cream bg-cream' : 'border-line hover:border-espresso/40'
                  }`}
                >
                  {on ? <Check className="size-3.5" aria-hidden="true" /> : diet === 'vegan' && <Leaf className="hidden size-3.5 text-green xl:block" aria-hidden="true" />}
                  {t(`menu.filter.${diet}` as CopyKey)}
                </button>
              );
            })}
          </div>
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`menu-tab-${tab}`} tabIndex={0} className="mt-5 rounded-3xl xl:mt-10">
          {cards.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-3.5 gap-y-5 md:grid-cols-3 md:gap-x-6 md:gap-y-10 xl:grid-cols-4">
              {cards.map((item) => {
                const card = item.card!;
                const name = card.name ? t(card.name) : itemName(item);
                return (
                  <li key={item.id} className="flex flex-col gap-2 md:gap-3.5">
                    <div className="relative aspect-[168/180] overflow-hidden rounded-[20px] bg-cream md:aspect-square md:rounded-3xl">
                      <img
                        {...photo(card.image.replace('.webp', ''), 1024)}
                        sizes="(min-width: 1280px) 294px, (min-width: 768px) 30vw, 45vw"
                        alt={cardText(item, 'alt')}
                        width={1024}
                        height={1024}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover"
                      />
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-paper px-2.5 py-[5px] text-[11px] font-semibold md:left-3.5 md:top-3.5 md:px-3 md:py-1.5 md:text-xs">
                        {t(card.tag)}
                      </span>
                      <button
                        type="button"
                        onClick={() => toast(t('toast.order'))}
                        aria-label={`${t('menu.add')} ${name}`}
                        className="absolute bottom-2.5 right-2.5 grid size-9 place-items-center rounded-full bg-espresso text-paper before:absolute before:-inset-1 before:content-[''] md:hidden"
                      >
                        <Plus className="size-5" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-3">
                      <h3 className="font-serif text-[21px] font-semibold leading-tight md:text-[26px]">
                        {card.name ? (
                          <>
                            <span className="md:hidden">{itemName(item)}</span>
                            <span className="hidden md:inline">{name}</span>
                          </>
                        ) : name}
                      </h3>
                      <p className="whitespace-nowrap text-sm font-semibold text-rust md:text-base">{formatPrice(item.price)}</p>
                    </div>
                    <p className="hidden text-[15px] leading-[22px] text-muted md:block">{cardText(item, 'text')}</p>
                  </li>
                );
              })}
            </ul>
          )}

          {rows.length > 0 && (
            <div className={cards.length > 0 ? 'mt-8 xl:mt-10' : ''}>
              {cards.length > 0 && <h3 className="eyebrow mb-4">{t('menu.more')}</h3>}
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {rows.map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-4 rounded-2xl bg-cream px-5 py-4">
                    <span className="font-medium">{itemName(item)}</span>
                    <span className="whitespace-nowrap text-[15px] text-muted">{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cards.length === 0 && rows.length === 0 && (
            <div className="flex flex-col items-start gap-4 rounded-3xl bg-cream px-6 py-8 md:flex-row md:items-center md:justify-between">
              <p className="text-muted">{t('menu.empty')}</p>
              <button type="button" onClick={() => setDiets([])} className="rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold text-paper">
                {t('menu.clear')}
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setFullOpen(!fullOpen)}
          aria-expanded={fullOpen}
          aria-controls="full-menu"
          className="mt-5 inline-flex items-center gap-2 rounded-full py-2 text-[15px] font-semibold text-rust md:hidden"
        >
          {t('menu.fullToggle')}
          <ArrowRight className={`size-4 transition-transform ${fullOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
        </button>

        <div
          id="full-menu"
          className={`${fullOpen ? 'grid' : 'hidden'} relative mt-3 scroll-mt-28 gap-8 rounded-[28px] bg-cream px-6 py-7 sm:grid-cols-2 md:mt-10 md:grid md:grid-cols-2 md:px-10 md:py-9 xl:grid-cols-4 xl:gap-6`}
        >
          <h3 className="sr-only">{t('menu.fullTitle')}</h3>
          {LIST_COLUMNS.map((column) => (
            <div key={column}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-rust">{t(`menu.list.${column}` as CopyKey)}</h4>
              <ul className="mt-3 flex flex-col gap-3">
                {MENU.filter((item) => item.list === column).map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-4">
                    <span className="font-medium">{itemName(item)}</span>
                    <span className="whitespace-nowrap text-[15px] text-muted">{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted md:mt-10">{t('menu.note')}</p>
      </div>
    </section>
  );
}
