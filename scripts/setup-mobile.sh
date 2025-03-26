#!/bin/bash

# Script pour configurer l'environnement mobile de MasonConnect
# Ce script initialise Capacitor et crée les projets iOS et Android

echo "🚀 Configuration de l'environnement mobile pour MasonConnect"
echo "============================================================"

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez installer Node.js."
    exit 1
fi

# Installer les dépendances nécessaires
echo "📦 Installation des dépendances Capacitor..."
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios @capacitor/splash-screen @capacitor/storage @capacitor/push-notifications @capacitor/local-notifications

# Construire le projet
echo "🏗️ Construction du projet..."
npm run build

# Initialiser Capacitor si le fichier de configuration n'existe pas
if [ ! -f "capacitor.config.json" ]; then
    echo "⚙️ Initialisation de Capacitor..."
    npx cap init MasonConnect com.masonic.connect --web-dir=dist
fi

# Ajouter les plateformes
echo "📱 Ajout de la plateforme Android..."
npx cap add android

# Vérifier si nous sommes sur macOS pour iOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "📱 Ajout de la plateforme iOS..."
    npx cap add ios
else
    echo "⚠️ Plateforme iOS non ajoutée (nécessite macOS)"
fi

# Copier les fichiers web vers les projets natifs
echo "📂 Copie des fichiers web vers les projets natifs..."
npx cap copy

echo "✅ Configuration terminée !"
echo ""
echo "Commandes utiles :"
echo "- npm run cap:open:android : Ouvrir le projet Android Studio"
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "- npm run cap:open:ios : Ouvrir le projet Xcode"
fi
echo "- npm run deploy:android : Construire et déployer sur Android"
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "- npm run deploy:ios : Construire et déployer sur iOS"
fi
echo ""
echo "N'oubliez pas de consulter README-MOBILE.md pour plus d'informations."
