
// Fallback implementations for Capacitor plugins

export const CapacitorFallback = {
  isNativePlatform: () => false,
  isPluginAvailable: () => false,
};

export const SplashScreenFallback = {
  hide: async () => {
    console.warn('SplashScreen plugin not available');
  },
};

export const PushNotificationsFallback = {
  requestPermissions: async () => {
    console.warn('PushNotifications plugin not available');
    return { receive: 'denied' };
  },
  register: async () => {
    console.warn('PushNotifications plugin not available');
  },
  addListener: (event: string, callback: any) => {
    console.warn(`PushNotifications plugin not available, cannot add listener for ${event}`);
    return { remove: () => {} };
  },
};

export const LocalNotificationsFallback = {
  requestPermissions: async () => {
    console.warn('LocalNotifications plugin not available');
    return { display: 'denied' };
  },
  schedule: async (options: any) => {
    console.warn('LocalNotifications plugin not available, cannot schedule notification');
  },
};

export const StorageFallback = {
  get: async ({ key }: { key: string }) => {
    console.warn('Storage plugin not available, using localStorage fallback');
    const value = localStorage.getItem(key);
    return { value };
  },
  set: async ({ key, value }: { key: string, value: string }) => {
    console.warn('Storage plugin not available, using localStorage fallback');
    localStorage.setItem(key, value);
  },
};

export const isCapacitorAvailable = () => {
  try {
    require('@capacitor/core');
    return true;
  } catch (e) {
    return false;
  }
};
