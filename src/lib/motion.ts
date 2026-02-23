import type { Variants, Transition } from 'framer-motion';

// Stagger container — wraps children that use staggerItem
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Individual stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Full-page reveal
export const pageReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Horizontal slide (for quiz cards, tabs)
export const slideTransition: Variants = {
  enter: { x: 20, opacity: 0 },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    x: -20,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Spring scale (for quiz results, score reveals)
export const springScale: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', damping: 15, stiffness: 100 },
  },
};

// Sidebar drawer spring
export const drawerSpring: Transition = {
  type: 'spring',
  damping: 25,
  stiffness: 200,
};

// Expand/collapse (for hints, answers)
export const expandCollapse: Variants = {
  collapsed: { height: 0, opacity: 0, overflow: 'hidden' },
  expanded: {
    height: 'auto',
    opacity: 1,
    overflow: 'hidden',
    transition: { height: { duration: 0.25 }, opacity: { duration: 0.2, delay: 0.05 } },
  },
};
