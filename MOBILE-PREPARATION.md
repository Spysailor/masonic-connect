# Préparation Mobile pour MasonConnect

Ce document décrit les modifications apportées à l'application MasonConnect pour la préparer au déploiement sur les stores mobiles (Google Play et App Store).

## Fichiers et modifications ajoutés

### Configuration
- `capacitor.config.json` : Configuration principale pour Capacitor
- `public/manifest.json` : Manifeste PWA pour les fonctionnalités d'application web progressive

### Composants et code
- `src/components/mobile/MobileFeatures.tsx` : Composant qui gère les fonctionnalités spécifiques aux mobiles
   - Initialisation des plugins natifs (Splash Screen, Notifications, etc.)
   - Adaptation de l'interface utilisateur sur mobile
   - Gestion des événements spécifiques aux mobiles

### Ressources graphiques
- `resources/icon-template.svg` : Template pour les icônes d'application
- `resources/splash-template.svg` : Template pour l'écran de démarrage

### Scripts
- `scripts/setup-mobile.sh` : Script pour initialiser l'environnement de développement mobile
- `scripts/generate-mobile-resources.js` : Script pour générer les icônes et écrans de démarrage

### Modifications du package.json
- Ajout des dépendances Capacitor
- Ajout de scripts pour la gestion du workflow mobile

## Commandes disponibles

### Installation et configuration
```bash
# Installation des dépendances Capacitor
npm install

# Configuration initiale de l'environnement mobile (une seule fois)
npm run setup:mobile
```

### Développement quotidien
```bash
# Construction de l'application et copie vers les projets natifs
npm run cap:build

# Ouverture du projet dans Android Studio
npm run cap:open:android

# Ouverture du projet dans Xcode (macOS uniquement)
npm run cap:open:ios
```

### Génération des ressources
```bash
# Génération des icônes et écrans de démarrage
npm run gen:resources
```

### Préparation pour les stores
```bash
# Préparation complète pour la soumission aux stores
npm run prepare:store
```

## Workflow de développement

1. **Développement web normal** : Travaillez sur l'application web comme d'habitude avec `npm run dev`
2. **Test sur mobile** : Utilisez `npm run cap:build` puis ouvrez dans l'IDE natif avec `npm run cap:open:android` ou `npm run cap:open:ios`
3. **Modifications du code natif** : Si vous avez besoin de modifier le code natif, faites-le dans les projets Android Studio ou Xcode
4. **Après chaque modification web significative** : Exécutez `npm run cap:build` pour mettre à jour les projets natifs

## Adaptations natives

### Plugins intégrés
- **SplashScreen** : Gestion de l'écran de démarrage
- **Storage** : Stockage local persistent
- **PushNotifications** : Gestion des notifications push
- **LocalNotifications** : Notifications locales

### Adaptations d'interface
- Meilleure gestion de l'espace d'écran sur mobile
- Prise en compte des encoches et des zones de sécurité
- Barre de navigation mobile améliorée

## Publication sur les stores

Référez-vous au document [README-MOBILE.md](./README-MOBILE.md) pour des instructions détaillées sur la publication dans les stores.

### App Store (iOS)
- Nécessite un compte développeur Apple ($99/an)
- Processus de validation plus long (environ 1-2 jours)
- Signatures et profils de provisionnement à configurer dans Xcode

### Google Play Store
- Nécessite un compte développeur Google ($25 frais unique)
- Processus de validation plus rapide (quelques heures à 1 jour)
- Clé de signature à générer et conserver précieusement

## Prochaines étapes recommandées

1. **Design** : Affiner les ressources graphiques (icônes et splash screens)
2. **Tests** : Tester sur différents appareils Android et iOS
3. **Analytics** : Intégrer un service d'analytics mobile
4. **Crash Reporting** : Ajouter un service de reporting de crash
5. **CI/CD** : Configurer un pipeline CI/CD pour automatiser les builds mobiles
