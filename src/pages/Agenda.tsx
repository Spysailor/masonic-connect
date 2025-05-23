
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import AgendaFilter from '@/components/agenda/AgendaFilter';
import AgendaTabView from '@/components/agenda/AgendaTabView';
import { getTenues } from '@/data/tenuesData';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';

const Agenda = () => {
  const [filterDegree, setFilterDegree] = useState<number | null>(null);
  const { t, i18n } = useTranslation();

  // Get tenues data
  const tenues = getTenues();

  // Filter tenues by degree if a filter is applied
  const filteredTenues = filterDegree 
    ? tenues.filter(tenue => tenue.degree === filterDegree) 
    : tenues;

  // Get the current locale for date formatting
  const dateLocale = i18n.language === 'fr' ? fr : enUS;

  // Group tenues by month
  const groupedTenues = filteredTenues.reduce((groups, tenue) => {
    const month = format(tenue.date, 'MMMM yyyy', { locale: dateLocale });
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(tenue);
    return groups;
  }, {} as Record<string, typeof tenues>);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-masonic-blue-900">{t('common.agenda')}</h1>
                <MasonicSymbol 
                  type="temple" 
                  size={50}
                  className="ml-2"
                />
              </div>
              <Link 
                to="/agenda/create" 
                className="inline-flex items-center justify-center rounded-md bg-masonic-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-masonic-blue-800 transition-colors"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t('dashboard.actions.createTenue')}
              </Link>
            </div>
            <p className="text-gray-600 mt-1">{t('agenda.upcoming')}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <AgendaFilter 
                  filterDegree={filterDegree} 
                  setFilterDegree={setFilterDegree} 
                />
                
                <Link 
                  to="/agenda/create" 
                  className="inline-flex items-center justify-center rounded-md bg-masonic-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-masonic-blue-800 transition-colors w-full md:w-auto md:hidden"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {t('dashboard.actions.createTenue')}
                </Link>
              </div>
              
              <AgendaTabView groupedTenues={groupedTenues} />
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agenda;
