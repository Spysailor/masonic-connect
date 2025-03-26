
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md', 
  withText = true 
}) => {
  const sizeClasses = {
    sm: 'h-7 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-10 w-auto',
    xl: 'h-16 w-auto'
  };
  
  const colorClasses = {
    default: 'text-masonic-blue-800',
    light: 'text-white',
    dark: 'text-masonic-blue-900'
  };
  
  return (
    <Link 
      to="/" 
      className={`flex items-center space-x-2 transition-transform duration-300 hover:scale-105 focus:outline-none ${colorClasses[variant]}`}
      aria-label="Masonic Connect - Home"
    >
      <div className="relative">
        <img 
          src="/lovable-uploads/b87be19d-7ab0-40ca-8629-18541433817e.png" 
          alt="Masonic Square and Compass Logo" 
          className={sizeClasses[size]}
        />
      </div>
      
      {withText && (
        <span className={`font-medium tracking-tight truncate ${
          size === 'sm' ? 'text-base' : 
          size === 'md' ? 'text-lg' : 
          size === 'lg' ? 'text-xl' : 
          'text-2xl'
        }`}>
          MasonConnect
        </span>
      )}
    </Link>
  );
};

export default Logo;
