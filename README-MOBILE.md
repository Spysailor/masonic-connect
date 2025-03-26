# Guide de préparation mobile pour MasonConnect

Ce guide explique comment préparer MasonConnect pour les stores mobiles (Google Play et App Store).

## Installation de Capacitor

[Capacitor](https://capacitorjs.com/) est un framework qui permet de transformer des applications web en applications mobiles natives. Il est développé par l'équipe d'Ionic et est compatible avec n'importe quelle application web.

### Étape 1 : Installer Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npx cap init MasonConnect com.masonic.connect --web-dir=dist
```

### Étape 2 : Installer les plateformes cibles

```bash
npm install @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios
```

### Étape 3 : Construire l'application web

```bash
npm run build
```

### Étape 4 : Copier les fichiers web vers les projets natifs

```bash
npx cap copy
```

## Configuration spécifique pour Android

### Prérequis
- Android Studio installé
- JDK 11+ installé

### Ouvrir le projet dans Android Studio

```bash
npx cap open android
```

### Configurer le fichier AndroidManifest.xml

Modifiez le fichier `android/app/src/main/AndroidManifest.xml` pour ajouter les permissions nécessaires :

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <!-- ... autres configurations ... -->
    </application>
    <uses-permission android:name="android.permission.INTERNET" />
    <!-- Autres permissions si nécessaire -->
</manifest>
```

### Préparer pour Google Play

1. Créer une clé de signature
```bash
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
```

2. Configurer le fichier `android/app/build.gradle` pour la release
```gradle
android {
    // ...
    signingConfigs {
        release {
            storeFile file("my-release-key.jks")
            storePassword "your-store-password"
            keyAlias "my-alias"
            keyPassword "your-key-password"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    // ...
}
```

3. Générer un APK ou Bundle signé via Android Studio
   - Build > Generate Signed Bundle/APK

## Configuration spécifique pour iOS

### Prérequis
- Xcode installé (Mac uniquement)
- Compte développeur Apple

### Ouvrir le projet dans Xcode

```bash
npx cap open ios
```

### Configurer le fichier Info.plist

Ajoutez les configurations nécessaires dans le fichier `ios/App/App/Info.plist` :

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>https</string>
    <string>http</string>
</array>
<!-- Autres configurations spécifiques à votre application -->
```

### Préparer pour l'App Store

1. Configurer les identifiants d'application dans Xcode
   - Ouvrir le projet dans Xcode
   - Sélectionner le projet dans l'explorateur
   - Onglet "Signing & Capabilities"
   - Sélectionner votre équipe de développement
   - Configurer le Bundle Identifier (com.masonic.connect)

2. Créer une archive pour l'App Store
   - Sélectionner "Generic iOS Device" comme cible
   - Product > Archive
   - Suivre les instructions pour soumettre à l'App Store

## Adaptation responsive

Assurez-vous que votre application est correctement adaptée aux écrans mobiles :

1. Utilisez des Media Queries pour adapter l'interface
2. Testez sur différentes tailles d'écran
3. Ajoutez un viewport meta tag approprié
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

## Fonctionnalités natives

Pour accéder aux fonctionnalités natives des appareils, installez les plugins Capacitor nécessaires :

```bash
npm install @capacitor/camera @capacitor/storage @capacitor/push-notifications @capacitor/local-notifications
```

Puis, importez et utilisez ces plugins dans votre code :

```typescript
import { Camera } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';
// etc.
```

## Synchronisation du code

Après chaque modification significative de votre code web :

1. Reconstruisez l'application
```bash
npm run build
```

2. Mettez à jour les projets natifs
```bash
npx cap copy
```

3. Si vous avez modifié des plugins ou configurations natives
```bash
npx cap sync
```

## Tests

Testez votre application sur des appareils réels avant de soumettre aux stores :

- Utilisez Xcode pour déployer sur des appareils iOS
- Utilisez Android Studio pour déployer sur des appareils Android
