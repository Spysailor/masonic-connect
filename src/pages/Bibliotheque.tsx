
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, FileText, MessageCircle, Filter, ChevronDown, Plus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Resource type definition
type Resource = {
  id: string;
  title: string;
  description: string;
  author: string;
  authorRole?: string;
  authorName?: string;
  lodge?: string;
  date?: Date;
  createdAt?: Date;
  degree?: number;
  type: 'book' | 'document' | 'article' | 'planche';
  category: string;
  tags?: string[];
  imageUrl?: string;
  downloadUrl?: string;
  linkUrl?: string;
  fileURL?: string;
  content?: string;
};

const Bibliotheque = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [categoryView, setCategoryView] = useState<'planches' | 'resources'>('planches');
  
  // Parse the URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    if (typeParam) {
      setSelectedType(typeParam);
      if (typeParam === 'planche') {
        setCategoryView('planches');
      } else {
        setCategoryView('resources');
      }
    }
  }, [location.search]);

  // Mock data for library resources
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Les Symboles Maçonniques',
      description: 'Une exploration détaillée des symboles fondamentaux de la Franc-Maçonnerie et leur signification ésotérique à travers les âges.',
      author: 'Jean Dupont',
      authorName: 'Jean Dupont',
      authorRole: 'Vénérable Maître',
      date: new Date('2023-01-15'),
      createdAt: new Date('2023-01-15'),
      type: 'book',
      category: 'Symbolisme',
      tags: ['Symbolisme', 'Tradition', 'Rituel'],
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Histoire de la Franc-Maçonnerie au XVIIIe siècle',
      description: 'Une étude complète sur l\'évolution de la Franc-Maçonnerie pendant le siècle des Lumières et son influence sur la société européenne.',
      author: 'Michel Lebrun',
      authorName: 'Michel Lebrun',
      authorRole: 'Historien',
      date: new Date('2022-11-20'),
      createdAt: new Date('2022-11-20'),
      type: 'book',
      category: 'Histoire',
      tags: ['Histoire', 'Lumières', 'Europe'],
      imageUrl: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Le Rite Écossais Ancien et Accepté',
      description: 'Une analyse approfondie du REAA, son histoire, ses degrés et sa place dans le paysage maçonnique mondial.',
      author: 'Pierre Martin',
      authorName: 'Pierre Martin',
      authorRole: 'Grand Maître',
      date: new Date('2022-08-05'),
      createdAt: new Date('2022-08-05'),
      type: 'document',
      category: 'Rituel',
      tags: ['REAA', 'Rituel', 'Degrés'],
      imageUrl: 'https://images.unsplash.com/photo-1516383607781-913a19294fd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      linkUrl: '/bibliotheque/3'
    },
    {
      id: '4',
      title: 'L\'Art Royal et la Géométrie Sacrée',
      description: 'Exploration du lien entre les principes mathématiques, la géométrie sacrée et leur application dans l\'Art Royal maçonnique.',
      author: 'Sophie Dubois',
      authorName: 'Sophie Dubois',
      authorRole: 'Architecte',
      date: new Date('2023-03-12'),
      createdAt: new Date('2023-03-12'),
      type: 'article',
      category: 'Philosophie',
      tags: ['Géométrie', 'Art Royal', 'Philosophie'],
      linkUrl: '/bibliotheque/4'
    },
    {
      id: '5',
      title: 'Les Landmarks de la Franc-Maçonnerie',
      description: 'Une étude comparative des différentes interprétations des Landmarks à travers les obédiences et les époques.',
      author: 'Robert Leroy',
      authorName: 'Robert Leroy',
      authorRole: 'Juriste',
      date: new Date('2022-10-30'),
      createdAt: new Date('2022-10-30'),
      type: 'document',
      category: 'Tradition',
      tags: ['Landmarks', 'Tradition', 'Obédiences'],
      linkUrl: '/bibliotheque/5'
    },
    {
      id: '6',
      title: 'Communication entre Frères',
      description: 'Guide pratique sur la fraternité et la communication efficace au sein de la loge.',
      author: 'Antoine Mercier',
      authorName: 'Antoine Mercier',
      authorRole: 'Orateur',
      date: new Date('2023-02-28'),
      createdAt: new Date('2023-02-28'),
      type: 'article',
      category: 'Communication',
      tags: ['Communication', 'Fraternité', 'Loge'],
      linkUrl: '/messages'
    },
    // Planches
    {
      id: '7',
      title: 'Symbolisme du pavé mosaïque',
      content: 'Étude approfondie du symbolisme du pavé mosaïque dans les loges maçonniques...',
      description: 'Étude approfondie du symbolisme du pavé mosaïque dans les loges maçonniques...',
      degree: 1,
      author: 'Jean Dupont',
      authorName: 'Jean Dupont',
      lodge: 'Les Trois Vertus',
      tags: ['Symbolisme', 'Temple', 'Art Royal'],
      fileURL: '#',
      createdAt: new Date('2023-03-15'),
      type: 'planche',
      category: 'Symbolisme',
      linkUrl: '/planches/1'
    },
    {
      id: '8',
      title: 'Les voyages initiatiques',
      content: 'Analyse des voyages initiatiques et leur signification dans le rite écossais ancien et accepté...',
      description: 'Analyse des voyages initiatiques et leur signification dans le rite écossais ancien et accepté...',
      degree: 1,
      author: 'Paul Martin',
      authorName: 'Paul Martin',
      lodge: 'Les Trois Vertus',
      tags: ['Initiation', 'Rituel', 'Tradition'],
      fileURL: '#',
      createdAt: new Date('2023-02-20'),
      type: 'planche',
      category: 'Rituel',
      linkUrl: '/planches/2'
    },
    {
      id: '9',
      title: 'L\'étoile flamboyante',
      content: 'Étude de l\'étoile flamboyante, son origine et sa signification dans la franc-maçonnerie...',
      description: 'Étude de l\'étoile flamboyante, son origine et sa signification dans la franc-maçonnerie...',
      degree: 2,
      author: 'Philippe Moreau',
      authorName: 'Philippe Moreau',
      lodge: 'La Sagesse',
      tags: ['Symbolisme', 'Géométrie', 'Lumière'],
      fileURL: '#',
      createdAt: new Date('2023-01-10'),
      type: 'planche',
      category: 'Symbolisme',
      linkUrl: '/planches/3'
    },
    {
      id: '10',
      title: 'La légende d\'Hiram',
      content: 'Analyse approfondie de la légende d\'Hiram et son importance dans le grade de Maître...',
      description: 'Analyse approfondie de la légende d\'Hiram et son importance dans le grade de Maître...',
      degree: 3,
      author: 'Michel Bernard',
      authorName: 'Michel Bernard',
      lodge: 'Les Trois Vertus',
      tags: ['Légende', 'Rituel', 'Tradition'],
      fileURL: '#',
      createdAt: new Date('2022-12-05'),
      type: 'planche',
      category: 'Légende',
      linkUrl: '/planches/4'
    },
    {
      id: '11',
      title: 'Les outils du Compagnon',
      content: 'Étude des outils symboliques du Compagnon et leur utilisation dans le travail maçonnique...',
      description: 'Étude des outils symboliques du Compagnon et leur utilisation dans le travail maçonnique...',
      degree: 2,
      author: 'Pierre Lambert',
      authorName: 'Pierre Lambert',
      lodge: 'La Sagesse',
      tags: ['Symbolisme', 'Outils', 'Art Royal'],
      fileURL: '#',
      createdAt: new Date('2022-11-15'),
      type: 'planche',
      category: 'Symbolisme',
      linkUrl: '/planches/5'
    }
  ];

  // Get unique categories, types, and tags for filters
  const categories = [...new Set(resources.map(resource => resource.category))];
  const types = [...new Set(resources.map(resource => resource.type))];
  const allTags = Array.from(new Set(resources.flatMap(resource => resource.tags || [])));
  
  // Separate resources into planches and other resources
  const plancheResources = resources.filter(resource => resource.type === 'planche');
  const otherResources = resources.filter(resource => resource.type !== 'planche');
  
  // Filter resources based on search term, type, category, degree, and tag
  const filterResources = (resourcesList: Resource[]) => {
    return resourcesList.filter(resource => {
      const matchesSearch = searchTerm === '' || 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.authorName && resource.authorName.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesType = selectedType === null || resource.type === selectedType;
      const matchesCategory = selectedCategory === null || resource.category === selectedCategory;
      const matchesDegree = selectedDegree === null || resource.degree === selectedDegree;
      const matchesTag = selectedTag === null || (resource.tags && resource.tags.includes(selectedTag));
      
      return matchesSearch && matchesType && matchesCategory && matchesDegree && matchesTag;
    });
  };

  const filteredPlanches = filterResources(plancheResources);
  const filteredResources = filterResources(otherResources);

  // Function to get the correct path based on resource type
  const getResourcePath = (resource: Resource) => {
    if (resource.linkUrl) return resource.linkUrl;
    return resource.type === 'planche' 
      ? `/planches/${resource.id}` 
      : `/bibliotheque/${resource.id}`;
  };

  // Helper function to render appropriate icon based on resource type
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book className="h-5 w-5" />;
      case 'document':
      case 'planche':
        return <FileText className="h-5 w-5" />;
      case 'article':
        return <MessageCircle className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  // Helper function to get human-readable type name
  const getTypeName = (type: string) => {
    switch (type) {
      case 'book': return 'Livre';
      case 'document': return 'Document';
      case 'article': return 'Article';
      case 'planche': return 'Planche';
      default: return type;
    }
  };

  // Function to handle type filter changes
  const handleTypeChange = (value: string) => {
    const newType = value === 'all' ? null : value;
    setSelectedType(newType);
    
    // Update URL query parameters
    const params = new URLSearchParams(location.search);
    if (newType) {
      params.set('type', newType);
    } else {
      params.delete('type');
    }
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  // Function to render resource grid or list
  const renderResourceList = (resources: Resource[], viewType: string) => {
    if (resources.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">Aucune ressource ne correspond à votre recherche.</p>
        </div>
      );
    }

    if (viewType === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
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
                    resource.type === 'article' && "bg-purple-100 text-purple-800",
                    resource.type === 'planche' && "bg-amber-100 text-amber-800"
                  )}>
                    <span className="mr-1">{renderTypeIcon(resource.type)}</span>
                    {getTypeName(resource.type)}
                  </span>
                  
                  {resource.degree && (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 ${
                      resource.degree === 1 ? 'bg-blue-50 text-blue-700' : 
                      resource.degree === 2 ? 'bg-yellow-50 text-yellow-700' : 
                      'bg-red-50 text-red-700'
                    }`}>
                      {resource.degree}° degré
                    </span>
                  )}
                  
                  {!resource.degree && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                      {resource.category}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-masonic-blue-900 mb-2">{resource.title}</h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{resource.description}</p>
                
                {resource.tags && resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full overflow-hidden mr-2">
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${parseInt(resource.id) + 25}.jpg`}
                        alt={resource.author} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-700">{resource.authorName || resource.author}</span>
                  </div>
                  
                  {resource.downloadUrl && (
                    <a 
                      href={resource.downloadUrl}
                      className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 transition-colors"
                    >
                      Télécharger
                    </a>
                  )}
                  
                  <Link
                    to={getResourcePath(resource)}
                    className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 transition-colors"
                  >
                    Consulter →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="divide-y divide-gray-200">
          {resources.map((resource) => (
            <div key={resource.id} className="py-4 flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    resource.type === 'book' && "bg-blue-600",
                    resource.type === 'document' && "bg-green-600",
                    resource.type === 'article' && "bg-purple-600",
                    resource.type === 'planche' && "bg-amber-600"
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
                  
                  <div className="flex ml-2 gap-1">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      resource.type === 'book' && "bg-blue-100 text-blue-800",
                      resource.type === 'document' && "bg-green-100 text-green-800",
                      resource.type === 'article' && "bg-purple-100 text-purple-800",
                      resource.type === 'planche' && "bg-amber-100 text-amber-800"
                    )}>
                      {getTypeName(resource.type)}
                    </span>
                    
                    {resource.degree && (
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        resource.degree === 1 ? 'bg-blue-50 text-blue-700' : 
                        resource.degree === 2 ? 'bg-yellow-50 text-yellow-700' : 
                        'bg-red-50 text-red-700'
                      }`}>
                        {resource.degree}° degré
                      </span>
                    )}
                    
                    {!resource.degree && (
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                        {resource.category}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{resource.description}</p>
                
                {resource.tags && resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-1">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
                        +{resource.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center text-xs text-gray-500">
                  <span>{resource.authorName || resource.author}</span>
                  <span className="mx-2">•</span>
                  <span>{format(resource.date || resource.createdAt || new Date(), 'd MMM yyyy', { locale: fr })}</span>
                  
                  <div className="ml-auto">
                    {resource.downloadUrl && (
                      <a 
                        href={resource.downloadUrl}
                        className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 transition-colors mr-4"
                      >
                        Télécharger
                      </a>
                    )}
                    
                    <Link
                      to={getResourcePath(resource)}
                      className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 transition-colors"
                    >
                      Consulter →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
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
            {/* Category Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <Tabs 
                defaultValue="planches" 
                value={categoryView} 
                onValueChange={(value) => setCategoryView(value as 'planches' | 'resources')}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="planches" className="text-base py-3">
                    Nos Planches
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="text-base py-3">
                    Ressources Maçonniques
                  </TabsTrigger>
                </TabsList>
                
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
                    
                    <div className="flex gap-2">
                      {categoryView === 'planches' && (
                        <Link to="/planches/create">
                          <Button className="whitespace-nowrap">
                            <Plus className="mr-2 h-4 w-4" />
                            Rédiger une planche
                          </Button>
                        </Link>
                      )}
                      
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
                  </div>
                  
                  {showFilters && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                      {categoryView === 'resources' && (
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Type de ressource</label>
                          <Select onValueChange={handleTypeChange} value={selectedType || 'all'}>
                            <SelectTrigger>
                              <SelectValue placeholder="Tous les types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous les types</SelectItem>
                              {types.filter(type => type !== 'planche').map(type => (
                                <SelectItem key={type} value={type}>
                                  {getTypeName(type)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
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
                      
                      {categoryView === 'planches' && (
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Degré</label>
                          <Select onValueChange={(value) => setSelectedDegree(value === 'all' ? null : parseInt(value))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Tous les degrés" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous les degrés</SelectItem>
                              <SelectItem value="1">1° degré</SelectItem>
                              <SelectItem value="2">2° degré</SelectItem>
                              <SelectItem value="3">3° degré</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className={categoryView === 'planches' ? 'sm:col-span-2 md:col-span-3' : 'sm:col-span-2'}>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Thèmes</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              selectedTag === null 
                                ? 'bg-masonic-blue-700 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Tous
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
                    </div>
                  )}
                </div>
                
                <TabsContent value="planches" className="mt-0">
                  <Tabs defaultValue="grid" className="w-full">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-sm text-gray-500">
                        {filteredPlanches.length} planche{filteredPlanches.length !== 1 ? 's' : ''} trouvée{filteredPlanches.length !== 1 ? 's' : ''}
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
                      {renderResourceList(filteredPlanches, 'grid')}
                    </TabsContent>
                    
                    <TabsContent value="list" className="mt-0">
                      {renderResourceList(filteredPlanches, 'list')}
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                
                <TabsContent value="resources" className="mt-0">
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
                      {renderResourceList(filteredResources, 'grid')}
                    </TabsContent>
                    
                    <TabsContent value="list" className="mt-0">
                      {renderResourceList(filteredResources, 'list')}
                    </TabsContent>
                  </Tabs>
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
