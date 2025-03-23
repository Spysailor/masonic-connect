
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui-elements/Logo';
import AnimatedButton from '../ui-elements/AnimatedButton';
import { cn } from '@/lib/utils';

interface NavLink {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks: NavLink[] = [
    { name: 'Accueil', path: '/' },
    { name: 'Agenda', path: '/agenda' },
    { name: 'Frères', path: '/freres' },
    { name: 'Actualités', path: '/actualites' },
    { name: 'Bibliothèque', path: '/bibliotheque' },
    { name: 'Messages', path: '/messages' },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo variant={scrolled ? 'default' : 'default'} />
          
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
                {link.name}
              </Link>
            ))}
            
            <div className="ml-4">
              <AnimatedButton to="/login" variant="secondary" size="sm">
                Connexion
              </AnimatedButton>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 text-gray-600 hover:text-masonic-blue-700 hover:bg-masonic-blue-50/50 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[60px] bg-white z-40 transition-all duration-300 ease-in-out transform",
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
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4">
            <AnimatedButton to="/login" variant="primary" fullWidth>
              Connexion
            </AnimatedButton>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
