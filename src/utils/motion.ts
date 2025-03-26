
import React from 'react';
import { isFramerMotionAvailable } from '@/components/fallbacks/MotionFallback';

// Import either real framer-motion or our fallbacks
let motion: any;
let AnimatePresence: any;

try {
  // Try to import framer-motion
  const framerMotion = require('framer-motion');
  motion = framerMotion.motion;
  AnimatePresence = framerMotion.AnimatePresence;
} catch (e) {
  // If import fails, use our fallbacks
  const fallbacks = require('@/components/fallbacks/MotionFallback');
  
  // Create a proxy object that returns fallback components for any requested property
  motion = new Proxy({}, {
    get: (target, prop) => {
      // Return the matching fallback if we have one
      if (prop === 'div') return fallbacks.MotionDiv;
      if (prop === 'section') return fallbacks.MotionSection;
      if (prop === 'article') return fallbacks.MotionArticle;
      if (prop === 'header') return fallbacks.MotionHeader;
      if (prop === 'footer') return fallbacks.MotionFooter;
      if (prop === 'nav') return fallbacks.MotionNav;
      if (prop === 'button') return fallbacks.MotionButton;
      if (prop === 'span') return fallbacks.MotionSpan;
      if (prop === 'p') return fallbacks.MotionP;
      if (prop === 'ul') return fallbacks.MotionUl;
      if (prop === 'li') return fallbacks.MotionLi;
      
      // If we don't have a specific fallback, return MotionDiv as default
      console.warn(`No specific fallback for motion.${String(prop)}, using div instead`);
      return fallbacks.MotionDiv;
    }
  });
  
  AnimatePresence = fallbacks.AnimatePresence;
}

// Re-export the components
export { motion, AnimatePresence };

// Export a utility to check if we're using real framer-motion or fallbacks
export const useRealFramerMotion = isFramerMotionAvailable;
