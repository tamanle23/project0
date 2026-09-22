import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { sharedResources, defaultNS } from '@project0/i18n';
import consoleEn from './locales/en/console.json';

const resources = {
  en: {
    ...sharedResources.en,
    console: consoleEn,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackNS: defaultNS,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
