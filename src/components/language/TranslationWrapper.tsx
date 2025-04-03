import React from 'react';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';

interface TranslationWrapperProps {
  /** Clé de traduction i18n */
  translationKey: string;
  /** Fallback à utiliser si la traduction n'existe pas */
  fallback?: string;
  /** Supprimer les underscores et convertir en texte lisible */
  prettify?: boolean;
  /** Composant à utiliser pour rendu (par défaut: span) */
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'button' | 'label';
  /** Classes CSS supplémentaires */
  className?: string;
  /** Attributs HTML supplémentaires */
  [key: string]: any;
}

/**
 * Transforme une clé camelCase ou snake_case en texte lisible
 * Exemple: "helloWorld" devient "Hello World"
 * Exemple: "hello_world" devient "Hello World"
 */
const prettifyKey = (key: string): string => {
  if (!key) return '';
  
  return key
    // Convertir camelCase en mots séparés
    .replace(/([A-Z])/g, ' $1')
    // Remplacer les underscores par des espaces
    .replace(/_/g, ' ')
    // Première lettre en majuscule, reste en minuscule
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    // Supprimer les espaces en début et fin
    .trim();
};

/**
 * Composant qui gère les traductions avec fallback
 * Permet d'éviter d'afficher les clés de traduction dans l'interface
 */
const TranslationWrapper: React.FC<TranslationWrapperProps> = ({
  translationKey,
  fallback,
  prettify = true,
  as = 'span',
  className,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Si aucune clé de traduction n'est fournie, renvoyer une chaîne vide
  if (!translationKey) return null;
  
  // Obtenir la traduction avec fallback
  const translation = i18nWithFallback(translationKey, fallback, t);
  
  // Convertir la clé en texte lisible si demandé et si on est en fallback
  const displayText = prettify && translation === translationKey.split('.').pop()
    ? prettifyKey(translation)
    : translation;
  
  // Rendu du composant en fonction de la propriété 'as'
  const Component = as;
  return <Component className={className} {...rest}>{displayText}</Component>;
};

/**
 * Version abrégée du composant
 * Exemple d'utilisation: <T k="dashboard.title" />
 */
export const T: React.FC<TranslationWrapperProps> = (props) => {
  return <TranslationWrapper {...props} />;
};

// Export du composant principal et de ses helpers
export { prettifyKey };
export default TranslationWrapper;
