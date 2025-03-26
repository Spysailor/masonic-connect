import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download, Share2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const BibliothequeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<any>(null);
  const isNewsView = location.pathname.includes('/actualites/');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        
        // Determine if we're fetching a news item or a planche based on the route
        const table = isNewsView ? 'news' : 'planches';
        
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setItem(data);
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        toast({
          title: t('actualites.errors.error'),
          description: isNewsView 
            ? t('actualites.errors.cantLoadNews') 
            : t('planches.search.noResults'),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchItem();
    }
  }, [id, isNewsView, t]);
  
  const handleGoBack = () => {
    if (isNewsView) {
      navigate('/actualites');
    } else {
      navigate('/bibliotheque');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="w-8 h-8 border-4 border-masonic-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col justify-center items-center min-h-[400px]">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {isNewsView 
                  ? t('actualites.noResults') 
                  : t('planches.noPlanche')}
              </h2>
              <Button onClick={handleGoBack}>
                {isNewsView 
                  ? t('actualites.backToNews') 
                  : t('plancheDetail.backToPlanche')}
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Different rendering based on news or planche
  if (isNewsView) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              className="mb-6 text-masonic-blue-600 hover:text-masonic-blue-800 hover:bg-masonic-blue-50 -ml-3"
              onClick={handleGoBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('actualites.backToNews') || 'Back to news'}
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-md overflow-hidden">
                {item.image_url && (
                  <div className="w-full h-64 md:h-96 relative">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.title}</h1>
                  
                  <div className="flex items-center mb-6">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{item.author_name?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{item.author_name || t('actualites.administrator')}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.published_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="prose prose-masonic max-w-none">
                    {item.content?.split('\n').map((paragraph: string, idx: number) => (
                      <p key={idx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  } else {
    // Planche detail view
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              className="mb-6 text-masonic-blue-600 hover:text-masonic-blue-800 hover:bg-masonic-blue-50 -ml-3"
              onClick={handleGoBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('plancheDetail.backToPlanche')}
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.title}</h1>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{t('plancheDetail.firstDegree')}</Badge>
                        <Badge variant="secondary">{t('plancheDetail.secondDegree')}</Badge>
                        <Badge variant="secondary">{t('plancheDetail.thirdDegree')}</Badge>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button size="icon" variant="ghost">
                        <Download className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{item.author?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{item.author || 'Anonyme'}</p>
                      <p className="text-xs text-gray-500">
                        {t('plancheDetail.worshipfulMaster')}, {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="prose prose-masonic max-w-none">
                    <h3>{t('plancheDetail.mockData.intro')}</h3>
                    <br />
                    <h4>{t('plancheDetail.mockData.originTitle')}</h4>
                    <p>{t('plancheDetail.mockData.originDesc1')}</p>
                    <p>{t('plancheDetail.mockData.originDesc2')}</p>
                    <br />
                    <h4>{t('plancheDetail.mockData.symbolismTitle')}</h4>
                    <p>{t('plancheDetail.mockData.symbolismDesc')}</p>
                    <ul>
                      <li>{t('plancheDetail.mockData.duality.item1')}</li>
                      <li>{t('plancheDetail.mockData.duality.item2')}</li>
                      <li>{t('plancheDetail.mockData.duality.item3')}</li>
                      <li>{t('plancheDetail.mockData.duality.item4')}</li>
                      <li>{t('plancheDetail.mockData.duality.item5')}</li>
                      <li>{t('plancheDetail.mockData.duality.item6')}</li>
                    </ul>
                    <p>{t('plancheDetail.mockData.dualityDesc')}</p>
                    <br />
                    <h4>{t('plancheDetail.mockData.interpretationsTitle')}</h4>
                    <p>{t('plancheDetail.mockData.interpretationsIntro')}</p>
                    <h5>{t('plancheDetail.mockData.interpretation1.title')}</h5>
                    <p>{t('plancheDetail.mockData.interpretation1.desc')}</p>
                    <h5>{t('plancheDetail.mockData.interpretation2.title')}</h5>
                    <p>{t('plancheDetail.mockData.interpretation2.desc')}</p>
                    <h5>{t('plancheDetail.mockData.interpretation3.title')}</h5>
                    <p>{t('plancheDetail.mockData.interpretation3.desc')}</p>
                    <br />
                    <h4>{t('plancheDetail.mockData.conclusionTitle')}</h4>
                    <p>{t('plancheDetail.mockData.conclusionDesc1')}</p>
                    <p>{t('plancheDetail.mockData.conclusionDesc2')}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
};

export default BibliothequeDetail;
