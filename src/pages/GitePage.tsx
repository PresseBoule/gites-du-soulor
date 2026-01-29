import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import {
  Home,
  Users,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Wifi,
  Coffee,
  Monitor,
  Mountain,
  Car,
  Sofa,
  Construction,
  Check,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';

const gitesData = {
  'le-suyen': {
    nom: 'Le Suyen',
    capacite: '2 personnes',
    image: 'https://i.postimg.cc/FFcpb6LX/7588570501155327596.jpg',
    gallery: [
      'https://i.postimg.cc/FFcpb6LX/7588570501155327596.jpg',
      'https://i.postimg.cc/15788m3S/1666003494124778229.jpg',
      'https://i.postimg.cc/sDL2VTTv/7554293390262409348.jpg',
      'https://i.postimg.cc/hG1g7s1K/6942157828982581794.jpg',
      'https://i.postimg.cc/kGkLHRvk/6609466444016411442.jpg',
      'https://i.postimg.cc/9M0SFY8m/8216737013434007532.jpg',
      'https://i.postimg.cc/htgK4NV2/5729882537124453531.jpg',
      'https://i.postimg.cc/W3qBw7Md/2870535881177773093.jpg',
      'https://i.postimg.cc/zXrsTK3f/7058983745362409722.jpg',
      'https://i.postimg.cc/t4r80ckK/3080693530078709151.jpg',
      'https://i.postimg.cc/sDsLMz09/3181144357257313940.jpg',
    ],
    color: 'from-amber-500/20 to-orange-600/20',
    accentColor: '#d4b584',
    description: 'Le Suyen vous offre un espace intimiste et chaleureux avec une vue panoramique exceptionnelle sur les sommets pyrénéens. Ce gîte allie parfaitement tradition montagnarde et confort moderne.',
    hasBalcony: true,
    superficie: '50m²',
    inConstruction: false,
  },
  'le-tech': {
    nom: 'Le Tech',
    capacite: '2 personnes',
    image: 'https://i.postimg.cc/sfQJLy0X/2856943310074011028.jpg',
    gallery: [
      'https://i.postimg.cc/gcQgcr6h/8792647096264011841.jpg',
      'https://i.postimg.cc/P5zyM4Vx/1458763402424585270.jpg',
      'https://i.postimg.cc/3w8BfvPh/1945866297861919455.jpg',
      'https://i.postimg.cc/nzM1ptFD/3523331367990396970.jpg',
      'https://i.postimg.cc/vBjtmSTC/8031039626966426336.jpg',
      'https://i.postimg.cc/QCTkKkWg/3084952756933343499.jpg',
      'https://i.postimg.cc/sfQJLy0X/2856943310074011028.jpg',
      'https://i.postimg.cc/bY7RcMKx/4999626590109787033.jpg',
      'https://i.postimg.cc/cLZM631G/2969122625866992685.jpg',
      'https://i.postimg.cc/bwT0nvdZ/6649940378765655062.jpg',
      'https://i.postimg.cc/kgcNS5DZ/6553876054002977520.jpg',
      'https://i.postimg.cc/nLSvdw4Z/2597272950687853845.jpg',
      'https://i.postimg.cc/rmd57Cjh/4961846973339871349.jpg',
      'https://i.postimg.cc/sgV73RKM/2048309499798741627.jpg',
      'https://i.postimg.cc/HkB5xPhg/6994973893995733369.jpg',
    ],
    color: 'from-blue-500/20 to-cyan-600/20',
    accentColor: '#7a9fbf',
    description: 'Le Tech marie confort moderne et charme pyrénéen dans un cadre d\'exception. Profitez d\'un espace élégant et lumineux pour un séjour ressourçant en montagne.',
    hasBalcony: true,
    superficie: '50m²',
    inConstruction: false,
  },
  'lestaing': {
    nom: "L'Estaing",
    capacite: '2 personnes',
    image: 'https://i.postimg.cc/x12r0yfD/IMG-3567.jpg',
    gallery: [
      'https://i.postimg.cc/x12r0yfD/IMG-3567.jpg',
      'https://i.postimg.cc/XNRm8cyZ/IMG-3574.jpg',
      'https://i.postimg.cc/jSK9Vxcs/IMG-3573.jpg',
      'https://i.postimg.cc/9fgNqGh9/IMG-3568.jpg',
      'https://i.postimg.cc/BZKwXLwq/IMG-3569.jpg',
      'https://i.postimg.cc/VL9GFywQ/IMG-3570.jpg',
      'https://i.postimg.cc/CK5cYzqV/IMG-3571.jpg',
      'https://i.postimg.cc/7P0mxvbp/IMG-3575.jpg',
      'https://i.postimg.cc/MKY5Qy0G/IMG-3572.jpg',
    ],
    color: 'from-emerald-500/20 to-teal-600/20',
    accentColor: '#8fb89f',
    description: 'L\'Estaing incarne l\'élégance et la sérénité. Ce gîte raffiné vous accueille dans un cadre paisible au cœur des Pyrénées, parfait pour un séjour romantique ou une retraite ressourçante.',
    hasBalcony: false,
    superficie: '65m²',
    inConstruction: false,
  },
  'le-soum': {
    nom: 'Le Soum',
    capacite: '2 personnes',
    image: 'https://i.postimg.cc/SKksq5yk/unnamed.jpg',
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
    ],
    color: 'from-purple-500/20 to-pink-600/20',
    accentColor: '#b89fc4',
    description: 'Le Soum vous offre un havre de paix au cœur de la nature. Ce gîte lumineux combine authenticité montagnarde et équipements modernes pour un séjour inoubliable.',
    hasBalcony: true,
    superficie: '50m²',
    inConstruction: false,
  },
};

