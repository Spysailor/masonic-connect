
import React, { useState } from 'react';
import { Bell, Mail, Calendar, BookOpen, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ScrollArea } from '@/components/ui/scroll-area';

type NotificationType = 'info' | 'success' | 'warning' | 'message' | 'event' | 'document';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

const NotificationsList = () => {
  const { toast } = useToast();
  
  // Mock notification data
  const [notifications, setNotifications] = useState<Notification[]>([
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
    },
    {
      id: '4',
      type: 'info',
      title: 'Mise à jour du profil',
      message: 'Votre profil a été mis à jour avec succès.',
      timestamp: new Date('2023-05-20T16:45:00'),
      read: true,
    },
    {
      id: '5',
      type: 'success',
      title: 'Cotisation reçue',
      message: 'Votre cotisation annuelle a bien été reçue. Merci.',
      timestamp: new Date('2023-05-18T10:30:00'),
      read: true,
    },
    {
      id: '6',
      type: 'warning',
      title: 'Rappel',
      message: 'N\'oubliez pas la tenue spéciale ce vendredi.',
      timestamp: new Date('2023-05-15T08:20:00'),
      read: true,
    }
  ]);

  // Get number of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast({
      title: "Notification marquée comme lue",
    });
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "Toutes les notifications ont été marquées comme lues",
    });
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification supprimée",
    });
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'message':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'document':
        return <BookOpen className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-sky-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-masonic-blue-700" />
          <h3 className="text-lg font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <span className="ml-2 bg-masonic-blue-600 text-white text-xs rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
          >
            Tout marquer comme lu
          </Button>
        )}
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                        {notification.title}
                      </p>
                      <div className="flex space-x-2 items-center">
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: fr })}
                        </span>
                        
                        <button 
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    
                    <div className="mt-2 flex items-center justify-between">
                      {notification.link && (
                        <a 
                          href={notification.link} 
                          className="text-xs text-masonic-blue-600 hover:text-masonic-blue-800 hover:underline"
                        >
                          Voir les détails
                        </a>
                      )}
                      
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs h-7" 
                          onClick={() => markAsRead(notification.id)}
                        >
                          Marquer comme lu
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Bell className="h-12 w-12 mx-auto text-gray-300" />
            <p className="mt-2 text-lg font-medium text-gray-900">Pas de notifications</p>
            <p className="text-sm">Vous n'avez aucune notification pour le moment.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationsList;
