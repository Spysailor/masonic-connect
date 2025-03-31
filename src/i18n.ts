
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frTranslation from './locales/fr.json';
import enTranslation from './locales/en.json';

// Les ressources contiennent les traductions
const resources = {
  fr: {
    translation: frTranslation
  },
  en: {
    translation: enTranslation
  }
};

// Configuration et initialisation de i18next
try {
  i18n
    // Détecte la langue du navigateur
    .use(LanguageDetector)
    // Passe l'instance i18n à react-i18next
    .use(initReactI18next)
    // Initialisation de i18next
    .init({
      resources,
      fallbackLng: 'fr',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false, // React fait déjà l'échappement
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage']
      },
      returnEmptyString: false,
      returnNull: false,
      fallbackNS: 'translation',
      saveMissing: true,
      parseMissingKeyHandler: (key) => {
        console.warn(`Missing translation key: ${key}`);
        // Retourne la clé pour qu'elle soit visible dans l'interface
        return key;
      },
      missingKeyHandler: (lng, ns, key) => {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
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
