
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, FileText, Users } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <h2 className="text-xl font-bold text-masonic-blue-900 mb-4">Actions rapides</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/agenda/create">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-masonic-blue-700" />
              </div>
              <span className="text-sm font-medium text-gray-900">Créer une tenue</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/bibliotheque?type=planche&action=new">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-masonic-blue-700" />
              </div>
              <span className="text-sm font-medium text-gray-900">Rédiger une planche</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/freres">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-masonic-blue-700" />
              </div>
              <span className="text-sm font-medium text-gray-900">Annuaire des Frères</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/agenda">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-masonic-blue-700" />
              </div>
              <span className="text-sm font-medium text-gray-900">Agenda</span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </motion.div>
  );
};

export default QuickActions;
