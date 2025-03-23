
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Book, Settings, Bell } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import NotificationsList from '@/components/notifications/NotificationsList';

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');

  // Mock data for the profile
  const userData = {
    name: 'Jean Dupont',
    role: 'Maître Maçon',
    grade: '3ème degré',
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
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left sidebar with profile info */}
              <Card className="md:col-span-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    
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
                          <span className="text-gray-700">Loge {userData.lodge}</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Date d'initiation:</span> {userData.dateInitiation}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Date d'élévation:</span> {userData.dateElevation}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Main content */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-masonic-blue-700" />
                      Mon profil
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="personal">Informations</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="settings">Paramètres</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="personal" className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">Nom complet</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.name}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">Grade</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.role}
                                disabled
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">Email</label>
                              <input 
                                type="email" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.email}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">Téléphone</label>
                              <input 
                                type="tel" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.phone}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">Adresse</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.address}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">Loge</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md" 
                                defaultValue={userData.lodge}
                                disabled
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-6">
                            <Button onClick={handleUpdateProfile}>
                              Mettre à jour
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notifications">
                        <NotificationsList />
                      </TabsContent>
                      
                      <TabsContent value="settings" className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Préférences de notification</h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Nouvelles tenues</p>
                                <p className="text-sm text-gray-500">Recevoir une notification pour les nouvelles tenues</p>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" defaultChecked className="h-4 w-4 mr-2" />
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Nouveaux messages</p>
                                <p className="text-sm text-gray-500">Recevoir une notification pour les nouveaux messages</p>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" defaultChecked className="h-4 w-4 mr-2" />
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Nouvelles actualités</p>
                                <p className="text-sm text-gray-500">Recevoir une notification pour les nouvelles actualités</p>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" defaultChecked className="h-4 w-4 mr-2" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-6">
                            <Button onClick={() => toast({
                              title: "Paramètres sauvegardés",
                              description: "Vos préférences de notification ont été mises à jour.",
                            })}>
                              Sauvegarder
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
