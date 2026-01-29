import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Link } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { Helmet } from 'react-helmet-async';
import { MapPin, Home, Mountain, Waves, Flame, Star, ArrowRight, Check } from 'lucide-react';

export function GiteArrensMarsousPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gites = [
    { nom: 'Le Suyen', surface: '50m²', image: 'https://i.postimg.cc/FFcpb6LX/7588570501155327596.jpg' },
    { nom: 'Le Tech', surface: '50m²', image: 'https://i.postimg.cc/sfQJLy0X/2856943310074011028.jpg' },
    { nom: "L'Estaing", surface: '65m²', image: 'https://i.postimg.cc/x12r0yfD/IMG-3567.jpg' },
    { nom: 'Le Soum', surface: '50m²', image: 'https://i.postimg.cc/SKksq5yk/unnamed.jpg' },
  ];

  const proximite = [
    { lieu: "Village d'Arrens-Marsous", distance: '5 min à pied', icon: Home },
    { lieu: 'Stations de ski', distance: '15-30 min en voiture', icon: Mountain },
    { lieu: 'Lacs de montagne', distance: 'Accessible en randonnée', icon: Waves },
    { lieu: 'Lourdes', distance: '25 km (35 min)', icon: MapPin },
  ];

  const activites = [
    'Randonnées tous niveaux (GR10, lacs)',
    'VTT et cyclotourisme (Col du Soulor)',
    'Ski alpin et raquettes en hiver',
    'Pêche en rivière et lacs',
    'Parapente et sports aériens',
    'Thermalisme à Cauterets (30 min)',
    'Visite du Parc National des Pyrénées',
    'Gastronomie et marchés locaux',
  ];

  const equipements = [
    'Chambre avec lit double',
    'Salle de bain privative',
    'Cuisine équipée complète',
    'Salon cosy',
    'Wi-Fi gratuit',
    'Chauffage',
    'Linge de maison fourni',
    'Vue sur montagnes',
  ];

  return (
    <>
      <Helmet>
        <title>Gîte à Arrens-Marsous - Location 2 Personnes Val d'Azun Pyrénées</title>
        <meta name="description" content="Location de gîte à Arrens-Marsous dans le Val d'Azun. 4 hébergements tout confort pour 2 personnes avec bain nordique et sauna. À 5 min du village à pied." />
        <link rel="canonical" href="https://lesgitesdusoulor.fr/gite-arrens-marsous" />
      </Helmet>

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2d3843]/50 to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-4"
              >
                <MapPin className="w-16 h-16 text-[#c4a574] mx-auto" />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl text-white mb-6" style={{ fontFamily: 'serif' }}>
                Gîte à Arrens-Marsous
              </h1>
              <p className="text-white/70 text-xl max-w-3xl mx-auto">
                Votre hébergement de charme au cœur du Val d'Azun dans les Hautes-Pyrénées
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction SEO */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
              >
                <p className="text-white/80 leading-relaxed mb-6">
                  Vous recherchez un <strong className="text-[#c4a574]">gîte à Arrens-Marsous</strong> pour vos prochaines vacances dans les Pyrénées ? Les Gîtes du Soulor vous accueillent dans un cadre exceptionnel au cœur du <strong className="text-[#c4a574]">Val d'Azun</strong>, à seulement 5 minutes à pied du charmant village d'Arrens-Marsous.
                </p>
                
                <h2 className="text-2xl text-white mb-4 mt-8" style={{ fontFamily: 'serif' }}>
                  Pourquoi choisir nos gîtes à Arrens-Marsous
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Arrens-Marsous est un village de montagne authentique situé à 885 mètres d'altitude dans les Hautes-Pyrénées (65). Porte d'entrée du Parc National des Pyrénées, ce village de caractère offre un cadre idéal pour un séjour nature, que vous veniez pour randonner en été, skier en hiver ou simplement vous ressourcer au calme.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Nos 4 gîtes se situent au Col du Soulor, position stratégique qui combine tranquillité absolue et proximité immédiate des commerces et services du village. Vous profitez ainsi du meilleur des deux mondes : le calme de la montagne et la commodité d'un village vivant.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nos 4 Gîtes */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl text-white mb-4" style={{ fontFamily: 'serif' }}>
                Nos 4 gîtes de charme pour 2 personnes
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Le Suyen, Le Tech, L'Estaing et Le Soum : quatre hébergements tout confort avec bain nordique et sauna
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {gites.map((gite, index) => (
                <motion.div
                  key={gite.nom}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#c4a574]/30 transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={gite.image} 
                        alt={gite.nom}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl text-white font-semibold">{gite.nom}</h3>
                        <Star className="w-5 h-5 text-[#c4a574]" />
                      </div>
                      <p className="text-white/60 text-sm mb-4">
                        {gite.surface} • 2 personnes
                      </p>
                      <Link 
                        to="/gites" 
                        className="inline-flex items-center gap-2 text-[#c4a574] hover:text-[#d4b584] transition-colors text-sm"
                      >
                        <span>Découvrir</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Équipements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                <h3 className="text-2xl text-white mb-6 text-center" style={{ fontFamily: 'serif' }}>
                  Équipements inclus dans chaque gîte
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {equipements.map((equip, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white/80">
                      <Check className="w-5 h-5 text-[#c4a574] flex-shrink-0" />
                      <span>{equip}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-[#c4a574] font-semibold text-center flex items-center justify-center gap-2">
                    <Flame className="w-5 h-5" />
                    Bain nordique chauffé au feu de bois et sauna inclus
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Arrens-Marsous Village */}
        <section className="py-16 bg-gradient-to-b from-transparent via-[#2d3843]/30 to-transparent relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="text-4xl text-white mb-4" style={{ fontFamily: 'serif' }}>
                  Arrens-Marsous : un village de montagne authentique
                </h2>
              </motion.div>

              <div className="prose prose-invert prose-lg max-w-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
                >
                  <p className="text-white/80 leading-relaxed mb-6">
                    Arrens-Marsous (1 200 habitants) est l'un des plus beaux villages du Val d'Azun. Ce village pyrénéen authentique a su préserver son caractère traditionnel tout en offrant tous les services nécessaires à un séjour confortable.
                  </p>
                  
                  <h3 className="text-xl text-white mb-4">Ce que vous trouverez au village :</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>Commerces de proximité (boulangerie, épicerie, boucherie)</li>
                    <li>Restaurants typiques proposant cuisine pyrénéenne</li>
                    <li>Office de Tourisme avec conseils randonnées</li>
                    <li>Départ de nombreux sentiers balisés</li>
                    <li>Architecture pyrénéenne traditionnelle préservée</li>
                    <li>Église Saint-Félix du XIIe siècle</li>
                    <li>Marchés locaux en saison</li>
                  </ul>
                  
                  <p className="text-white/80 leading-relaxed mt-6">
                    Le village est particulièrement apprécié des amoureux de la montagne pour son authenticité préservée et son accès direct au Parc National des Pyrénées.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* À proximité */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl text-white mb-4" style={{ fontFamily: 'serif' }}>
                À proximité de nos gîtes
              </h2>
              <p className="text-white/70 text-lg">Distances depuis Les Gîtes du Soulor</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {proximite.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.lieu}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#c4a574]/30 transition-all duration-300 text-center"
                  >
                    <Icon className="w-10 h-10 text-[#c4a574] mx-auto mb-4" />
                    <h3 className="text-white mb-2 font-semibold">{item.lieu}</h3>
                    <p className="text-white/60 text-sm">{item.distance}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Activités */}
        <section className="py-16 bg-gradient-to-b from-transparent via-[#2d3843]/30 to-transparent relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl text-white mb-4" style={{ fontFamily: 'serif' }}>
                  Activités et découvertes autour d'Arrens-Marsous
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activites.map((activite, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <Check className="w-5 h-5 text-[#c4a574] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{activite}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
              >
                <h3 className="text-xl text-white mb-4">Saisons et activités</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/70">
                  <div>
                    <h4 className="text-[#c4a574] font-semibold mb-2">En été</h4>
                    <p className="text-sm">Randonnées tous niveaux, VTT, pêche, parapente, baignades en lacs de montagne</p>
                  </div>
                  <div>
                    <h4 className="text-[#c4a574] font-semibold mb-2">En hiver</h4>
                    <p className="text-sm">Ski alpin, ski de fond, raquettes, chiens de traîneau, ski de randonnée</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Réservation */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20 rounded-3xl blur-2xl" />
              <div className="relative p-10 rounded-3xl border border-[#c4a574]/30 bg-gradient-to-br from-[#2d3843]/90 to-[#3a4a5a]/90 backdrop-blur-sm text-center">
                <h3 className="text-3xl text-white mb-4" style={{ fontFamily: 'serif' }}>
                  Réservez votre gîte à Arrens-Marsous
                </h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  Disponible pour week-end (2 nuits minimum), mi-semaine ou semaine complète. 
                  Acompte de 30% à la réservation, solde à l'arrivée. Chèques vacances acceptés.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-1">Week-end</p>
                    <p className="text-[#c4a574] text-xl font-semibold">400€ - 450€</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-1">Semaine</p>
                    <p className="text-[#c4a574] text-xl font-semibold">1150€ - 1350€</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-1">À la nuit</p>
                    <p className="text-[#c4a574] text-xl font-semibold">150€ - 180€</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/tarifs">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-[#c4a574] to-[#d4b584] text-white font-semibold hover:from-[#d4b584] hover:to-[#c4a574] transition-all shadow-lg"
                    >
                      Voir tous les tarifs
                    </motion.button>
                  </Link>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-full border-2 border-[#c4a574] text-[#c4a574] font-semibold hover:bg-[#c4a574]/10 transition-all"
                    >
                      Nous contacter
                    </motion.button>
                  </Link>
                </div>

                <p className="text-white/50 text-sm mt-6">
                  Téléphone : +33 6 45 79 59 39 | Email : spanazol@wanadoo.fr
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Liens internes SEO */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
              >
                <h3 className="text-xl text-white mb-6 text-center">Découvrez aussi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/gite-val-azun" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#c4a574]/30 transition-all group">
                    <h4 className="text-white group-hover:text-[#c4a574] transition-colors mb-1 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Gîte dans le Val d'Azun
                    </h4>
                    <p className="text-white/60 text-sm">Découvrez la vallée</p>
                  </Link>
                  <Link to="/gite-bain-nordique-pyrenees" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#c4a574]/30 transition-all group">
                    <h4 className="text-white group-hover:text-[#c4a574] transition-colors mb-1 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Gîte avec bain nordique
                    </h4>
                    <p className="text-white/60 text-sm">Expérience unique</p>
                  </Link>
                  <Link to="/bien-etre" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#c4a574]/30 transition-all group">
                    <h4 className="text-white group-hover:text-[#c4a574] transition-colors mb-1 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Bien-être & Détente
                    </h4>
                    <p className="text-white/60 text-sm">Sauna et bain nordique</p>
                  </Link>
                  <Link to="/sejour-bien-etre-pyrenees" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#c4a574]/30 transition-all group">
                    <h4 className="text-white group-hover:text-[#c4a574] transition-colors mb-1 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Séjour bien-être
                    </h4>
                    <p className="text-white/60 text-sm">Ressourcement total</p>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}