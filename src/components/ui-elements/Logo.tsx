
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
        <svg 
          className={`${sizeClasses[size]} w-auto`} 
          viewBox="0 0 50 50" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M25 2L2 18.5L25 35L48 18.5L25 2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          <path 
            d="M25 48V35" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <path 
            d="M2 18.5V32L25 48L48 32V18.5" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
          />
          <circle 
            cx="25" 
            cy="18" 
            r="5" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
        </svg>
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
