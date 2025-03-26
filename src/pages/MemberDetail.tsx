
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from '@/utils/motion';
import { ArrowLeft, Phone, Mail, MapPin, Briefcase, Calendar, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import LodgeInfo from '@/components/masonic/LodgeInfo';

const MemberDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  
  // Mock data for demonstration - in a real app this would be fetched based on the ID
  const member = {
    id: id || '1',
    name: 'Jean Dupont',
    role: 'Vénérable Maître',
    lodge: 'Universalys',
    obedience: 'Grande Loge de l\'Île Maurice',
    degree: 3,
    initiation: '15/09/2005',
    raising: '22/03/2008',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    address: 'Pereybere, Île Maurice',
    profession: 'Architecte',
    birthdate: '12/05/1970',
    interests: 'Philosophie, Histoire, Symbolisme',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Link to="/freres" className="inline-flex items-center text-masonic-blue-700 hover:text-masonic-blue-900">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>{t('memberDetail.backToDirectory')}</span>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="overflow-hidden">
                <div className="relative pt-[100%]">
                  <img 
                    src={member.avatarUrl} 
                    alt={member.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h1 className="text-2xl font-bold text-masonic-blue-900">{member.name}</h1>
                    <MasonicSymbol type="square-compass" size={36} />
                  </div>
                  <p className="text-masonic-blue-700 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-4">{member.lodge} • {member.obedience}</p>
                  
                  <div className="flex space-x-2 mb-6">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      {t('memberDetail.contact.call')}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      {t('memberDetail.contact.sendEmail')}
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.phone}</p>
                        <p className="text-xs text-gray-500">{t('memberDetail.contact.mobile')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.email}</p>
                        <p className="text-xs text-gray-500">{t('memberDetail.contact.email')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.address}</p>
                        <p className="text-xs text-gray-500">{t('memberDetail.contact.address')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.profession}</p>
                        <p className="text-xs text-gray-500">{t('memberDetail.contact.profession')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.birthdate}</p>
                        <p className="text-xs text-gray-500">{t('memberDetail.contact.birthdate')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <LodgeInfo className="mb-6" />
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-masonic-blue-900 mb-4">{t('memberDetail.masonicJourney')}</h2>
                    <MasonicSymbol type="all-seeing-eye" size={32} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-2 border-masonic-blue-200 pl-4 py-1">
                      <p className="text-sm text-gray-500">{t('memberDetail.degree')}</p>
                      <p className="font-medium">
                        {member.degree === 1 ? t('members.filters.apprentices') : 
                         member.degree === 2 ? t('members.filters.companions') : 
                         t('members.filters.masters')}
                      </p>
                    </div>
                    
                    <div className="border-l-2 border-masonic-blue-200 pl-4 py-1">
                      <p className="text-sm text-gray-500">{t('memberDetail.initiation')}</p>
                      <p className="font-medium">{member.initiation}</p>
                    </div>
                    
                    <div className="border-l-2 border-masonic-blue-200 pl-4 py-1">
                      <p className="text-sm text-gray-500">{t('memberDetail.companionPassage')}</p>
                      <p className="font-medium">{member.raising}</p>
                    </div>
                    
                    <div className="border-l-2 border-masonic-blue-200 pl-4 py-1">
                      <p className="text-sm text-gray-500">{t('memberDetail.lodge')}</p>
                      <p className="font-medium">{member.lodge}</p>
                    </div>
                    
                    <div className="border-l-2 border-masonic-blue-200 pl-4 py-1">
                      <p className="text-sm text-gray-500">{t('memberDetail.obedience')}</p>
                      <p className="font-medium">{member.obedience}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-masonic-blue-900 mb-4">{t('memberDetail.activities')}</h2>
                  
                  <Tabs defaultValue="planches">
                    <TabsList className="w-full">
                      <TabsTrigger value="planches" className="flex-1">{t('memberDetail.planches')}</TabsTrigger>
                      <TabsTrigger value="presence" className="flex-1">{t('memberDetail.presence')}</TabsTrigger>
                      <TabsTrigger value="interests" className="flex-1">{t('memberDetail.interests')}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="planches" className="pt-4">
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-masonic-blue-900">Symbolisme du pavé mosaïque</p>
                            <MasonicSymbol type="square-compass-vintage" size={24} />
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{t('memberDetail.planchePresented')} 12/10/2022</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-masonic-blue-900">Les voyages initiatiques</p>
                            <MasonicSymbol type="all-seeing-eye" size={24} />
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{t('memberDetail.planchePresented')} 05/03/2021</p>
                        </div>
                        
                        <div className="flex items-center justify-center mt-6">
                          <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">{t('memberDetail.viewAllPlanches')}</span>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="presence" className="pt-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          {t('memberDetail.presenceSince')} 01/01/2023:
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-sm text-right text-gray-500">17 {t('memberDetail.meetings')} 20</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="interests" className="pt-4">
                      <p className="text-gray-700">{member.interests}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="bg-masonic-blue-100 text-masonic-blue-800 text-xs px-3 py-1 rounded-full">Philosophie</span>
                        <span className="bg-masonic-blue-100 text-masonic-blue-800 text-xs px-3 py-1 rounded-full">Histoire</span>
                        <span className="bg-masonic-blue-100 text-masonic-blue-800 text-xs px-3 py-1 rounded-full">Symbolisme</span>
                        <span className="bg-masonic-blue-100 text-masonic-blue-800 text-xs px-3 py-1 rounded-full">Art Royal</span>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MemberDetail;
