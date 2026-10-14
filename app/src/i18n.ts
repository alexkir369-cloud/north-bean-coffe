import { copy } from './copy';

export type Lang = 'en' | 'ru';
export type CopyKey = keyof typeof copy;

const STORAGE_KEY = 'north-bean-language';

// The language switch uses plain links (?lang=), so the language is fixed for the page's lifetime.
export const lang: Lang = (() => {
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (requested === 'en' || requested === 'ru') return requested;
  try { return localStorage.getItem(STORAGE_KEY) === 'ru' ? 'ru' : 'en'; }
  catch { return 'en'; }
})();

export const t = (key: CopyKey) => copy[key][lang];

/** t() with {placeholders} replaced, e.g. tf('status.closed', { time: '7:00' }). */
export const tf = (key: CopyKey, vars: Record<string, string>) =>
  t(key).replace(/\{(\w+)\}/g, (_, name: string) => vars[name] ?? '');

export const languageHref = (next: Lang) => {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', next);
  return url.pathname + url.search + url.hash;
};

const priceFormat = new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-IE', { style: 'currency', currency: 'EUR' });

/** €4.20 in English, 4,20 € in Russian. */
export const formatPrice = (euros: number) => priceFormat.format(euros);

export const rememberLanguage = () => {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* Storage may be disabled. */ }
};
