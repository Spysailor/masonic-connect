
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';

interface NewsHeaderProps {
  handleCreateNews: () => void;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ handleCreateNews }) => {
  const { t, i18n } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
      key={`news-header-${i18n.language}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-masonic-blue-900 mb-2">
            {i18nWithFallback('actualites.title', 'News')}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            {i18nWithFallback('actualites.subtitle', 'News from the lodge and freemasonry')}
          </p>
        </div>
        
        <Button 
          onClick={handleCreateNews}
          className="bg-masonic-blue-700 hover:bg-masonic-blue-800 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          {i18nWithFallback('actualites.createNews', 'Create News')}
        </Button>
      </div>
    </motion.div>
  );
};

export default NewsHeader;
