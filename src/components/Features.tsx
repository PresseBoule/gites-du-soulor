import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Waves, Flame, Wind, MapPin } from 'lucide-react';

const features = [
  { label: 'Sauna', icon: Flame, value: '2/4' },
  { label: 'Balneo', icon: Waves, value: '1/4' },
  { label: 'Hamac', icon: Wind, value: '4/4' },
  { label: 'Accès station', icon: MapPin, value: '5mn' },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 bg-[#34495e]">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center text-white mb-12">NOS TYPES</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-[#2c3e50] rounded-lg p-6 text-center cursor-pointer group"
                >
                  <motion.div
                    className="mb-4 flex justify-center"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-[#d4a574]" />
                  </motion.div>
                  <h3 className="text-white mb-2">{feature.label}</h3>
                  <p className="text-[#d4a574]">{feature.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
