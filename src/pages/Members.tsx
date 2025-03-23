
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MemberCard from '@/components/dashboard/MemberCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Members = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for demonstration
  const members = [
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
    },
    {
      id: '5',
      name: 'Michel Bernard',
      role: 'Secrétaire',
      lodge: 'Les Trois Vertus',
      avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    {
      id: '6',
      name: 'Jacques Renaud',
      role: 'Trésorier',
      lodge: 'Les Trois Vertus',
      avatarUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
    },
    {
      id: '7',
      name: 'André Petit',
      role: 'Expert',
      lodge: 'Les Trois Vertus',
      avatarUrl: 'https://randomuser.me/api/portraits/men/48.jpg',
    },
    {
      id: '8',
      name: 'Robert Leroy',
      role: 'Maître des Cérémonies',
      lodge: 'Les Trois Vertus',
      avatarUrl: 'https://randomuser.me/api/portraits/men/53.jpg',
    },
  ];

  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.lodge.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-masonic-blue-900">Annuaire des Frères</h1>
            <p className="text-gray-600 mt-1">Consultez les profils des membres de votre loge</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher un frère par nom, fonction ou loge..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 w-full">
                <TabsTrigger value="all" className="flex-1">Tous</TabsTrigger>
                <TabsTrigger value="officers" className="flex-1">Officiers</TabsTrigger>
                <TabsTrigger value="masters" className="flex-1">Maîtres</TabsTrigger>
                <TabsTrigger value="companions" className="flex-1">Compagnons</TabsTrigger>
                <TabsTrigger value="apprentices" className="flex-1">Apprentis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
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
                    .filter(m => m.id === '5' || m.id === '6')
                    .map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="companions" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMembers
                    .filter(m => m.id === '7')
                    .map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="apprentices" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMembers
                    .filter(m => m.id === '8')
                    .map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Members;
