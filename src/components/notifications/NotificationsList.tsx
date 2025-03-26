
import React from 'react';
import { Bell, Mail, Calendar, BookOpen, CheckCircle, Info, AlertTriangle, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { useNotifications } from '@/hooks/use-notifications';
import { NotificationType } from '@/hooks/use-notifications';
import { useTranslation } from 'react-i18next';

interface NotificationsListProps {
  filterType?: string;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ filterType = 'all' }) => {
  const { toast } = useToast();
  const { notifications, markAsRead, deleteNotification } = useNotifications();
  const { t, i18n } = useTranslation();
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !notification.read;
    return notification.type === filterType as NotificationType;
  });

  // Get date locale based on current language
  const dateLocale = i18n.language === 'fr' ? fr : enUS;

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
    <ScrollArea className="h-[500px]">
      {filteredNotifications.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    notification.type === 'event' ? 'bg-purple-100' :
                    notification.type === 'message' ? 'bg-blue-100' :
                    notification.type === 'document' ? 'bg-amber-100' :
                    notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-orange-100' : 'bg-sky-100'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className={`text-base font-medium ${
                      notification.read ? 'text-gray-900' : 'text-blue-900'
                    }`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: dateLocale })}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1 mb-3">{notification.message}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    {notification.link && (
                      <a 
                        href={notification.link} 
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
                      >
                        {t('notifications.viewDetails')} →
                      </a>
                    )}
                    
                    <div className="flex space-x-2 ml-auto">
                      {!notification.read && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="mr-1 h-4 w-4" />
                          {t('notifications.markAsRead')}
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Bell className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">{t('notifications.empty.title')}</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            {t('notifications.empty.description')}
          </p>
        </div>
      )}
    </ScrollArea>
  );
};

export default NotificationsList;
