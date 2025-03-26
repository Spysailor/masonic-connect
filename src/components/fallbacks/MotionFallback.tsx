import React, { ReactNode } from 'react';

// This is a comprehensive fallback system for framer-motion
// Provides static alternatives to all commonly used motion components

export interface MotionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  variants?: any;
  whileHover?: any;
  whileTap?: any;
  drag?: any;
  dragConstraints?: any;
  [key: string]: any;
}

// Base motion component that ignores animation props but keeps children and styling
const createMotionComponent = (Component: any) => {
  return React.forwardRef<HTMLElement, MotionProps>(
    ({ children, className, style, ...animationProps }, ref) => {
      // Extract standard props that we want to pass through
      const standardProps: any = {};
      Object.keys(animationProps).forEach(key => {
        // Only pass through props that aren't framer-motion specific
        if (!['initial', 'animate', 'exit', 'transition', 'variants', 'whileHover', 'whileTap', 'drag', 'dragConstraints', 'layoutId'].includes(key)) {
          standardProps[key] = animationProps[key];
        }
      });

      // Apply hover effect if whileHover is present
      if (animationProps.whileHover) {
        standardProps.className = `${className || ''} transition-transform duration-200 hover:scale-105`.trim();
      } else {
        standardProps.className = className;
      }

      return <Component ref={ref} style={style} {...standardProps}>{children}</Component>;
    }
  );
};

// Create fallbacks for all commonly used motion components
export const MotionDiv = createMotionComponent('div');
export const MotionSection = createMotionComponent('section');
export const MotionArticle = createMotionComponent('article');
export const MotionHeader = createMotionComponent('header');
export const MotionFooter = createMotionComponent('footer');
export const MotionNav = createMotionComponent('nav');
export const MotionButton = createMotionComponent('button');
export const MotionSpan = createMotionComponent('span');
export const MotionP = createMotionComponent('p');
export const MotionUl = createMotionComponent('ul');
export const MotionLi = createMotionComponent('li');

// AnimatePresence fallback that just renders children
export const AnimatePresence = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

// Create a utility to determine if framer-motion is available
export const isFramerMotionAvailable = () => {
  try {
    // This will throw an error if framer-motion is not available
    require('framer-motion');
    return true;
  } catch (e) {
    return false;
  }
};
