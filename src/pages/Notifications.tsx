
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Book, Calendar, Mail, Check, Filter, ArchiveX, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileFooterMenu from '@/components/layout/MobileFooterMenu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNotifications } from '@/hooks/use-notifications';
import NotificationsList from '@/components/notifications/NotificationsList';
import { useIsMobile } from '@/hooks/use-mobile';

const Notifications = () => {
  const { notifications, markAllAsRead, clearNotifications } = useNotifications();
  const { unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState('all');
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50">
      <Header />
      
      <main className={`flex-1 pt-28 ${isMobile ? 'pb-24' : 'pb-16'}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                  <Bell className="h-6 w-6 text-masonic-blue-700" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-masonic-blue-900">{t('notifications.title')}</h1>
                  <p className="text-gray-600">
                    {t('notifications.subtitle')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0} className="flex items-center">
                  <Check className="mr-1 h-4 w-4" />
                  {t('notifications.markAllAsRead')}
                </Button>
                <Button variant="outline" size="sm" onClick={clearNotifications} disabled={notifications.length === 0} className="flex items-center">
                  <ArchiveX className="mr-1 h-4 w-4" />
                  {t('notifications.clearAll')}
                </Button>
              </div>
            </div>
            
            <Card className="border-0 shadow-md bg-white rounded-xl overflow-hidden">
              <CardHeader className="pb-0 pt-4 px-4">
                <div className="flex justify-between items-center mb-2">
                  <CardTitle className="text-2xl font-bold">{t('notifications.yourNotifications')}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-6 bg-masonic-blue-50 p-1 mb-2 rounded-lg">
                    <TabsTrigger value="all" className="data-[state=active]:bg-white rounded-md">
                      {t('notifications.tabs.all')}{notifications.length > 0 && ` (${notifications.length})`}
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="data-[state=active]:bg-white rounded-md">
                      {t('notifications.tabs.unread')}{unreadCount > 0 && ` (${unreadCount})`}
                    </TabsTrigger>
                    <TabsTrigger value="event" className="data-[state=active]:bg-white rounded-md">{t('notifications.tabs.events')}</TabsTrigger>
                    <TabsTrigger value="message" className="data-[state=active]:bg-white rounded-md">{t('notifications.tabs.messages')}</TabsTrigger>
                    <TabsTrigger value="document" className="data-[state=active]:bg-white rounded-md">{t('notifications.tabs.documents')}</TabsTrigger>
                    <TabsTrigger value="info" className="data-[state=active]:bg-white rounded-md">{t('notifications.tabs.info')}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent className="p-0">
                <NotificationsList filterType={activeTab} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      {!isMobile && <Footer />}
      <MobileFooterMenu />
    </div>
  );
};

export default Notifications;
