
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import TenueList from './TenueList';
import { Badge } from '@/components/ui/badge';
import { Tenue } from '@/data/tenuesData';

interface AgendaTabViewProps {
  groupedTenues: Record<string, Array<Tenue>>;
}

const AgendaTabView: React.FC<AgendaTabViewProps> = ({ groupedTenues }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Flatten all tenues into a single array
  const allTenues = Object.values(groupedTenues).flat();
  
  // Get all unique dates where there are tenues
  const tenueDates = allTenues.map(tenue => {
    const date = new Date(tenue.date);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  });
  
  // Get tenues for selected date
  const getSelectedDateTenues = () => {
    if (!date) return [];
    
    return allTenues.filter(tenue => {
      const tenueDate = new Date(tenue.date);
      return (
        tenueDate.getDate() === date.getDate() &&
        tenueDate.getMonth() === date.getMonth() &&
        tenueDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  const selectedDateTenues = getSelectedDateTenues();

  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="mb-6 w-full">
        <TabsTrigger value="list" className="flex-1">Liste</TabsTrigger>
        <TabsTrigger value="calendar" className="flex-1">Calendrier</TabsTrigger>
      </TabsList>
      
      <TabsContent value="list" className="mt-0">
        <TenueList groupedTenues={groupedTenues} />
      </TabsContent>
      
      <TabsContent value="calendar" className="mt-0">
        <div className="bg-white p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            <div className="md:col-span-3 space-y-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={fr}
                className="border rounded-md"
                modifiers={{
                  tenue: tenueDates
                }}
                modifiersClassNames={{
                  tenue: "bg-masonic-blue-100 text-masonic-blue-900 font-bold"
                }}
              />
            </div>
            <div className="md:col-span-4">
              <h3 className="text-lg font-semibold text-masonic-blue-900 mb-4">
                {date ? format(date, 'EEEE d MMMM yyyy', { locale: fr }) : 'Aucune date sélectionnée'}
              </h3>
              
              {selectedDateTenues.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateTenues.map(tenue => (
                    <div key={tenue.id} className="border border-gray-200 rounded-lg p-4 hover:border-masonic-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Badge variant={tenue.degree === 1 ? "default" : tenue.degree === 2 ? "secondary" : "destructive"}>
                            {tenue.degree === 1 ? '1er degré' : tenue.degree === 2 ? '2ème degré' : '3ème degré'}
                          </Badge>
                          <h4 className="text-lg font-semibold mt-1">{tenue.title}</h4>
                        </div>
                        <span className="text-sm text-gray-500">
                          {format(new Date(tenue.date), 'HH:mm', { locale: fr })} - {tenue.endTime}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2 line-clamp-2">{tenue.description}</p>
                      <div className="text-sm text-gray-600">
                        {tenue.location} • {tenue.lodge}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Aucune tenue prévue pour cette date</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AgendaTabView;
