
# Masonic Connect

## Description
Une application web sécurisée conçue pour faciliter la communication et la gestion des loges maçonniques.

## Fonctionnalités
- Authentification et autorisation sécurisées
- Gestion des membres et des loges
- Calendrier des tenues
- Bibliothèque de documents et planches
- Messagerie interne
- Multilangue (Français et Anglais)

## Configuration technique

### Prérequis
- Node.js 18+ et npm
- Un compte Supabase pour la base de données

### Installation

1. Clonez le dépôt:
```bash
git clone <URL_DU_REPO>
cd masonic-connect
```

2. Installez les dépendances:
```bash
npm install
```

3. Configurez les variables d'environnement:
Créez un fichier `.env.local` à la racine du projet et ajoutez:
```
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Lancez le serveur de développement:
```bash
npm run dev
```

## Architecture du projet

- `/src/components` - Composants React réutilisables
- `/src/hooks` - Hooks React personnalisés
- `/src/pages` - Pages principales de l'application
- `/src/integrations` - Intégrations avec des services externes (Supabase)
- `/src/locales` - Fichiers de traduction pour i18n

## Sécurité

- Les clés API sont stockées dans des variables d'environnement
- L'authentification est gérée via Supabase Auth
- Les règles de sécurité au niveau des lignes (RLS) sont configurées dans Supabase

## Bonnes pratiques recommandées

- Ne stockez jamais de clés API directement dans le code source
- Utilisez TypeScript avec les vérifications strictes activées
- Suivez les bonnes pratiques React pour la gestion des états
- Documentez les nouvelles fonctionnalités et composants

## Licence
Propriétaire - Tous droits réservés
