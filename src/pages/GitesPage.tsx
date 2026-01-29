import { motion } from 'motion/react';
import { EditableText } from '../components/admin/EditableText';
import { EditableImage } from '../components/admin/EditableImage';
import { Home, Users, Star, MapPin, Sparkles } from 'lucide-react';
import { GitesSection } from '../components/GitesSection';
import { useAdmin } from '../contexts/AdminContext';
import { Link } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export function GitesPage() {
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

  // Ensure gites is always an array
  const gitesData = Array.isArray(content.gites) ? content.gites : [
    {
      id: 'le-suyen',
      nom: 'Le Suyen',
      slug: 'le-suyen',
      description: 'Un espace intimiste et chaleureux, conçu pour votre confort',
      surface: '50m²',
      capacite: '2 personnes',
      imageMain: 'https://i.postimg.cc/FFcpb6LX/7588570501155327596.jpg',
      couleur: 'from-amber-500/20 to-orange-600/20',
    },
    {
      id: 'le-tech',
      nom: 'Le Tech',
      slug: 'le-tech',
      description: 'Un espace intimiste et chaleureux, conçu pour votre confort',
      surface: '50m²',
      capacite: '2 personnes',
      imageMain: 'https://i.postimg.cc/sfQJLy0X/2856943310074011028.jpg',
      couleur: 'from-blue-500/20 to-cyan-600/20',
    },
    {
      id: 'lestaing',
      nom: "L'Estaing",
      slug: 'lestaing',
      description: 'Un espace intimiste et chaleureux, conçu pour votre confort',
      surface: '65m²',
      capacite: '2 personnes',
      imageMain: 'https://i.postimg.cc/x12r0yfD/IMG-3567.jpg',
      couleur: 'from-emerald-500/20 to-teal-600/20',
    },
    {
      id: 'le-soum',
      nom: 'Le Soum',
      slug: 'le-soum',
      description: 'Un espace intimiste et chaleureux, conçu pour votre confort',
      surface: '50m²',
      capacite: '2 personnes',
      imageMain: 'https://i.postimg.cc/SKksq5yk/unnamed.jpg',
      couleur: 'from-purple-500/20 to-pink-600/20',
    },
  ];

  const equipementsCommuns = [
    { icon: Sparkles, nom: 'Wi-Fi' },
    { icon: Sparkles, nom: 'Cuisine Équipée' },
    { icon: Sparkles, nom: 'Salle de Bain Privée' },
    { icon: Sparkles, nom: 'Chauffage' },
  ];

  return (
    <div className="pt-24 pb-16">
      <Helmet>
        <title>Gîtes 2 Personnes Pyrénées - 4 Logements Tout Confort | Les Gîtes du Soulor</title>
        <meta name="description" content="Découvrez nos 4 gîtes pour 2 personnes à Arrens-Marsous : Le Suyen, Le Tech, L'Estaing et Le Soum. Hébergements tout confort en montagne, Hautes-Pyrénées." />
        <link rel="canonical" href="https://lesgitesdusoulor.fr/gites" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d3843]/50 to-transparent" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
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
              <Home className="w-16 h-16 text-[#c4a574] mx-auto" />
            </motion.div>
            <EditableText
              path="pages.gites.titre"
              value={content.pages?.gites?.titre || 'Nos Gîtes'}
              as="h1"
              className="text-5xl text-white mb-4"
              style={{ fontFamily: 'serif' }}
            />
            <EditableText
              path="pages.gites.sousTitre"
              value={content.pages?.gites?.sousTitre || 'Quatre havres de paix pour 2 personnes, chacun avec son caractère unique'}
              as="p"
              className="text-white/70 text-xl max-w-3xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
              <EditableText
                path="pages.gites.introduction"
                value={content.pages?.gites?.introduction || 'Chacun de nos quatre gîtes a été pensé pour accueillir confortablement 2 personnes dans un cadre intimiste et raffiné. Que vous recherchiez une escapade romantique, un séjour ressourçant ou une base pour vos aventures en montagne, vous trouverez ici votre refuge idéal.'}
                as="p"
                className="text-white/80 text-lg leading-relaxed text-center"
                multiline
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Liste des Gîtes */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="space-y-16 max-w-6xl mx-auto">
            {gitesData.map((gite, index) => (
              <motion.div
                key={gite.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <Link to={`/gites/${gite.slug}`} className="block relative">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <EditableImage
                        path={`gites.${index}.imageMain`}
                        src={gite.imageMain}
                        alt={gite.nom}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2d3843]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Badge "Voir le gîte" */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                        <div className="px-6 py-3 rounded-full bg-gradient-to-r from-[#c4a574] to-[#d4b584] text-white font-semibold shadow-lg">
                          Découvrir ce gîte →
                        </div>
                      </div>

                      {/* Corner decoration */}
                      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#c4a574]/50 rounded-tl-xl" />
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#c4a574]/50 rounded-br-xl" />
                    </motion.div>
                  </Link>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="w-6 h-6 text-[#c4a574]" />
                      <EditableText
                        path={`gites.${index}.nom`}
                        value={gite.nom}
                        as="h2"
                        className="text-4xl text-white"
                        style={{ fontFamily: 'serif' }}
                      />
                    </div>
                    
                    <EditableText
                      path={`gites.${index}.description`}
                      value={gite.description}
                      as="p"
                      className="text-white/70 text-lg leading-relaxed"
                      multiline
                    />
                  </div>

                  {/* Infos rapides */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <Home className="w-4 h-4 text-[#c4a574]" />
                      <EditableText
                        path={`gites.${index}.surface`}
                        value={gite.surface}
                        as="span"
                        className="text-white/80 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <Users className="w-4 h-4 text-[#c4a574]" />
                      <EditableText
                        path={`gites.${index}.capacite`}
                        value={gite.capacite}
                        as="span"
                        className="text-white/80 text-sm"
                      />
                    </div>
                  </div>

                  {/* Équipements */}
                  <div>
                    <h3 className="text-white/90 mb-3">Équipements inclus</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {equipementsCommuns.slice(0, 4).map((equip, idx) => {
                        const Icon = equip.icon;
                        return (
                          <motion.div
                            key={equip.nom}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="flex items-center gap-2 text-white/70 text-sm"
                          >
                            <Icon className="w-4 h-4 text-[#c4a574] flex-shrink-0" />
                            <span>{equip.nom}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={`/gites/${gite.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-2 text-[#c4a574] hover:text-[#d4b584] transition-colors"
                    >
                      <span className="font-semibold">Voir tous les détails</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipements communs détaillés */}
      <section className="py-16 bg-gradient-to-b from-transparent via-[#2d3843]/30 to-transparent relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <EditableText
              path="pages.gites.equipementsTitre"
              value={content.pages?.gites?.equipementsTitre || 'Équipements & Conforts'}
              as="h2"
              className="text-4xl text-white mb-4"
              style={{ fontFamily: 'serif' }}
            />
            <EditableText
              path="pages.gites.equipementsSousTitre"
              value={content.pages?.gites?.equipementsSousTitre || 'Tous nos gîtes sont équipés pour votre confort'}
              as="p"
              className="text-white/60 text-lg"
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {equipementsCommuns.map((equip, index) => {
              const Icon = equip.icon;
              return (
                <motion.div
                  key={equip.nom}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/5 via-transparent to-[#5a7a9f]/5 rounded-2xl border border-white/5 group-hover:border-[#c4a574]/30 transition-all duration-300" />
                  
                  <div className="relative p-6 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-center mb-3"
                    >
                      <div className="p-3 rounded-full bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20">
                        <Icon className="w-6 h-6 text-[#c4a574]" />
                      </div>
                    </motion.div>
                    <p className="text-white/80 text-sm">{equip.nom}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Localisation */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <MapPin className="w-12 h-12 text-[#c4a574] mx-auto mb-4" />
            <EditableText
              path="pages.gites.localisationTitre"
              value={content.pages?.gites?.localisationTitre || 'Un Emplacement Privilégié'}
              as="h2"
              className="text-4xl text-white mb-4"
              style={{ fontFamily: 'serif' }}
            />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-xl text-white mb-4">À proximité</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c4a574] mt-2 flex-shrink-0" />
                    <span>Village d'Arrens-Marsous : 5 min à pied</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c4a574] mt-2 flex-shrink-0" />
                    <span>Stations de ski : 15-30 min en voiture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c4a574] mt-2 flex-shrink-0" />
                    <span>Lacs de montagne : accessible en randonnée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c4a574] mt-2 flex-shrink-0" />
                    <span>Lourdes : 25 km</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-xl text-white mb-4">Activités</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c4a574] mt-2 flex-shrink-0" />
                    <span>Randonnées pédestres et VTT</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c4a574] mt-2 flex-shrink-0" />
                    <span>Ski alpin et raquettes en hiver</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c4a574] mt-2 flex-shrink-0" />
                    <span>Thermalisme à Cauterets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c4a574] mt-2 flex-shrink-0" />
                    <span>Découverte du patrimoine local</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20 rounded-3xl blur-2xl" />
            <div className="relative p-10 rounded-3xl border border-[#c4a574]/30 bg-gradient-to-br from-[#2d3843]/80 to-[#3a4a5a]/80 backdrop-blur-sm text-center">
              <EditableText
                path="pages.gites.ctaTitre"
                value={content.pages?.gites?.ctaTitre || 'Trouvez votre gîte idéal'}
                as="h3"
                className="text-3xl text-white mb-4"
                style={{ fontFamily: 'serif' }}
              />
              <EditableText
                path="pages.gites.ctaDescription"
                value={content.pages?.gites?.ctaDescription || 'Chaque gîte a son caractère unique. Explorez-les en détail pour trouver celui qui correspond le mieux à vos attentes.'}
                as="p"
                className="text-white/70 leading-relaxed mb-6"
                multiline
              />
              <a href="https://gite-soulor-reservation.netlify.app/" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#c4a574] to-[#d4b584] text-white font-semibold hover:from-[#d4b584] hover:to-[#c4a574] transition-all shadow-lg"
                >
                  Réserver maintenant
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}