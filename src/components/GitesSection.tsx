import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { Home, Wifi, Coffee, Monitor, Car, Mountain, Users, Sofa, X, ChevronLeft, ChevronRight, Construction } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EditableGiteGallery } from './admin/EditableGiteGallery';
import { useAdmin } from '../contexts/AdminContext';

const gitesData = [
  {
    name: 'Le Suyen',
    slug: 'le-suyen',
    capacity: '2 personnes',
    // ⚠️ PHOTO À REMPLACER - Image principale de la carte
    image: 'https://i.postimg.cc/FFcpb6LX/7588570501155327596.jpg',
    color: 'from-amber-500/20 to-orange-600/20',
    accentColor: '#d4b584',
    hasBalcony: true,
    gallery: [
      // ⚠️ PHOTOS À REMPLACER - Galerie du Suyen (5 photos)
      'https://i.postimg.cc/FFcpb6LX/7588570501155327596.jpg', // Photo 1: Vue d'ensemble / salon
      'https://i.postimg.cc/15788m3S/1666003494124778229.jpg', // Photo 2: Chambre
      'https://i.postimg.cc/sDL2VTTv/7554293390262409348.jpg', // Photo 3: Cuisine
      'https://i.postimg.cc/hG1g7s1K/6942157828982581794.jpg', // Photo 4: Balcon/Vue
      'https://i.postimg.cc/kGkLHRvk/6609466444016411442.jpg', // Photo 5: Coin cheminée
      'https://i.postimg.cc/9M0SFY8m/8216737013434007532.jpg', // Photo 1: Vue d'ensemble / salon
      'https://i.postimg.cc/htgK4NV2/5729882537124453531.jpg', // Photo 2: Chambre
      'https://i.postimg.cc/W3qBw7Md/2870535881177773093.jpg', // Photo 3: Cuisine
      'https://i.postimg.cc/zXrsTK3f/7058983745362409722.jpg', // Photo 4: Balcon/Vue
      'https://i.postimg.cc/t4r80ckK/3080693530078709151.jpg', // Photo 5: Coin cheminée
      'https://i.postimg.cc/sDsLMz09/3181144357257313940.jpg', // Photo 5: Coin cheminée
    ],
  },
  {
    name: 'Le Tech',
    slug: 'le-tech',
    capacity: '2 personnes',
    // ⚠️ PHOTO À REMPLACER - Image principale de la carte
    image: 'https://i.postimg.cc/sfQJLy0X/2856943310074011028.jpg',
    color: 'from-blue-500/20 to-cyan-600/20',
    accentColor: '#7a9fbf',
    hasBalcony: true,
    gallery: [
      // ⚠️ PHOTOS À REMPLACER - Galerie du Tech (5 photos)
      'https://i.postimg.cc/gcQgcr6h/8792647096264011841.jpg', // Photo 1: Vue d'ensemble / salon
      'https://i.postimg.cc/P5zyM4Vx/1458763402424585270.jpg', // Photo 2: Chambre
      'https://i.postimg.cc/3w8BfvPh/1945866297861919455.jpg', // Photo 3: Salle de bain
      'https://i.postimg.cc/nzM1ptFD/3523331367990396970.jpg', // Photo 4: Balcon/Terrasse
      'https://i.postimg.cc/vBjtmSTC/8031039626966426336.jpg', // Photo 5: Cuisine / Salle à manger
      'https://i.postimg.cc/QCTkKkWg/3084952756933343499.jpg', // Photo 1: Vue d'ensemble / salon
      'https://i.postimg.cc/sfQJLy0X/2856943310074011028.jpg', // Photo 2: Chambre
      'https://i.postimg.cc/bY7RcMKx/4999626590109787033.jpg', // Photo 3: Salle de bain
      'https://i.postimg.cc/cLZM631G/2969122625866992685.jpg', // Photo 4: Balcon/Terrasse
      'https://i.postimg.cc/bwT0nvdZ/6649940378765655062.jpg', // Photo 5: Cuisine / Salle à manger
      'https://i.postimg.cc/kgcNS5DZ/6553876054002977520.jpg', // Photo 1: Vue d'ensemble / salon
      'https://i.postimg.cc/nLSvdw4Z/2597272950687853845.jpg', // Photo 2: Chambre
      'https://i.postimg.cc/rmd57Cjh/4961846973339871349.jpg', // Photo 3: Salle de bain
      'https://i.postimg.cc/sgV73RKM/2048309499798741627.jpg', // Photo 4: Balcon/Terrasse
      'https://i.postimg.cc/HkB5xPhg/6994973893995733369.jpg', // Photo 5: Cuisine / Salle à manger
    ],
  },
  {
    name: "L'Estaing",
    slug: 'lestaing',
    capacity: '2 personnes',
    image: 'https://i.postimg.cc/x12r0yfD/IMG-3567.jpg',
    color: 'from-emerald-500/20 to-teal-600/20',
    accentColor: '#8fb89f',
    hasBalcony: false, // L'Estaing n'a pas de balcon
    // L'Estaing est maintenant ouvert !
    gallery: [
      'https://i.postimg.cc/x12r0yfD/IMG-3567.jpg', // Photo 1: Salon
      'https://i.postimg.cc/XNRm8cyZ/IMG-3574.jpg', // Photo 2: Chambre
      'https://i.postimg.cc/jSK9Vxcs/IMG-3573.jpg', // Photo 3: Cuisine
      'https://i.postimg.cc/9fgNqGh9/IMG-3568.jpg', // Photo 4: Salle de bain
      'https://i.postimg.cc/BZKwXLwq/IMG-3569.jpg', // Photo 5: Terrasse/Vue
      'https://i.postimg.cc/VL9GFywQ/IMG-3570.jpg', // Photo 1: Salon
      'https://i.postimg.cc/CK5cYzqV/IMG-3571.jpg', // Photo 2: Chambre
      'https://i.postimg.cc/7P0mxvbp/IMG-3575.jpg', // Photo 3: Cuisine
      'https://i.postimg.cc/MKY5Qy0G/IMG-3572.jpg', // Photo 4: Salle de bain
    ],
  },
  {
    name: 'Le Soum',
    slug: 'le-soum',
    capacity: '2 personnes',
    image: 'https://i.postimg.cc/SKksq5yk/unnamed.jpg',
    color: 'from-purple-500/20 to-pink-600/20',
    accentColor: '#b89fc4',
    hasBalcony: true,
    gallery: [
      'https://i.postimg.cc/nVQdbwMg/193423021054318720.jpg',
      'https://i.postimg.cc/yYs0QfRB/image0000001.jpg',
      'https://i.postimg.cc/cH7rfSXr/8498337449415672384.jpg',
      'https://i.postimg.cc/xjtdQg7L/8536361466365823395.jpg',
      'https://i.postimg.cc/SKksq5yk/unnamed.jpg',
      'https://i.postimg.cc/kGkzC0Pf/6106559327515509978.jpg',
      'https://i.postimg.cc/J0BYppBw/4217731294211821747.jpg',
      'https://i.postimg.cc/GpmCX1LM/1187468967096333346.jpg',
      'https://i.postimg.cc/CK13jH7b/3434186147300656811.jpg',
      'https://i.postimg.cc/BQ0RhGNT/3327490492765906103.jpg',
      'https://i.postimg.cc/CL7rmnRw/unnamed-1.jpg',
      'https://i.postimg.cc/4dNCHhPc/5266744024645977021.jpg',
      'https://i.postimg.cc/rpT2cHtK/8971786132493604003.jpg',
    ],
  },
];

