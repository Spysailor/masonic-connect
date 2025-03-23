
import React from 'react';
import { Link } from 'react-router-dom';
import MasonicSymbol from '../masonic/MasonicSymbols';

interface MemberProps {
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
    <Link 
      to={`/freres/${member.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={member.avatarUrl} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {member.role === 'Vénérable Maître' && (
          <div className="absolute top-2 right-2">
            <MasonicSymbol type="square-compass" size={32} className="bg-white/80 rounded-full p-1" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-masonic-blue-900 truncate">{member.name}</h3>
        <p className="text-gray-500 text-sm">{member.role}</p>
        <p className="text-gray-400 text-xs mt-1">{member.lodge}</p>
      </div>
      
      <div className="p-3 border-t border-gray-100 mt-auto flex space-x-2">
        <button className="flex-1 flex items-center justify-center text-masonic-blue-700 p-2 rounded-md hover:bg-masonic-blue-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button className="flex-1 flex items-center justify-center text-masonic-blue-700 p-2 rounded-md hover:bg-masonic-blue-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </button>
        <button className="flex-1 flex items-center justify-center text-masonic-blue-700 p-2 rounded-md hover:bg-masonic-blue-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </Link>
  );
};

export default MemberCard;
