
import React from 'react';
import { motion } from '@/utils/motion';
import { MapPin, User, BookOpen } from 'lucide-react';
import MasonicSymbol from './MasonicSymbols';

interface LodgeInfoProps {
  className?: string;
  showSymbols?: boolean;
}

const LodgeInfo: React.FC<LodgeInfoProps> = ({ 
  className = '',
  showSymbols = true
}) => {
  const lodgeData = {
    name: "Universalys",
    address: "Pereybere, Île Maurice",
    masterName: "Paul Emmanuel",
    rite: "Rite Écossais Ancien et Accepté",
    grandLodge: "Grande Loge de l'Île Maurice"
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {showSymbols && (
          <div className="flex flex-row md:flex-col gap-4 justify-center">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <MasonicSymbol type="square-compass" size={100} />
            </motion.div>
            <motion.div
              whileHover={{ rotate: -5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <MasonicSymbol type="all-seeing-eye" size={80} />
            </motion.div>
          </div>
        )}

        <div className="flex-1 space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-bold text-masonic-blue-900">
            Loge {lodgeData.name}
          </h2>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="h-5 w-5 text-masonic-blue-700" />
              <span className="text-gray-600">{lodgeData.address}</span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-2">
              <User className="h-5 w-5 text-masonic-blue-700" />
              <span className="text-gray-600">
                Vénérable Maître: <span className="font-medium">{lodgeData.masterName}</span>
              </span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-2">
              <BookOpen className="h-5 w-5 text-masonic-blue-700" />
              <span className="text-gray-600">{lodgeData.rite}</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm pt-2">
            Sous l'égide de la {lodgeData.grandLodge}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LodgeInfo;
