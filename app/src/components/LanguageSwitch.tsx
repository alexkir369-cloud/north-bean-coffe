import { Fragment } from 'react';
import { lang, languageHref, t, type Lang } from '../i18n';

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

export default function LanguageSwitch({ long = false, className = '' }: { long?: boolean; className?: string }) {
  return (
    <div role="group" aria-label={t('a11y.language')} className={`flex items-center font-medium ${className}`}>
      {LANGS.map(({ code, label, name }, i) => (
        <Fragment key={code}>
          {i > 0 && <span aria-hidden="true" className="opacity-60">·</span>}
          <a
            href={languageHref(code)}
            // Re-read the URL on click so the current #section survives the switch.
            onClick={(event) => { event.currentTarget.href = languageHref(code); }}
            lang={code}
            hrefLang={code}
            aria-label={long ? undefined : name}
            aria-current={lang === code ? 'true' : undefined}
            className={`rounded-full px-1.5 py-2 transition-opacity ${lang === code ? 'underline decoration-1 underline-offset-4' : 'opacity-75 hover:opacity-100'}`}
          >
            {long ? name : label}
          </a>
        </Fragment>
      ))}
    </div>
  );
}
