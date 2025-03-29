
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, MessageSquare, Newspaper, Book } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';

const MobileFooterMenu: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  
  if (!isMobile) return null;
  
  const menuItems = [
    { icon: Home, label: t('common.dashboard'), path: '/dashboard' },
    { icon: Calendar, label: t('common.agenda'), path: '/agenda' },
    { icon: Users, label: t('common.brothers'), path: '/freres' },
    { icon: Newspaper, label: t('common.news'), path: '/actualites' },
    { icon: Book, label: t('common.library'), path: '/bibliotheque' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className="flex flex-col items-center py-1 px-2"
            >
              <item.icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive ? "text-masonic-blue-700" : "text-gray-500"
                )} 
              />
              <span 
                className={cn(
                  "text-xs",
                  isActive ? "text-masonic-blue-700 font-medium" : "text-gray-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileFooterMenu;
