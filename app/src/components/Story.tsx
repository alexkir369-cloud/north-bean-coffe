import { t, type CopyKey } from '../i18n';
import { photo } from '../images';

const STATS: { value: string; label: CopyKey; short: CopyKey }[] = [
  { value: '10+', label: 'story.years', short: 'story.yearsShort' },
  { value: '7', label: 'story.origins', short: 'story.originsShort' },
  { value: '1', label: 'story.shot', short: 'story.shot' },
];

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="pb-14 md:pb-20 xl:pb-[120px] xl:pt-10">
      <div className="wrap grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-14 xl:grid-cols-[620px_500px] xl:gap-20">
        <img
          {...photo('our-story-couple', 1152)}
          // object-cover fills the height, so the needed width exceeds the box: 1.95 × height.
          sizes="(min-width: 1280px) 1014px, (min-width: 768px) 820px, 507px"
          alt={t('story.alt')}
          width={1152}
          height={592}
          loading="lazy"
          decoding="async"
          className="h-[260px] w-full rounded-[22px] object-cover object-[75%_center] md:h-[420px] xl:h-[520px] xl:rounded-[28px]"
        />
        <div data-reveal className="flex flex-col items-start gap-5 xl:gap-6">
          <p className="eyebrow">{t('story.eyebrow')}</p>
          <h2 id="story-title" className="h2 whitespace-pre-line">{t('story.title')}</h2>
          <p className="text-base leading-[25px] text-muted md:hidden">{t('story.textShort')}</p>
          <p className="hidden text-lg leading-[30px] text-muted md:block">{t('story.text')}</p>
          <dl className="flex gap-7 xl:gap-12">
            {STATS.map((stat) => (
              <div key={stat.value} className="flex flex-col-reverse gap-0.5 xl:gap-1">
                <dt className="text-[13px] text-muted xl:text-sm">
                  <span className="md:hidden">{t(stat.short)}</span>
                  <span className="hidden md:inline">{t(stat.label)}</span>
                </dt>
                <dd className="font-serif text-4xl font-semibold leading-tight xl:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
