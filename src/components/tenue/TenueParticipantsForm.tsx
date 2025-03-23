
import React from 'react';
import { AlertTriangle, Users } from 'lucide-react';

const TenueParticipantsForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Cette fonctionnalité sera disponible prochainement. Vous pourrez inviter des frères et sœurs à votre tenue.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <div className="flex items-center mb-4">
          <Users className="mr-2 h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-700">Officiers par défaut</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Vénérable Maître</div>
            <div className="font-medium text-gray-900">Jean Dupont</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Premier Surveillant</div>
            <div className="font-medium text-gray-900">Paul Martin</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Deuxième Surveillant</div>
            <div className="font-medium text-gray-900">Philippe Moreau</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Orateur</div>
            <div className="font-medium text-gray-900">Pierre Lambert</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenueParticipantsForm;
