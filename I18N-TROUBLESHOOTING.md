# Guide de résolution des problèmes de traduction (i18n)

Ce document vous aide à résoudre les problèmes courants de traduction (i18n) dans l'application MasonConnect.

## Problème : Erreur "Failed to resolve import 'react-i18next'"

Si vous rencontrez l'erreur :
```
Failed to resolve import "react-i18next" from "src/pages/Profile.tsx". Does the file exist?
```

### Causes possibles

1. **Problème d'installation** : Les packages i18next et react-i18next ne sont pas correctement installés ou sont en conflit
2. **Problème de résolution de module** : Vite ne parvient pas à résoudre le chemin d'importation
3. **Version incompatible** : Incompatibilité entre les versions des packages

### Solutions

#### 1. Utiliser le helper de traduction personnalisé

Nous avons créé un utilitaire de traduction personnalisé qui contourne les problèmes d'importation directe.

```tsx
// Au lieu de :
import { useTranslation } from 'react-i18next';

// Utilisez :
import { useTranslation } from '@/utils/translation-helper';
```

Cet utilitaire fournit les mêmes fonctionnalités que react-i18next mais utilise une implémentation locale qui évite les problèmes de résolution de module.

#### 2. Réinstaller les dépendances

Si les problèmes persistent, essayez de réinstaller les dépendances :

```bash
# Supprimer le dossier node_modules et les fichiers de lock
rm -rf node_modules
rm package-lock.json
rm bun.lockb # Si vous utilisez Bun

# Réinstaller les dépendances
npm install
# ou
bun install
```

#### 3. Passer à une version spécifique des packages

Si nécessaire, essayez d'installer des versions spécifiques des packages i18next :

```bash
npm install i18next@23.7.11 react-i18next@14.0.5
# ou
bun add i18next@23.7.11 react-i18next@14.0.5
```

## Comment utiliser l'utilitaire de traduction personnalisé

### 1. Importation

```tsx
import { useTranslation, Trans } from '@/utils/translation-helper';
```

### 2. Utilisation dans les composants

```tsx
const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('myNamespace.title')}</h1>
      <p>{t('myNamespace.description')}</p>
    </div>
  );
};
```

### 3. Changement de langue

```tsx
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  return (
    <div>
      <button onClick={() => i18n.changeLanguage('fr')}>Français</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
    </div>
  );
};
```

## Structure des traductions

Les traductions sont organisées par langue et par namespace dans le dossier `src/locales/`.

- `src/locales/fr/` : Traductions françaises
- `src/locales/en/` : Traductions anglaises

Chaque namespace est stocké dans un fichier JSON distinct, par exemple :
- `common.json` : Textes communs
- `auth.json` : Textes d'authentification
- `profile.json` : Textes du profil utilisateur

## Diagnostic des problèmes de traduction

### 1. Vérifier que l'importation du helper fonctionne

```tsx
import { useTranslation } from '@/utils/translation-helper';
// Vérifiez que cette importation ne génère pas d'erreur
```

### 2. Vérifier que le TranslationProvider est bien présent

Le `TranslationProvider` doit envelopper votre application. Vérifiez que c'est bien le cas dans `App.tsx`.

### 3. Vérifier les fichiers de traduction

Assurez-vous que les clés que vous utilisez existent bien dans les fichiers de traduction et qu'il n'y a pas d'erreurs de syntaxe JSON.

## Signaler un problème

Si les problèmes persistent malgré ces solutions, veuillez ouvrir une issue dans le dépôt GitHub en décrivant précisément le problème :

1. Le contexte exact (où et quand le problème se produit)
2. Le message d'erreur complet
3. Les étapes déjà essayées pour résoudre le problème
