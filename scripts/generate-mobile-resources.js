/**
 * Script pour générer les ressources d'icônes et d'écrans de démarrage pour les applications mobiles
 * 
 * Nécessite sharp: npm install -g sharp-cli
 * Utilisation: node generate-mobile-resources.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Chemins des fichiers
const ICON_TEMPLATE = path.join(__dirname, '../resources/icon-template.svg');
const SPLASH_TEMPLATE = path.join(__dirname, '../resources/splash-template.svg');
const ANDROID_RESOURCES = path.join(__dirname, '../android/app/src/main/res');
const IOS_RESOURCES = path.join(__dirname, '../ios/App/App/Assets.xcassets');

// Configuration des icônes Android (mipmap)
const ANDROID_ICONS = [
  { name: 'mipmap-mdpi/ic_launcher.png', size: 48 },
  { name: 'mipmap-mdpi/ic_launcher_round.png', size: 48 },
  { name: 'mipmap-hdpi/ic_launcher.png', size: 72 },
  { name: 'mipmap-hdpi/ic_launcher_round.png', size: 72 },
  { name: 'mipmap-xhdpi/ic_launcher.png', size: 96 },
  { name: 'mipmap-xhdpi/ic_launcher_round.png', size: 96 },
  { name: 'mipmap-xxhdpi/ic_launcher.png', size: 144 },
  { name: 'mipmap-xxhdpi/ic_launcher_round.png', size: 144 },
  { name: 'mipmap-xxxhdpi/ic_launcher.png', size: 192 },
  { name: 'mipmap-xxxhdpi/ic_launcher_round.png', size: 192 }
];

// Configuration des icônes de l'écran de démarrage Android
const ANDROID_SPLASH = [
  { name: 'drawable/splash.png', width: 1920, height: 1080 }
];

// Configuration des icônes iOS
const IOS_ICONS = [
  { name: 'AppIcon.appiconset/AppIcon-20x20@1x.png', size: 20 },
  { name: 'AppIcon.appiconset/AppIcon-20x20@2x.png', size: 40 },
  { name: 'AppIcon.appiconset/AppIcon-20x20@3x.png', size: 60 },
  { name: 'AppIcon.appiconset/AppIcon-29x29@1x.png', size: 29 },
  { name: 'AppIcon.appiconset/AppIcon-29x29@2x.png', size: 58 },
  { name: 'AppIcon.appiconset/AppIcon-29x29@3x.png', size: 87 },
  { name: 'AppIcon.appiconset/AppIcon-40x40@1x.png', size: 40 },
  { name: 'AppIcon.appiconset/AppIcon-40x40@2x.png', size: 80 },
  { name: 'AppIcon.appiconset/AppIcon-40x40@3x.png', size: 120 },
  { name: 'AppIcon.appiconset/AppIcon-60x60@2x.png', size: 120 },
  { name: 'AppIcon.appiconset/AppIcon-60x60@3x.png', size: 180 },
  { name: 'AppIcon.appiconset/AppIcon-76x76@1x.png', size: 76 },
  { name: 'AppIcon.appiconset/AppIcon-76x76@2x.png', size: 152 },
  { name: 'AppIcon.appiconset/AppIcon-83.5x83.5@2x.png', size: 167 },
  { name: 'AppIcon.appiconset/AppIcon-512@2x.png', size: 1024 }
];

// Configuration des écrans de démarrage iOS
const IOS_SPLASH = [
  { name: 'Splash.imageset/splash-2732x2732.png', width: 2732, height: 2732 },
  { name: 'Splash.imageset/splash-2732x2732-1.png', width: 2732, height: 2732 },
  { name: 'Splash.imageset/splash-2732x2732-2.png', width: 2732, height: 2732 }
];

// Fonction pour créer un répertoire s'il n'existe pas
function ensureDirectoryExists(directory) {
  const dirname = path.dirname(directory);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
  }
}

// Fonction pour générer une icône
function generateIcon(source, target, size) {
  ensureDirectoryExists(target);
  const command = `npx sharp-cli --input="${source}" --output="${target}" resize ${size} ${size}`;
  console.log(`Génération de ${target} (${size}x${size})`);
  execSync(command, { stdio: 'inherit' });
}

// Fonction pour générer un écran de démarrage
function generateSplash(source, target, width, height) {
  ensureDirectoryExists(target);
  const command = `npx sharp-cli --input="${source}" --output="${target}" resize ${width} ${height}`;
  console.log(`Génération de ${target} (${width}x${height})`);
  execSync(command, { stdio: 'inherit' });
}

// Fonction principale
function main() {
  console.log('🚀 Génération des ressources pour les applications mobiles');

  try {
    // Vérifier si les fichiers templates existent
    if (!fs.existsSync(ICON_TEMPLATE)) {
      throw new Error(`Template d'icône non trouvé: ${ICON_TEMPLATE}`);
    }
    if (!fs.existsSync(SPLASH_TEMPLATE)) {
      throw new Error(`Template d'écran de démarrage non trouvé: ${SPLASH_TEMPLATE}`);
    }

    // Vérifier si Android existe et générer les ressources
    if (fs.existsSync(path.join(__dirname, '../android'))) {
      console.log('\n📱 Génération des ressources Android...');
      ANDROID_ICONS.forEach(icon => {
        generateIcon(
          ICON_TEMPLATE,
          path.join(ANDROID_RESOURCES, icon.name),
          icon.size
        );
      });
      
      ANDROID_SPLASH.forEach(splash => {
        generateSplash(
          SPLASH_TEMPLATE,
          path.join(ANDROID_RESOURCES, splash.name),
          splash.width,
          splash.height
        );
      });
    } else {
      console.log('⚠️ Le répertoire Android n\'existe pas. Exécutez d\'abord "npm run cap:add:android"');
    }

    // Vérifier si iOS existe et générer les ressources
    if (fs.existsSync(path.join(__dirname, '../ios'))) {
      console.log('\n📱 Génération des ressources iOS...');
      IOS_ICONS.forEach(icon => {
        generateIcon(
          ICON_TEMPLATE,
          path.join(IOS_RESOURCES, icon.name),
          icon.size
        );
      });
      
      IOS_SPLASH.forEach(splash => {
        generateSplash(
          SPLASH_TEMPLATE,
          path.join(IOS_RESOURCES, splash.name),
          splash.width,
          splash.height
        );
      });
    } else {
      console.log('⚠️ Le répertoire iOS n\'existe pas. Exécutez d\'abord "npm run cap:add:ios"');
    }

    console.log('\n✅ Génération des ressources terminée !');
  } catch (error) {
    console.error('❌ Erreur lors de la génération des ressources:', error.message);
    process.exit(1);
  }
}

// Exécuter le script
main();
