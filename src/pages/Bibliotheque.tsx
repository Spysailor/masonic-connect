
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, FileText, MessageCircle, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Resource type definition
type Resource = {
  id: string;
  title: string;
  description: string;
  author: string;
  authorRole: string;
  date: Date;
  type: 'book' | 'document' | 'article';
  category: string;
  imageUrl?: string;
  downloadUrl?: string;
  linkUrl?: string;
};

const Bibliotheque = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data for library resources
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Les Symboles Maçonniques',
      description: 'Une exploration détaillée des symboles fondamentaux de la Franc-Maçonnerie et leur signification ésotérique à travers les âges.',
      author: 'Jean Dupont',
      authorRole: 'Vénérable Maître',
      date: new Date('2023-01-15'),
      type: 'book',
      category: 'Symbolisme',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Histoire de la Franc-Maçonnerie au XVIIIe siècle',
      description: 'Une étude complète sur l\'évolution de la Franc-Maçonnerie pendant le siècle des Lumières et son influence sur la société européenne.',
      author: 'Michel Lebrun',
      authorRole: 'Historien',
      date: new Date('2022-11-20'),
      type: 'book',
      category: 'Histoire',
      imageUrl: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Le Rite Écossais Ancien et Accepté',
      description: 'Une analyse approfondie du REAA, son histoire, ses degrés et sa place dans le paysage maçonnique mondial.',
      author: 'Pierre Martin',
      authorRole: 'Grand Maître',
      date: new Date('2022-08-05'),
      type: 'document',
      category: 'Rituel',
      imageUrl: 'https://images.unsplash.com/photo-1516383607781-913a19294fd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      linkUrl: '/planches/3'
    },
    {
      id: '4',
      title: 'L\'Art Royal et la Géométrie Sacrée',
      description: 'Exploration du lien entre les principes mathématiques, la géométrie sacrée et leur application dans l\'Art Royal maçonnique.',
      author: 'Sophie Dubois',
      authorRole: 'Architecte',
      date: new Date('2023-03-12'),
      type: 'article',
      category: 'Philosophie',
      linkUrl: '/planches/4'
    },
    {
      id: '5',
      title: 'Les Landmarks de la Franc-Maçonnerie',
      description: 'Une étude comparative des différentes interprétations des Landmarks à travers les obédiences et les époques.',
      author: 'Robert Leroy',
      authorRole: 'Juriste',
      date: new Date('2022-10-30'),
      type: 'document',
      category: 'Tradition',
      linkUrl: '/planches/5'
    },
    {
      id: '6',
      title: 'Communication entre Frères',
      description: 'Guide pratique sur la fraternité et la communication efficace au sein de la loge.',
      author: 'Antoine Mercier',
      authorRole: 'Orateur',
      date: new Date('2023-02-28'),
      type: 'article',
      category: 'Communication',
      linkUrl: '/messages'
    }
  ];

  // Get unique categories and types for filters
  const categories = [...new Set(resources.map(resource => resource.category))];
  const types = [...new Set(resources.map(resource => resource.type))];
  
  // Filter resources based on search term, type, and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? resource.type === selectedType : true;
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  // Helper function to render appropriate icon based on resource type
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'article':
        return <MessageCircle className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
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
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-masonic-blue-900">Bibliothèque</h1>
            <p className="text-gray-600 mt-1">Explorez notre collection de ressources maçonniques</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Rechercher dans la bibliothèque..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filtres
                    <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
                
                {showFilters && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Type de ressource</label>
                      <Select onValueChange={(value) => setSelectedType(value === 'all' ? null : value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les types</SelectItem>
                          {types.map(type => (
                            <SelectItem key={type} value={type}>
                              {type === 'book' && 'Livre'}
                              {type === 'document' && 'Document'}
                              {type === 'article' && 'Article'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Catégorie</label>
                      <Select onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes les catégories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les catégories</SelectItem>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
              
              <Tabs defaultValue="grid" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm text-gray-500">
                    {filteredResources.length} ressource{filteredResources.length !== 1 ? 's' : ''} trouvée{filteredResources.length !== 1 ? 's' : ''}
                  </div>
                  <TabsList>
                    <TabsTrigger value="grid" className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      Grille
                    </TabsTrigger>
                    <TabsTrigger value="list" className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Liste
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="grid" className="mt-0">
                  {filteredResources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredResources.map((resource) => (
                        <div 
                          key={resource.id} 
                          className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col transition-shadow hover:shadow-md"
                        >
                          {resource.imageUrl && (
                            <div className="aspect-w-16 aspect-h-9">
                              <img 
                                src={resource.imageUrl} 
                                alt={resource.title} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          
                          <div className="p-5 flex-grow flex flex-col">
                            <div className="flex items-center mb-2">
                              <span className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mr-2",
                                resource.type === 'book' && "bg-blue-100 text-blue-800",
                                resource.type === 'document' && "bg-green-100 text-green-800",
                                resource.type === 'article' && "bg-purple-100 text-purple-800"
                              )}>
                                <span className="mr-1">{renderTypeIcon(resource.type)}</span>
                                {resource.type === 'book' && 'Livre'}
                                {resource.type === 'document' && 'Document'}
                                {resource.type === 'article' && 'Article'}
                              </span>
                              
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                                {resource.category}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-masonic-blue-900 mb-2">{resource.title}</h3>
                            
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{resource.description}</p>
                            
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center">
                                <div className="w-7 h-7 rounded-full overflow-hidden mr-2">
                                  <img 
                                    src={`https://randomuser.me/api/portraits/men/${parseInt(resource.id) + 25}.jpg`}
                                    alt={resource.author} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="text-xs text-gray-700">{resource.author}</span>
                              </div>
                              
                              {resource.downloadUrl && (
                                <a 
                                  href={resource.downloadUrl}
                                  className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 transition-colors"
                                >
                                  Télécharger
                                </a>
                              )}
                              
                              {resource.linkUrl && (
                                <Link
                                  to={resource.linkUrl}
                                  className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 transition-colors"
                                >
                                  Consulter →
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">Aucune ressource ne correspond à votre recherche.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="list" className="mt-0">
                  {filteredResources.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {filteredResources.map((resource) => (
                        <div key={resource.id} className="py-4 flex">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white">
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                resource.type === 'book' && "bg-blue-600",
                                resource.type === 'document' && "bg-green-600",
                                resource.type === 'article' && "bg-purple-600",
                              )}>
                                {renderTypeIcon(resource.type)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex items-center mb-1">
                              <h3 className="text-md font-semibold text-masonic-blue-900">
                                {resource.title}
                              </h3>
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 ml-2">
                                {resource.category}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{resource.description}</p>
                            
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{resource.author}</span>
                              <span className="mx-2">•</span>
                              <span>{resource.date.toLocaleDateString('fr-FR')}</span>
                              
                              <div className="ml-auto">
                                {resource.downloadUrl && (
                                  <a 
                                    href={resource.downloadUrl}
                                    className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 transition-colors"
                                  >
                                    Télécharger
                                  </a>
                                )}
                                
                                {resource.linkUrl && (
                                  <Link
                                    to={resource.linkUrl}
                                    className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 transition-colors"
                                  >
                                    Consulter →
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">Aucune ressource ne correspond à votre recherche.</p>
                    </div>
                  )}
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

export default Bibliotheque;
