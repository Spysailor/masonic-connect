
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../ui-elements/Logo';
import AnimatedButton from '../ui-elements/AnimatedButton';
import NotificationIndicator from '../notifications/NotificationIndicator';
import LanguageSelector from '../language/LanguageSelector';
import { cn } from '@/lib/utils';
import { UserCircle, Menu, X } from 'lucide-react';
import { useNotifications } from '@/hooks/use-notifications';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavLink {
  name: string;
  path: string;
  translationKey: string;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  
  const navLinks: NavLink[] = [
    { name: t('common.dashboard'), path: '/dashboard', translationKey: 'common.dashboard' },
    { name: t('common.agenda'), path: '/agenda', translationKey: 'common.agenda' },
    { name: t('common.brothers'), path: '/freres', translationKey: 'common.brothers' },
    { name: t('common.news'), path: '/actualites', translationKey: 'common.news' },
    { name: t('common.library'), path: '/bibliotheque', translationKey: 'common.library' },
    { name: t('common.messages'), path: '/messages', translationKey: 'common.messages' },
  ];
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm",
        scrolled ? "py-2" : "py-3"
      )}
    >
      <div className="container mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo variant="default" size={isMobile ? "sm" : "md"} />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.path || 
                  (link.path === '/bibliotheque' && location.pathname.startsWith('/planches'))
                    ? "text-masonic-blue-700 bg-masonic-blue-50"
                    : "text-gray-600 hover:text-masonic-blue-700 hover:bg-masonic-blue-50/50"
                )}
              >
                {t(link.translationKey)}
              </Link>
            ))}
            
            <div className="flex items-center ml-4 space-x-1">
              <LanguageSelector />
              
              <Link 
                to="/notifications"
                className={cn(
                  "rounded-md p-2 relative",
                  location.pathname === '/notifications' 
                    ? "text-masonic-blue-700 bg-masonic-blue-50" 
                    : "text-gray-600 hover:text-masonic-blue-700 hover:bg-masonic-blue-50/50 transition-colors"
                )}
                aria-label={t('common.notifications')}
              >
                <NotificationIndicator />
              </Link>
              
              <Link 
                to="/profile"
                className={cn(
                  "rounded-md p-2 text-gray-600 hover:text-masonic-blue-700 hover:bg-masonic-blue-50/50 transition-colors",
                  location.pathname === '/profile' ? "text-masonic-blue-700 bg-masonic-blue-50" : ""
                )}
                aria-label={t('common.profile')}
              >
                <UserCircle className="h-5 w-5" />
              </Link>
              
              <div className="ml-2">
                <AnimatedButton to="/login" variant="secondary" size="sm">
                  {t('common.login')}
                </AnimatedButton>
              </div>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-1">
            <LanguageSelector />
            
            <Link 
              to="/notifications"
              className={cn(
                "rounded-md p-2 relative",
                location.pathname === '/notifications' 
                  ? "text-masonic-blue-700 bg-masonic-blue-50" 
                  : "text-gray-600 hover:text-masonic-blue-700 hover:bg-masonic-blue-50/50 transition-colors"
              )}
              aria-label={t('common.notifications')}
            >
              <NotificationIndicator />
            </Link>
            
            <Link 
              to="/profile"
              className={cn(
                "rounded-md p-2 text-gray-600 hover:text-masonic-blue-700 hover:bg-masonic-blue-50/50 transition-colors",
                location.pathname === '/profile' ? "text-masonic-blue-700 bg-masonic-blue-50" : ""
              )}
              aria-label={t('common.profile')}
            >
              <UserCircle className="h-5 w-5" />
            </Link>
            
            <button
              className="rounded-md p-2 text-gray-600 hover:text-masonic-blue-700 hover:bg-masonic-blue-50/50 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[48px] bg-white z-40 transition-all duration-300 ease-in-out transform",
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <nav className="flex flex-col px-4 py-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-3 rounded-md text-base font-medium transition-colors",
                location.pathname === link.path || 
                (link.path === '/bibliotheque' && location.pathname.startsWith('/planches'))
                  ? "text-masonic-blue-700 bg-masonic-blue-50"
                  : "text-gray-600 hover:text-masonic-blue-700 hover:bg-gray-50"
              )}
            >
              {t(link.translationKey)}
            </Link>
          ))}
          
          <div className="pt-4">
            <AnimatedButton to="/login" variant="primary" fullWidth>
              {t('common.login')}
            </AnimatedButton>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
