
import React from 'react';

export type SymbolType = 'square-compass' | 'all-seeing-eye' | 'square-compass-vintage';

interface MasonicSymbolProps {
  type: SymbolType;
  size?: number | string;
  className?: string;
}

const MasonicSymbol: React.FC<MasonicSymbolProps> = ({ 
  type, 
  size = 80, 
  className = '' 
}) => {
  const sizeStyle = typeof size === 'number' ? `${size}px` : size;
  
  return (
    <div 
      className={`inline-block ${className}`} 
      style={{ width: sizeStyle, height: sizeStyle }}
    >
      {type === 'square-compass' && (
        <img 
          src="/lovable-uploads/f104bd36-ed43-4eb0-96c9-7bc815561b19.png" 
          alt="Équerre et Compas" 
          className="w-full h-full object-contain"
        />
      )}
      
      {type === 'all-seeing-eye' && (
        <img 
          src="/lovable-uploads/bbb8346e-351c-4307-bff6-a3a3bb5378dc.png" 
          alt="L'Œil qui voit tout" 
          className="w-full h-full object-contain"
        />
      )}
      
      {type === 'square-compass-vintage' && (
        <img 
          src="/lovable-uploads/9e40bdf3-ca38-4c19-b16b-68bf655792d1.png" 
          alt="Équerre et Compas Vintage" 
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
};

export default MasonicSymbol;
