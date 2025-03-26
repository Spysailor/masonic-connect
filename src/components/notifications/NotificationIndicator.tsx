
import React from 'react';
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
import { fr, enUS } from 'date-fns/locale';
import { useNotifications } from '@/hooks/use-notifications';
import { useTranslation } from 'react-i18next';

const NotificationIndicator = () => {
  const { toast } = useToast();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  
  // Get date locale based on current language
  const dateLocale = i18n.language === 'fr' ? fr : enUS;
  
  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    markAllAsRead();
    toast({
      title: i18n.language === 'fr' 
        ? "Toutes les notifications ont été marquées comme lues"
        : "All notifications have been marked as read",
    });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>{t('notifications.title')}</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={handleMarkAllAsRead}
            >
              {t('notifications.markAllAsRead')}
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length > 0 ? (
          <>
            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem key={notification.id} asChild>
                <Link to={notification.link || '/notifications'} className="cursor-pointer py-2">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: dateLocale })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate">{notification.message}</p>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/notifications" className="cursor-pointer w-full text-center text-sm text-masonic-blue-600 hover:text-masonic-blue-800">
                {i18n.language === 'fr' ? "Voir toutes les notifications" : "View all notifications"}
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="py-4 text-center text-sm text-gray-500">
            {i18n.language === 'fr' ? "Aucune notification" : "No notifications"}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationIndicator;
