
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import frTranslation from './locales/fr.json';
import enTranslation from './locales/en.json';

// Importer les traductions d'interface
import frDashboard from './locales/fr/dashboard.json';
import enDashboard from './locales/en/dashboard.json';
import frIndex from './locales/fr/index.json';
import enIndex from './locales/en/index.json';
import frTenue from './locales/fr/tenue.json';
import enTenue from './locales/en/tenue.json';

// Les ressources contiennent les traductions
const resources = {
  fr: {
    translation: frTranslation,
    dashboard: frDashboard,
    index: frIndex,
    tenue: frTenue
  },
  en: {
    translation: enTranslation,
    dashboard: enDashboard,
    index: enIndex,
    tenue: enTenue
  }
};

// Fonction pour extraire le dernier segment d'une clé de traduction si elle n'existe pas
const formatMissingKey = (lng: string, ns: string, key: string) => {
  // Extraire le dernier segment de la clé (ce qui suit le dernier point)
  const segments = key.split('.');
  const lastSegment = segments[segments.length - 1];
  
  // Remplacer les caractères spéciaux par des espaces
  // et mettre en majuscule la première lettre de chaque mot
  return lastSegment
    .replace(/([A-Z])/g, ' $1') // Ajouter un espace avant chaque majuscule
    .replace(/^./, (str) => str.toUpperCase()) // Première lettre en majuscule
    .replace(/\./, ' ') // Remplacer les points par des espaces
    .replace(/-/g, ' ') // Remplacer les tirets par des espaces
    .trim(); // Supprimer les espaces en début et fin
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
      
      // Configuration des espaces de noms (namespaces)
      ns: ['translation', 'dashboard', 'index', 'tenue'],
      defaultNS: 'translation',
      fallbackNS: 'translation',
      
      // Interpolation
      interpolation: {
        escapeValue: false, // React fait déjà l'échappement
      },
      
      // Options de détection de la langue
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'masonic_connect_language',
      },
      
      // Options pour les clés manquantes
      returnEmptyString: false,
      returnNull: false,
      saveMissing: true,
      missingKeyHandler: (lng, ns, key) => {
        console.warn(`Clé de traduction manquante: ${key} pour la langue: ${lng} dans l'espace de noms: ${ns}`);
      },
      parseMissingKeyHandler: (key) => {
        // Formatage des clés manquantes pour l'affichage
        return formatMissingKey('', '', key);
      },
    })
    .then(() => {
      console.log('i18n initialisé avec succès');
    })
    .catch(error => {
      console.error('Erreur lors de l\'initialisation de i18n:', error);
    });
} catch (error) {
  console.error('Erreur lors de l\'initialisation de i18n:', error);
}

export default i18n;
