
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import frCommon from './locales/fr/common.json';
import frDashboard from './locales/fr/dashboard.json';
import frNav from './locales/fr/nav.json';
import frAgenda from './locales/fr/agenda.json';
import frTenueForm from './locales/fr/tenueForm.json';
import frAuth from './locales/fr/auth.json';
import frActualites from './locales/fr/actualites.json';

import enCommon from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';
import enNav from './locales/en/nav.json';
import enAgenda from './locales/en/agenda.json';
import enTenueForm from './locales/en/tenueForm.json';
import enAuth from './locales/en/auth.json';
import enActualites from './locales/en/actualites.json';

// Construct resources with namespaces
const resources = {
  fr: {
    common: frCommon,
    dashboard: frDashboard,
    nav: frNav,
    agenda: frAgenda,
    tenueForm: frTenueForm,
    auth: frAuth,
    actualites: frActualites
  },
  en: {
    common: enCommon,
    dashboard: enDashboard,
    nav: enNav,
    agenda: enAgenda,
    tenueForm: enTenueForm,
    auth: enAuth,
    actualites: enActualites
  }
};

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
    // Ajout de la fonction de résolution des clés de traduction manquantes
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation key: ${key} for namespace: ${ns} and language: ${lng}`);
    },
    saveMissing: true,
    missingKeyNoValueFallbackToKey: false,
    returnNull: false,
    returnEmptyString: false,
    returnObjects: false, // Changed to false to prevent object returns
    defaultNS: 'common',
    fallbackNS: 'common'
  });

export default i18n;
