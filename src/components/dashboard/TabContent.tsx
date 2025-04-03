
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TenueCard, { TenueProps } from './TenueCard';
import MemberCard, { MemberProps } from './MemberCard';
import NewsCard, { NewsProps } from './NewsCard';
import { i18nWithFallback } from '@/utils/i18n-fallback';

interface TabContentProps {
  activeTab: string;
  tenues: TenueProps['tenue'][];
  members: MemberProps['member'][];
  news: NewsProps['news'][];
  tenuesLoading: boolean;
  membersLoading: boolean;
  newsLoading: boolean;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  tenues,
  members,
  news,
  tenuesLoading,
  membersLoading,
  newsLoading
}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mb-8"
    >
      {activeTab === 'agenda' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-masonic-blue-900">
              {i18nWithFallback('dashboard.upcomingTenues', 'Tenues à venir')}
            </h2>
            <a href="/agenda" className="text-sm text-masonic-blue-700 font-medium hover:text-masonic-blue-600">
              {i18nWithFallback('dashboard.seeAll', 'Voir tout')}
            </a>
          </div>
          {tenuesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 animate-pulse border rounded-xl">
                  <div className="h-12 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tenues.map((tenue) => (
                <TenueCard key={tenue.id} tenue={tenue} />
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'freres' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-masonic-blue-900">
              {i18nWithFallback('dashboard.lodgeOfficers', 'Officiers de la loge')}
            </h2>
            <a href="/freres" className="text-sm text-masonic-blue-700 font-medium hover:text-masonic-blue-600">
              {i18nWithFallback('dashboard.seeAll', 'Voir tout')}
            </a>
          </div>
          {membersLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 animate-pulse border rounded-xl">
                  <div className="h-40 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'actualites' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-masonic-blue-900">
              {i18nWithFallback('dashboard.latestNews', 'Dernières actualités')}
            </h2>
            <a href="/actualites" className="text-sm text-masonic-blue-700 font-medium hover:text-masonic-blue-600">
              {i18nWithFallback('dashboard.seeAll', 'Voir tout')}
            </a>
          </div>
          {newsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-80 animate-pulse border rounded-xl">
                  <div className="h-40 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4 space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-20 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TabContent;
