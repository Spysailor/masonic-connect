
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import TenueListItem from './TenueListItem';

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
