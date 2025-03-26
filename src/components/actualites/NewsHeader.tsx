
import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';

interface NewsHeaderProps {
  handleCreateNews: () => void;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ handleCreateNews }) => {
  return (
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
  );
};

export default NewsHeader;
