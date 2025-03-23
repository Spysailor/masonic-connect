
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, FileLock, ShieldCheck } from 'lucide-react';

const LegalSection: React.FC = () => {
  return (
    <Card className="mt-6 border-0 shadow-md bg-white rounded-xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Informations légales</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          <Link to="/conditions" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-full mr-3">
                <FileLock className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-gray-800">Conditions d'utilisation</span>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </Link>
          
          <Link to="/privacy" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors">
            <div className="flex items-center">
              <div className="bg-green-50 p-2 rounded-full mr-3">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-gray-800">Politique de confidentialité</span>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </Link>
          
          <Link to="/mentions-legales" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors">
            <div className="flex items-center">
              <div className="bg-amber-50 p-2 rounded-full mr-3">
                <FileLock className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-gray-800">Mentions légales</span>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </Link>
          
          <div className="text-center mt-3 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MasonConnect. Tous droits réservés.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalSection;
