
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../ui-elements/Logo';
import AnimatedButton from '../ui-elements/AnimatedButton';
import NotificationIndicator from '../notifications/NotificationIndicator';
import { cn } from '@/lib/utils';
import { UserCircle, LogOut } from 'lucide-react';
import { useNotifications } from '@/hooks/use-notifications';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';
import LanguageSelector from '../language/LanguageSelector';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavLink {
  name: string;
  path: string;
  translationKey: string;
  requiresAuth: boolean;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { unreadCount } = useNotifications();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  
  const navLinks: NavLink[] = [
    { name: t('common.dashboard'), path: '/dashboard', translationKey: 'common.dashboard', requiresAuth: true },
    { name: t('common.agenda'), path: '/agenda', translationKey: 'common.agenda', requiresAuth: true },
    { name: t('common.brothers'), path: '/freres', translationKey: 'common.brothers', requiresAuth: true },
    { name: t('common.news'), path: '/actualites', translationKey: 'common.news', requiresAuth: true },
    { name: t('common.library'), path: '/bibliotheque', translationKey: 'common.library', requiresAuth: true },
    { name: t('common.messages'), path: '/messages', translationKey: 'common.messages', requiresAuth: true },
  ];
  
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

  const handleLogout = async () => {
    await signOut();
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={profile?.photo_url} alt={profile?.display_name} />
              <AvatarFallback className="bg-masonic-blue-200 text-masonic-blue-700">
                {profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{profile?.display_name || user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <UserCircle className="mr-2 h-4 w-4" />
              {t('common.profile')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('common.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    return (
      <>
        <AnimatedButton to="/login" variant="secondary" size="sm">
          {t('common.login')}
        </AnimatedButton>
        {!isMobile && (
          <AnimatedButton to="/register" variant="primary" size="sm">
            {t('common.register')}
          </AnimatedButton>
        )}
      </>
    );
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm",
        scrolled ? "py-2" : "py-3"
      )}
    >
      <div className="container mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo variant="default" size={isMobile ? "sm" : "md"} />
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks
              .filter(link => !link.requiresAuth || user)
              .map((link) => (
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
            
            <div className="flex items-center ml-4 space-x-3">
              <LanguageSelector />
              
              {user && (
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
              )}
              
              <div className="flex items-center space-x-2">
                {renderAuthButtons()}
              </div>
            </div>
          </nav>
          
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            
            {user && (
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
            )}
            
            {renderAuthButtons()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
