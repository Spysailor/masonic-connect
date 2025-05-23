
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, FileText, Bell } from 'lucide-react';
import { i18nWithFallback } from '@/utils/i18n-fallback';

interface StatCardsProps {
  stats: {
    nextTenue: string;
    membersCount: number;
    planchesCount: number;
    unreadMessages: number;
  } | undefined;
  statsLoading: boolean;
}

const StatCards: React.FC<StatCardsProps> = ({ stats, statsLoading }) => {
  const { t } = useTranslation();
  
  if (statsLoading || !stats) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-sm animate-pulse">
            <CardContent className="p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div className="ml-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-5 bg-gray-200 rounded w-24"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
    >
      <Card className="shadow-sm">
        <CardContent className="p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
            <Calendar className="h-6 w-6 text-masonic-blue-700" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">{i18nWithFallback('dashboard.stats.nextTenue', 'Prochaine tenue')}</p>
            <p className="text-lg font-semibold text-masonic-blue-900">{stats.nextTenue}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardContent className="p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
            <Users className="h-6 w-6 text-masonic-blue-700" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">{i18nWithFallback('dashboard.stats.membersCount', 'Membres')}</p>
            <p className="text-lg font-semibold text-masonic-blue-900">{stats.membersCount} {i18nWithFallback('dashboard.stats.members', 'membres')}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardContent className="p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
            <FileText className="h-6 w-6 text-masonic-blue-700" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">{i18nWithFallback('dashboard.stats.planchesCount', 'Planches')}</p>
            <p className="text-lg font-semibold text-masonic-blue-900">{stats.planchesCount} {i18nWithFallback('dashboard.stats.documents', 'documents')}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardContent className="p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
            <Bell className="h-6 w-6 text-masonic-blue-700" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">{i18nWithFallback('dashboard.stats.unreadMessages', 'Messages non lus')}</p>
            <p className="text-lg font-semibold text-masonic-blue-900">{stats.unreadMessages} {i18nWithFallback('dashboard.stats.unread', 'non lus')}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCards;
