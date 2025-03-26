/**
 * Utilitaire pour valider les fichiers de traduction
 * Vérifie que toutes les clés présentes dans une langue sont aussi dans l'autre
 */

/**
 * Compare récursivement les clés de deux objets de traduction
 * @param {Object} obj1 Premier objet
 * @param {Object} obj2 Second objet
 * @param {String} obj1Name Nom du premier objet (ex: 'fr')
 * @param {String} obj2Name Nom du second objet (ex: 'en')
 * @param {String} path Chemin actuel dans l'objet
 * @returns {Array} Tableau d'erreurs
 */
function compareTranslationKeys(obj1, obj2, obj1Name, obj2Name, path = '') {
  const errors = [];
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  // Vérifier si des clés sont présentes dans obj1 mais pas dans obj2
  for (const key of obj1Keys) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (!obj2Keys.includes(key)) {
      errors.push(`Clé '${currentPath}' présente dans ${obj1Name} mais absente dans ${obj2Name}`);
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
      // Si les deux valeurs sont des objets, aller plus profond
      const nestedErrors = compareTranslationKeys(obj1[key], obj2[key], obj1Name, obj2Name, currentPath);
      errors.push(...nestedErrors);
    }
  }

  // Vérifier si des clés sont présentes dans obj2 mais pas dans obj1
  for (const key of obj2Keys) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (!obj1Keys.includes(key)) {
      errors.push(`Clé '${currentPath}' présente dans ${obj2Name} mais absente dans ${obj1Name}`);
    }
  }

  return errors;
}

/**
 * Valide la cohérence des traductions entre deux fichiers
 * @param {Object} translations1 Premier fichier de traduction
 * @param {Object} translations2 Second fichier de traduction
 * @param {String} lang1 Nom de la première langue
 * @param {String} lang2 Nom de la seconde langue
 * @returns {Object} Résultat de la validation avec les erreurs
 */
export function validateTranslations(translations1, translations2, lang1 = 'fr', lang2 = 'en') {
  const errors = compareTranslationKeys(translations1, translations2, lang1, lang2);
  
  return {
    valid: errors.length === 0,
    errors,
    count: errors.length
  };
}

/**
 * Vérifie si une clé de traduction existe
 * @param {Object} translations Objet de traduction
 * @param {String} key Clé à vérifier (avec notation par points)
 * @returns {Boolean} Vrai si la clé existe
 */
export function hasTranslationKey(translations, key) {
  const parts = key.split('.');
  let current = translations;
  
  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return false;
    }
    current = current[part];
  }
  
  return true;
}

/**
 * Récupère la valeur d'une clé de traduction
 * @param {Object} translations Objet de traduction
 * @param {String} key Clé à récupérer (avec notation par points)
 * @returns {String|Object|null} Valeur de la traduction ou null si non trouvée
 */
export function getTranslationValue(translations, key) {
  const parts = key.split('.');
  let current = translations;
  
  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return null;
    }
    current = current[part];
  }
  
  return current;
}

/**
 * Utilitaire à exécuter pour vérifier les traductions
 * Exemple d'utilisation:
 * import * as fr from '../locales/fr';
 * import * as en from '../locales/en';
 * checkTranslations(fr, en);
 */
export function checkTranslations(frTranslations, enTranslations) {
  const result = validateTranslations(frTranslations, enTranslations);
  
  if (result.valid) {
    console.log('✅ Toutes les traductions sont cohérentes entre le français et l\'anglais.');
  } else {
    console.error(`❌ ${result.count} erreurs dans les traductions :`);
    result.errors.forEach(error => console.error(`  - ${error}`));
  }
  
  return result;
}
