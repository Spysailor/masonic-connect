import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Book, Settings, Bell, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import { useNotifications } from '@/hooks/use-notifications';
import LanguageSelector from '@/components/language/LanguageSelector';

const Profile = () => {
  const { toast } = useToast();
  const { unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState('personal');
  const { t, i18n } = useTranslation();

  const userData = {
    name: 'Jean Dupont',
    role: t('profile.masterMason'),
    grade: t('profile.thirdDegree'),
    lodge: 'Universalys',
    email: 'jean.dupont@example.com',
    phone: '+230 5712 3456',
    address: 'Port Louis, Île Maurice',
    dateInitiation: '15 novembre 2015',
    dateElevation: '22 mai 2018',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
  };

  const handleUpdateProfile = () => {
    toast({
      title: t('profile.toast.updated'),
      description: t('profile.toast.updatedDescription'),
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
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-1 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <Avatar className="h-32 w-32 mb-4 border-4 border-white shadow-md">
                        <AvatarImage src={userData.avatar} alt={userData.name} />
                        <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-4 right-0 bg-masonic-blue-600 text-white p-1 rounded-full">
                        <MasonicSymbol type="square-compass" size={20} />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-masonic-blue-900">{userData.name}</h2>
                    <p className="text-masonic-blue-700 flex items-center mt-1">
                      <MasonicSymbol type="square-compass" size={20} className="mr-2" />
                      {userData.role}
                    </p>
                    <p className="text-gray-500">{userData.grade}</p>
                    
                    <div className="mt-6 w-full">
                      <Separator className="my-4" />
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">{userData.email}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">{userData.phone}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">{userData.address}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Book className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-gray-700">{t('profile.lodge')} {userData.lodge}</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">{t('profile.initiationDate')}:</span> {userData.dateInitiation}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">{t('profile.elevationDate')}:</span> {userData.dateElevation}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="md:col-span-2 space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="mr-2 h-5 w-5 text-masonic-blue-700" />
                        {t('profile.myProfile')}
                      </div>
                      <LanguageSelector />
                    </CardTitle>
                    <CardDescription>
                      {t('profile.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="personal">{t('profile.tabs.info')}</TabsTrigger>
                        <TabsTrigger value="settings">{t('profile.tabs.settings')}</TabsTrigger>
                        <TabsTrigger value="notifications" className="relative">
                          {t('profile.tabs.notifications')}
                          {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                              {unreadCount}
                            </span>
                          )}
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="personal" className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">{t('profile.fullName')}</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.name}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">{t('profile.grade')}</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" 
                                defaultValue={userData.role}
                                readOnly
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">{t('profile.email')}</label>
                              <input 
                                type="email" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.email}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">{t('profile.phone')}</label>
                              <input 
                                type="tel" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.phone}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">{t('profile.address')}</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.address}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">{t('profile.lodge')}</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" 
                                defaultValue={userData.lodge}
                                readOnly
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-6">
                            <Button onClick={handleUpdateProfile}>
                              {t('profile.update')}
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notifications">
                        <div className="space-y-4">
                          <div className="bg-masonic-blue-50 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <Bell className="h-5 w-5 text-masonic-blue-600 mr-2" />
                              <div>
                                <h3 className="font-medium">{t('profile.notificationCenter')}</h3>
                                <p className="text-sm text-gray-600">{t('profile.manageNotifications')}</p>
                              </div>
                            </div>
                            <Link to="/notifications">
                              <Button variant="outline" className="flex items-center">
                                <span>{t('profile.viewAll')}</span>
                                <ExternalLink className="ml-1 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                          
                          <div className="space-y-3 mt-4">
                            <h3 className="text-lg font-medium">{t('profile.notificationPreferences')}</h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{t('profile.notifications.newTenues')}</p>
                                  <p className="text-sm text-gray-500">{t('profile.notifications.newTenesDesc')}</p>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" defaultChecked className="h-4 w-4 mr-2" />
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{t('profile.notifications.newMessages')}</p>
                                  <p className="text-sm text-gray-500">{t('profile.notifications.newMessagesDesc')}</p>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" defaultChecked className="h-4 w-4 mr-2" />
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{t('profile.notifications.newNews')}</p>
                                  <p className="text-sm text-gray-500">{t('profile.notifications.newNewsDesc')}</p>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" defaultChecked className="h-4 w-4 mr-2" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-6">
                            <Button onClick={() => toast({
                              title: t('profile.toast.settingsSaved'),
                              description: t('profile.toast.notificationPreferencesSaved'),
                            })}>
                              {t('profile.save')}
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="settings" className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">{t('profile.accountSettings')}</h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{t('profile.settings.profilePrivacy')}</p>
                                <p className="text-sm text-gray-500">{t('profile.settings.profilePrivacyDesc')}</p>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" defaultChecked className="h-4 w-4 mr-2" />
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{t('profile.settings.twoFactor')}</p>
                                <p className="text-sm text-gray-500">{t('profile.settings.twoFactorDesc')}</p>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 mr-2" />
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{t('profile.settings.language')}</p>
                                <p className="text-sm text-gray-500">{i18n.language === 'fr' ? 'Français' : 'English'}</p>
                              </div>
                              <LanguageSelector />
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-6">
                            <Button onClick={() => toast({
                              title: t('profile.toast.settingsSaved'),
                              description: t('profile.toast.accountSettingsSaved'),
                            })}>
                              {t('profile.save')}
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
