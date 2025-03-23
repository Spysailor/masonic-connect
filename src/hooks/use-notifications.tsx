
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define the notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'message' | 'event' | 'document';

// Define the notification interface
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

// Define the context interface
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Create a provider component
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    // Initial mock data
    {
      id: '1',
      type: 'event',
      title: 'Nouvelle tenue',
      message: 'Une nouvelle tenue a été programmée le 15 juin 2023.',
      timestamp: new Date('2023-05-25T09:30:00'),
      read: false,
      link: '/agenda/1',
    },
    {
      id: '2',
      type: 'message',
      title: 'Nouveau message',
      message: 'Vous avez reçu un nouveau message de Paul Martin concernant la prochaine réunion.',
      timestamp: new Date('2023-05-24T14:20:00'),
      read: false,
      link: '/messages',
    },
    {
      id: '3',
      type: 'document',
      title: 'Nouveau document',
      message: 'Une nouvelle planche a été ajoutée à la bibliothèque: "Symbolisme du compas".',
      timestamp: new Date('2023-05-22T11:15:00'),
      read: false,
      link: '/bibliotheque/5',
    }
  ]);

  // Generate a new unique ID
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show a toast for the new notification
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Context value
  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
