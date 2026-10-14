import { useState, useEffect, useRef } from 'react';
import { copy } from './copy';
import { Menu, X, MapPin, Clock, Mail, Phone, Coffee } from 'lucide-react';

function App() {
  const [language] = useState<'en' | 'ru'>(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'en' || requested === 'ru') return requested;
    try { return localStorage.getItem('north-bean-language') === 'ru' ? 'ru' : 'en'; }
    catch { return 'en'; }
  });
  const t = (key: keyof typeof copy) => copy[key][language];
  const languageHref = (next: 'en' | 'ru') => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    return url.pathname + url.search + url.hash;
  };
  useEffect(() => {
    try { localStorage.setItem('north-bean-language', language); } catch { /* Storage may be disabled. */ }
    document.documentElement.lang = language;
    document.title = language === 'ru' ? 'North & Bean — Кофе и утро без спешки' : 'North & Bean — Slow mornings, good coffee';
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'ru'
      ? 'North & Bean — уютная кофейня, свежая обжарка и утро без спешки. Демонстрационный сайт вымышленной кофейни в Копенгагене.'
      : 'Discover North & Bean: small-batch coffee, slow mornings and neighbourhood warmth. A fictional Copenhagen café demo.');
  }, [language]);
const drinks = [
  {
    name: t('t0'),
    description: t('t1'),
    price: '€4.50',
    image: `${import.meta.env.BASE_URL}images/flat-white.jpg`,
  },
  {
    name: t('t2'),
    description: t('t3'),
    price: '€3.00',
    image: `${import.meta.env.BASE_URL}images/espresso.jpg`,
  },
  {
    name: t('t4'),
    description: t('t5'),
    price: '€4.80',
    image: `${import.meta.env.BASE_URL}images/cold-brew.jpg`,
  },
  {
    name: t('t6'),
    description: t('t7'),
    price: '€4.20',
    image: `${import.meta.env.BASE_URL}images/vanilla-latte.jpg`,
  },
];  

  
const navLinks = [
  { label: t('t8'), href: '#home' },
  { label: t('t9'), href: '#menu' },
  { label: t('t10'), href: '#about' },
  { label: t('t11'), href: '#contact' },
];


  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-800 font-serif selection:bg-amber-900/20">
      <a href="#main" className="skip-link">{t('t12')}</a>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#faf7f2]/95 backdrop-blur-md shadow-sm py-3' : 'bg-[#faf7f2]/95 backdrop-blur-md py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">
          <a href="#home" className="flex items-center gap-1 sm:gap-2 group shrink-0">
            <Coffee className="w-6 h-6 text-amber-800 transition-transform group-hover:rotate-12" />
            <span className="text-lg sm:text-xl font-semibold tracking-tight text-stone-900">
              North <span className="text-amber-800">&</span> Bean
            </span>
          </a>

          <nav aria-label={t('t13')} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-amber-800 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div role="group" aria-label={language === 'ru' ? 'Язык сайта' : 'Site language'} className="flex border border-stone-300 rounded-full p-0.5 font-sans text-xs">
              {(['en', 'ru'] as const).map((locale) => (
                <a key={locale} href={languageHref(locale)} lang={locale} hrefLang={locale} aria-label={locale === 'en' ? 'English' : 'Русский'} aria-current={language === locale ? 'true' : undefined}
                  className={`inline-flex items-center justify-center min-h-11 min-w-11 rounded-full px-2 transition-colors ${language === locale ? 'bg-amber-800 text-white' : 'text-stone-700 hover:bg-amber-50'}`}>
                  {locale.toUpperCase()}
                </a>
              ))}
            </div>
          <button
            ref={menuButton}
            className="md:hidden text-stone-800 p-3"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('t15') : t('t16')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" hidden={!menuOpen} className="md:hidden">
          <nav aria-label={t('t14')} className="flex flex-col px-6 pt-4 pb-6 gap-4 bg-[#faf7f2]/95 backdrop-blur-md">
            <div className="flex gap-4 border-b border-stone-200 pb-3 font-sans text-sm" aria-label={language === 'ru' ? 'Язык сайта' : 'Site language'}>
              <a href={languageHref('en')} lang="en" hrefLang="en" className="py-2 underline underline-offset-4">English</a>
              <a href={languageHref('ru')} lang="ru" hrefLang="ru" className="py-2 underline underline-offset-4">Русский</a>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-stone-700 hover:text-amber-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/interior.jpg`}
            alt={t('t17')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c130d]/80 via-[#1c130d]/55 to-[#1c130d]/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="text-amber-200/90 text-sm tracking-[0.25em] uppercase mb-5 animate-fade-in">
              {t('t18')}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] mb-6">
              {t('t19')}
              <span className="block italic font-normal text-amber-100">{t('t20')}</span>
            </h1>
            <p className="text-lg text-stone-200/90 max-w-md mb-9 leading-relaxed">
              {t('t21')}
            </p>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium px-7 py-3.5 rounded-full transition-all duration-300 hover:gap-3 hover:shadow-lg"
            >
              {t('t22')}
            </a>
          </div>
        </div>
      </section>

      {/* {t('t23')} */}
      <section id="menu" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-700 text-sm tracking-[0.25em] uppercase mb-3">{t('t23')}</p>
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-4">{t('t24')}</h2>
            <p className="text-stone-600 max-w-lg mx-auto">
              {t('t25')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {drinks.map((drink, i) => (
              <article
                key={drink.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h3 className="text-xl font-medium text-stone-900">{drink.name}</h3>
                    <span className="text-amber-800 font-semibold whitespace-nowrap">{language === 'ru' ? drink.price.slice(1).replace('.', ',') + ' €' : drink.price}</span>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">{drink.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 px-6 bg-[#f3ede4]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-700 text-sm tracking-[0.25em] uppercase mb-3">{t('t26')}</p>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8">{t('t27')}</h2>
          <div className="space-y-5 text-stone-600 leading-relaxed text-lg">
            <p>
              {t('t28')}
            </p>
            <p>
              {t('t29')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-12 pt-12 border-t border-stone-300/60">
            <div>
              <p className="text-3xl font-light text-amber-800">10+</p>
              <p className="text-sm text-stone-600 mt-1">{t('t30')}</p>
            </div>
            <div>
              <p className="text-3xl font-light text-amber-800">7</p>
              <p className="text-sm text-stone-600 mt-1">{t('t31')}</p>
            </div>
            <div>
              <p className="text-3xl font-light text-amber-800">1</p>
              <p className="text-sm text-stone-600 mt-1">{t('t32')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* {t('t33')} */}
      <section id="contact" className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-700 text-sm tracking-[0.25em] uppercase mb-3">{t('t33')}</p>
            <h2 className="text-4xl md:text-5xl font-light text-stone-900">{t('t34')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="font-medium text-stone-900 mb-2">{t('t35')}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                14 Sankt Hans Torv<br />{t('t36')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
                <Clock className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="font-medium text-stone-900 mb-2">{t('t37')}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {t('t38')}<br />{t('t39')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-amber-800" />
                  <Phone className="w-5 h-5 text-amber-800" />
                </div>
              </div>
              <h3 className="font-medium text-stone-900 mb-2">{t('t40')}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                hello@northandbean.co<br />+45 33 12 14 16
              </p>
            </div>
          </div>
        </div>
      </section>

      </main>
      {/* Footer */}
      <footer className="bg-[#1c130d] text-stone-300 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10 border-b border-stone-700/50">
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-amber-200" />
              <span className="text-xl font-semibold tracking-tight text-white">
                North <span className="text-amber-200">&</span> Bean
              </span>
            </div>
            <a href="#home" className="text-sm text-amber-100 hover:underline py-3">{t('t41')}</a>
          </div>
          <p className="text-center text-sm text-stone-400 mt-8">
            © {new Date().getFullYear()} North &amp; Bean. {t('t42')}
            <span className="block mt-2">{t('t43')}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
