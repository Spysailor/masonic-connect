
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
}

const MasonicSymbol: React.FC<MasonicSymbolProps> = ({ 
  type, 
  size = 80, 
  className = '' 
}) => {
  const sizeStyle = typeof size === 'number' ? `${size}px` : size;
  
  const symbolPaths: Record<SymbolType, string> = {
    'square-compass': '/lovable-uploads/b87be19d-7ab0-40ca-8629-18541433817e.png',
    'checkerboard': '/lovable-uploads/fabb1bad-7367-4f73-b3f8-207038140f02.png',
    'all-seeing-eye': '/lovable-uploads/80cdaab0-fd32-4aaf-860e-cdea444842c6.png',
    'all-seeing-eye-triangle': '/lovable-uploads/c4518bbb-1092-4d0d-ad9a-21781e8fa84d.png',
    'temple': '/lovable-uploads/099c0f52-fd56-469b-8df9-c72a6d51f0b4.png',
    'eye': '/lovable-uploads/1a93857a-7e47-4dc1-b41f-34070c45ddf3.png',
    'compass': '/lovable-uploads/6c51c45b-f5ed-4df2-a766-c940b4e4bdc0.png',
    'square-compass-vintage': '/lovable-uploads/b87be19d-7ab0-40ca-8629-18541433817e.png'
  };

  // Fallback images en cas d'erreur de chargement
  const fallbackImages: Record<SymbolType, string> = {
    'checkerboard': '/lovable-uploads/13940b0a-b409-41d5-ab25-46838b77adbf.png',
    'temple': '/lovable-uploads/7c2a3930-7b2c-42fa-b775-de8e5fabaeaa.png',
    'square-compass': '/lovable-uploads/b87be19d-7ab0-40ca-8629-18541433817e.png',
    'all-seeing-eye': '/lovable-uploads/80cdaab0-fd32-4aaf-860e-cdea444842c6.png',
    'all-seeing-eye-triangle': '/lovable-uploads/c4518bbb-1092-4d0d-ad9a-21781e8fa84d.png',
    'eye': '/lovable-uploads/1a93857a-7e47-4dc1-b41f-34070c45ddf3.png',
    'compass': '/lovable-uploads/6c51c45b-f5ed-4df2-a766-c940b4e4bdc0.png',
    'square-compass-vintage': '/lovable-uploads/b87be19d-7ab0-40ca-8629-18541433817e.png'
  };
  
  return (
    <div 
      className={`inline-block ${className}`} 
      style={{ 
        width: sizeStyle, 
        height: sizeStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img 
        src={symbolPaths[type]} 
        alt={`Symbole maçonnique: ${type}`}
        className="w-full h-full object-contain"
        onError={(e) => {
          // En cas d'erreur, utiliser l'image de secours
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Évite les boucles infinies
          target.src = fallbackImages[type];
        }}
      />
    </div>
  );
};

export default MasonicSymbol;
