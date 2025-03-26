
import React, { ReactNode } from 'react';

// This is a simple wrapper component that can be used as a fallback
// when framer-motion is not available
export const MotionDiv: React.FC<{
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}> = ({ children, className, style, ...props }) => {
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
};

// Export other fallback components if needed
export const MotionSection = MotionDiv;
export const MotionArticle = MotionDiv;
