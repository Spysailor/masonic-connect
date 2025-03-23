
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Actualites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data for demonstration
  const actualites = [
    {
      id: '1',
      title: 'Élection du nouveau Vénérable',
      content: 'Les élections pour le nouveau collège d\'officiers se tiendront lors de la prochaine tenue. Tous les frères sont invités à y participer activement.',
      date: new Date('2023-05-01'),
      author: 'Jean Dupont',
      authorRole: 'Vénérable Maître',
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Loge',
    },
    {
      id: '2',
      title: 'Rencontre inter-obédientielle',
      content: 'Une rencontre entre plusieurs obédiences aura lieu le mois prochain. Inscrivez-vous dès que possible pour y participer et échanger avec vos frères d\'autres obédiences.',
      date: new Date('2023-04-28'),
      author: 'Paul Martin',
      authorRole: 'Premier Surveillant',
      imageUrl: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
      category: 'Événement',
    },
    {
      id: '3',
      title: 'Nouvel ouvrage sur le symbolisme maçonnique',
      content: 'Un nouvel ouvrage traitant du symbolisme maçonnique vient d\'être publié par notre frère Michel Durand. Découvrez son analyse approfondie des symboles essentiels de notre tradition.',
      date: new Date('2023-04-15'),
      author: 'Michel Durand',
      authorRole: 'Orateur',
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Publication',
    },
    {
      id: '4',
      title: 'Conférence sur l\'histoire de la Franc-Maçonnerie',
      content: 'La Grande Loge organise une conférence publique sur l\'histoire de la Franc-Maçonnerie au 18ème siècle. L\'événement est ouvert au public et se tiendra dans l\'amphithéâtre de l\'université.',
      date: new Date('2023-04-10'),
      author: 'André Lefevre',
      authorRole: 'Secrétaire',
      imageUrl: 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Conférence',
    },
  ];

  // Filter posts based on search term and category
  const filteredActualites = actualites.filter(actualite => {
    const matchesSearch = actualite.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         actualite.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? actualite.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories
  const categories = [...new Set(actualites.map(actualite => actualite.category))];

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
            <h1 className="text-3xl font-bold text-masonic-blue-900">Actualités</h1>
            <p className="text-gray-600 mt-1">Restez informé des dernières nouvelles et événements</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Rechercher une actualité..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2 flex-wrap">
                  <Tag className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm font-medium text-gray-700 mr-2">Filtrer:</span>
                  
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedCategory === null 
                        ? 'bg-masonic-blue-700 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tous
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedCategory === category 
                          ? 'bg-masonic-blue-700 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                {filteredActualites.length > 0 ? (
                  filteredActualites.map((actualite) => (
                    <article key={actualite.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                            <img 
                              src={actualite.imageUrl} 
                              alt={actualite.title} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        
                        <div className="md:col-span-2">
                          <div className="flex items-center mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-masonic-blue-100 text-masonic-blue-800">
                              {actualite.category}
                            </span>
                            <span className="text-gray-500 text-sm ml-2 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {format(actualite.date, 'dd MMMM yyyy', { locale: fr })}
                            </span>
                          </div>
                          
                          <h2 className="text-xl font-bold text-masonic-blue-900 mb-2">
                            <Link to={`/actualites/${actualite.id}`} className="hover:text-masonic-blue-700">
                              {actualite.title}
                            </Link>
                          </h2>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">{actualite.content}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                <img 
                                  src={`https://randomuser.me/api/portraits/men/${parseInt(actualite.id) + 30}.jpg`}
                                  alt={actualite.author} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-900">{actualite.author}</span>
                                <span className="text-xs text-gray-500 block">{actualite.authorRole}</span>
                              </div>
                            </div>
                            
                            <Link
                              to={`/actualites/${actualite.id}`}
                              className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800"
                            >
                              Lire la suite →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucune actualité ne correspond à votre recherche.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Actualites;
