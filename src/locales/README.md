# Système de Traduction MasonConnect

Ce dossier contient les fichiers de traduction de l'application MasonConnect.

## Structure

Le système de traduction est organisé par langue et par namespace :

```
locales/
├── en/
│   ├── actualites.json
│   ├── agenda.json
│   ├── auth.json
│   ├── common.json
│   ├── dashboard.json
│   ├── nav.json
│   └── tenueForm.json
└── fr/
    ├── actualites.json
    ├── agenda.json
    ├── auth.json
    ├── common.json
    ├── dashboard.json
    ├── nav.json
    └── tenueForm.json
```

## Namespaces

- **common.json** : Textes communs utilisés dans toute l'application
- **auth.json** : Textes liés à l'authentification (connexion, inscription)
- **dashboard.json** : Textes du tableau de bord
- **agenda.json** : Textes liés à l'agenda et aux événements
- **nav.json** : Textes de navigation
- **tenueForm.json** : Formulaire de création/édition de tenue
- **actualites.json** : Textes liés aux actualités

## Utilisation

Pour utiliser les traductions dans vos composants :

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  // Pour le namespace par défaut (common)
  const { t } = useTranslation();
  
  // Pour un namespace spécifique
  const { t: tAuth } = useTranslation('auth');
  
  return (
    <div>
      <h1>{t('appName')}</h1>
      <p>{tAuth('login.title')}</p>
    </div>
  );
}
```

## Ajouter de nouvelles traductions

1. Identifiez le namespace approprié
2. Ajoutez votre clé de traduction dans tous les fichiers de langue
3. Utilisez une structure hiérarchique pour les sections complexes
4. Assurez-vous que toutes les langues ont les mêmes clés

## Bonnes pratiques

- Gardez les clés courtes mais descriptives
- Utilisez des points pour la hiérarchie (ex: `login.title`)
- Utilisez des variables pour les valeurs dynamiques : `"welcome": "Bienvenue, {{name}}!"`
- Testez vos traductions dans toutes les langues
