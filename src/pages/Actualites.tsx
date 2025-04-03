
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

import NewsHeader from '@/components/actualites/NewsHeader';
import NewsSearch from '@/components/actualites/NewsSearch';
import NewsList from '@/components/actualites/NewsList';
import NewsDeleteDialog from '@/components/actualites/NewsDeleteDialog';

const Actualites = () => {
  const { t } = useTranslation();
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
          title: t('actualites.errors.fetchFailed'),
          description: t('actualites.errors.cantLoadNews'),
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchActualites();
  }, [toast, t]);

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
        title: t('actualites.success'),
        description: t('actualites.newsDeleted'),
      });
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: t('actualites.errors.error'),
        description: t('actualites.errors.cantDeleteNews'),
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
          <NewsHeader handleCreateNews={handleCreateNews} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-6 mb-6">
              <NewsSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
              />
              
              <NewsList
                loading={loading}
                news={filteredActualites}
                handleEditNews={handleEditNews}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
              />
            </Card>
          </motion.div>
        </div>
      </main>
      
      <NewsDeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDeleteNews={handleDeleteNews}
      />
      
      <Footer />
    </div>
  );
};

export default Actualites;
