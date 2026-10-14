import { t, type CopyKey } from '../i18n';
import { useToast } from './toast-context';

const POINTS: CopyKey[] = ['app.point1', 'app.point2', 'app.point3', 'app.point4'];

// The PNGs are 390 × 844 phone screens with transparent 40 px corners; the radius below
// matches them so the drop shadow follows the phone outline at any size.
const PHONE = 'absolute h-auto rounded-[10.26%/4.74%] shadow-[0_28px_57px_rgba(0,0,0,0.35)]';
const src = (name: string) => `${import.meta.env.BASE_URL}images/app/${name}.png`;

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
          <StoreButtons onClick={() => toast(t('toast.app'))} className="hidden md:flex" />
        </div>

        <div role="group" aria-label={t('app.screens')}>
          {/* Mobile: the pick-up screen alone. */}
          <img
            src={src('app-pickup')}
            alt={t('app.altPickup')}
            width={390}
            height={844}
            loading="lazy"
            decoding="async"
            className="mx-auto mb-5 mt-2 h-auto w-[257px] rounded-[10.26%/4.74%] shadow-[0_24px_48px_rgba(0,0,0,0.35)] md:hidden"
          />
          {/* Tablet and up: three phones, positions as percentages of the 700 × 700 Figma frame. */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[640px] md:block xl:max-w-[700px]">
            <img src={src('app-home')} alt={t('app.altHome')} width={390} height={844} loading="lazy" decoding="async" className={`${PHONE} left-0 top-[12.86%] w-[41.23%]`} />
            <img src={src('app-status')} alt={t('app.altStatus')} width={390} height={844} loading="lazy" decoding="async" className={`${PHONE} left-[58.57%] top-[12.86%] w-[41.23%]`} />
            <img src={src('app-pickup')} alt={t('app.altPickup')} width={390} height={844} loading="lazy" decoding="async" className={`${PHONE} left-[27.14%] top-[1.43%] w-[46.8%]`} />
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
