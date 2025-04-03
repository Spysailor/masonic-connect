
import React from 'react';
import { useTranslation } from 'react-i18next';
import TenueListItem from './TenueListItem';
import { i18nWithFallback } from '@/utils/i18n-fallback';

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
  const { t } = useTranslation();
  
  if (Object.keys(groupedTenues).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {i18nWithFallback('agenda.empty.title', 'Empty agenda')}
        </h3>
        <p className="text-gray-500 max-w-sm">
          {i18nWithFallback('agenda.empty.description', 'There are no scheduled meetings at the moment.')}
        </p>
      </div>
    );
  }
  
  return (
    <div>
      {Object.entries(groupedTenues).map(([month, monthTenues]) => (
        <div key={month} className="mb-8">
          <h3 className="text-lg font-semibold text-masonic-blue-800 mb-4 capitalize">{month}</h3>
          <div className="space-y-4">
            {monthTenues.map((tenue) => (
              <TenueListItem key={tenue.id} tenue={tenue} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TenueList;
