
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TenueFormHeaderProps {
  formMode: 'create' | 'edit';
}

const TenueFormHeader: React.FC<TenueFormHeaderProps> = ({ formMode }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Link to="/agenda" className="inline-flex items-center text-masonic-blue-700 hover:text-masonic-blue-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Retour à l'agenda</span>
        </Link>
      </motion.div>
      
      <CardHeader className="bg-gradient-to-r from-masonic-blue-800 to-masonic-blue-900 text-white">
        <CardTitle className="text-2xl">
          {formMode === 'create' ? 'Créer une nouvelle tenue' : 'Modifier la tenue'}
        </CardTitle>
        <CardDescription className="text-gray-200">
          Remplissez le formulaire pour {formMode === 'create' ? 'créer' : 'modifier'} une tenue
        </CardDescription>
      </CardHeader>
    </>
  );
};

export default TenueFormHeader;
