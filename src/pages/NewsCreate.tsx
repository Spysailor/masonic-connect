
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsForm from '@/components/actualites/NewsForm';
import { motion } from 'framer-motion';

const NewsCreate = () => {
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
            <h1 className="text-3xl font-bold text-masonic-blue-900">Créer une actualité</h1>
            <p className="text-gray-600 mt-1">Ajoutez une nouvelle actualité à partager avec vos frères</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <NewsForm />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsCreate;
