
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface NewsHeaderProps {
  handleCreateNews: () => void;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ handleCreateNews }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-masonic-blue-900 mb-2">
            {t('actualites.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            {t('actualites.subtitle')}
          </p>
        </div>
        
        <Button 
          onClick={handleCreateNews}
          className="bg-masonic-blue-700 hover:bg-masonic-blue-800 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('actualites.createNews')}
        </Button>
      </div>
    </motion.div>
  );
};

export default NewsHeader;
