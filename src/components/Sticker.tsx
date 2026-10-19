import { motion, useReducedMotion } from 'framer-motion';
import { asset } from '../lib/asset';

// The logo, treated like a sticker slapped on the page.
export function Sticker({ className, alt = 'Kurisu Omakase logo: Chris in a backwards cap, arms crossed, holding tuna nigiri and a knife.' }: { className?: string; alt?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.img
      src={asset('img/logo-480.webp')}
      alt={alt}
      width={480}
      height={517}
      className={className}
      initial={reduce ? false : { rotate: -14, scale: 0.6, opacity: 0 }}
      animate={{ rotate: 6, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
      whileHover={reduce ? undefined : { rotate: -4, scale: 1.04 }}
      whileTap={reduce ? undefined : { rotate: 12, scale: 0.96 }}
    />
  );
}
