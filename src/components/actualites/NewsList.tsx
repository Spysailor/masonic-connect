
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';
import { Locale } from 'date-fns';
import { useNotifications } from '@/hooks/use-notifications';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

export interface NewsListProps {
  news: NewsItem[];
  lodgeId?: string;
  loading?: boolean;
  handleEditNews?: (id: string) => void;
  handleOpenDeleteDialog?: (id: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({ 
  news, 
  lodgeId, 
  loading = false,
  handleEditNews,
  handleOpenDeleteDialog 
}) => {
  const [visibleNews, setVisibleNews] = useState<string[]>([]);
  const { t, i18n } = useTranslation();
  const { addNotification } = useNotifications();
  
  // Get date locale based on current language
  const dateLocale: Locale = i18n.language === 'fr' ? fr : enUS;

  const toggleNewsVisibility = (id: string) => {
    setVisibleNews((prevVisibleNews) =>
      prevVisibleNews.includes(id) ? prevVisibleNews.filter((newsId) => newsId !== id) : [...prevVisibleNews, id]
    );
  };

  const handleTestNotification = useCallback(() => {
    addNotification({
      type: 'info',
      title: 'Test Notification',
      message: 'This is a test notification from the news list component.',
    });
  }, [addNotification]);

  useEffect(() => {
    if (news.length > 0) {
      // Add a notification when news are loaded (for testing purposes)
      handleTestNotification();
    }
  }, [news, handleTestNotification]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-4/6"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                  {handleEditNews && <div className="h-8 bg-gray-200 rounded w-20"></div>}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {news.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              )}
              <CardContent className="p-6">
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={item.date}>
                    {format(new Date(item.date), 'PPP', { locale: dateLocale })}
                  </time>
                  <span className="mx-2">•</span>
                  <User className="h-4 w-4 mr-1" />
                  <span>{item.author}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {visibleNews.includes(item.id)
                    ? item.content.substring(0, 250)
                    : item.content.substring(0, 100)}
                  ...
                </p>
                <div className="flex items-center justify-between">
                  <Button variant="link" onClick={() => toggleNewsVisibility(item.id)}>
                    {visibleNews.includes(item.id)
                      ? i18nWithFallback('actualites.readLess', 'Read Less')
                      : i18nWithFallback('actualites.readMore', 'Read More')}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                  <div className="flex gap-2">
                    {lodgeId && (
                      <Link to={`/actualites/${item.id}`} className="text-blue-600 hover:underline">
                        {i18nWithFallback('actualites.viewArticle', 'View Article')}
                      </Link>
                    )}
                    {handleEditNews && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditNews(item.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {i18nWithFallback('common.edit', 'Edit')}
                      </Button>
                    )}
                    {handleOpenDeleteDialog && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleOpenDeleteDialog(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        {i18nWithFallback('common.delete', 'Delete')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default NewsList;
