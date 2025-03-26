
import React from 'react';

// Define a type for the i18n instance
type I18nInstance = {
  language: string;
  changeLanguage: (lng: string) => Promise<void>;
  t: (key: string, options?: any) => string;
};

// Define a type for the useTranslation hook result
type UseTranslationResult = {
  t: (key: string, options?: any) => string;
  i18n: I18nInstance;
};

// Create a fallback i18n instance
const fallbackI18n: I18nInstance = {
  language: 'fr',
  changeLanguage: async (lng: string) => {
    console.warn('i18next not available, language change not working');
    fallbackI18n.language = lng;
  },
  t: (key: string, options?: any) => {
    // Simple fallback that returns the key with optional count
    if (options?.count !== undefined) {
      return `${key} (${options.count})`;
    }
    return key;
  }
};

// Create a fallback useTranslation hook
export const fallbackUseTranslation = (): UseTranslationResult => {
  return {
    t: fallbackI18n.t,
    i18n: fallbackI18n
  };
};

// Export a utility to check if real i18n is available
export const isI18nAvailable = () => {
  try {
    require('i18next');
    return true;
  } catch (e) {
    console.warn('i18next not available, using fallbacks');
    return false;
  }
};

// Create a HOC to provide fallback i18n context if needed
export const withI18nFallback = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    return <Component {...props} />;
  };
};
