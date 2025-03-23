
import React from 'react';
import { Filter } from 'lucide-react';

interface AgendaFilterProps {
  filterDegree: number | null;
  setFilterDegree: (degree: number | null) => void;
}

const AgendaFilter: React.FC<AgendaFilterProps> = ({ filterDegree, setFilterDegree }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Filter className="h-5 w-5 text-gray-400 mr-2" />
        <span className="text-sm font-medium text-gray-700">Filtrer par degré:</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setFilterDegree(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            filterDegree === null 
              ? 'bg-masonic-blue-700 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setFilterDegree(1)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            filterDegree === 1 
              ? 'bg-masonic-blue-700 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          1° degré
        </button>
        <button
          onClick={() => setFilterDegree(2)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            filterDegree === 2 
              ? 'bg-masonic-blue-700 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          2° degré
        </button>
        <button
          onClick={() => setFilterDegree(3)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            filterDegree === 3 
              ? 'bg-masonic-blue-700 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          3° degré
        </button>
      </div>
    </div>
  );
};

export default AgendaFilter;
