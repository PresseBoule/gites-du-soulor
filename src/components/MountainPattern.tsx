import { motion } from 'motion/react';

export function MountainPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg
        className="absolute bottom-0 w-full h-64"
        viewBox="0 0 1200 320"
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          d="M0,160 L50,140 L100,180 L200,100 L300,160 L400,80 L500,140 L600,60 L700,120 L800,100 L900,160 L1000,120 L1100,180 L1200,140 L1200,320 L0,320 Z"
          fill="currentColor"
          className="text-white"
        />
        <motion.path
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          d="M0,200 L100,160 L200,220 L300,140 L400,200 L500,120 L600,180 L700,100 L800,160 L900,140 L1000,200 L1100,160 L1200,200 L1200,320 L0,320 Z"
          fill="currentColor"
          className="text-white/50"
        />
      </svg>
    </div>
  );
}
