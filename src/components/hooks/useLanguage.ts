import type { ResultErrorCode } from '@/config/rop/resultErrorCode';
import type { Language } from '@/i18n/config';
import type { TranslationKeys } from '@/i18n/types';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const translate = (key: TranslationKeys) => t(key);

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

  /**
   * Retrieves the translated title and description for a given error code.
   *
   * Uses translation keys based on the provided ResultErrorCode value,
   * allowing you to display localized and specific error messages in the UI.
   *
   * @param errorCode - Error code defined in ResultErrorCode. Defaults to 'UNKNOWN'.
   * @returns An object containing the translated 'title' and 'description' properties.
   */
  const getErrorTranslation = (errorCode: ResultErrorCode = 'UNKNOWN') => ({
    title: t(`${errorCode}.title`),
    description: t(`${errorCode}.description`),
  });

  return {
    currentLanguage,
    isSpanish: currentLanguage === 'es-ES',
    isEnglish: currentLanguage === 'en-US',
    // Methods
    t,
    changeLanguage,
    getErrorTranslation,
    translate,
  };
};
