import { motion, AnimatePresence } from 'motion/react';
import { Mountain } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#2d3843] via-[#3a4a5a] to-[#4a5a6a]"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Mountain icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1,
                type: 'spring',
                stiffness: 100,
                damping: 10
              }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#c4a574] to-[#d4b584] blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Icon */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Mountain className="w-20 h-20 text-[#c4a574] relative" strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.div>

            {/* Title with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-2"
            >
              <h1
                className="text-4xl md:text-5xl tracking-[0.2em] bg-gradient-to-r from-white via-[#c4a574] to-white bg-clip-text text-transparent"
                style={{ fontFamily: 'serif' }}
              >
                LES GÎTES DU
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <h1
                className="text-4xl md:text-5xl tracking-[0.2em] bg-gradient-to-r from-white via-[#c4a574] to-white bg-clip-text text-transparent"
                style={{ fontFamily: 'serif' }}
              >
                SOULOR
              </h1>
            </motion.div>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center gap-2 mb-8"
            >
              <div className="h-1 w-20 bg-[#c4a574] rounded-full" />
              <div className="h-1 w-2 bg-[#c4a574] rounded-full" />
              <div className="h-1 w-8 bg-[#c4a574] rounded-full" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-white/60 tracking-wider text-sm mb-12"
            >
              Pyrénées - Arrens-Marsous
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="relative w-64 h-1 mx-auto bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#c4a574] via-[#d4b584] to-[#c4a574]"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-white/40 text-xs mt-6 tracking-widest"
            >
              CHARGEMENT...
            </motion.p>
          </div>

          {/* Corner decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#c4a574] rounded-tl-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#c4a574] rounded-tr-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#c4a574] rounded-bl-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#c4a574] rounded-br-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
