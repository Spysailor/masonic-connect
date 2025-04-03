
import React, { memo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsForm from '@/components/actualites/NewsForm';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';
import { useSecuredData } from '@/hooks/useSecuredData';
import { useAuth } from '@/hooks/useAuth';
import { useLodgeData } from '@/hooks/useLodgeData';

const NewsCreate = memo(() => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { lodge, isLoading: isLoadingLodge } = useLodgeData();
  
  // Use the secured data hook to ensure proper error handling
  const { error } = useSecuredData(() => Promise.resolve(true), [user], '/login');
  
  if (error) {
    return null; // The hook will handle the redirect
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`news-create-title-${i18n.language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-masonic-blue-900">
                {i18nWithFallback('actualites.createTitle', 'New Article')}
              </h1>
              <p className="text-gray-600 mt-1">
                {i18nWithFallback('actualites.createDescription', 'Write a new article for your lodge')}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {isLoadingLodge ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-masonic-blue-700"></div>
            </div>
          ) : (
            <motion.div
              key={`news-create-form-${i18n.language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8"
            >
              <NewsForm />
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
});

NewsCreate.displayName = 'NewsCreate';

export default NewsCreate;
