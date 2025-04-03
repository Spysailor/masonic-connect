# Système de traduction de Masonic Connect

Ce document explique le système de gestion des traductions internationales de l'application Masonic Connect.

## Structure des fichiers de traduction

Les traductions sont organisées par langue et par namespace :

```
src/locales/
├── fr.json                   # Traductions globales en français
├── en.json                   # Traductions globales en anglais
├── fr/                       # Namespaces spécifiques en français  
│   ├── dashboard.json        # Traductions pour le tableau de bord
│   ├── index.json            # Traductions pour la page d'accueil
│   └── tenue.json            # Traductions pour les pages de tenue
└── en/                       # Namespaces spécifiques en anglais
    ├── dashboard.json
    ├── index.json
    └── tenue.json
```

## Utilisation des traductions

### Méthode basique avec la fonction `t`

Utilisez la fonction `t` de react-i18next :

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.description')}</p>
    </div>
  );
}
```

### Utilisation avec namespaces

Si vous avez besoin d'un namespace spécifique :

```tsx
const { t } = useTranslation('dashboard');
return <h1>{t('stats.title')}</h1>;
```

### Composant TranslationWrapper

Pour éviter les problèmes d'affichage des clés manquantes, utilisez le composant `TranslationWrapper` ou son alias court `T` :

```tsx
import { T } from '@/components/language/TranslationWrapper';

function MyComponent() {
  return (
    <div>
      <T k="dashboard.title" as="h1" className="text-2xl" />
      <T k="dashboard.stats.members" fallback="Membres" />
    </div>
  );
}
```

Ce composant :
- Affiche la traduction si elle existe
- Utilise le fallback si spécifié
- Transforme automatiquement la clé en texte lisible si la traduction est manquante

### Utilitaire i18nWithFallback

Pour les cas où vous avez besoin d'utiliser une traduction dans un contexte JavaScript :

```tsx
import { i18nWithFallback } from '@/utils/i18n-fallback';

function MyComponent() {
  const { t } = useTranslation();
  const title = i18nWithFallback('myNamespace.title', 'Titre par défaut', t);
  
  // ...utiliser title...
}
```

## Gestion du changement de langue

Le changement de langue est géré par le composant `LanguageSelector` qui se trouve dans `src/components/language/LanguageSelector.tsx`.

Pour ajouter une nouvelle langue :

1. Créez les fichiers de traduction correspondants
2. Ajoutez la langue dans le tableau `languages` du composant `LanguageSelector`

```tsx
const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' } // Nouvelle langue
];
```

## Bonnes pratiques

1. **Utilisez des clés hiérarchiques** : Organisez vos clés de traduction de manière hiérarchique (ex: `common.buttons.save`).

2. **Évitez les traductions codées en dur** : Toujours utiliser les fonctions de traduction.

3. **Utilisez TranslationWrapper** : Pour éviter les problèmes d'affichage des clés manquantes.

4. **Ajoutez de nouvelles traductions au fur et à mesure** : Si vous ajoutez une nouvelle fonctionnalité, ajoutez immédiatement les traductions associées.

5. **Testez les changements de langue** : Vérifiez que votre interface fonctionne correctement lorsque l'utilisateur change de langue.

## Comment extraire automatiquement les clés de traduction

Pour extraire automatiquement les clés de traduction, vous pouvez utiliser l'outil `i18next-scanner` :

1. Installez l'outil :
```bash
npm install i18next-scanner --save-dev
```

2. Créez un script dans package.json :
```json
"scripts": {
  "extract-translations": "i18next-scanner --config i18next-scanner.config.js 'src/**/*.{ts,tsx}'"
}
```

3. Exécutez la commande :
```bash
npm run extract-translations
```

Cela générera un fichier avec toutes les clés de traduction utilisées dans l'application.
