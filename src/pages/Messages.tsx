
import React, { useState } from 'react';
import { motion } from '@/utils/motion';
import { Search, Plus, Mail, Check, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language === 'fr' ? fr : enUS;

  // Mock data for demonstration
  const messages = [
    {
      id: '1',
      subject: 'Préparation de la prochaine tenue',
      preview: 'Cher Frère, concernant la prochaine tenue qui se tiendra le 15 mai, je souhaiterais discuter...',
      sender: 'Jean Dupont',
      senderRole: 'Vénérable Maître',
      date: new Date('2023-05-02T10:30:00'),
      status: 'unread' as const,
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '2',
      subject: 'Ordre du jour - Réunion du collège des officiers',
      preview: 'Voici l\'ordre du jour pour notre prochaine réunion du collège des officiers qui se tiendra...',
      sender: 'Paul Martin',
      senderRole: 'Premier Surveillant',
      date: new Date('2023-05-01T14:15:00'),
      status: 'unread' as const,
      avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      id: '3',
      subject: 'Demande d\'information sur le rite écossais',
      preview: 'Cher Frère, je m\'intéresse actuellement au rite écossais et j\'aimerais avoir plus d\'informations...',
      sender: 'Pierre Lambert',
      senderRole: 'Orateur',
      date: new Date('2023-04-29T09:45:00'),
      status: 'unread' as const,
      avatarUrl: 'https://randomuser.me/api/portraits/men/64.jpg',
    },
    {
      id: '4',
      subject: 'Confirmation de présence - Tenue du 22 mai',
      preview: 'Je vous confirme ma présence à la tenue du 22 mai. J\'ai bien noté qu\'il s\'agit d\'une élévation...',
      sender: 'Michel Durand',
      senderRole: 'Membre',
      date: new Date('2023-04-28T16:20:00'),
      status: 'read' as const,
      avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
    {
      id: '5',
      subject: 'Partage de documentation sur le symbolisme',
      preview: 'Suite à notre discussion lors de la dernière agape, je vous partage quelques documents sur le symbolisme...',
      sender: 'André Lefevre',
      senderRole: 'Secrétaire',
      date: new Date('2023-04-26T11:10:00'),
      status: 'read' as const,
      avatarUrl: 'https://randomuser.me/api/portraits/men/70.jpg',
    },
    {
      id: '6',
      subject: 'Rappel - Cotisation annuelle',
      preview: 'Ce message est un rappel pour votre cotisation annuelle qui n\'a pas encore été reçue. Merci de procéder...',
      sender: 'Thomas Blanc',
      senderRole: 'Trésorier',
      date: new Date('2023-04-20T08:30:00'),
      status: 'read' as const,
      avatarUrl: 'https://randomuser.me/api/portraits/men/82.jpg',
    },
  ];

  // Filter messages based on search term
  const filteredMessages = messages.filter(message => {
    return message.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
           message.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
           message.sender.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Count unread messages
  const unreadCount = messages.filter(message => message.status === 'unread').length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-masonic-blue-900">{t('messages.title')}</h1>
                <p className="text-gray-600 mt-1">{t('messages.subtitle')}</p>
              </div>
              
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                {t('messages.newMessage')}
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Messages Sidebar */}
                <div className="md:w-64 border-r border-gray-200">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder={t('messages.search')}
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <Tabs defaultValue="inbox">
                      <TabsList className="w-full">
                        <TabsTrigger value="inbox" className="flex-1">
                          {t('messages.tabs.inbox')}
                          {unreadCount > 0 && (
                            <span className="ml-2 bg-masonic-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                              {unreadCount}
                            </span>
                          )}
                        </TabsTrigger>
                        <TabsTrigger value="sent" className="flex-1">{t('messages.tabs.sent')}</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="inbox" className="mt-3 space-y-1">
                        <Button variant="ghost" className="w-full justify-start text-gray-700 font-normal hover:bg-gray-100 hover:text-gray-900">
                          <Mail className="mr-2 h-4 w-4 text-gray-500" />
                          {t('messages.filters.all')}
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700 font-normal hover:bg-gray-100 hover:text-gray-900">
                          <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                          {t('messages.filters.unread')}
                          {unreadCount > 0 && (
                            <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">
                              {unreadCount}
                            </span>
                          )}
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-700 font-normal hover:bg-gray-100 hover:text-gray-900">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          {t('messages.filters.read')}
                        </Button>
                      </TabsContent>
                      
                      <TabsContent value="sent" className="mt-3">
                        <div className="text-center py-4 text-gray-500 text-sm">
                          {t('messages.tabs.sentMessage')}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                
                {/* Messages List */}
                <div className="flex-1">
                  <ul className="divide-y divide-gray-200">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map((message) => (
                        <li key={message.id} className="hover:bg-gray-50 cursor-pointer">
                          <div className="p-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                <div className="relative">
                                  <img 
                                    className="h-10 w-10 rounded-full"
                                    src={message.avatarUrl}
                                    alt={message.sender}
                                  />
                                  {message.status === 'unread' && (
                                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-masonic-blue-600 ring-2 ring-white"></span>
                                  )}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className={`text-sm font-medium ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                                    {message.sender}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {format(message.date, 'd MMM', { locale: currentLocale })}
                                  </p>
                                </div>
                                <p className={`text-sm truncate ${message.status === 'unread' ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                  {message.subject}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {message.preview}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Mail className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-lg font-medium text-gray-900">{t('messages.empty.title')}</p>
                        <p className="text-gray-500">{t('messages.empty.description')}</p>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
