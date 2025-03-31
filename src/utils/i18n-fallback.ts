
import i18n from 'i18next';

/**
 * Check if a translation key exists and has a value
 * @param key The translation key to check
 * @param ns The namespace to check in (optional)
 * @returns True if the key exists and has a value, false otherwise
 */
export const isI18nAvailable = (key: string, ns?: string): boolean => {
  try {
    const value = i18n.t(key, { ns });
    return value !== key && value !== '';
  } catch (error) {
    console.error(`Error checking i18n key '${key}':`, error);
    return false;
  }
};

/**
 * Get a translation with a fallback value if not found
 * @param key The translation key to get
 * @param fallback The fallback value to use if the key is not found
 * @param ns The namespace to get the translation from (optional)
 * @returns The translation or the fallback value
 */
export const i18nWithFallback = (key: string, fallback: string, ns?: string): string => {
  if (!key) return fallback;
  
  try {
    const value = i18n.t(key, { ns });
    // Si la valeur retournée est identique à la clé, c'est que la traduction n'existe pas
    if (typeof value === 'string' && (value === key || value === '')) {
      console.warn(`Missing translation for key: ${key}, using fallback: ${fallback}`);
      return fallback;
    }
    return value as string;
  } catch (error) {
    console.error(`Error translating key '${key}':`, error);
    return fallback;
  }
};

/**
 * Format a translation with interpolated values and a fallback
 * @param key The translation key
 * @param options The interpolation options object
 * @param fallback The fallback string if translation fails
 * @param ns The namespace (optional)
 * @returns The formatted translation or fallback
 */
export const formatI18n = (
  key: string, 
  options: Record<string, any>, 
  fallback: string, 
  ns?: string
): string => {
  if (!key) return fallback;
  
  try {
    const value = i18n.t(key, { ...options, ns });
    // Si la valeur retournée est identique à la clé, c'est que la traduction n'existe pas
    if (typeof value === 'string' && (value === key || value === '')) {
      console.warn(`Missing translation for formatted key: ${key}, using fallback: ${fallback}`);
      return fallback;
    }
    return value as string;
  } catch (error) {
    console.error(`Error formatting i18n key '${key}':`, error);
    return fallback;
  }
};

/**
 * Vérifie si une traduction existe et retourne un texte de remplacement si ce n'est pas le cas
 * @param t Fonction de traduction i18next
 * @param key Clé de traduction
 * @param defaultText Texte par défaut à utiliser si la traduction n'existe pas
 * @returns Le texte traduit ou le texte par défaut
 */
export const safeTranslate = (t: Function, key: string, defaultText: string): string => {
  try {
    const translated = t(key);
    if (translated === key) {
      console.warn(`Missing translation for key: ${key}, using default: ${defaultText}`);
      return defaultText;
    }
    return translated;
  } catch (error) {
    console.error(`Error in safeTranslate for key '${key}':`, error);
    return defaultText;
  }
};
