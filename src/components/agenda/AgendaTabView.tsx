
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TenueList from './TenueList';

interface AgendaTabViewProps {
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

const AgendaTabView: React.FC<AgendaTabViewProps> = ({ groupedTenues }) => {
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
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-700">Vue calendrier</h3>
          <p className="text-gray-500">Cette vue sera disponible prochainement.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AgendaTabView;
