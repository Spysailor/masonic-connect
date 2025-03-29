
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
    { icon: MessageSquare, label: t('common.messages'), path: '/messages' },
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
              className="flex items-center justify-center p-2"
              aria-label={item.label}
            >
              <item.icon 
                className={cn(
                  "h-6 w-6",
                  isActive ? "text-masonic-blue-700" : "text-gray-500"
                )} 
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileFooterMenu;
