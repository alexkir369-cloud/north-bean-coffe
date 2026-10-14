import { ArrowRight } from 'lucide-react';
import { t } from '../i18n';
import { imageUrl } from '../images';

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex h-[700px] flex-col overflow-hidden bg-espresso text-paper md:h-[820px]">
      {/* Phones get a portrait crop (woman with coffee + canal); both files are preloaded in index.html. */}
      <picture>
        <source media="(max-width: 767px)" srcSet={imageUrl('hero-nyhavn-morning-mobile.webp')} width={560} height={768} />
        <img
          src={imageUrl('hero-nyhavn-morning.webp')}
          alt={t('hero.alt')}
          width={1376}
          height={768}
          // React 18 only forwards the lowercase attribute.
          {...{ fetchpriority: 'high' }}
          className="absolute inset-0 -z-10 size-full object-cover md:object-[30%_center] xl:object-center"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(43,29,23,0.88)_0%,rgba(43,29,23,0.62)_38%,rgba(43,29,23,0)_55%,rgba(43,29,23,0)_82%,rgba(43,29,23,0.6)_100%)] md:bg-[linear-gradient(90deg,rgba(43,29,23,0.72)_0%,rgba(43,29,23,0.25)_55%,rgba(43,29,23,0)_100%)]"
      />

      <div className="wrap flex flex-1 flex-col pb-[26px] pt-[78px] md:justify-end md:pb-[126px] md:pt-0">
        <div className="flex max-w-[700px] flex-col items-start gap-4 md:gap-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-paper/[0.18] py-1.5 pl-3 pr-3.5 text-xs font-medium backdrop-blur-sm md:border md:border-white/30 md:py-2 md:pl-3.5 md:pr-4 md:text-sm">
            <span aria-hidden="true" className="size-[7px] rounded-full bg-[#9BD29F] md:size-2" />
            <span className="md:hidden">{t('hero.statusShort')}</span>
            <span className="hidden md:inline">{t('hero.status')}</span>
          </p>

          <h1 id="hero-title" className="font-serif text-[48px] font-semibold leading-[48px] md:text-[72px] md:leading-[74px] xl:text-[88px] xl:leading-[88px]">
            {t('hero.title1')}
            <span className="block font-medium italic">{t('hero.title2')}</span>
          </h1>

          <p className="hidden max-w-[640px] text-[19px] leading-[30px] text-paper/[0.92] md:block">{t('hero.sub')}</p>

          <div className="hidden flex-wrap gap-3.5 md:flex">
            <a href="#order" className="inline-flex items-center gap-2 rounded-full bg-paper px-7 py-4 font-semibold text-espresso transition-colors hover:bg-cream">
              {t('hero.order')} <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#menu" className="inline-flex items-center rounded-full border border-paper px-7 py-4 font-semibold transition-colors hover:bg-paper/10">
              {t('hero.menu')}
            </a>
          </div>
        </div>

        <a href="#order" className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-6 py-4 font-semibold text-espresso md:hidden">
          {t('hero.order')} <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      <div className="absolute inset-x-0 bottom-10 hidden md:block">
        <p className="wrap text-right font-serif text-lg font-medium italic text-paper/85">{t('hero.caption')}</p>
      </div>
    </section>
  );
}
