
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import MasonicSymbol from '../masonic/MasonicSymbols';

export interface MemberProps {
  member: {
    id: string;
    name: string;
    role: string;
    lodge: string;
    avatarUrl: string;
  };
}

const MemberCard: React.FC<MemberProps> = ({ member }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={member.avatarUrl} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {member.role.toLowerCase().includes('vénérable') && (
          <div className="absolute top-2 right-2">
            <MasonicSymbol type="square-compass" size={32} className="bg-white/80 rounded-full p-1" hideImage={true} />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-masonic-blue-900 truncate">{member.name}</h3>
        <p className="text-gray-500 text-sm">{member.role}</p>
        <p className="text-gray-400 text-xs mt-1">{member.lodge}</p>
      </CardContent>
      
      <CardFooter className="p-3 border-t border-gray-100 mt-auto flex space-x-2">
        <Link 
          to={`/freres/${member.id}`}
          className="flex-1 flex items-center justify-center text-masonic-blue-700 p-2 rounded-md hover:bg-masonic-blue-50 transition-colors"
        >
          <Phone className="h-5 w-5" />
        </Link>
        <Link 
          to={`/freres/${member.id}`}
          className="flex-1 flex items-center justify-center text-masonic-blue-700 p-2 rounded-md hover:bg-masonic-blue-50 transition-colors"
        >
          <Mail className="h-5 w-5" />
        </Link>
        <Link 
          to={`/freres/${member.id}`}
          className="flex-1 flex items-center justify-center text-masonic-blue-700 p-2 rounded-md hover:bg-masonic-blue-50 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
