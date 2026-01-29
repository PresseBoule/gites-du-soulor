import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar, Moon, Sunrise, Snowflake, Sun, Leaf } from 'lucide-react';
import { EditableText } from './admin/EditableText';
import { useAdmin } from '../contexts/AdminContext';

const defaultPricingData = [
  {
    type: 'Week-End',
    subtitle: 'Vendredi 16h à Dimanche 11h',
    icon: 'Moon',
    prices: [
      { season: 'Basse Saison', price: '400€', icon: 'Leaf', color: 'from-green-400/20 to-emerald-600/20' },
      { season: 'Moyenne', price: '425€', icon: 'Sun', color: 'from-yellow-400/20 to-orange-500/20' },
      { season: 'Haute Saison', price: '450€', icon: 'Snowflake', color: 'from-blue-400/20 to-cyan-600/20' },
    ],
  },
  {
    type: 'Séjour en Semaine',
    subtitle: 'Dimanche 16h au Vendredi 11h',
    note: 'MINIMUM 2 NUITS',
    icon: 'Calendar',
    prices: [
      { season: 'Basse Saison', price: '150€', unit: 'la nuit', icon: 'Leaf', color: 'from-green-400/20 to-emerald-600/20' },
      { season: 'Moyenne', price: '165€', unit: 'la nuit', icon: 'Sun', color: 'from-yellow-400/20 to-orange-500/20' },
      { season: 'Haute Saison', price: '180€', unit: 'la nuit', icon: 'Snowflake', color: 'from-blue-400/20 to-cyan-600/20' },
    ],
  },
  {
    type: 'La Semaine',
    subtitle: 'Séjour complet 7 jours',
    icon: 'Sunrise',
    prices: [
      { season: 'Basse Saison', price: '1150€', icon: 'Leaf', color: 'from-green-400/20 to-emerald-600/20' },
      { season: 'Moyenne', price: '1250€', icon: 'Sun', color: 'from-yellow-400/20 to-orange-500/20' },
      { season: 'Haute Saison', price: '1350€', icon: 'Snowflake', color: 'from-blue-400/20 to-cyan-600/20' },
    ],
  },
];

interface PricingProps {
  tarifs?: any[];
}

export function Pricing({ tarifs }: PricingProps = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useAdmin();

  const pricingData = (content?.tarifs && Array.isArray(content.tarifs) && content.tarifs.length > 0) 
    ? content.tarifs 
    : defaultPricingData;

  const iconMap: { [key: string]: any } = {
    Moon,
    Calendar,
    Sunrise,
    Leaf,
    Sun,
    Snowflake,
  };

  const seasonIconMap: { [key: string]: any } = {
    Leaf,
    Sun,
    Snowflake,
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d3843] via-[#3a4a5a] to-[#2d3843]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/50 to-transparent" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#c4a574]/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#5a7a9f]/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#c4a574]/20 to-[#5a7a9f]/20 border border-[#c4a574]/30">
              <p className="text-[#c4a574]">Nos Tarifs</p>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl text-white mb-4 bg-gradient-to-r from-white via-[#c4a574] to-white bg-clip-text text-transparent" style={{ fontFamily: 'serif' }}>
            Tarifs & Disponibilités
          </h2>
          <motion.div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#c4a574] to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingData.map((option, index) => {
            const Icon = iconMap[option.icon] || Calendar;
            return (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Card glow effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-br from-[#c4a574]/20 via-[#5a7a9f]/20 to-[#c4a574]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(196,165,116,0.2), rgba(90,122,159,0.2), rgba(196,165,116,0.2))',
                        'linear-gradient(135deg, rgba(90,122,159,0.2), rgba(196,165,116,0.2), rgba(90,122,159,0.2))',
                        'linear-gradient(135deg, rgba(196,165,116,0.2), rgba(90,122,159,0.2), rgba(196,165,116,0.2))',
                      ],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />

                  {/* Card content */}
                  <div className="relative h-full bg-gradient-to-br from-[#2d3843] to-[#3a4a5a] rounded-3xl border border-white/10 overflow-hidden">
                    {/* Top decoration */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c4a574] to-transparent opacity-50" />
                    
                    <div className="p-8">
                      {/* Icon & Title */}
                      <motion.div
                        className="flex items-center justify-center mb-6"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#c4a574]/30 to-[#5a7a9f]/30 group-hover:from-[#c4a574]/50 group-hover:to-[#5a7a9f]/50 transition-all duration-300">
                          <Icon className="w-10 h-10 text-[#c4a574]" />
                        </div>
                      </motion.div>

                      <EditableText
                        path={`tarifs.${index}.type`}
                        value={option.type}
                        as="h3"
                        className="text-2xl text-white text-center mb-2 group-hover:text-[#c4a574] transition-colors"
                      />
                      <EditableText
                        path={`tarifs.${index}.subtitle`}
                        value={option.subtitle}
                        as="p"
                        className="text-white/60 text-center mb-1"
                      />
                      {option.note && (
                        <EditableText
                          path={`tarifs.${index}.note`}
                          value={option.note}
                          as="p"
                          className="text-[#c4a574] text-center mb-6"
                        />
                      )}

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                      {/* Prices */}
                      <div className="space-y-4">
                        {(option.prices || []).map((priceItem, priceIndex) => {
                          const SeasonIcon = seasonIconMap[priceItem.icon] || Leaf;
                          return (
                            <motion.div
                              key={priceItem.season}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ duration: 0.5, delay: index * 0.2 + priceIndex * 0.1 }}
                              whileHover={{ x: 4 }}
                              className="relative group/price"
                            >
                              <div className={`p-4 rounded-xl bg-gradient-to-br ${priceItem.color} border border-white/5 hover:border-[#c4a574]/30 transition-all duration-300`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <SeasonIcon className="w-5 h-5 text-white/70" />
                                    <div>
                                      <EditableText
                                        path={`tarifs.${index}.prices.${priceIndex}.season`}
                                        value={priceItem.season}
                                        as="p"
                                        className="text-white/70"
                                      />
                                      {priceItem.unit && (
                                        <EditableText
                                          path={`tarifs.${index}.prices.${priceIndex}.unit`}
                                          value={priceItem.unit}
                                          as="p"
                                          className="text-white/50 text-sm"
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <EditableText
                                      path={`tarifs.${index}.prices.${priceIndex}.price`}
                                      value={priceItem.price}
                                      as="p"
                                      className="text-2xl text-[#c4a574] group-hover/price:scale-110 transition-transform"
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* CTA Button */}
                      <motion.a
                        href="https://gite-soulor-reservation.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-[#c4a574] to-[#b89560] text-white font-medium hover:from-[#b89560] hover:to-[#c4a574] transition-all duration-300 shadow-lg shadow-[#c4a574]/20 text-center"
                      >
                        Réserver
                      </motion.a>
                    </div>

                    {/* Bottom corner decoration */}
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#c4a574]/20 rounded-br-2xl group-hover:border-[#c4a574]/50 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-[#2d3843]/50 to-[#3a4a5a]/50 border border-white/10">
            <p className="text-white/70 mb-2">
              Pour toute réservation ou information complémentaire
            </p>
            <a
              href="#contact"
              className="text-[#c4a574] hover:text-[#b89560] transition-colors underline underline-offset-4"
            >
              Contactez-nous
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
