import { motion, useReducedMotion } from 'framer-motion';

// A blowtorch flame. Small, and it flickers.
export function Flame({ size = 18 }: { size?: number }) {
  const reduce = useReducedMotion();
  const flicker = reduce
    ? undefined
    : { scaleY: [1, 1.18, 0.92, 1.1, 1], scaleX: [1, 0.92, 1.05, 0.96, 1] };
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 20 28" aria-hidden="true" style={{ overflow: 'visible' }}>
      <motion.g
        style={{ originX: '50%', originY: '100%' }}
        animate={flicker}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M10 1 C14 8 18 12 18 18 A8 8 0 0 1 2 18 C2 12 6 9 10 1 Z" fill="#f08a3c" stroke="#42210b" strokeWidth="2" />
        <path d="M10 10 C12 14 14 16 14 19 A4 4 0 0 1 6 19 C6 16 8 14 10 10 Z" fill="#c8d8df" />
      </motion.g>
    </svg>
  );
}
