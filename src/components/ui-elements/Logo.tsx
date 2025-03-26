
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md', 
  withText = true 
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };
  
  // Color classes based on variant
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
          src="/lovable-uploads/0dde5c68-ce03-4035-ada6-3b2f1aae5f7f.png" 
          alt="Masonic Square and Compass Logo" 
          className={`${sizeClasses[size]} w-auto`}
        />
      </div>
      
      {withText && (
        <span className={`font-medium tracking-tight ${
          size === 'sm' ? 'text-lg' : 
          size === 'md' ? 'text-xl' : 
          'text-2xl'
        }`}>
          MasonConnect
        </span>
      )}
    </Link>
  );
};

export default Logo;
