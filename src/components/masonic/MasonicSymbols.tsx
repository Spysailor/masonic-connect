import React from 'react';

export type SymbolType = 
  'square-compass' | 
  'checkerboard' | 
  'all-seeing-eye' | 
  'all-seeing-eye-triangle' | 
  'temple' | 
  'eye' | 
  'compass' |
  'square-compass-vintage';

interface MasonicSymbolProps {
  type: SymbolType;
  size?: number | string;
  className?: string;
  hideImage?: boolean;
}

const MasonicSymbol: React.FC<MasonicSymbolProps> = ({ 
  type, 
  size = 40, 
  className = '',
  hideImage = false
}) => {
  const sizeStyle = typeof size === 'number' ? `${size}px` : size;
  
  // Utilisation directe des nouvelles images téléchargées
  const symbolImages: Record<SymbolType, string> = {
    'checkerboard': '/lovable-uploads/634d8d03-531e-481e-b434-de9b290c0571.png',
    'temple': '/lovable-uploads/2bab891b-a27b-473a-8d5c-61c16add2d0b.png',
    'square-compass': '/lovable-uploads/b87be19d-7ab0-40ca-8629-18541433817e.png',
    'all-seeing-eye': '/lovable-uploads/80cdaab0-fd32-4aaf-860e-cdea444842c6.png',
    'all-seeing-eye-triangle': '/lovable-uploads/c4518bbb-1092-4d0d-ad9a-21781e8fa84d.png',
    'eye': '/lovable-uploads/1a93857a-7e47-4dc1-b41f-34070c45ddf3.png',
    'compass': '/lovable-uploads/6c51c45b-f5ed-4df2-a766-c940b4e4bdc0.png',
    'square-compass-vintage': '/lovable-uploads/b87be19d-7ab0-40ca-8629-18541433817e.png'
  };

  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`} 
      style={{ 
        width: sizeStyle, 
        height: sizeStyle,
      }}
    >
      {/* Image removed as per user request */}
    </div>
  );
};

export default MasonicSymbol;
