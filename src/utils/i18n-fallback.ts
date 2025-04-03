
import i18n from 'i18next';

/**
 * Check if a translation key exists and has a value
 * @param key The translation key to check
 * @param ns The namespace to check in (optional)
 * @returns True if the key exists and has a value, false otherwise
 */
export const isI18nAvailable = (key: string, ns?: string): boolean => {
  if (!key) return false;
  
  try {
    const value = i18n.t(key, { ns });
    return typeof value === 'string' && value !== key && value !== '';
  } catch (error) {
    console.error(`Error checking i18n key '${key}':`, error);
    return false;
  }
};

/**
 * Get a translation with a fallback value if not found
 * @param key The translation key to get
 * @param fallback The fallback value to use if the key is not found
 * @param options The options to pass to i18n.t (optional)
 * @returns The translation or the fallback value
 */
export const i18nWithFallback = (
  key: string, 
  fallback: string, 
  options: Record<string, any> = {}
): string => {
  if (!key) return fallback;
  
  try {
    const translationOptions = { ...options };
    const value = i18n.t(key, translationOptions);
    
    // If the returned value is identical to the key or empty, the translation doesn't exist
    if (typeof value === 'string' && (value === key || value === '')) {
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
    
    // If the returned value is identical to the key, the translation doesn't exist
    if (typeof value === 'string' && (value === key || value === '')) {
      return fallback;
    }
    
    return value as string;
  } catch (error) {
    console.error(`Error formatting i18n key '${key}':`, error);
    return fallback;
  }
};

/**
 * Check if a translation exists and return a replacement text if not
 * @param t Translation function from i18next
 * @param key Translation key
 * @param defaultText Default text to use if the translation doesn't exist
 * @returns The translated text or the default text
 */
export const safeTranslate = (t: Function, key: string, defaultText: string): string => {
  if (!key) return defaultText;
  
  try {
    const translated = t(key);
    if (translated === key || translated === '') {
      return defaultText;
    }
    return translated;
  } catch (error) {
    console.error(`Error in safeTranslate for key '${key}':`, error);
    return defaultText;
  }
};

/**
 * Get a translation with context 
 * @param key The translation key
 * @param context The context object
 * @param fallback The fallback text
 * @returns The translated text with context or the fallback
 */
export const i18nWithContext = (
  key: string,
  context: Record<string, any>,
  fallback: string
): string => {
  if (!key) return fallback;
  
  try {
    const value = i18n.t(key, { ...context });
    
    if (typeof value === 'string' && (value === key || value === '')) {
      return fallback;
    }
    
    return value as string;
  } catch (error) {
    console.error(`Error with context translation for key '${key}':`, error);
    return fallback;
  }
};
