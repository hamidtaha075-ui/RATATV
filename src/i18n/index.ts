import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

const resources = {
  ar: { translation: translations.ar },
  en: { translation: translations.en },
  fr: { translation: translations.fr },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;

export function setLanguage(lang: 'ar' | 'en' | 'fr'): void {
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}
