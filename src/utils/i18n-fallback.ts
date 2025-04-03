/**
 * Utilitaire pour gérer les traductions avec fallback
 * Empêche l'affichage des clés de traduction dans l'interface 
 * en fournissant une valeur par défaut ou en extrayant le dernier segment de la clé
 */
import { TFunction } from 'i18next';

/**
 * Fonction qui gère les traductions manquantes en fournissant un fallback
 * @param i18nKey La clé de traduction
 * @param fallback Valeur de repli (optionnelle)
 * @param t Fonction de traduction i18next
 * @returns Le texte traduit ou une valeur de repli
 */
export const i18nWithFallback = (i18nKey: string, fallback?: string, t?: TFunction): string => {
  let translation: string;
  
  // Si la fonction de traduction est fournie, l'utiliser
  if (t) {
    translation = t(i18nKey);
  } else {
    // Sinon, extraire directement la clé
    translation = i18nKey;
  }
  
  // Si la traduction est identique à la clé, c'est qu'elle n'existe pas
  if (translation === i18nKey) {
    if (fallback) {
      // Utiliser le fallback fourni
      return fallback;
    } else {
      // Extraire le dernier segment de la clé (après le dernier point)
      const keySegments = i18nKey.split('.');
      return keySegments[keySegments.length - 1] || i18nKey;
    }
  }
  
  return translation;
};

/**
 * Hook custom pour utiliser i18next avec gestion des fallbacks
 * @param t Fonction de traduction i18next
 * @returns Une fonction de traduction avec gestion des fallbacks
 */
export const useI18nWithFallback = (t: TFunction) => {
  return (key: string, fallback?: string) => i18nWithFallback(key, fallback, t);
};
