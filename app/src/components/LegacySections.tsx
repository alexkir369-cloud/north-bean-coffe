// Temporary: v1 sections kept until they are rebuilt in parts 2–4 of the 2.0 redesign.
import { MapPin, Clock, Mail, Phone, Coffee } from 'lucide-react';
import { t } from '../i18n';

export function LegacySections() {
  return (
    <div className="font-serif text-stone-800">
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
