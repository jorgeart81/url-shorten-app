import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { es } from './locales/es';

// Translations
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

// Set initial HTML lang attribute from localStorage if exists
const storedLanguage = localStorage.getItem('i18nextLng');
if (storedLanguage && Object.keys(resources).includes(storedLanguage)) {
  document.documentElement.lang = storedLanguage;
}

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next) // Integrates with React
  .init({
    resources,
    fallbackLng: 'es', // Default language
    debug: true,

    interpolation: {
      escapeValue: false, // React already escapes by default
    },

    // Automatically update HTML lang attribute
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    // Update HTML lang attribute when language changes
    react: {
      useSuspense: false,
    },
  });

// Update HTML lang attribute on language change
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
export type Language = keyof typeof resources;
