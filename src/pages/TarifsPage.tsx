import { motion } from 'motion/react'; // Ajout de motion
import { DollarSign, Home, Users, Sparkles, Info, Heart, Check, Moon, Calendar, Sunrise, Leaf, Sun, Snowflake, Euro, AlertCircle, ArrowRight, X } from 'lucide-react'; // Ajout des icônes manquantes
import { EditableText } from '../components/admin/EditableText';
import { useAdmin } from '../contexts/AdminContext';
import { Link } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export function TarifsPage() {
  const { content } = useAdmin();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen bg-[#3a4a5a] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  // Utiliser les tarifs réels du site
  const tarifs = Array.isArray(content.tarifs) && content.tarifs.length > 0 ? content.tarifs : [
    {
      type: 'Nuitée',
      subtitle: 'Séjour flexible à la nuitée',
      icon: 'Moon',
      prices: [
        { season: 'Basse Saison', price: '150€', unit: 'la nuit', icon: 'Leaf', color: 'from-green-400/20 to-emerald-600/20' },
        { season: 'Moyenne', price: '165€', unit: 'la nuit', icon: 'Sun', color: 'from-yellow-400/20 to-orange-500/20' },
        { season: 'Haute Saison', price: '180€', unit: 'la nuit', icon: 'Snowflake', color: 'from-blue-400/20 to-cyan-600/20' },
      ],
    },
    {
      type: 'Séjour 2 Nuits ou Plus',
      subtitle: 'Tarif dégressif à partir de 2 nuits',
      note: 'REMISE DE 30% APPLIQUÉE',
      icon: 'Calendar',
      prices: [
        { season: 'Basse Saison', price: '125€', unit: 'la nuit', icon: 'Leaf', color: 'from-green-400/20 to-emerald-600/20' },
        { season: 'Moyenne', price: '140€', unit: 'la nuit', icon: 'Sun', color: 'from-yellow-400/20 to-orange-500/20' },
        { season: 'Haute Saison', price: '150€', unit: 'la nuit', icon: 'Snowflake', color: 'from-blue-400/20 to-cyan-600/20' },
      ],
    },
    {
      type: 'La Semaine',
      subtitle: 'Séjour complet 7 jours',
      icon: 'Sunrise',
      prices: [
        { season: 'Basse Saison', price: '875€', icon: 'Leaf', color: 'from-green-400/20 to-emerald-600/20' },
        { season: 'Moyenne', price: '980€', icon: 'Sun', color: 'from-yellow-400/20 to-orange-500/20' },
        { season: 'Haute Saison', price: '1050€', icon: 'Snowflake', color: 'from-blue-400/20 to-cyan-600/20' },
      ],
    },
  ];

  const iconMap: { [key: string]: any } = {
    Moon,
    Calendar,
    Sunrise,
    Leaf,
    Sun,
    Snowflake,
  };

  const conditions = [
    {
      icon: Home,
      titre: 'Arrivée / Départ',
      description: 'Arrivée : à partir de 16h00 | Départ : avant 11h00',
    },
    {
      icon: Users,
      titre: 'Flexibilité',
      description: 'Séjours acceptés dès 1 nuitée. Tarif dégressif appliqué automatiquement à partir de 2 nuits.',
    },
    {
      icon: Sparkles,
      titre: 'Modalités de paiement',
      description: 'Acompte de 30% à la réservation, solde à l\'arrivée. Paiements acceptés : espèces, carte bancaire, virement.',
    },
    {
      icon: Info,
      titre: 'Annulation',
      description: 'Remboursement intégral jusqu\'à 15 jours avant l\'arrivée. Contactez-nous pour plus d\'informations.',
    },
  ];

  const inclus = [
    'Linge de maison (draps et serviettes)',
    'Ménage de fin de séjour',
    'Chauffage et électricité',
    'Wi-Fi',
    'Parking privé gratuit',
    'Accès à l\'espace bien-être',
    'Tout l\'équipement nécessaire fourni',
    'Documentation touristique locale',
  ];

  return (
    <>
      <Helmet>
        <title>Tarifs Gîtes Arrens-Marsous - Dès 125€/Nuit | Les Gîtes du Soulor</title>
        <meta name="description" content="Tarifs de nos gîtes 2 personnes à Arrens-Marsous : dès 150€/nuit, remise 30% à partir de 2 nuits (125€/nuit), semaine dès 875€. Réservez votre séjour dans les Pyrénées." />
        <link rel="canonical" href="https://lesgitesdusoulor.fr/tarifs" />
      </Helmet>

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2d3843]/50 to-transparent" />
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#c4a574] rounded-full"
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
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div
                className="inline-block mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Euro className="w-16 h-16 text-[#c4a574] mx-auto" />
              </motion.div>
              <EditableText
                path="pages.tarifs.titre"
                value={content.pages?.tarifs?.titre || 'Nos Tarifs'}
                as="h1"
                className="text-5xl text-white mb-4"
                style={{ fontFamily: 'serif' }}
              />
              <EditableText
                path="pages.tarifs.sousTitre"
                value={content.pages?.tarifs?.sousTitre || 'Des prix transparents pour un séjour d\'exception'}
                as="p"
                className="text-white/70 text-xl max-w-2xl mx-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Texte SEO Introduction */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
              >
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-white/90 leading-relaxed mb-6">
                    Découvrez nos <strong className="text-[#c4a574]">tarifs transparents</strong> pour un séjour dans nos gîtes de montagne à <strong className="text-[#c4a574]">Arrens-Marsous</strong>, au cœur du Val d'Azun dans les <strong className="text-[#c4a574]">Hautes-Pyrénées</strong>. Que vous souhaitiez réserver pour une nuitée, plusieurs jours ou un séjour complet d'une semaine, nous proposons des formules adaptées à tous vos besoins.
                  </p>
                  
                  <p className="text-white/80 leading-relaxed mb-6">
                    Nos 4 gîtes pour 2 personnes (<strong>Le Suyen</strong>, <strong>Le Tech</strong>, <strong>L'Estaing</strong> et <strong>Le Soum</strong>) offrent le même niveau de confort et les mêmes tarifs. Tous nos prix incluent le linge de maison, le ménage de fin de séjour, le chauffage, le Wi-Fi et l'accès à nos équipements bien-être.
                  </p>

                  <h2 className="text-2xl text-white mb-4 mt-8" style={{ fontFamily: 'serif' }}>
                    Nos Formules de Séjour
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-2">Nuitée</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Séjours flexibles à la nuitée, sans durée minimum. Idéal pour une escapade courte ou prolongée selon vos envies. Tarifs de <strong className="text-white">150€ à 180€ par nuit</strong> selon la saison.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-2">Séjour 2 Nuits ou Plus</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Bénéficiez d'une remise de 30% dès la 2ème nuit ! Profitez du calme pyrénéen avec un tarif avantageux. Tarifs de <strong className="text-white">125€ à 150€ par nuit</strong>.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-2">La Semaine Complète</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Pour un ressourcement total, optez pour un séjour de 7 jours complet. Tarifs de <strong className="text-white">875€ à 1050€</strong> selon la saison.
                      </p>
                    </div>
                  </div>

                  <p className="text-white/70 leading-relaxed text-sm">
                    Nos tarifs varient selon trois périodes : <strong className="text-white">basse saison</strong> (printemps/automne hors vacances), <strong className="text-white">moyenne saison</strong> (été hors juillet-août) et <strong className="text-white">haute saison</strong> (vacances scolaires, fêtes de fin d'année, février-mars pour le ski).
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Options */}
        <section className="py-8 relative">
          <div className="container mx-auto px-4">
            <div className="space-y-12 max-w-6xl mx-auto">
              {tarifs.map((option, optionIndex) => {
                const OptionIcon = iconMap[option.icon] || Calendar;
                return (
                  <motion.div
                    key={option.type}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: optionIndex * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/5 via-transparent to-[#5a7a9f]/5 rounded-3xl" />
                    <div className="relative p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 rounded-full bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20">
                          <OptionIcon className="w-8 h-8 text-[#c4a574]" />
                        </div>
                        <div>
                          <EditableText
                            path={`tarifs.${optionIndex}.type`}
                            value={option.type}
                            as="h2"
                            className="text-3xl text-white"
                            style={{ fontFamily: 'serif' }}
                          />
                          <EditableText
                            path={`tarifs.${optionIndex}.subtitle`}
                            value={option.subtitle}
                            as="p"
                            className="text-white/60"
                          />
                          {option.note && (
                            <EditableText
                              path={`tarifs.${optionIndex}.note`}
                              value={option.note}
                              as="p"
                              className="text-[#c4a574] text-sm mt-1"
                            />
                          )}
                        </div>
                      </div>

                      {/* Prices Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {option.prices.map((priceItem, priceIndex) => {
                          const PriceIcon = iconMap[priceItem.icon] || Sun;
                          return (
                            <motion.div
                              key={priceItem.season}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 * priceIndex }}
                              whileHover={{ y: -5 }}
                              className="relative group"
                            >
                              <div className={`absolute inset-0 bg-gradient-to-br ${priceItem.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 group-hover:border-[#c4a574]/30 transition-all duration-300" />
                              
                              <div className="relative p-6 text-center">
                                <PriceIcon className="w-8 h-8 text-[#c4a574] mx-auto mb-3" />
                                <EditableText
                                  path={`tarifs.${optionIndex}.prices.${priceIndex}.season`}
                                  value={priceItem.season}
                                  as="div"
                                  className="text-white/80 text-sm mb-2"
                                />
                                <EditableText
                                  path={`tarifs.${optionIndex}.prices.${priceIndex}.price`}
                                  value={priceItem.price}
                                  as="div"
                                  className="text-3xl text-white mb-1"
                                />
                                {priceItem.unit && (
                                  <EditableText
                                    path={`tarifs.${optionIndex}.prices.${priceIndex}.unit`}
                                    value={priceItem.unit}
                                    as="div"
                                    className="text-white/60 text-sm"
                                  />
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ce qui est inclus */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Check className="w-12 h-12 text-[#c4a574] mx-auto mb-4" />
              <EditableText
                path="pages.tarifs.inclusTitre"
                value={content.pages?.tarifs?.inclusTitre || 'Ce qui est inclus dans nos tarifs'}
                as="h2"
                className="text-3xl text-white mb-4"
                style={{ fontFamily: 'serif' }}
              />
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inclus.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <Check className="w-5 h-5 text-[#c4a574] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <EditableText
                      path={`pages.tarifs.inclus.${index}`}
                      value={item}
                      as="span"
                      className="text-white/80"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conditions de réservation */}
        <section className="py-16 bg-gradient-to-b from-transparent via-[#2d3843]/30 to-transparent relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <AlertCircle className="w-12 h-12 text-[#c4a574] mx-auto mb-4" />
              <EditableText
                path="pages.tarifs.conditionsTitre"
                value={content.pages?.tarifs?.conditionsTitre || 'Conditions de réservation'}
                as="h2"
                className="text-3xl text-white mb-4"
                style={{ fontFamily: 'serif' }}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {conditions.map((condition, index) => {
                const Icon = condition.icon;
                return (
                  <motion.div
                    key={condition.titre}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/5 via-transparent to-[#5a7a9f]/5 rounded-2xl border border-white/5 group-hover:border-[#c4a574]/30 transition-all duration-300" />
                    
                    <div className="relative p-6">
                      <motion.div
                        className="flex items-start gap-4"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-3 rounded-full bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20 group-hover:from-[#c4a574]/30 group-hover:to-[#5a7a9f]/30 transition-all duration-300 flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#c4a574]" />
                        </div>
                        <div>
                          <EditableText
                            path={`pages.tarifs.conditions.${index}.titre`}
                            value={condition.titre}
                            as="h3"
                            className="text-white text-xl mb-2 group-hover:text-[#c4a574] transition-colors"
                          />
                          <EditableText
                            path={`pages.tarifs.conditions.${index}.description`}
                            value={condition.description}
                            as="p"
                            className="text-white/70 leading-relaxed"
                            multiline
                          />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Note importante */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
              {/* Chèques vacances NON acceptés */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl blur-xl" />
                <div className="relative p-6 rounded-2xl border border-red-500/30 bg-[#2d3843]/50 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white text-lg mb-2">Chèques Vacances</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Les chèques vacances ne sont pas acceptés comme moyen de paiement.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Moyens de paiement acceptés */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
                <div className="relative p-6 rounded-2xl border border-green-500/30 bg-[#2d3843]/50 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white text-lg mb-2">Paiements Acceptés</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Espèces, carte bancaire et virement bancaire.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/10 to-[#5a7a9f]/10 rounded-2xl blur-xl" />
              <div className="relative p-8 rounded-2xl border border-[#c4a574]/20 bg-[#2d3843]/50 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-[#c4a574] flex-shrink-0 mt-1" />
                  <div>
                    <EditableText
                      path="pages.tarifs.noteImportante"
                      value={content.pages?.tarifs?.noteImportante || 'Les tarifs sont indiqués pour 2 personnes. Tous nos gîtes sont conçus pour accueillir 2 personnes maximum. Pour toute demande spécifique ou réservation de dernière minute, n\'hésitez pas à nous contacter directement.'}
                      as="p"
                      className="text-white/80 leading-relaxed"
                      multiline
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Réservation */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <Link to="https://gite-soulor-reservation.netlify.app/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#c4a574] to-[#d4b584] text-white font-semibold flex items-center justify-center gap-3 mx-auto hover:from-[#d4b584] hover:to-[#c4a574] transition-all shadow-lg text-lg"
                >
                  Réserver maintenant
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}