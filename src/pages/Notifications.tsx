
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Book, Calendar, Mail, Check, Filter, ArchiveX, RefreshCw } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNotifications } from '@/hooks/use-notifications';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import { useToast } from '@/hooks/use-toast';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearNotifications } = useNotifications();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <Mail className="h-6 w-6 text-blue-600" />;
      case 'event':
        return <Calendar className="h-6 w-6 text-purple-600" />;
      case 'document':
        return <Book className="h-6 w-6 text-amber-600" />;
      case 'success':
        return <Check className="h-6 w-6 text-green-600" />;
      case 'warning':
        return <MasonicSymbol type="square-compass" size={24} className="text-orange-600" />;
      default:
        return <Bell className="h-6 w-6 text-masonic-blue-600" />;
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: "Toutes les notifications ont été marquées comme lues",
    });
  };

  const handleClearAll = () => {
    clearNotifications();
    toast({
      title: "Toutes les notifications ont été supprimées",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50">
      <Header />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                  <Bell className="h-6 w-6 text-masonic-blue-700" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-masonic-blue-900">Notifications</h1>
                  <p className="text-gray-600">
                    Restez informé des activités de la loge Universalys
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                  <Check className="mr-1 h-4 w-4" />
                  Tout lire
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearAll} disabled={notifications.length === 0}>
                  <ArchiveX className="mr-1 h-4 w-4" />
                  Tout effacer
                </Button>
              </div>
            </div>
            
            <Card className="border-0 shadow-md bg-white rounded-xl">
              <CardHeader className="pb-2">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <CardTitle>Vos notifications</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Filter className="mr-1 h-4 w-4" />
                        Filtres
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <TabsList className="grid grid-cols-6 bg-masonic-blue-50 p-1">
                    <TabsTrigger value="all" className="data-[state=active]:bg-white">
                      Toutes {notifications.length > 0 && `(${notifications.length})`}
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="data-[state=active]:bg-white">
                      Non lues {unreadCount > 0 && `(${unreadCount})`}
                    </TabsTrigger>
                    <TabsTrigger value="event" className="data-[state=active]:bg-white">Tenues</TabsTrigger>
                    <TabsTrigger value="message" className="data-[state=active]:bg-white">Messages</TabsTrigger>
                    <TabsTrigger value="document" className="data-[state=active]:bg-white">Documents</TabsTrigger>
                    <TabsTrigger value="info" className="data-[state=active]:bg-white">Infos</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-3 pt-2">
                      {filteredNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`p-4 rounded-lg border ${
                            notification.read 
                              ? 'bg-white border-gray-100' 
                              : 'bg-masonic-blue-50 border-masonic-blue-100'
                          } hover:shadow-md transition-all duration-200`}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                notification.read ? 'bg-gray-50' : 'bg-white'
                              }`}>
                                {getNotificationIcon(notification.type)}
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <p className={`text-base font-medium ${
                                  notification.read ? 'text-gray-900' : 'text-masonic-blue-900'
                                }`}>
                                  {notification.title}
                                </p>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                  {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: fr })}
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-600 mt-1 mb-3">{notification.message}</p>
                              
                              <div className="flex items-center justify-between mt-2">
                                {notification.link && (
                                  <a 
                                    href={notification.link} 
                                    className="text-xs text-masonic-blue-600 hover:text-masonic-blue-800 hover:underline font-medium"
                                  >
                                    Voir les détails →
                                  </a>
                                )}
                                
                                <div className="flex space-x-2">
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
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-xs h-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    Supprimer
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
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Pas de notifications</h3>
                      <p className="text-sm text-gray-500 max-w-sm">
                        Vous n'avez aucune notification pour le moment dans cette catégorie.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;
