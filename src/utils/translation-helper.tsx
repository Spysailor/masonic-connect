
/**
 * Un utilitaire de traduction pour éviter les problèmes d'importation directe de react-i18next
 * 
 * Ce fichier fournit une solution de secours si l'importation directe de react-i18next échoue.
 * Vous pouvez importer useTranslation et Trans depuis ce fichier plutôt que directement 
 * depuis react-i18next.
 */

import React, { createContext, useContext, useState } from 'react';
import i18n from '../i18n';

// Contexte pour les traductions
interface TranslationContextType {
  translate: (key: string, options?: any) => string;
  changeLanguage: (lang: string) => Promise<void>;
  language: string;
}

const TranslationContext = createContext<TranslationContextType>({
  translate: (key) => key,
  changeLanguage: async () => {},
  language: 'fr',
});

// Provider pour les traductions
export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || 'fr');

  const translate = (key: string, options?: any) => {
    try {
      return i18n.t(key, options) || key;
    } catch (error) {
      console.error(`Error translating key: ${key}`, error);
      return key;
    }
  };

  const changeLanguage = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      setLanguage(lang);
    } catch (error) {
      console.error(`Error changing language to ${lang}:`, error);
    }
  };

  return (
    <TranslationContext.Provider value={{ translate, changeLanguage, language }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook personnalisé pour utiliser les traductions
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return {
    t: context.translate,
    i18n: {
      changeLanguage: context.changeLanguage,
      language: context.language,
    },
  };
};

// Composant pour traduire du texte dans JSX
export const Trans: React.FC<{
  i18nKey: string;
  values?: Record<string, any>;
  children?: React.ReactNode;
}> = ({ i18nKey, values, children }) => {
  const { t } = useTranslation();
  
  return <>{t(i18nKey, values) || children || i18nKey}</>;
};

// Exporter par défaut le hook useTranslation pour faciliter son utilisation
export default useTranslation;
