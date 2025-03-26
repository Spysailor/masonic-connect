/**
 * Script pour valider les traductions
 * Peut être exécuté avec "node validate-translations.js"
 */

import fs from 'fs';
import path from 'path';
import { checkTranslations } from './translation-validator.js';

// Chemins des dossiers de traduction
const FR_LOCALE_DIR = path.resolve('../locales/fr');
const EN_LOCALE_DIR = path.resolve('../locales/en');

/**
 * Charge un fichier JSON
 * @param {String} filePath Chemin du fichier
 * @returns {Object} Contenu JSON
 */
function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Erreur lors du chargement du fichier ${filePath}:`, error.message);
    return {};
  }
}

/**
 * Charge tous les fichiers de traduction d'un dossier
 * @param {String} dirPath Chemin du dossier
 * @returns {Object} Objet avec les noms de fichiers comme clés et leur contenu comme valeurs
 */
function loadTranslationFiles(dirPath) {
  const translations = {};
  
  try {
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json'));
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const nameWithoutExt = file.replace('.json', '');
      translations[nameWithoutExt] = loadJson(filePath);
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la lecture du dossier ${dirPath}:`, error.message);
  }
  
  return translations;
}

/**
 * Fonction principale de validation
 */
function validateTranslationFiles() {
  console.log('🔍 Validation des fichiers de traduction...');
  
  const frTranslations = loadTranslationFiles(FR_LOCALE_DIR);
  const enTranslations = loadTranslationFiles(EN_LOCALE_DIR);
  
  const frNamespaces = Object.keys(frTranslations);
  const enNamespaces = Object.keys(enTranslations);
  
  // Vérifier si les mêmes namespaces existent dans les deux langues
  const missingInFr = enNamespaces.filter(ns => !frNamespaces.includes(ns));
  const missingInEn = frNamespaces.filter(ns => !enNamespaces.includes(ns));
  
  if (missingInFr.length > 0) {
    console.error(`❌ Namespaces manquants en français: ${missingInFr.join(', ')}`);
  }
  
  if (missingInEn.length > 0) {
    console.error(`❌ Namespaces manquants en anglais: ${missingInEn.join(', ')}`);
  }
  
  // Vérifier les clés pour chaque namespace commun
  const commonNamespaces = frNamespaces.filter(ns => enNamespaces.includes(ns));
  let hasErrors = false;
  
  for (const namespace of commonNamespaces) {
    console.log(`\n🔍 Vérification du namespace "${namespace}"...`);
    const result = checkTranslations(frTranslations[namespace], enTranslations[namespace]);
    
    if (!result.valid) {
      hasErrors = true;
    }
  }
  
  if (!hasErrors && missingInFr.length === 0 && missingInEn.length === 0) {
    console.log('\n✅ Toutes les traductions sont valides!');
  } else {
    console.error('\n❌ Des erreurs ont été trouvées dans les traductions.');
    process.exit(1);
  }
}

// Exécution
validateTranslationFiles();
