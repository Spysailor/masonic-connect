
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className,
  icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  fullWidth = false,
}) => {
  // Base classes
  const baseClasses = cn(
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300",
    "transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    disabled && "opacity-60 cursor-not-allowed pointer-events-none",
    fullWidth && "w-full",
    {
      // Size classes
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
      
      // Variant classes
      'bg-masonic-blue-700 text-white hover:bg-masonic-blue-600 active:bg-masonic-blue-800 focus:ring-masonic-blue-500': 
        variant === 'primary',
      'bg-white text-masonic-blue-700 border border-masonic-blue-200 hover:bg-masonic-blue-50 active:bg-masonic-blue-100 focus:ring-masonic-blue-200': 
        variant === 'secondary',
      'bg-transparent text-masonic-blue-700 hover:bg-masonic-blue-50 active:bg-masonic-blue-100 focus:ring-masonic-blue-200': 
        variant === 'tertiary',
      'glass-card text-masonic-blue-900 hover:bg-white/90 active:bg-white/80 focus:ring-white/50': 
        variant === 'glass',
    },
    className
  );

  // Content with icon
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
      
      {/* Button hover effect */}
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute inset-0 -translate-x-full hover:translate-x-0 ease-out duration-300 transition-transform bg-opacity-10 bg-white group-hover:translate-x-0"></span>
      </span>
    </>
  );

  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  // Render as anchor if 'href' prop is provided
  if (href) {
    return (
      <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default AnimatedButton;
