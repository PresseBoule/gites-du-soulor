import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { EditableText } from './admin/EditableText';
import { EditableImage } from './admin/EditableImage';
import { useAdmin } from '../contexts/AdminContext';

export function HeroHome() {
  const { content } = useAdmin();

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
    size: 1 + Math.random() * 2,
  }));

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#3a4a5a] via-[#2d3843] to-[#3a4a5a] overflow-hidden flex items-center justify-center">
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Mountain silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a252f]/50 to-transparent pointer-events-none" />
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-32 text-[#1a252f]/30"
        viewBox="0 0 1440 120"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,60 L360,20 L720,40 L1080,10 L1440,30 L1440,120 L0,120 Z" />
      </svg>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#c4a574]/10 border border-[#c4a574]/30 backdrop-blur-sm mb-12"
          >
            <MapPin className="w-4 h-4 text-[#c4a574]" />
            <EditableText
              path="texts.heroLocation"
              value={content?.texts?.heroLocation || "Arrens-Marsous, Hautes-Pyrénées"}
              as="span"
              className="text-[#c4a574] text-sm tracking-wide"
            />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-8"
          >
            <EditableText
              path="texts.heroTitle"
              value={content?.texts?.heroTitle || "LES GÎTES DU SOULOR"}
              as="span"
              className="block text-5xl md:text-7xl lg:text-8xl text-[#c4a574] tracking-[0.2em] mb-6"
              style={{ fontFamily: 'serif' }}
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <EditableText
              path="texts.heroSubtitle"
              value={content?.texts?.heroSubtitle || "Votre Refuge d'Exception au Cœur des Pyrénées"}
              as="p"
              className="text-white/70 text-lg md:text-xl tracking-wide"
            />
          </motion.div>

          {/* Hero Image with golden frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Golden frame */}
            <div className="absolute -inset-6 bg-gradient-to-br from-[#c4a574] via-[#d4b584] to-[#c4a574] rounded-3xl opacity-80 blur-sm" />
            
            {/* Inner frame */}
            <div className="relative bg-gradient-to-br from-[#c4a574] via-[#d4b584] to-[#c4a574] p-6 rounded-3xl">
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <EditableImage
                  path="images.heroMain"
                  value={content?.images?.heroMain || "https://i.postimg.cc/BZMLXsYh/2022-10-10.jpg"}
                  alt="Les Gîtes du Soulor - Vue d'ensemble"
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
                
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a252f]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#c4a574]/50 rounded-tl-lg" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#c4a574]/50 rounded-tr-lg" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#c4a574]/50 rounded-bl-lg" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#c4a574]/50 rounded-br-lg" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex flex-col items-center gap-2"
            >
              <div className="w-6 h-10 border-2 border-[#c4a574]/50 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-2 bg-[#c4a574] rounded-full"
                />
              </div>
              <span className="text-white/40 text-xs tracking-widest">SCROLL</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Ambient glow effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c4a574]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5a7a9f]/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
}
