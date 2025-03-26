# Guide du système de traduction de MasonConnect

Ce document décrit le système de traduction utilisé dans MasonConnect et les améliorations apportées.

## Structure des traductions

Les traductions sont organisées par langue et par namespace (thématique) :

```
src/locales/
├── README.md                # Documentation sur le système de traduction
├── en/                      # Traductions anglaises
│   ├── actualites.json      # Actualités
│   ├── agenda.json          # Agenda/Calendrier
│   ├── auth.json            # Authentification
│   ├── common.json          # Textes communs
│   ├── dashboard.json       # Tableau de bord
│   ├── nav.json             # Navigation
│   └── tenueForm.json       # Formulaire de tenue
└── fr/                      # Traductions françaises
    ├── actualites.json
    ├── agenda.json
    ├── auth.json
    ├── common.json
    ├── dashboard.json
    ├── nav.json
    └── tenueForm.json
```

## Améliorations apportées

1. **Nettoyage de la structure** : Suppression des fichiers globaux (`en.json` et `fr.json`) redondants pour éviter la confusion.

2. **Correction des clés dupliquées** : Correction dans les fichiers `tenueForm.json` où la clé "details" était présente deux fois.

3. **Renommage cohérent** : Renommage de certaines clés pour plus de clarté et de cohérence entre les langues.

4. **Ajout d'outils de validation** :
   - Utilitaire `src/utils/translation-validator.js` pour vérifier la cohérence des traductions
   - Script `src/utils/validate-translations.js` pour valider automatiquement toutes les traductions
   - Ajout d'une commande npm `validate-translations` pour faciliter la vérification

5. **Ajout d'un composant de sélection de langue** : Nouveau composant `src/components/ui/lang-switcher.tsx` permettant de changer facilement de langue dans l'interface.

6. **Documentation** : Ajout d'un fichier README.md dans le dossier des traductions pour faciliter la compréhension et la maintenance.

## Utilisation

### Pour les développeurs

1. **Ajouter une nouvelle traduction** :
   - Identifiez le namespace approprié ou créez-en un nouveau si nécessaire
   - Ajoutez les mêmes clés dans les fichiers FR et EN correspondants
   - Utilisez des clés hiérarchiques (ex: `buttons.save`) pour une meilleure organisation

2. **Valider les traductions** :
   ```bash
   npm run validate-translations
   ```

3. **Utiliser les traductions dans les composants** :
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

4. **Ajouter le sélecteur de langue** :
   ```tsx
   import { LanguageSwitcher } from './components/ui/lang-switcher';

   function MyHeader() {
     return (
       <header>
         <nav>
           {/* Autres éléments de navigation */}
           <LanguageSwitcher />
         </nav>
       </header>
     );
   }
   ```

## Bonnes pratiques

1. **Maintenez la cohérence** entre les différentes langues - chaque clé présente dans une langue doit exister dans toutes les autres.

2. **Utilisez des variables** pour les textes dynamiques : `"welcome": "Bienvenue, {{name}}!"`.

3. **Organisez logiquement** vos clés en utilisant les points comme séparateurs hiérarchiques.

4. **Validez régulièrement** vos traductions avec l'outil fourni.

5. **Ne modifiez pas la structure** sans mettre à jour tous les fichiers correspondants.

## Pour aller plus loin

Pour ajouter une nouvelle langue, suivez ces étapes :

1. Créez un nouveau dossier pour la langue dans `src/locales/` (ex: `src/locales/es/` pour l'espagnol)
2. Copiez tous les fichiers de namespace d'une langue existante
3. Traduisez tous les textes
4. Ajoutez la langue à la liste dans le composant `LanguageSwitcher`
5. Mettez à jour la configuration i18n dans `src/i18n.ts`
