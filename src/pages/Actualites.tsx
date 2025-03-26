
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Tag, Plus, Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

const Actualites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [actualites, setActualites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchActualites = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setActualites(data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les actualités",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchActualites();
  }, [toast]);

  const filteredActualites = actualites.filter(actualite => {
    const matchesSearch = actualite.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (actualite.content && actualite.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? actualite.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(actualites.map(actualite => actualite.category).filter(Boolean))];

  const handleCreateNews = () => {
    navigate('/actualites/create');
  };

  const handleEditNews = (id: string) => {
    navigate(`/actualites/${id}/edit`);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedNewsId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteNews = async () => {
    if (!selectedNewsId) return;
    
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', selectedNewsId);

      if (error) throw error;

      setActualites(actualites.filter(news => news.id !== selectedNewsId));
      toast({
        title: "Succès",
        description: "L'actualité a été supprimée",
      });
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'actualité",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedNewsId(null);
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-masonic-blue-900">Actualités</h1>
                <MasonicSymbol 
                  type="checkerboard" 
                  size={50}
                  className="ml-2"
                />
              </div>
              <Button 
                onClick={handleCreateNews}
                className="bg-masonic-blue-700 hover:bg-masonic-blue-800"
              >
                <Plus className="mr-2 h-4 w-4" />
                Créer une actualité
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-6 mb-6">
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
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-masonic-blue-700"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredActualites.length > 0 ? (
                    filteredActualites.map((actualite) => (
                      <article key={actualite.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-1">
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                              <img 
                                src={actualite.image_url || `https://source.unsplash.com/random/800x600?sig=${actualite.id}`} 
                                alt={actualite.title} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          
                          <div className="md:col-span-2">
                            <div className="flex items-center mb-2">
                              {actualite.category && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-masonic-blue-100 text-masonic-blue-800">
                                  {actualite.category}
                                </span>
                              )}
                              <span className="text-gray-500 text-sm ml-2 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {actualite.published_at ? format(new Date(actualite.published_at), 'dd MMMM yyyy', { locale: fr }) : ''}
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
                                    src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                                    alt={actualite.author_name || 'Auteur'} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-900">{actualite.author_name || 'Administrateur'}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditNews(actualite.id)}
                                  className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                  <Edit className="h-3.5 w-3.5 mr-1" />
                                  Modifier
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenDeleteDialog(actualite.id)}
                                  className="flex items-center text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                                  Supprimer
                                </Button>
                                <Link
                                  to={`/actualites/${actualite.id}`}
                                  className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 ml-2"
                                >
                                  Lire la suite →
                                </Link>
                              </div>
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
              )}
            </Card>
          </motion.div>
        </div>
      </main>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cette actualité sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteNews} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default Actualites;
