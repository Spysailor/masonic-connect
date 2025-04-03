
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { i18nWithFallback } from '@/utils/i18n-fallback';

interface AgendaFilterProps {
  filterDegree: number | null;
  setFilterDegree: (degree: number | null) => void;
}

const AgendaFilter: React.FC<AgendaFilterProps> = ({ filterDegree, setFilterDegree }) => {
  const { t, i18n } = useTranslation();
  
  const handleValueChange = (value: string) => {
    if (value === "all") {
      setFilterDegree(null);
    } else {
      setFilterDegree(parseInt(value));
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Filter className="h-5 w-5 text-gray-400 mr-2" />
        <span className="text-sm font-medium text-gray-700 md:inline hidden">
          {i18nWithFallback('agenda.filter', 'Filter')}:
        </span>
      </div>
      
      <div className="w-full md:w-auto">
        <Select 
          defaultValue={filterDegree?.toString() || "all"} 
          onValueChange={handleValueChange}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder={i18nWithFallback('agenda.filter', 'Filter')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{i18nWithFallback('agenda.all', 'All')}</SelectItem>
            <SelectItem value="1">{i18nWithFallback('agenda.degree', '1° degree', { count: 1 })}</SelectItem>
            <SelectItem value="2">{i18nWithFallback('agenda.degree', '2° degree', { count: 2 })}</SelectItem>
            <SelectItem value="3">{i18nWithFallback('agenda.degree', '3° degree', { count: 3 })}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AgendaFilter;