const features = [
  {
    icon: Home,
    title: 'Cuisine équipée',
    description: 'Lave-vaisselle, lave-linge, vaisselle complète',
  },
  {
    icon: Coffee,
    title: 'Confort total',
    description: 'Cafetière, bouilloire, condiments essentiels',
  },
  {
    icon: Monitor,
    title: 'Connectivité',
    description: 'Deux télévisions et accès Wi-Fi',
  },
  {
    icon: Mountain,
    title: 'Vue panoramique',
    description: 'Terrasse et balcon avec vue sur les montagnes*',
    note: '* Sauf L\'Estaing (terrasse uniquement)',
  },
  {
    icon: Car,
    title: 'Parking privé',
    description: 'Place réservée à vos occupants',
  },
  {
    icon: Sofa,
    title: 'Sérénité',
    description: 'Confort pour profiter pleinement de votre séjour',
  },
];

interface GitesProps {
  gites?: any[];
}

export function GitesSection({ gites }: GitesProps = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredGite, setHoveredGite] = useState<number | null>(null);
  const [selectedGite, setSelectedGite] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { updateContent, content } = useAdmin();
  
  // Utiliser les gîtes du contexte s'ils existent, sinon utiliser les données par défaut
  const gitesDataToUse = content?.gites && content.gites.length > 0 
    ? content.gites.map((g, idx) => ({
        ...gitesData[idx],
        ...g,
        name: g.nom || gitesData[idx]?.name,
        capacity: g.capacite || gitesData[idx]?.capacity,
        image: g.image || gitesData[idx]?.image,
        gallery: g.gallery || gitesData[idx]?.gallery,
      }))
    : gitesData;

  const handleOpenGallery = (giteIndex: number) => {
    setSelectedGite(giteIndex);
    setCurrentImageIndex(0);
  };

  const handleCloseGallery = () => {
    setSelectedGite(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (selectedGite !== null) {
      const gallery = gitesDataToUse[selectedGite].gallery;
      setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedGite !== null) {
      const gallery = gitesDataToUse[selectedGite].gallery;
      setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  const handleUpdateGiteImages = (giteIndex: number, mainImage: string, gallery: string[]) => {
    // Mettre à jour le contenu des gîtes
    const updatedGites = [...(content?.gites || gitesData.map((g, idx) => ({
      nom: g.name,
      capacite: g.capacity,
      description: '',
      image: g.image,
      gallery: g.gallery,
      color: g.color,
      accentColor: g.accentColor,
      hasBalcony: g.hasBalcony,
      inConstruction: g.inConstruction,
    })))];

    updatedGites[giteIndex] = {
      ...updatedGites[giteIndex],
      image: mainImage,
      gallery: gallery,
    };

    updateContent('gites', updatedGites);
  };

  return (
    <section id="gites" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a4a5a] via-[#2d3843] to-[#3a4a5a]" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#c4a574]/5 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#5a7a9f]/5 blur-3xl"
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#c4a574]/20 to-[#5a7a9f]/20 border border-[#c4a574]/30 backdrop-blur-sm">
              <p className="text-[#c4a574] flex items-center gap-2">
                <Home className="w-4 h-4" />
                Nos Hébergements
              </p>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl text-white mb-6 bg-gradient-to-r from-white via-[#c4a574] to-white bg-clip-text text-transparent" style={{ fontFamily: 'serif' }}>
            Découvrez Nos 4 Gîtes
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 max-w-3xl mx-auto text-lg"
          >
            Gîtes deux places offrant sérénité et confort, pour profiter pleinement de votre séjour au Soulor.
            Tout est prévu pour que vous vous sentiez comme chez vous.
          </motion.p>

          <motion.div
            className="h-1 w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#c4a574] to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Gites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-7xl mx-auto">
          {gitesDataToUse.map((gite, index) => (
            <EditableGiteGallery
              key={gite.name}
              giteName={gite.name}
              giteIndex={index}
              mainImage={gite.image}
              gallery={gite.gallery || []}
              onUpdateImages={handleUpdateGiteImages}
            >
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                onHoverStart={() => setHoveredGite(index)}
                onHoverEnd={() => setHoveredGite(null)}
                className="group relative"
              >
                {/* Card glow */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-br from-[#c4a574]/30 via-[#5a7a9f]/20 to-[#c4a574]/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={hoveredGite === index ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Card */}
                <div className="relative h-full bg-gradient-to-br from-[#2d3843] to-[#3a4a5a] rounded-3xl overflow-hidden border border-white/10 group-hover:border-[#c4a574]/30 transition-all duration-500">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={gite.image}
                      alt={gite.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${gite.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d3843] via-transparent to-transparent" />

                  {/* Capacity badge */}
                  <motion.div
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                  >
                    <p className="text-white flex items-center gap-1.5 text-sm">
                      <Users className="w-3.5 h-3.5" />
                      {gite.capacity}
                    </p>
                  </motion.div>

                  {/* Number badge or Construction badge */}
                  {gite.inConstruction ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                      className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/50 flex items-center gap-1.5"
                    >
                      <Construction className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-orange-400 text-xs font-medium">En travaux</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#c4a574]/20 backdrop-blur-md border border-[#c4a574]/30 flex items-center justify-center"
                    >
                      <span className="text-[#c4a574] font-bold">{index + 1}</span>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl text-white mb-2 group-hover:text-[#c4a574] transition-colors" style={{ fontFamily: 'serif' }}>
                    {gite.name}
                  </h3>
                  
                  <div className="h-px bg-gradient-to-r from-[#c4a574]/50 via-transparent to-transparent my-4 group-hover:from-[#c4a574] transition-all duration-500" />

                  <p className="text-white/60 text-sm mb-4">
                    {gite.inConstruction 
                      ? "Gîte en cours de rénovation. Bientôt disponible pour votre confort."
                      : "Un espace intimiste et chaleureux, conçu pour votre confort"
                    }
                  </p>

                  {/* CTA */}
                  {gite.inConstruction ? (
                    <button
                      disabled
                      className="block w-full py-2.5 rounded-xl border bg-gradient-to-r from-gray-500/10 to-gray-600/10 border-gray-500/30 text-gray-400 cursor-not-allowed opacity-60 text-center transition-all duration-300"
                    >
                      Non disponible
                    </button>
                  ) : (
                    <Link to={`/gites/${gite.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full py-2.5 rounded-xl border bg-gradient-to-r from-[#c4a574]/10 to-[#5a7a9f]/10 border-[#c4a574]/30 text-[#c4a574] group-hover:from-[#c4a574] group-hover:to-[#b89560] group-hover:text-white text-center transition-all duration-300"
                      >
                        Découvrir
                      </motion.button>
                    </Link>
                  )}
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#c4a574]/0 rounded-br-2xl group-hover:border-[#c4a574]/50 transition-all duration-500" />
              </div>
            </motion.div>
            </EditableGiteGallery>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative"
        >
          {/* Decorative title */}
          <div className="text-center mb-12">
            <h3 className="text-3xl text-white mb-4" style={{ fontFamily: 'serif' }}>
              Équipements & Services
            </h3>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#c4a574] to-transparent" />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2d3843]/50 to-[#3a4a5a]/50 border border-white/10 hover:border-[#c4a574]/30 transition-all duration-300">
                    {/* Icon */}
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20 flex items-center justify-center mb-4 group-hover:from-[#c4a574]/40 group-hover:to-[#5a7a9f]/40 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6 text-[#c4a574]" />
                    </motion.div>

                    {/* Title */}
                    <h4 className="text-white mb-2 group-hover:text-[#c4a574] transition-colors">
                      {feature.title}
                    </h4>

                    {/* Description */}
                    <p className="text-white/60 text-sm">
                      {feature.description}
                    </p>

                    {/* Note if exists */}
                    {feature.note && (
                      <p className="text-white/40 text-xs mt-2 italic">
                        {feature.note}
                      </p>
                    )}

                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/5 to-[#5a7a9f]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://gite-soulor-reservation.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#c4a574] to-[#b89560] text-white font-medium shadow-xl shadow-[#c4a574]/30 hover:from-[#b89560] hover:to-[#c4a574] transition-all duration-300"
          >
            Réserver votre séjour
          </motion.a>
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <Dialog open={selectedGite !== null} onOpenChange={handleCloseGallery}>
        <DialogContent className="max-w-5xl bg-[#2d3843] border-[#c4a574]/30 p-0 overflow-hidden">
          {selectedGite !== null && (
            <>
              {/* Accessibility elements - visually hidden */}
              <DialogTitle className="sr-only">
                Galerie photos - {gitesDataToUse[selectedGite].name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Parcourez les photos du gîte {gitesDataToUse[selectedGite].name}. Utilisez les flèches pour naviguer entre les images.
              </DialogDescription>
            </>
          )}
          
          <AnimatePresence mode="wait">
            {selectedGite !== null && (
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-[#2d3843] to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl text-white" style={{ fontFamily: 'serif' }}>
                        {gitesDataToUse[selectedGite].name}
                      </h3>
                      {gitesDataToUse[selectedGite].inConstruction && (
                        <span className="px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/50 text-orange-400 text-xs font-medium flex items-center gap-1.5">
                          <Construction className="w-3.5 h-3.5" />
                          En travaux
                        </span>
                      )}
                    </div>
                    <motion.button
                      onClick={handleCloseGallery}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#c4a574] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-[70vh]">
                  <ImageWithFallback
                    src={gitesDataToUse[selectedGite].gallery[currentImageIndex]}
                    alt={`${gitesDataToUse[selectedGite].name} - Photo ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation arrows */}
                  <motion.button
                    onClick={handlePrevImage}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#c4a574] transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    onClick={handleNextImage}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#c4a574] transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <p className="text-white text-sm">
                    {currentImageIndex + 1} / {gitesData[selectedGite].gallery.length}
                  </p>
                </div>

                {/* Thumbnails */}
                <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-2 px-4">
                  {gitesDataToUse[selectedGite].gallery.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex
                          ? 'border-[#c4a574] opacity-100'
                          : 'border-white/20 opacity-50 hover:opacity-75'
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}