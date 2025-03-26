
import React, { useEffect, useState } from 'react';
import { 
  CapacitorFallback,
  SplashScreenFallback,
  PushNotificationsFallback,
  LocalNotificationsFallback,
  StorageFallback,
  isCapacitorAvailable
} from '@/utils/mobile-fallback';

interface MobileFeaturesProps {
  children: React.ReactNode;
}

/**
 * Composant qui initialise les fonctionnalités mobiles natives
 * et gère le cycle de vie de l'application mobile
 */
const MobileFeatures: React.FC<MobileFeaturesProps> = ({ children }) => {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    // Try to use actual Capacitor if available, otherwise use fallbacks
    let Capacitor: any;
    let SplashScreen: any;
    let PushNotifications: any;
    let LocalNotifications: any;
    let Storage: any;

    try {
      // Only attempt to import if Capacitor is available
      if (isCapacitorAvailable()) {
        Capacitor = require('@capacitor/core').Capacitor;
        SplashScreen = require('@capacitor/splash-screen').SplashScreen;
        PushNotifications = require('@capacitor/push-notifications').PushNotifications;
        LocalNotifications = require('@capacitor/local-notifications').LocalNotifications;
        Storage = require('@capacitor/storage').Storage;
      } else {
        throw new Error('Capacitor not available');
      }
    } catch (e) {
      console.warn('Capacitor modules not available, using fallbacks');
      Capacitor = CapacitorFallback;
      SplashScreen = SplashScreenFallback;
      PushNotifications = PushNotificationsFallback;
      LocalNotifications = LocalNotificationsFallback;
      Storage = StorageFallback;
    }

    // Détecte si l'application s'exécute sur un appareil natif
    const isNativePlatform = Capacitor.isNativePlatform();
    setIsNative(isNativePlatform);

    if (isNativePlatform) {
      // Initialise les fonctionnalités mobiles
      initMobileFeatures();
    }

    async function initMobileFeatures() {
      try {
        // Masque l'écran de démarrage
        await SplashScreen.hide();

        // Initialise les notifications push (si disponibles)
        if (Capacitor.isPluginAvailable('PushNotifications')) {
          await initPushNotifications();
        }

        // Initialise les notifications locales
        if (Capacitor.isPluginAvailable('LocalNotifications')) {
          await LocalNotifications.requestPermissions();
        }

        // Vérifie si c'est le premier lancement
        const { value } = await Storage.get({ key: 'firstLaunch' });
        if (value !== 'false') {
          console.log('Premier lancement de l\'application');
          await Storage.set({ key: 'firstLaunch', value: 'false' });
          // Ici vous pourriez afficher un tutoriel ou une présentation
        }

        console.log('Fonctionnalités mobiles initialisées');
      } catch (error) {
        console.error('Erreur lors de l\'initialisation des fonctionnalités mobiles:', error);
      }
    }

    async function initPushNotifications() {
      try {
        // Demande les permissions pour les notifications push
        const permission = await PushNotifications.requestPermissions();
        
        if (permission.receive === 'granted') {
          // Enregistre l'appareil pour les notifications push
          await PushNotifications.register();
          
          // Écouteurs d'événements pour les notifications push
          PushNotifications.addListener('registration', (token: any) => {
            console.log('Token de notification push:', token.value);
            // Ici, vous devriez envoyer ce token à votre serveur
          });
          
          PushNotifications.addListener('pushNotificationReceived', (notification: any) => {
            console.log('Notification reçue:', notification);
            // Traiter la notification reçue lorsque l'app est au premier plan
          });
          
          PushNotifications.addListener('pushNotificationActionPerformed', (notification: any) => {
            console.log('Action sur notification:', notification);
            // Traiter l'action sur la notification (clic)
          });
        }
      } catch (error) {
        console.error('Erreur d\'initialisation des notifications push:', error);
      }
    }
  }, []);

  // Affiche un indicateur spécifique aux appareils mobiles si nécessaire
  return (
    <>
      {isNative && (
        <div className="fixed top-0 left-0 w-full z-50 bg-primary text-white text-xs text-center" style={{ height: '24px', paddingTop: 'env(safe-area-inset-top)' }}>
          MasonConnect
        </div>
      )}
      <div className={isNative ? 'pt-6' : ''}>
        {children}
      </div>
    </>
  );
};

export default MobileFeatures;
