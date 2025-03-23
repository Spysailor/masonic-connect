
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// Define a function to get mock notifications - in a real app this would come from an API or store
const getNotifications = () => {
  return [
    {
      id: '1',
      title: 'Nouvelle tenue',
      message: 'Une nouvelle tenue a été programmée.',
      timestamp: new Date('2023-05-25T09:30:00'),
      read: false,
      link: '/agenda/1'
    },
    {
      id: '2',
      title: 'Nouveau message',
      message: 'Vous avez reçu un nouveau message.',
      timestamp: new Date('2023-05-24T14:20:00'),
      read: false,
      link: '/messages'
    },
    {
      id: '3',
      title: 'Nouvelle planche',
      message: 'Une nouvelle planche a été ajoutée.',
      timestamp: new Date('2023-05-22T11:15:00'),
      read: false,
      link: '/bibliotheque/5'
    }
  ];
};

const NotificationIndicator = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    // In a real app, this would call an API to mark notifications as read
    toast({
      title: "Toutes les notifications ont été marquées comme lues",
    });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={markAllAsRead}
            >
              Tout marquer comme lu
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length > 0 ? (
          <>
            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem key={notification.id} asChild>
                <Link to={notification.link} className="cursor-pointer">
                  <div className="flex flex-col w-full py-1">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: fr })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate">{notification.message}</p>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer w-full text-center text-sm text-masonic-blue-600 hover:text-masonic-blue-800">
                Voir toutes les notifications
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="py-4 text-center text-sm text-gray-500">
            Aucune notification
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationIndicator;
