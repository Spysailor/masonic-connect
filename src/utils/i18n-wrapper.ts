
import { fallbackUseTranslation, isI18nAvailable } from './i18n-fallback';

// Export either the real useTranslation or our fallback
let useTranslation: any;
let i18n: any;

try {
  if (isI18nAvailable()) {
    const reactI18next = require('react-i18next');
    useTranslation = reactI18next.useTranslation;
    i18n = require('i18next').default;
  } else {
    throw new Error('i18next not available');
  }
} catch (e) {
  useTranslation = fallbackUseTranslation;
  i18n = {
    language: 'fr',
    changeLanguage: async (lng: string) => {
      console.warn('i18next not available, language change not working');
    },
    t: (key: string, options?: any) => {
      if (options?.count !== undefined) {
        return `${key} (${options.count})`;
      }
      return key;
    }
  };
}

export { useTranslation, i18n };
