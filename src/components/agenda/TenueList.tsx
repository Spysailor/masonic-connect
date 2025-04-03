
import React from 'react';
import { useTranslation } from 'react-i18next';
import TenueListItem from './TenueListItem';
import { i18nWithFallback } from '@/utils/i18n-fallback';
import { motion, AnimatePresence } from 'framer-motion';

interface TenueListProps {
  groupedTenues: Record<string, Array<{
    id: string;
    title: string;
    date: Date;
    endTime: string;
    location: string;
    address: string;
    lodge: string;
    degree: number;
    theme: string;
    description: string;
    status: 'confirmed' | 'pending';
  }>>;
}

const TenueList: React.FC<TenueListProps> = ({ groupedTenues }) => {
  const { t, i18n } = useTranslation();
  
  if (Object.keys(groupedTenues).length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={`empty-agenda-${i18n.language}`}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {i18nWithFallback('agenda.empty.title', 'Empty agenda')}
        </h3>
        <p className="text-gray-500 max-w-sm">
          {i18nWithFallback('agenda.empty.description', 'There are no scheduled meetings at the moment.')}
        </p>
      </motion.div>
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`tenue-list-${i18n.language}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {Object.entries(groupedTenues).map(([month, monthTenues]) => (
          <motion.div 
            key={month} 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-masonic-blue-800 mb-4 capitalize">{month}</h3>
            <div className="space-y-4">
              {monthTenues.map((tenue) => (
                <TenueListItem key={tenue.id} tenue={tenue} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default TenueList;
