
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsForm from '@/components/actualites/NewsForm';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';

const NewsEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  
  if (!id) {
    return <div>{i18nWithFallback('actualites.errors.missingId', 'Missing news ID')}</div>;
  }
  
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
            <h1 className="text-3xl font-bold text-masonic-blue-900">
              {i18nWithFallback('actualites.editTitle', 'Edit Article')}
            </h1>
            <p className="text-gray-600 mt-1">
              {i18nWithFallback('actualites.editDescription', 'Modify article details')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <NewsForm newsId={id} />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsEdit;
