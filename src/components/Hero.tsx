import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col">
      {/* First Image Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(https://i.postimg.cc/BZMLXsYh/2022-10-10.jpg)',
              filter: 'brightness(1.05) contrast(1.08) saturate(1.12)'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2c3e50]/40 to-[#2c3e50]" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white tracking-[0.3em] mb-4"
          >
            LES GITES DU SOULOR
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/90 max-w-2xl"
          >
            Quelle belle montagne pour se venir skier
          </motion.p>
        </div>
      </div>

      {/* Second Image Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute inset-0"
        >
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(https://i.postimg.cc/Dzpf7yyS/Les-Artigaux-appartements.jpg)',
              filter: 'brightness(1.05) contrast(1.08) saturate(1.12)'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2c3e50]/60 to-[#2c3e50]" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToFeatures}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}
