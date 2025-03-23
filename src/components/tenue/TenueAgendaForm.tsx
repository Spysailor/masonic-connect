
import React from 'react';
import { AlertTriangle, FileText } from 'lucide-react';

const TenueAgendaForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Cette fonctionnalité sera disponible prochainement. Vous pourrez ajouter le programme détaillé de la tenue.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <div className="flex items-center mb-4">
          <FileText className="mr-2 h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-700">Programme par défaut</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              19:00
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                Ouverture des travaux
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              19:30
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                Lecture et approbation du procès-verbal
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              20:00
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                Travaux du jour
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              21:30
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                Circulation du sac des propositions et du tronc de bienfaisance
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
              22:00
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                Clôture des travaux
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenueAgendaForm;
