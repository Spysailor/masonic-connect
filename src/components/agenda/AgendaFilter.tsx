
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

interface AgendaFilterProps {
  filterDegree: number | null;
  setFilterDegree: (degree: number | null) => void;
}

const AgendaFilter: React.FC<AgendaFilterProps> = ({ filterDegree, setFilterDegree }) => {
  const { t } = useTranslation();
  
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
          {t('agenda.filter')}:
        </span>
      </div>
      
      <div className="w-full md:w-auto">
        <Select 
          defaultValue={filterDegree?.toString() || "all"} 
          onValueChange={handleValueChange}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder={t('agenda.filter')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('agenda.all')}</SelectItem>
            <SelectItem value="1">{t('agenda.degree', { count: 1 })}</SelectItem>
            <SelectItem value="2">{t('agenda.degree', { count: 2 })}</SelectItem>
            <SelectItem value="3">{t('agenda.degree', { count: 3 })}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AgendaFilter;
