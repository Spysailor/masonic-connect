import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Users, FileText, Bell, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TenueCard from '@/components/dashboard/TenueCard';
import MemberCard from '@/components/dashboard/MemberCard';
import NewsCard from '@/components/dashboard/NewsCard';

// Define types for Supabase query results
type ProfileWithRelations = {
  id: string;
  display_name: string | null;
  photo_url: string | null;
  lodge_memberships: {
    office: string | null;
    lodge_id: string;
  }[] | null;
  lodges: {
    name: string;
  }[] | null;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('agenda');
  
  // Fetch tenues from Supabase
  const { data: tenues = [], isLoading: tenuesLoading } = useQuery({
    queryKey: ['tenues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenues')
        .select('*')
        .order('tenue_date', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data.map(tenue => ({
        id: tenue.id,
        title: tenue.title,
        date: new Date(tenue.tenue_date),
        location: tenue.location || 'Lieu à confirmer',
        degree: tenue.degree || 1,
        status: 'pending' as 'confirmed' | 'pending' | 'declined',
      }));
    },
    placeholderData: [
      {
        id: '1',
        title: 'Tenue au 1er degré',
        date: new Date('2023-05-15T19:00:00'),
        location: 'Temple Les Trois Vertus',
        degree: 1,
        status: 'confirmed' as 'confirmed' | 'pending' | 'declined',
      },
      {
        id: '2',
        title: 'Tenue au 3ème degré - Élévation',
        date: new Date('2023-05-22T19:00:00'),
        location: 'Temple La Sagesse',
        degree: 3,
        status: 'pending' as 'confirmed' | 'pending' | 'declined',
      },
      {
        id: '3',
        title: 'Tenue au 2ème degré - Passage',
        date: new Date('2023-05-29T19:00:00'),
        location: 'Temple Les Trois Vertus',
        degree: 2,
        status: 'pending' as 'confirmed' | 'pending' | 'declined',
      }
    ]
  });

  // Fetch members from Supabase
  const { data: members = [], isLoading: membersLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id,
            display_name,
            photo_url,
            lodge_memberships(
              office,
              lodge_id
            ),
            lodges(
              name
            )
          `)
          .limit(4);
        
        if (error) throw error;
        
        return (data as ProfileWithRelations[]).map(profile => ({
          id: profile.id,
          name: profile.display_name || 'Membre',
          role: profile.lodge_memberships && profile.lodge_memberships[0] ? 
                profile.lodge_memberships[0].office || 'Membre' : 'Membre',
          lodge: profile.lodges && profile.lodges[0] ? 
                 profile.lodges[0].name || 'Loge' : 'Loge',
          avatarUrl: profile.photo_url || 'https://randomuser.me/api/portraits/men/32.jpg',
        }));
      } catch (error) {
        console.error('Error fetching members:', error);
        return [];
      }
    },
    placeholderData: [
      {
        id: '1',
        name: 'Jean Dupont',
        role: 'Vénérable Maître',
        lodge: 'Les Trois Vertus',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      {
        id: '2',
        name: 'Paul Martin',
        role: 'Premier Surveillant',
        lodge: 'Les Trois Vertus',
        avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
      },
      {
        id: '3',
        name: 'Philippe Moreau',
        role: 'Deuxième Surveillant',
        lodge: 'Les Trois Vertus',
        avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
      },
      {
        id: '4',
        name: 'Pierre Lambert',
        role: 'Orateur',
        lodge: 'Les Trois Vertus',
        avatarUrl: 'https://randomuser.me/api/portraits/men/64.jpg',
      }
    ]
  });

  // Fetch news from Supabase
  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(2);
      
      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        date: new Date(item.published_at),
        author: item.author_name,
        imageUrl: item.image_url || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      }));
    },
    placeholderData: [
      {
        id: '1',
        title: 'Élection du nouveau Vénérable',
        content: "Les élections pour le nouveau collège d'officiers se tiendront lors de la prochaine tenue...",
        date: new Date('2023-05-01'),
        author: 'Jean Dupont',
        imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
      {
        id: '2',
        title: 'Rencontre inter-obédientielle',
        content: 'Une rencontre entre plusieurs obédiences aura lieu le mois prochain. Inscrivez-vous...',
        date: new Date('2023-04-28'),
        author: 'Paul Martin',
        imageUrl: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
      }
    ]
  });

  // Fetch stats from Supabase
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      try {
        const { count: tenues } = await supabase
          .from('tenues')
          .select('*', { count: 'exact', head: true });
        
        const { count: members } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        const { count: planches } = await supabase
          .from('planches')
          .select('*', { count: 'exact', head: true });
        
        const { count: unreadNotifications } = await supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('is_read', false);
        
        return {
          nextTenue: tenues && tenues > 0 ? '15 mai 2023' : 'Aucune',
          membersCount: members || 24,
          planchesCount: planches || 12,
          unreadMessages: unreadNotifications || 3
        };
      } catch (error) {
        console.error('Error fetching stats:', error);
        return {
          nextTenue: '15 mai 2023',
          membersCount: 24,
          planchesCount: 12,
          unreadMessages: 3
        };
      }
    },
    placeholderData: {
      nextTenue: '15 mai 2023',
      membersCount: 24,
      planchesCount: 12,
      unreadMessages: 3
    }
  });
  
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
            <h1 className="text-3xl font-bold text-masonic-blue-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Bienvenue sur votre espace personnel MasonConnect</p>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <Card className="shadow-sm">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-masonic-blue-700" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Prochaine tenue</p>
                  <p className="text-lg font-semibold text-masonic-blue-900">{stats?.nextTenue}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-masonic-blue-700" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Frères</p>
                  <p className="text-lg font-semibold text-masonic-blue-900">{stats?.membersCount} membres</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-masonic-blue-700" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Planches</p>
                  <p className="text-lg font-semibold text-masonic-blue-900">{stats?.planchesCount} documents</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                  <Bell className="h-6 w-6 text-masonic-blue-700" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Messages</p>
                  <p className="text-lg font-semibold text-masonic-blue-900">{stats?.unreadMessages} non lus</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-6"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full bg-white shadow-sm rounded-lg">
                <TabsTrigger 
                  value="agenda" 
                  className="flex-1 data-[state=active]:bg-masonic-blue-700 data-[state=active]:text-white"
                >
                  Agenda
                </TabsTrigger>
                <TabsTrigger 
                  value="freres" 
                  className="flex-1 data-[state=active]:bg-masonic-blue-700 data-[state=active]:text-white"
                >
                  Frères
                </TabsTrigger>
                <TabsTrigger 
                  value="actualites" 
                  className="flex-1 data-[state=active]:bg-masonic-blue-700 data-[state=active]:text-white"
                >
                  Actualités
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          
          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-8"
          >
            {activeTab === 'agenda' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-masonic-blue-900">Prochaines tenues</h2>
                  <a href="/agenda" className="text-sm text-masonic-blue-700 font-medium hover:text-masonic-blue-600">
                    Voir tout →
                  </a>
                </div>
                {tenuesLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="h-48 animate-pulse">
                        <div className="h-12 bg-gray-200 rounded-t-xl"></div>
                        <div className="p-4 space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tenues.map((tenue) => (
                      <TenueCard key={tenue.id} tenue={tenue} />
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'freres' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-masonic-blue-900">Officiers de loge</h2>
                  <a href="/freres" className="text-sm text-masonic-blue-700 font-medium hover:text-masonic-blue-600">
                    Voir tout →
                  </a>
                </div>
                {membersLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="h-64 animate-pulse">
                        <div className="h-40 bg-gray-200 rounded-t-xl"></div>
                        <div className="p-4 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {members.map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'actualites' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-masonic-blue-900">Dernières actualités</h2>
                  <a href="/actualites" className="text-sm text-masonic-blue-700 font-medium hover:text-masonic-blue-600">
                    Voir tout →
                  </a>
                </div>
                {newsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <Card key={i} className="h-80 animate-pulse">
                        <div className="h-40 bg-gray-200 rounded-t-xl"></div>
                        <div className="p-4 space-y-4">
                          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-20 bg-gray-200 rounded w-full"></div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.map((item) => (
                      <NewsCard key={item.id} news={item} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-masonic-blue-900 mb-4">Actions rapides</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-masonic-blue-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Créer une tenue</span>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-masonic-blue-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Rédiger une planche</span>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                    <Bell className="h-6 w-6 text-masonic-blue-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Nouveau message</span>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                    <BookOpen className="h-6 w-6 text-masonic-blue-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Bibliothèque</span>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
