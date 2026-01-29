import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { MapPin, Navigation, Mountain, Snowflake } from 'lucide-react';

export function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const points = [
    { icon: Snowflake, label: 'Station de ski', distance: '5 min' },
    { icon: Mountain, label: 'Col du Soulor', distance: '2 km' },
    { icon: Navigation, label: 'Randonnées', distance: 'Sur place' },
  ];

  return (
    <section id="location" className="py-20 bg-[#34495e]">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center text-white mb-12">NOTRE LOCALISATION</h2>

          <div className="max-w-4xl mx-auto">
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-[#2c3e50] rounded-lg p-8 mb-8"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <MapPin className="w-8 h-8 text-[#d4a574]" />
                </motion.div>
                <div>
                  <h3 className="text-white mb-2">Adresse</h3>
                  <p className="text-white/70">42 route du Soulor</p>
                  <p className="text-white/70">65400 Arrens-Marsous</p>
                  <p className="text-white/70 mt-2">Hautes-Pyrénées, France</p>
                </div>
              </div>
            </motion.div>

            {/* Points of Interest */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8 }}
                    className="bg-[#2c3e50] rounded-lg p-6 text-center"
                  >
                    <motion.div
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-6 h-6 text-[#d4a574]" />
                    </motion.div>
                    <h4 className="text-white mb-2">{point.label}</h4>
                    <p className="text-[#d4a574]">{point.distance}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="aspect-video bg-[#2c3e50] rounded-lg overflow-hidden relative group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-[#d4a574] mx-auto mb-4" />
                  <p className="text-white/60">Carte interactive</p>
                  <p className="text-white/40">À venir</p>
                </div>
              </div>
              <motion.div
                className="absolute inset-0 border-2 border-[#d4a574]/0 rounded-lg"
                whileHover={{ borderColor: '#d4a574' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