const features = [
  { icon: Home, title: 'Cuisine équipée', description: 'Lave-vaisselle, lave-linge, vaisselle complète' },
  { icon: Coffee, title: 'Confort total', description: 'Cafetière, bouilloire, condiments essentiels' },
  { icon: Monitor, title: 'Connectivité', description: 'Deux télévisions et accès Wi-Fi' },
  { icon: Mountain, title: 'Vue panoramique', description: 'Terrasse et balcon avec vue sur les montagnes' },
  { icon: Car, title: 'Parking privé', description: 'Place réservée à vos occupants' },
  { icon: Sofa, title: 'Sérénité', description: 'Confort pour profiter pleinement de votre séjour' },
];

export function GitePage() {
  const { slug } = useParams<{ slug: string }>();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug || !gitesData[slug as keyof typeof gitesData]) {
    return <Navigate to="/gites" replace />;
  }

  const gite = gitesData[slug as keyof typeof gitesData];

  const handleOpenGallery = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseGallery = () => {
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % gite.gallery.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + gite.gallery.length) % gite.gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3a4a5a] via-[#2d3843] to-[#3a4a5a] pt-32 pb-24">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/gites"
            className="inline-flex items-center gap-2 text-[#c4a574] hover:text-[#b89560] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux gîtes</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h1 className="text-5xl md:text-6xl text-white bg-gradient-to-r from-white via-[#c4a574] to-white bg-clip-text text-transparent" style={{ fontFamily: 'serif' }}>
              {gite.nom}
            </h1>
            {gite.inConstruction && (
              <span className="px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/50 text-orange-400 text-sm font-medium flex items-center gap-2">
                <Construction className="w-4 h-4" />
                En travaux
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 text-white/60">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{gite.capacite}</span>
            </div>
            <span>•</span>
            <span>{gite.superficie}</span>
            {gite.hasBalcony && (
              <>
                <span>•</span>
                <span>Balcon avec vue</span>
              </>
            )}
          </div>

          <motion.div
            className="h-1 w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#c4a574] to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16 rounded-3xl overflow-hidden h-[60vh] max-h-[600px] cursor-pointer group"
          onClick={() => handleOpenGallery(0)}
        >
          <ImageWithFallback
            src={gite.image}
            alt={gite.nom}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${gite.color} opacity-30 group-hover:opacity-20 transition-opacity duration-500`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d3843]/80 via-transparent to-transparent" />
          
          {/* Click to view overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
              Cliquez pour agrandir
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-[#2d3843] to-[#3a4a5a] rounded-3xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl text-white mb-6" style={{ fontFamily: 'serif' }}>
              Votre Refuge en Montagne
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              {gite.description}
            </p>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl text-white mb-8 text-center" style={{ fontFamily: 'serif' }}>
            Galerie Photos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gite.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => handleOpenGallery(index)}
                whileHover={{ scale: 1.05 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${gite.nom} - Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${gite.color} opacity-40 group-hover:opacity-20 transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Equipments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl text-white mb-8 text-center" style={{ fontFamily: 'serif' }}>
            Équipements & Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              // Skip balcony feature if gite doesn't have one
              if (feature.icon === Mountain && !gite.hasBalcony) return null;
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-[#2d3843]/50 to-[#3a4a5a]/50 rounded-2xl p-6 border border-white/10 hover:border-[#c4a574]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#c4a574]" />
                  </div>
                  <h3 className="text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        {!gite.inConstruction && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <motion.a
              href="https://gite-soulor-reservation.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#c4a574] to-[#b89560] text-white font-medium shadow-xl shadow-[#c4a574]/30 hover:from-[#b89560] hover:to-[#c4a574] transition-all duration-300"
            >
              Réserver {gite.nom}
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Gallery Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={handleCloseGallery}>
        <DialogContent className="max-w-5xl bg-[#2d3843] border-[#c4a574]/30 p-0 overflow-hidden">
          {selectedImage !== null && (
            <>
              <DialogTitle className="sr-only">
                Galerie photos - {gite.nom}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Parcourez les photos du gîte {gite.nom}. Utilisez les flèches pour naviguer entre les images.
              </DialogDescription>

              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-[#2d3843] to-transparent">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl text-white" style={{ fontFamily: 'serif' }}>
                      {gite.nom}
                    </h3>
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
                    src={gite.gallery[selectedImage]}
                    alt={`${gite.nom} - Photo ${selectedImage + 1}`}
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
                    {selectedImage + 1} / {gite.gallery.length}
                  </p>
                </div>

                {/* Thumbnails */}
                <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-2 px-4 overflow-x-auto">
                  {gite.gallery.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === selectedImage
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}