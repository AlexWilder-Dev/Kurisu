import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
