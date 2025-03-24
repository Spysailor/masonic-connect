
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';

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
      label: 'Présence confirmée',
      variant: 'secondary' as const,
    },
    pending: {
      label: 'En attente',
      variant: 'default' as const,
    },
    declined: {
      label: 'Absence confirmée',
      variant: 'destructive' as const,
    }
  };
  
  // Degree text
  const degreeText = ['', 'Apprenti', 'Compagnon', 'Maître'][tenue.degree] || '';
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <CardHeader className={`p-4 text-white ${tenue.degree === 1 ? 'bg-blue-600' : tenue.degree === 2 ? 'bg-blue-700' : 'bg-blue-800'}`}>
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{tenue.title}</h3>
          <Badge variant="outline" className="bg-white/20 text-white border-transparent">
            {degreeText}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-1">
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="text-sm">{formattedDate} à {formattedTime}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-2" />
          <span className="text-sm truncate">{tenue.location}</span>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t border-gray-100">
        <Badge variant={statusBadge[tenue.status].variant}>
          {statusBadge[tenue.status].label}
        </Badge>
        
        <Link 
          to={`/agenda/${tenue.id}`}
          className="ml-auto text-masonic-blue-700 hover:text-masonic-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TenueCard;
