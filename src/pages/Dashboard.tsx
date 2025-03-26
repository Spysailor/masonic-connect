
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCards from '@/components/dashboard/StatCards';
import TabNavigation from '@/components/dashboard/TabNavigation';
import TabContent from '@/components/dashboard/TabContent';
import QuickActions from '@/components/dashboard/QuickActions';

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
};

type QueryResult = {
  id: string;
  display_name: string | null;
  photo_url: string | null;
  lodge_memberships: any;
  lodges: any;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('agenda');
  
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
        
        return (data as QueryResult[]).map(profile => ({
          id: profile.id,
          name: profile.display_name || 'Membre',
          role: Array.isArray(profile.lodge_memberships) && profile.lodge_memberships.length > 0 && profile.lodge_memberships[0]?.office ? 
                profile.lodge_memberships[0].office : 'Membre',
          lodge: Array.isArray(profile.lodges) && profile.lodges.length > 0 && profile.lodges[0]?.name ? 
                 profile.lodges[0].name : 'Loge',
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
          
          <StatCards stats={stats} statsLoading={statsLoading} />
          
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <TabContent 
            activeTab={activeTab} 
            tenues={tenues} 
            members={members} 
            news={news} 
            tenuesLoading={tenuesLoading}
            membersLoading={membersLoading}
            newsLoading={newsLoading}
          />
          
          <QuickActions />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
