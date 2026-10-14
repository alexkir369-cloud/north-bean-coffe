import { formatPrice, t, type CopyKey } from '../i18n';
import { photo } from '../images';
import { MENU } from '../data/menu';
import { useToast } from './toast-context';

const POINTS: CopyKey[] = ['app.point1', 'app.point2', 'app.point3', 'app.point4'];

// Phone screens are 780 × 1688 (2×) with transparent 80 px corners; the radius below
// matches them so the drop shadow follows the phone outline at any size.
// The WebP files are generated from the Figma PNGs by `npm run images`.
const PHONE = 'absolute h-auto rounded-[10.26%/4.74%] shadow-[0_28px_57px_rgba(0,0,0,0.35)]';
const src = (name: string) => `${import.meta.env.BASE_URL}images/app/${name}.webp`;
const SCREEN = { width: 780, height: 1688 };

// The featured item comes straight from the menu data, so name, price and photo always match the menu card.
const V60 = MENU.find((item) => item.id === 'v60')!;

export default function OrderApp() {
  const toast = useToast();

  return (
    <section id="order" aria-labelledby="order-title" className="overflow-hidden bg-espresso py-14 text-paper md:py-20 xl:py-[120px]">
      <div className="wrap grid gap-5 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div data-reveal className="flex flex-col items-start gap-5 xl:gap-6">
          <p className="eyebrow text-latte">{t('app.eyebrow')}</p>
          <h2 id="order-title" className="h2 whitespace-pre-line">{t('app.title')}</h2>
          <p className="text-base leading-[25px] text-paper/80 md:hidden">{t('app.textShort')}</p>
          <p className="hidden text-lg leading-[30px] text-paper/80 md:block">{t('app.text')}</p>
          <ul className="hidden flex-col gap-3.5 md:flex">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 font-medium">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-latte" />
                {t(point)}
              </li>
            ))}
          </ul>
          <FeaturedItem onOrder={() => toast(t('toast.order'))} />
          <StoreButtons onClick={() => toast(t('toast.app'))} className="hidden md:flex" />
        </div>

        <div role="group" aria-label={t('app.screens')}>
          {/* Mobile: the pick-up screen alone. */}
          <img
            src={src('app-pickup')}
            alt={t('app.altPickup')}
            {...SCREEN}
            loading="lazy"
            decoding="async"
            className="mx-auto mb-5 mt-2 h-auto w-[257px] rounded-[10.26%/4.74%] shadow-[0_24px_48px_rgba(0,0,0,0.35)] md:hidden"
          />
          {/* Tablet and up: three phones, positions as percentages of the 700 × 700 Figma frame. */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[640px] md:block xl:max-w-[700px]">
            <img src={src('app-home')} alt={t('app.altHome')} {...SCREEN} loading="lazy" decoding="async" className={`${PHONE} left-0 top-[12.86%] w-[41.23%]`} />
            <img src={src('app-status')} alt={t('app.altStatus')} {...SCREEN} loading="lazy" decoding="async" className={`${PHONE} left-[58.57%] top-[12.86%] w-[41.23%]`} />
            <img src={src('app-pickup')} alt={t('app.altPickup')} {...SCREEN} loading="lazy" decoding="async" className={`${PHONE} left-[27.14%] top-[1.43%] w-[46.8%]`} />
          </div>
        </div>

        <StoreButtons onClick={() => toast(t('toast.app'))} className="justify-center md:hidden" />
      </div>
    </section>
  );
}

function StoreButtons({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2.5 xl:gap-3 ${className}`}>
      <button type="button" onClick={onClick} className="rounded-full bg-paper px-5 py-3 text-[15px] font-semibold text-espresso transition-colors hover:bg-cream xl:px-[22px] xl:py-[13px]">
        App Store
      </button>
      <button type="button" onClick={onClick} className="rounded-full border border-paper px-5 py-3 text-[15px] font-semibold transition-colors hover:bg-paper/10 xl:px-[22px] xl:py-[13px]">
        Google Play
      </button>
    </div>
  );
}

function FeaturedItem({ onOrder }: { onOrder: () => void }) {
  const name = t('item.v60');
  return (
    <div className="flex w-full max-w-[440px] items-center gap-4 rounded-3xl border border-paper/15 bg-paper/[0.06] p-3 pr-4">
      <img
        {...photo(V60.card!.image.replace('.webp', ''), 1024)}
        sizes="64px"
        alt=""
        width={1024}
        height={1024}
        loading="lazy"
        decoding="async"
        className="size-16 shrink-0 rounded-2xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-latte">{t(V60.card!.tag)}</p>
        <p className="font-serif text-[22px] font-semibold leading-tight">{name}</p>
        <p className="text-sm font-semibold text-latte">{formatPrice(V60.price)}</p>
      </div>
      <button
        type="button"
        onClick={onOrder}
        aria-label={`${t('app.orderItem')} ${name}`}
        className="shrink-0 rounded-full bg-paper px-4 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-cream"
      >
        {t('app.orderItem')}
      </button>
    </div>
  );
}
