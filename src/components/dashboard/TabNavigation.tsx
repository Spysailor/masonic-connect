
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t, i18n } = useTranslation();
  
  const handleTabChange = (value: string) => {
    // Set a small timeout to prevent racing conditions
    setTimeout(() => {
      setActiveTab(value);
    }, 0);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-6"
    >
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full bg-white shadow-sm rounded-lg">
          <TabsTrigger 
            value="agenda" 
            className="flex-1 data-[state=active]:bg-masonic-blue-700 data-[state=active]:text-white"
          >
            {i18nWithFallback('dashboard.tabs.agenda', 'Agenda')}
          </TabsTrigger>
          <TabsTrigger 
            value="freres" 
            className="flex-1 data-[state=active]:bg-masonic-blue-700 data-[state=active]:text-white"
          >
            {i18nWithFallback('dashboard.tabs.brothers', 'Brothers')}
          </TabsTrigger>
          <TabsTrigger 
            value="actualites" 
            className="flex-1 data-[state=active]:bg-masonic-blue-700 data-[state=active]:text-white"
          >
            {i18nWithFallback('dashboard.tabs.news', 'News')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default TabNavigation;
