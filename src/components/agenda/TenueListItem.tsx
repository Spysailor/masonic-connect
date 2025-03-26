
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

interface TenueProps {
  tenue: {
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
  };
}

const TenueListItem: React.FC<TenueProps> = ({ tenue }) => {
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language === 'fr' ? fr : enUS;
  
  const statusLabels = {
    confirmed: t('tenueDetail.status.confirmed'),
    pending: t('tenueDetail.status.pending')
  };

  return (
    <Link 
      key={tenue.id} 
      to={`/agenda/${tenue.id}`}
      className="block bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row">
        <div className="p-4 md:w-1/4 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-gray-200">
          <div className="text-gray-500 text-sm">{format(tenue.date, 'EEEE', { locale: dateLocale })}</div>
          <div className="text-xl font-bold text-masonic-blue-900">{format(tenue.date, 'd MMMM', { locale: dateLocale })}</div>
          <div className="text-gray-700">{format(tenue.date, 'HH:mm', { locale: dateLocale })} - {tenue.endTime}</div>
        </div>
        
        <div className="p-4 md:w-2/4">
          <div className="flex items-center mb-2">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
              tenue.degree === 1 ? 'bg-blue-500' : 
              tenue.degree === 2 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></span>
            <span className="text-sm text-gray-500">
              {t('agenda.degree', { count: tenue.degree })}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-masonic-blue-900">{tenue.title}</h3>
          <p className="text-gray-500 mt-1 line-clamp-2">{tenue.description}</p>
        </div>
        
        <div className="p-4 md:w-1/4 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200">
          <div className="text-sm font-medium text-gray-700">{tenue.location}</div>
          <div className="text-sm text-gray-500 mt-1">{tenue.lodge}</div>
          <div className="mt-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              tenue.status === 'confirmed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {statusLabels[tenue.status]}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TenueListItem;
