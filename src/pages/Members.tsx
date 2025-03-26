
import React, { useState } from 'react';
import { motion } from '@/utils/motion';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MemberCard from '@/components/dashboard/MemberCard';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import LodgeInfo from '@/components/masonic/LodgeInfo';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

const Members = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const { profile } = useAuth();
  
  // Get the user's lodge_id from their profile
  const lodgeId = profile?.lodge_memberships?.[0]?.lodge_id;
  
  // Fetch members data from Supabase
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['lodge-members'],
    queryFn: async () => {
      if (!lodgeId) {
        console.error('No lodge ID found for the user');
        return [];
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id,
            display_name,
            photo_url,
            profession,
            lodge_memberships!inner(
              id,
              lodge_id,
              role,
              office,
              degree,
              is_active
            )
          `)
          .eq('lodge_memberships.lodge_id', lodgeId)
          .eq('lodge_memberships.is_active', true);
        
        if (error) {
          console.error('Error fetching members:', error);
          throw error;
        }
        
        return data.map(profile => ({
          id: profile.id,
          name: profile.display_name || 'Membre',
          role: profile.lodge_memberships[0]?.office || 'Membre',
          lodge: 'Universalys', // Hardcoded for now, should come from the lodge table
          profession: profile.profession || '',
          avatarUrl: profile.photo_url || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 70)}.jpg`,
          degree: profile.lodge_memberships[0]?.degree || 1
        }));
      } catch (error) {
        console.error('Error in query execution:', error);
        return [];
      }
    },
    enabled: !!lodgeId,
    // Fallback to mock data if the query fails
    placeholderData: [
      {
        id: '1',
        name: 'Jean Dupont',
        role: 'Vénérable Maître',
        lodge: 'Universalys',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        degree: 3
      },
      {
        id: '2',
        name: 'Paul Emmanuel',
        role: 'Vénérable Maître',
        lodge: 'Universalys',
        avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
        degree: 3
      },
      {
        id: '3',
        name: 'Philippe Moreau',
        role: 'Deuxième Surveillant',
        lodge: 'Universalys',
        avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
        degree: 3
      },
      {
        id: '4',
        name: 'Pierre Lambert',
        role: 'Orateur',
        lodge: 'Universalys',
        avatarUrl: 'https://randomuser.me/api/portraits/men/64.jpg',
        degree: 3
      },
      {
        id: '5',
        name: 'Michel Bernard',
        role: 'Secrétaire',
        lodge: 'Universalys',
        avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
        degree: 3
      },
      {
        id: '6',
        name: 'Jacques Renaud',
        role: 'Trésorier',
        lodge: 'Universalys',
        avatarUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
        degree: 3
      },
      {
        id: '7',
        name: 'André Petit',
        role: 'Expert',
        lodge: 'Universalys',
        avatarUrl: 'https://randomuser.me/api/portraits/men/48.jpg',
        degree: 2
      },
      {
        id: '8',
        name: 'Robert Leroy',
        role: 'Maître des Cérémonies',
        lodge: 'Universalys',
        avatarUrl: 'https://randomuser.me/api/portraits/men/53.jpg',
        degree: 1
      },
    ]
  });

  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.lodge.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.profession && member.profession.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Loading skeletons for members
  const MembersSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="ml-3 flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 mobile-padding-bottom">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-masonic-blue-900 break-words">{t('members.title')}</h1>
                <p className="text-gray-600 mt-1 break-words">{t('members.subtitle')}</p>
              </div>
              <div className="hidden md:block">
                <MasonicSymbol type="square-compass" size={64} hideImage={true} />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <LodgeInfo className="mb-6" />
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={t('members.search')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap whitespace-nowrap">
                <TabsTrigger value="all" className="flex-1">{t('members.filters.all')}</TabsTrigger>
                <TabsTrigger value="officers" className="flex-1">{t('members.filters.officers')}</TabsTrigger>
                <TabsTrigger value="masters" className="flex-1">{t('members.filters.masters')}</TabsTrigger>
                <TabsTrigger value="companions" className="flex-1">{t('members.filters.companions')}</TabsTrigger>
                <TabsTrigger value="apprentices" className="flex-1">{t('members.filters.apprentices')}</TabsTrigger>
              </TabsList>
              
              {isLoading ? (
                <MembersSkeleton />
              ) : (
                <>
                  <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                          <MemberCard key={member.id} member={member} />
                        ))
                      ) : (
                        <div className="col-span-full text-center py-8">
                          <p className="text-gray-500">{t('members.noResults')}</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="officers" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredMembers
                        .filter(m => ['Vénérable Maître', 'Premier Surveillant', 'Deuxième Surveillant', 'Orateur', 'Secrétaire', 'Trésorier'].includes(m.role))
                        .map((member) => (
                          <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="masters" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredMembers
                        .filter(m => m.degree === 3)
                        .map((member) => (
                          <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="companions" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredMembers
                        .filter(m => m.degree === 2)
                        .map((member) => (
                          <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="apprentices" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredMembers
                        .filter(m => m.degree === 1)
                        .map((member) => (
                          <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Members;
