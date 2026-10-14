import { useEffect } from 'react';
import { lang, rememberLanguage, t } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import CoffeeGuide from './components/CoffeeGuide';
import Menu from './components/Menu';
import Story from './components/Story';
import BeanOfMonth from './components/BeanOfMonth';
import OrderApp from './components/OrderApp';
import { ToastProvider } from './components/Toast';
import { LegacyFooter, LegacySections } from './components/LegacySections';

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function App() {
  useEffect(() => {
    rememberLanguage();
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  }, []);
  useRevealOnScroll();

  return (
    <ToastProvider>
      <a href="#main" className="skip-link">{t('a11y.skip')}</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <CoffeeGuide />
        <Menu />
        <Story />
        <BeanOfMonth />
        <OrderApp />
        <LegacySections />
      </main>
      <LegacyFooter />
    </ToastProvider>
  );
}

export default App;
