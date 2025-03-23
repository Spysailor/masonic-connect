
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Agenda = () => {
  const [filterDegree, setFilterDegree] = useState<number | null>(null);

  // Mock data for demonstration
  const tenues = [
    {
      id: '1',
      title: 'Tenue au 1er degré',
      date: new Date('2023-05-15T19:00:00'),
      endTime: '22:00',
      location: 'Temple Les Trois Vertus',
      address: '15 rue de la Paix, 75001 Paris',
      lodge: 'Les Trois Vertus',
      degree: 1,
      theme: 'Travaux symboliques',
      description: 'Tenue régulière avec lecture de planches et travaux rituels.',
      status: 'confirmed' as const,
    },
    {
      id: '2',
      title: 'Tenue au 3ème degré - Élévation',
      date: new Date('2023-05-22T19:00:00'),
      endTime: '22:30',
      location: 'Temple La Sagesse',
      address: '8 avenue des Champs-Élysées, 75008 Paris',
      lodge: 'La Sagesse',
      degree: 3,
      theme: 'Élévation au grade de Maître',
      description: 'Cérémonie d\'élévation au grade de Maître.',
      status: 'pending' as const,
    },
    {
      id: '3',
      title: 'Tenue au 2ème degré - Passage',
      date: new Date('2023-05-29T19:00:00'),
      endTime: '22:00',
      location: 'Temple Les Trois Vertus',
      address: '15 rue de la Paix, 75001 Paris',
      lodge: 'Les Trois Vertus',
      degree: 2,
      theme: 'Passage au grade de Compagnon',
      description: 'Cérémonie de passage au grade de Compagnon.',
      status: 'pending' as const,
    },
    {
      id: '4',
      title: 'Tenue Blanche Ouverte',
      date: new Date('2023-06-05T19:00:00'),
      endTime: '22:00',
      location: 'Temple Les Trois Vertus',
      address: '15 rue de la Paix, 75001 Paris',
      lodge: 'Les Trois Vertus',
      degree: 1,
      theme: 'L\'histoire de la Franc-Maçonnerie',
      description: 'Tenue ouverte au public avec conférence sur l\'histoire de la Franc-Maçonnerie.',
      status: 'pending' as const,
    },
  ];

  // Filter tenues by degree if a filter is applied
  const filteredTenues = filterDegree 
    ? tenues.filter(tenue => tenue.degree === filterDegree) 
    : tenues;

  // Group tenues by month
  const groupedTenues = filteredTenues.reduce((groups, tenue) => {
    const month = format(tenue.date, 'MMMM yyyy', { locale: fr });
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(tenue);
    return groups;
  }, {} as Record<string, typeof tenues>);

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
            <h1 className="text-3xl font-bold text-masonic-blue-900">Agenda des Tenues</h1>
            <p className="text-gray-600 mt-1">Consultez et gérez vos tenues maçonniques</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Filter className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Filtrer par degré:</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setFilterDegree(null)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        filterDegree === null 
                          ? 'bg-masonic-blue-700 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Tous
                    </button>
                    <button
                      onClick={() => setFilterDegree(1)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        filterDegree === 1 
                          ? 'bg-masonic-blue-700 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      1° degré
                    </button>
                    <button
                      onClick={() => setFilterDegree(2)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        filterDegree === 2 
                          ? 'bg-masonic-blue-700 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      2° degré
                    </button>
                    <button
                      onClick={() => setFilterDegree(3)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        filterDegree === 3 
                          ? 'bg-masonic-blue-700 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      3° degré
                    </button>
                  </div>
                </div>
                
                <Link 
                  to="/agenda/create" 
                  className="inline-flex items-center justify-center rounded-md bg-masonic-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-masonic-blue-800 transition-colors w-full md:w-auto"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Créer une tenue
                </Link>
              </div>
              
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="mb-6 w-full">
                  <TabsTrigger value="list" className="flex-1">Liste</TabsTrigger>
                  <TabsTrigger value="calendar" className="flex-1">Calendrier</TabsTrigger>
                </TabsList>
                
                <TabsContent value="list" className="mt-0">
                  {Object.entries(groupedTenues).map(([month, monthTenues]) => (
                    <div key={month} className="mb-8">
                      <h3 className="text-lg font-semibold text-masonic-blue-800 mb-4 capitalize">{month}</h3>
                      <div className="space-y-4">
                        {monthTenues.map((tenue) => (
                          <Link 
                            key={tenue.id} 
                            to={`/agenda/${tenue.id}`}
                            className="block bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="p-4 md:w-1/4 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-gray-200">
                                <div className="text-gray-500 text-sm">{format(tenue.date, 'EEEE', { locale: fr })}</div>
                                <div className="text-xl font-bold text-masonic-blue-900">{format(tenue.date, 'd MMMM', { locale: fr })}</div>
                                <div className="text-gray-700">{format(tenue.date, 'HH:mm', { locale: fr })} - {tenue.endTime}</div>
                              </div>
                              
                              <div className="p-4 md:w-2/4">
                                <div className="flex items-center mb-2">
                                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                    tenue.degree === 1 ? 'bg-blue-500' : 
                                    tenue.degree === 2 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}></span>
                                  <span className="text-sm text-gray-500">
                                    {tenue.degree === 1 ? '1er degré' : 
                                     tenue.degree === 2 ? '2ème degré' : '3ème degré'}
                                  </span>
                                </div>
                                <h3 className="text-lg font-semibold text-masonic-blue-900">{tenue.title}</h3>
                                <p className="text-gray-500 mt-1 line-clamp-2">{tenue.description}</p>
                              </div>
                              
                              <div className="p-4 md:w-1/4 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200">
                                <div className="text-sm font-medium text-gray-700">{tenue.location}</div>
                                <div className="text-sm text-gray-500 mt-1">{tenue.lodge}</div>
                                <div className="mt-3">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    tenue.status === 'confirmed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {tenue.status === 'confirmed' ? 'Confirmée' : 'En attente'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="calendar" className="mt-0">
                  <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-gray-700">Vue calendrier</h3>
                    <p className="text-gray-500">Cette vue sera disponible prochainement.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agenda;
