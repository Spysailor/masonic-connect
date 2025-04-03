
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frTranslation from './locales/fr.json';
import enTranslation from './locales/en.json';

// Translation resources
const resources = {
  fr: {
    translation: frTranslation
  },
  en: {
    translation: enTranslation
  }
};

// Configurer un gestionnaire pour les traductions manquantes
const parseMissingKeyHandler = (key: string) => {
  console.warn(`Missing translation key: ${key}`);
  // Retourner une chaîne vide au lieu de la clé pour éviter les problèmes d'affichage
  return '';
};

// Ajouter un CSS pour les transitions de langue
const addLanguageTransitionCSS = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .language-transition {
      transition: opacity 0.3s ease;
      opacity: 0.5;
    }
    
    .language-transition-appear {
      opacity: 0;
    }
    
    .language-transition-appear-active {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(style);
};

// Ajouter le CSS au chargement
if (typeof window !== 'undefined') {
  addLanguageTransitionCSS();
}

// Configure and initialize i18next
try {
  i18n
    // Detect browser language
    .use(LanguageDetector)
    // Pass i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
      resources,
      fallbackLng: 'fr',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false, // React already escapes
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
      },
      returnEmptyString: false,
      returnNull: false,
      fallbackNS: 'translation',
      saveMissing: true,
      missingKeyHandler: (lng, ns, key) => {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      },
      parseMissingKeyHandler: parseMissingKeyHandler,
      // Optimisations pour éviter les problèmes de chargement
      load: 'currentOnly',
      // Mise en cache agressive pour éviter les rechargements inutiles
      keySeparator: false,
      nsSeparator: false,
      // Configuration pour une meilleure expérience React
      react: {
        useSuspense: false,
        bindI18n: 'languageChanged loaded',
        bindI18nStore: '',
        nsMode: 'default',
        // Ne pas recharger la page sur le changement de langue
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span', 'div'],
        transSupportBasicHtmlNodes: true,
      }
    })
    .then(() => {
      console.log('i18n initialized successfully');
    })
    .catch(error => {
      console.error('Error during i18n initialization:', error);
    });
} catch (error) {
  console.error('Error initializing i18n:', error);
}

export default i18n;
