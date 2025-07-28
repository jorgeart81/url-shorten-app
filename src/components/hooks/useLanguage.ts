import type { Language } from '@/i18n/config';
import type { TranslationKeys } from '@/i18n/types';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  /**
   * Changes the application's language.
   *
   * This function updates the current language used by the i18n instance,
   * and persists the selected language in localStorage.
   *
   * @param lng - The language code to switch to (e.g., 'en', 'es').
   */
  const changeLanguage = (lng: Language) => {
    i18n.changeLanguage(String(lng));
    localStorage.setItem('language', String(lng));
  };

  const currentLanguage = i18n.language;

  const translate = (key: TranslationKeys) => t(key);

  return {
    currentLanguage,
    isSpanish: currentLanguage === 'es',
    isEnglish: currentLanguage === 'en',
    // Methods
    t,
    translate,
    changeLanguage,
  };
};
