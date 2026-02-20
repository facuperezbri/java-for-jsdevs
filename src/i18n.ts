import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUI from './locales/en/ui.json';
import esUI from './locales/es/ui.json';

const resources = {
  en: {
    ui: enUI,
  },
  es: {
    ui: esUI,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'ui',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;