import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { GitesSection } from '../components/GitesSection';
import { WellnessSection } from '../components/WellnessSection';
import { CTASection } from '../components/CTASection';
import { useAdmin } from '../contexts/AdminContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { EditableText } from '../components/admin/EditableText';
import { EditableImage } from '../components/admin/EditableImage';
import { Calendar, Home, Map, Users, Ban } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  const { content } = useAdmin();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!content || !content.hero) {
    return (
      <div className="min-h-screen bg-[#3a4a5a] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Les Gîtes du Soulor - Location Gîte Arrens-Marsous Val d'Azun Pyrénées</title>
        <meta name="description" content="Location de gîtes 2 personnes à Arrens-Marsous dans le Val d'Azun, Hautes-Pyrénées. Bain nordique et sauna. 4 gîtes tout confort au cœur des Pyrénées." />
        <link rel="canonical" href="https://lesgitesdusoulor.fr/" />
      </Helmet>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-16 relative min-h-screen flex flex-col justify-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(196, 165, 116, 0.1) 35px, rgba(196, 165, 116, 0.1) 70px)`
          }} />
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
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
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Title */}
          <motion.div className="text-center mb-16">
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <EditableText
                path="hero.badge"
                value={content.hero.badge || 'Arrens-Marsous, Hautes-Pyrénées'}
                as="span"
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#c4a574]/10 via-[#5a7a9f]/10 to-[#c4a574]/10 border border-[#c4a574]/30 text-[#c4a574] backdrop-blur-sm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-block relative"
            >
              {/* Glow effect behind title */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#c4a574]/30 via-transparent to-[#5a7a9f]/30 blur-3xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <EditableText
                path="hero.titre"
                value={content.hero.titre ? content.hero.titre.toUpperCase() : 'LES GÎTES DU SOULOR'}
                as="h1"
                className="text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] bg-gradient-to-r from-white via-[#c4a574] to-white bg-clip-text text-transparent relative"
                style={{ fontFamily: 'serif' }}
              />
              
              {/* Animated underline */}
              <motion.div className="flex justify-center gap-2 mt-6">
                <motion.div
                  className="h-1 w-20 bg-[#c4a574] rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
                <motion.div
                  className="h-1 w-2 bg-[#c4a574] rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                />
                <motion.div
                  className="h-1 w-8 bg-[#c4a574] rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 1.1 }}
                />
              </motion.div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8 max-w-2xl mx-auto"
            >
              <EditableText
                path="hero.sousTitre"
                value={content.hero.sousTitre || 'Votre Refuge d\'Exception au Cœur des Pyrénées'}
                as="p"
                className="text-white/70 text-lg"
              />
            </motion.div>
          </motion.div>

          {/* Image with Side Panels - Ultra Modern */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="relative max-w-6xl mx-auto"
            style={{ perspective: '1000px' }}
          >
            {/* Enhanced glow effect */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-[#c4a574]/30 via-[#5a7a9f]/30 to-[#c4a574]/30 blur-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <div className="flex items-center gap-2 relative">
              {/* Left Panel with enhanced gradient and 3D effect */}
              <motion.div
                initial={{ x: -100, opacity: 0, rotateY: -45 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
                whileHover={{ x: -5, rotateY: -5 }}
                className="hidden md:block w-24 h-[450px] bg-gradient-to-br from-[#c4a574] via-[#d4b584] to-[#b89560] rounded-l-3xl shadow-2xl relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  style={{ transform: 'skewX(-20deg)' }}
                />
                
                {/* Geometric pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/2 w-16 h-16 border border-white rotate-45" />
                  <div className="absolute bottom-1/4 left-1/2 w-12 h-12 border border-white rotate-45" />
                </div>
              </motion.div>

              {/* Main Image with 3D hover effect */}
              <motion.div
                className="flex-1 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="h-[450px] relative overflow-hidden rounded-lg shadow-2xl">
                  <EditableImage
                    path="hero.imageMain"
                    src={content.hero.imageMain || 'https://i.postimg.cc/BZMLXsYh/2022-10-10.jpg'}
                    alt="Les Gîtes du Soulor"
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(1.05) contrast(1.08) saturate(1.12)'
                    }}
                  />
                  {/* Multi-layer gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d3843]/90 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/0 via-transparent to-[#5a7a9f]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Animated border particles */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#c4a574]/0 rounded-lg"
                    whileHover={{ borderColor: 'rgba(196, 165, 116, 0.6)' }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#c4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#c4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#c4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#c4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>

              {/* Right Panel with enhanced gradient and 3D effect */}
              <motion.div
                initial={{ x: 100, opacity: 0, rotateY: 45 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
                whileHover={{ x: 5, rotateY: 5 }}
                className="hidden md:block w-24 h-[450px] bg-gradient-to-bl from-[#b89560] via-[#d4b584] to-[#c4a574] rounded-r-3xl shadow-2xl relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['200%', '-100%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 1 }}
                  style={{ transform: 'skewX(20deg)' }}
                />

                {/* Geometric pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/3 right-1/2 w-16 h-16 border border-white rotate-45" />
                  <div className="absolute bottom-1/3 right-1/2 w-12 h-12 border border-white rotate-45" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section SEO Introduction */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-10 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-2xl"
            >
              <div className="prose prose-invert prose-lg max-w-none">
                <h2 className="text-3xl text-white mb-6 text-center" style={{ fontFamily: 'serif' }}>
                  Gîtes de Montagne à Arrens-Marsous, Val d'Azun
                </h2>
                
                <p className="text-white/90 leading-relaxed mb-6">
                  Bienvenue aux <strong className="text-[#c4a574]">Gîtes du Soulor</strong>, votre havre de paix au cœur des <strong className="text-[#c4a574]">Hautes-Pyrénées</strong>. Nous vous proposons <strong className="text-[#c4a574]">4 gîtes pour 2 personnes</strong> dans le charmant village d'<strong className="text-[#c4a574]">Arrens-Marsous</strong>, au pied du mythique <strong className="text-[#c4a574]">Col du Soulor</strong>. Que vous recherchiez un <strong>week-end romantique</strong>, une <strong>semaine de randonnée</strong> ou un <strong>séjour ressourçant avec bain nordique et sauna</strong>, nos hébergements de montagne vous offrent le cadre idéal pour vos vacances dans les Pyrénées.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xl text-[#c4a574] mb-4 flex items-center gap-2">
                      <Home className="w-5 h-5" />
                      Nos 4 Gîtes pour 2 Personnes
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm mb-3">
                      <strong className="text-white">Le Suyen</strong>, <strong className="text-white">Le Tech</strong>, <strong className="text-white">L'Estaing</strong> et <strong className="text-white">Le Soum</strong> : quatre gîtes tout confort, entièrement équipés, avec cuisine aménagée, salle de bain moderne, et un accès privilégié à nos équipements bien-être.
                    </p>
                    <p className="text-white/70 text-sm">
                      Tous nos gîtes sont indépendants, offrant intimité et tranquillité pour votre séjour en montagne.
                    </p>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xl text-[#c4a574] mb-4 flex items-center gap-2">
                      <Map className="w-5 h-5" />
                      Situation Géographique Idéale
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm mb-3">
                      Situés au cœur du <strong className="text-white">Val d'Azun</strong>, nos gîtes sont le point de départ parfait pour explorer le <strong>Parc National des Pyrénées</strong>, les <strong>stations de ski d'Hautacam et Grand Tourmalet</strong>, et les nombreux sentiers de randonnée de la région.
                    </p>
                    <p className="text-white/70 text-sm">
                      Accès facile : 30 min de Lourdes, 1h de Pau, 45 min de Tarbes.
                    </p>
                  </div>
                </div>

                <p className="text-white/80 leading-relaxed mb-6">
                  Le <strong>Val d'Azun</strong> est une vallée préservée des Pyrénées, réputée pour sa beauté naturelle et son authenticité. En séjournant dans nos gîtes à <strong>Arrens-Marsous</strong>, vous bénéficiez d'un accès privilégié aux <strong>cols mythiques du Soulor et d'Aubisque</strong>, aux <strong>lacs de montagne</strong> (lac d'Estaing, lac d'Ilhéou), et à une multitude d'activités outdoor : <em>randonnée pédestre</em>, <em>VTT</em>, <em>ski alpin et ski de fond</em> en hiver, <em>via ferrata</em>, et bien plus encore.
                </p>

                <div className="p-6 rounded-xl bg-gradient-to-br from-[#c4a574]/10 to-[#5a7a9f]/10 border border-[#c4a574]/20 mt-6">
                  <h3 className="text-xl text-white mb-3">Pourquoi choisir Les Gîtes du Soulor ?</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/80 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c4a574] mt-1">✓</span>
                      <span>4 gîtes modernes et tout équipés pour 2 personnes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c4a574] mt-1">✓</span>
                      <span>Bain nordique chauffé au feu de bois et sauna traditionnel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c4a574] mt-1">✓</span>
                      <span>Emplacement idéal au pied des montagnes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c4a574] mt-1">✓</span>
                      <span>Accès aux randonnées et stations de ski</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c4a574] mt-1">✓</span>
                      <span>Formules flexibles : week-end, semaine ou séjour long</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c4a574] mt-1">✓</span>
                      <span>Parking privé et Wi-Fi gratuit inclus</span>
                    </li>
                  </ul>
                </div>

                <p className="text-white/70 leading-relaxed text-sm mt-6 text-center">
                  Que vous planifiez une <strong className="text-white">escapade romantique</strong>, un <strong className="text-white">séjour bien-être</strong> ou des <strong className="text-white">vacances sportives</strong>, nos gîtes à Arrens-Marsous vous promettent une expérience authentique dans les Pyrénées. Réservez dès maintenant et vivez un séjour inoubliable en montagne !
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2d3843]/30 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <EditableText
              path="texts.infoSectionTitre"
              value={content.texts?.infoSectionTitre || "Quelques informations pour un séjour serein"}
              as="h2"
              className="text-white text-3xl"
              style={{ fontFamily: 'serif' }}
            />
          </motion.div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(content.infoCards || [
              {
                icon: 'Calendar',
                title: 'Culture et Sobriété',
                description: 'Vous découvrirez une ambiance chaleureuse alliant confort moderne et charme authentique, avec des équipements éco-responsables pour un séjour en harmonie avec la nature.',
              },
              {
                icon: 'Home',
                title: 'Au Cœur des Sommets',
                description: 'Situés à proximité des plus belles randonnées des Pyrénées, nos gîtes vous offrent un accès direct aux pistes de ski en hiver et aux sentiers de montagne en été.',
              },
              {
                icon: 'Map',
                title: "Un Accueil Respectueux",
                description: "Notre équipe est à votre écoute pour rendre votre séjour inoubliable. Nous vous accompagnons dans la découverte de la région et partageons nos meilleures adresses locales.",
              },
            ]).map((card, index) => {
              const iconMap: { [key: string]: any } = { Calendar, Home, Map };
              const Icon = iconMap[card.icon] || Calendar;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="text-center group cursor-pointer relative"
                >
                  {/* Card background with gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/5 via-transparent to-[#5a7a9f]/5 rounded-2xl border border-white/5 group-hover:border-[#c4a574]/30 transition-all duration-300" />
                  
                  <div className="relative p-6">
                    <motion.div
                      className="flex justify-center mb-4"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="p-4 rounded-full bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20 group-hover:from-[#c4a574]/30 group-hover:to-[#5a7a9f]/30 transition-all duration-300">
                        <Icon className="w-8 h-8 text-white/80 group-hover:text-[#c4a574] transition-colors" />
                      </div>
                    </motion.div>
                    <EditableText
                      path={`infoCards.${index}.title`}
                      value={card.title}
                      as="h3"
                      className="text-white mb-3 group-hover:text-[#c4a574] transition-colors"
                    />
                    <EditableText
                      path={`infoCards.${index}.description`}
                      value={card.description}
                      as="p"
                      className="text-white/60 leading-relaxed"
                      multiline
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Second Image Section */}
      <section className="py-16 pb-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-[#5a7a9f]/20 via-[#c4a574]/20 to-[#5a7a9f]/20 blur-3xl" />
            
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574] via-[#5a7a9f] to-[#c4a574] p-[4px] rounded-3xl">
                <div className="h-full w-full bg-[#2d3843] rounded-3xl" />
              </div>
              
              {/* Image container */}
              <div className="relative">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <EditableImage
                    path="hero.imageSecondaire"
                    src={content.hero.imageSecondaire || 'https://i.postimg.cc/QNwn7RLP/unnamed1.jpg'}
                    alt="Les Artigaux - Appartements"
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(1.05) contrast(1.08) saturate(1.12)'
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d3843]/60 via-transparent to-transparent" />
                  
                  {/* Animated overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-[#c4a574]/20 via-transparent to-[#5a7a9f]/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#c4a574]/50 rounded-tl-2xl" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#c4a574]/50 rounded-br-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Règlement Section */}
      <section className="py-16 bg-gradient-to-b from-[#3a4a5a] to-[#2d3843] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <EditableText
              path="texts.reglementTitre"
              value={content.texts?.reglementTitre || "Règlement des Gîtes"}
              as="h2"
              className="text-white text-3xl"
              style={{ fontFamily: 'serif' }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Âge minimum */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/5 via-transparent to-[#5a7a9f]/5 rounded-2xl border border-white/5 group-hover:border-[#c4a574]/30 transition-all duration-300" />
              
              <div className="relative p-8 text-center">
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 group-hover:from-red-500/30 group-hover:to-orange-500/30 transition-all duration-300">
                    <Users className="w-8 h-8 text-red-400" />
                  </div>
                </motion.div>
                <EditableText
                  path="texts.ageMinTitre"
                  value={content.texts?.ageMinTitre || "Âge Minimum"}
                  as="h3"
                  className="text-white text-xl mb-3 group-hover:text-[#c4a574] transition-colors"
                />
                <EditableText
                  path="texts.ageMinDescription"
                  value={content.texts?.ageMinDescription || "Nos gîtes sont inadaptés pour les enfants de moins de 17 ans. Nous vous remercions de votre compréhension."}
                  as="p"
                  className="text-white/70 leading-relaxed"
                  multiline
                />
              </div>
            </motion.div>

            {/* Animaux interdits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/5 via-transparent to-[#5a7a9f]/5 rounded-2xl border border-white/5 group-hover:border-[#c4a574]/30 transition-all duration-300" />
              
              <div className="relative p-8 text-center">
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 group-hover:from-red-500/30 group-hover:to-orange-500/30 transition-all duration-300">
                    <Ban className="w-8 h-8 text-red-400" />
                  </div>
                </motion.div>
                <EditableText
                  path="texts.animauxTitre"
                  value={content.texts?.animauxTitre || "Animaux Non Admis"}
                  as="h3"
                  className="text-white text-xl mb-3 group-hover:text-[#c4a574] transition-colors"
                />
                <EditableText
                  path="texts.animauxDescription"
                  value={content.texts?.animauxDescription || "Les animaux ne sont pas acceptés dans nos gîtes afin de garantir le confort de tous nos visiteurs."}
                  as="p"
                  className="text-white/70 leading-relaxed"
                  multiline
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}