
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-6"
    >
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full bg-white shadow-sm rounded-lg">
          <TabsTrigger 
            value="agenda" 
            className="flex-1 data-[state=active]:bg-masonic-blue-700 data-[state=active]:text-white"
          >
            Agenda
          </TabsTrigger>
          <TabsTrigger 
            value="freres" 
            className="flex-1 data-[state=active]:bg-masonic-blue-700 data-[state=active]:text-white"
          >
            Frères
          </TabsTrigger>
          <TabsTrigger 
            value="actualites" 
            className="flex-1 data-[state=active]:bg-masonic-blue-700 data-[state=active]:text-white"
          >
            Actualités
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default TabNavigation;
