// Temporary: v1 sections kept until they are rebuilt in parts 2–4 of the 2.0 redesign.
import { MapPin, Clock, Mail, Phone, Coffee } from 'lucide-react';
import { lang as language, t } from '../i18n';

export function LegacySections() {
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

  return (
    <div className="font-serif text-stone-800">
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
      <section id="story" className="py-24 md:py-32 px-6 bg-[#f3ede4]">
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
      <section id="visit" className="py-24 md:py-32 px-6">
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
    </div>
  );
}

export function LegacyFooter() {
  return (
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
  );
}
