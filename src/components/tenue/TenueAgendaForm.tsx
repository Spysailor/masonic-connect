
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, FileText } from 'lucide-react';

const TenueAgendaForm: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {t('tenueForm.agendaSection.comingSoon')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <div className="flex items-center mb-4">
          <FileText className="mr-2 h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-700">{t('tenueForm.agendaSection.defaultProgram')}</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              19:00
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                {t('tenueForm.agendaSection.openingWorks')}
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              19:30
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                {t('tenueForm.agendaSection.minutesReading')}
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              20:00
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                {t('tenueForm.agendaSection.todayWorks')}
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              21:30
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                {t('tenueForm.agendaSection.proposalsBag')}
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              22:00
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                {t('tenueForm.agendaSection.closing')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenueAgendaForm;
