
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/formatters';

interface TenueProps {
  tenue: {
    id: string;
    title: string;
    date: Date;
    location: string;
    degree: number;
    status: 'confirmed' | 'pending' | 'declined';
  };
}

const TenueCard: React.FC<TenueProps> = ({ tenue }) => {
  // Get the formatted date and time
  const formattedDate = formatDate(tenue.date);
  const formattedTime = tenue.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
  // Status badge styling
  const statusBadge = {
    confirmed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Présence confirmée'
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'En attente'
    },
    declined: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Absence confirmée'
    }
  };
  
  // Degree text
  const degreeText = ['', 'Apprenti', 'Compagnon', 'Maître'][tenue.degree] || '';
  
  return (
    <Link 
      to={`/agenda/${tenue.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className={`p-4 text-white ${tenue.degree === 1 ? 'bg-blue-600' : tenue.degree === 2 ? 'bg-blue-700' : 'bg-blue-800'}`}>
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{tenue.title}</h3>
          <span className="text-xs uppercase py-1 px-2 bg-white/20 rounded-md">{degreeText}</span>
        </div>
      </div>
      
      <div className="p-4 flex-1">
        <div className="flex items-center text-gray-600 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">{formattedDate} à {formattedTime}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm truncate">{tenue.location}</span>
        </div>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-100">
        <span className={`text-xs font-medium py-1 px-2 rounded-full ${statusBadge[tenue.status].bg} ${statusBadge[tenue.status].text}`}>
          {statusBadge[tenue.status].label}
        </span>
      </div>
    </Link>
  );
};

export default TenueCard;
