
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

const Planches = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDegree, setSelectedDegree] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const dateLocale = i18n.language === 'fr' ? fr : enUS;
  
  // Mock data for demonstration
  const planches = [
    {
      id: '1',
      title: 'Symbolisme du pavé mosaïque',
      content: 'Étude approfondie du symbolisme du pavé mosaïque dans les loges maçonniques...',
      degree: 1,
      author: 'Jean Dupont',
      authorName: 'Jean Dupont',
      lodge: 'Les Trois Vertus',
      tags: ['Symbolisme', 'Temple', 'Art Royal'],
      fileURL: '#',
      createdAt: new Date('2023-03-15'),
    },
    {
      id: '2',
      title: 'Les voyages initiatiques',
      content: 'Analyse des voyages initiatiques et leur signification dans le rite écossais ancien et accepté...',
      degree: 1,
      author: 'Paul Martin',
      authorName: 'Paul Martin',
      lodge: 'Les Trois Vertus',
      tags: ['Initiation', 'Rituel', 'Tradition'],
      fileURL: '#',
      createdAt: new Date('2023-02-20'),
    },
    {
      id: '3',
      title: 'L\'étoile flamboyante',
      content: 'Étude de l\'étoile flamboyante, son origine et sa signification dans la franc-maçonnerie...',
      degree: 2,
      author: 'Philippe Moreau',
      authorName: 'Philippe Moreau',
      lodge: 'La Sagesse',
      tags: ['Symbolisme', 'Géométrie', 'Lumière'],
      fileURL: '#',
      createdAt: new Date('2023-01-10'),
    },
    {
      id: '4',
      title: 'La légende d\'Hiram',
      content: 'Analyse approfondie de la légende d\'Hiram et son importance dans le grade de Maître...',
      degree: 3,
      author: 'Michel Bernard',
      authorName: 'Michel Bernard',
      lodge: 'Les Trois Vertus',
      tags: ['Légende', 'Rituel', 'Tradition'],
      fileURL: '#',
      createdAt: new Date('2022-12-05'),
    },
    {
      id: '5',
      title: 'Les outils du Compagnon',
      content: 'Étude des outils symboliques du Compagnon et leur utilisation dans le travail maçonnique...',
      degree: 2,
      author: 'Pierre Lambert',
      authorName: 'Pierre Lambert',
      lodge: 'La Sagesse',
      tags: ['Symbolisme', 'Outils', 'Art Royal'],
      fileURL: '#',
      createdAt: new Date('2022-11-15'),
    },
  ];

  // Filter by search query, degree, and tag
  const filteredPlanches = planches.filter(planche => {
    const matchesSearch = searchQuery === '' || 
      planche.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planche.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planche.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDegree = selectedDegree === null || planche.degree === selectedDegree;
    
    const matchesTag = selectedTag === null || planche.tags.includes(selectedTag);
    
    return matchesSearch && matchesDegree && matchesTag;
  });

  // Extract all unique tags from planches
  const allTags = Array.from(new Set(planches.flatMap(planche => planche.tags)));

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
            <h1 className="text-3xl font-bold text-masonic-blue-900">{t('planches.title')}</h1>
            <p className="text-gray-600 mt-1">{t('planches.subtitle')}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="relative w-full md:w-1/2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder={t('planches.search.placeholder')}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Link to="/planches/create">
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    {t('planches.createPlanche')}
                  </Button>
                </Link>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Filter className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{t('planches.filters.degree')}:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDegree(null)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedDegree === null 
                        ? 'bg-masonic-blue-700 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('planches.filters.all')}
                  </button>
                  <button
                    onClick={() => setSelectedDegree(1)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedDegree === 1 
                        ? 'bg-masonic-blue-700 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('planches.filters.firstDegree')}
                  </button>
                  <button
                    onClick={() => setSelectedDegree(2)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedDegree === 2 
                        ? 'bg-masonic-blue-700 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('planches.filters.secondDegree')}
                  </button>
                  <button
                    onClick={() => setSelectedDegree(3)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedDegree === 3 
                        ? 'bg-masonic-blue-700 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('planches.filters.thirdDegree')}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Filter className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{t('planches.filters.theme')}:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedTag === null 
                        ? 'bg-masonic-blue-700 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('planches.filters.all')}
                  </button>
                  
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedTag === tag 
                          ? 'bg-masonic-blue-700 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredPlanches.length > 0 ? (
                  filteredPlanches.map((planche) => (
                    <Link 
                      key={planche.id} 
                      to={`/planches/${planche.id}`}
                      className="block bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow p-4"
                    >
                      <div className="flex items-start">
                        <div className="p-2 bg-masonic-blue-100 rounded-lg mr-4">
                          <FileText className="h-6 w-6 text-masonic-blue-700" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              planche.degree === 1 ? 'bg-blue-500' : 
                              planche.degree === 2 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></span>
                            <span className="text-xs text-gray-500">
                              {planche.degree === 1 ? '1er degré' : 
                               planche.degree === 2 ? '2ème degré' : '3ème degré'}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-masonic-blue-900">{planche.title}</h3>
                          <p className="text-gray-500 mt-1 line-clamp-2">{planche.content}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            {planche.tags.map((tag, index) => (
                              <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-right ml-4">
                          <p className="text-sm font-medium text-gray-700">{planche.authorName}</p>
                          <p className="text-xs text-gray-500 mt-1">{format(planche.createdAt, 'd MMM yyyy', { locale: fr })}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-700">{t('planches.search.noResults')}</h3>
                    <p className="text-gray-500 mt-1">{t('planches.search.noResultsMessage')}</p>
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

export default Planches;
