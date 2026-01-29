import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Waves, Flame, Clock, Sparkles, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EditableText } from './admin/EditableText';
import { EditableImage } from './admin/EditableImage';
import { useAdmin } from '../contexts/AdminContext';

// 🎨 IMPORTANT: Remplacez ces URLs par vos vraies photos du bain nordique et sauna
// Pour ajouter vos photos: remplacez simplement les URLs dans le tableau 'wellnessGallery' ci-dessous
const wellnessGallery = [
  // Photo 1 - Vue panoramique bain nordique avec reflet (votre Photo 13)
  'https://i.postimg.cc/SQ5Nzs4k/2005472970463032322.jpg',
  // Photo 2 - Gros plan sauna avec porte circulaire (votre Photo 10)
  'https://i.postimg.cc/w3KfYJsZ/8779031119280369718.jpg',
  // Photo 3 - Intérieur du sauna (votre Photo 14)
  'https://i.postimg.cc/sfBGLbDZ/IMG-3073.jpg',
  // Photo 4 - Bain nordique avec vue Pyrénées (votre Photo 12)
  'https://i.postimg.cc/pXqCBg0M/4519027198872613593.jpg',
  // Photo 5 - Bain nordique panorama montagneux (votre Photo 7)
  'https://i.postimg.cc/j5fKH6t2/IMG-3075.jpg',
  // Photo 6 - Panneau d'entrée (votre Photo 11)
  'https://i.postimg.cc/mrzG43cC/IMG-3070.jpg',
  // Photo 7 - Bain nordique avec poêle (votre Photo 16)
  'https://i.postimg.cc/5yprLjYd/IMG-3078.jpg',
  // Photo 8 - Vue d'ensemble (votre Photo 17)
  'https://i.postimg.cc/25p0qncS/8209701038044386348.jpg',
  // Photo 9 - Vue d'ensemble (votre Photo 17)
  'https://i.postimg.cc/NFvxbB8v/unnamed.jpg',
];

export function WellnessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { content } = useAdmin();

  const handleOpenGallery = () => {
    setGalleryOpen(true);
    setCurrentImageIndex(0);
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % wellnessGallery.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + wellnessGallery.length) % wellnessGallery.length);
  };

  const features = [
    {
      icon: Waves,
      title: 'Bain Nordique',
      description: 'Plongez dans une expérience de détente unique avec notre bain nordique chauffé au feu de bois, face aux sommets enneigés.',
      image: wellnessGallery[0],
      gradient: 'from-cyan-500/20 to-blue-600/20',
      accentColor: '#7a9fbf',
    },
    {
      icon: Flame,
      title: 'Sauna',
      description: 'Profitez de notre sauna traditionnel en bois pour une relaxation profonde et une expérience bien-être authentique en montagne.',
      image: wellnessGallery[1],
      gradient: 'from-orange-500/20 to-red-600/20',
      accentColor: '#d4b584',
    },
  ];

  return (
    <section
      ref={ref}
      id="wellness"
      className="py-20 bg-gradient-to-b from-[#2c3e50] to-[#34495e] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#c4a574]/20 to-[#7a9fbf]/20 border border-[#c4a574]/30 text-[#c4a574] backdrop-blur-sm">
              Détente & Bien-être
            </span>
          </motion.div>

          <EditableText
            path="wellness.titre"
            value={content?.wellness?.titre || "Espace Bien-Être"}
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-wide"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EditableText
              path="wellness.description"
              value={content?.wellness?.description || "Après vos journées en montagne, ressourcez-vous dans notre espace bien-être privatif"}
              as="p"
              className="text-white/70 max-w-2xl mx-auto text-lg"
            />
          </motion.div>
        </motion.div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3a4a5a] to-[#2c3e50] border border-white/10 shadow-2xl">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${feature.image})`,
                      filter: 'brightness(1.05) contrast(1.08) saturate(1.12)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${feature.gradient}`} />
                  
                  {/* Icon overlay */}
                  <motion.div
                    className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <EditableText
                    path={`wellness.features.${index}.title`}
                    value={content?.wellness?.features?.[index]?.title || feature.title}
                    as="h3"
                    className="text-2xl text-white mb-4"
                  />
                  <EditableText
                    path={`wellness.features.${index}.description`}
                    value={content?.wellness?.features?.[index]?.description || feature.description}
                    as="p"
                    className="text-white/70 leading-relaxed"
                    multiline
                  />

                  {/* Decorative line */}
                  <motion.div
                    className="mt-6 h-1 rounded-full bg-gradient-to-r from-[#c4a574] to-transparent"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '60%' } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  />
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-[#3a4a5a]/50 to-[#2c3e50]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Clock, text: 'Réservation horaire' },
                { icon: Sparkles, text: 'Privatif et exclusif' },
                { icon: Waves, text: 'Vue panoramique' },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c4a574] to-[#b89560] flex items-center justify-center shadow-lg shadow-[#c4a574]/30">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/90">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gallery Button - Style identique aux gîtes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center mb-12"
        >
          <motion.button
            onClick={handleOpenGallery}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#c4a574]/10 to-[#7a9fbf]/10 border-2 border-[#c4a574]/30 text-[#c4a574] hover:from-[#c4a574] hover:to-[#b89560] hover:text-white transition-all duration-300 group shadow-lg hover:shadow-[#c4a574]/50"
          >
            <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Découvrir la galerie photos
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <motion.a
            href="https://bain-sauna-gite-soulor.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#c4a574] to-[#b89560] text-white shadow-2xl shadow-[#c4a574]/40 hover:from-[#b89560] hover:to-[#c4a574] transition-all duration-300 group"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Réserver vos créneaux horaires
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#c4a574]/5 blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#7a9fbf]/5 blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Gallery Modal - Style identique aux gîtes */}
      <Dialog open={galleryOpen} onOpenChange={handleCloseGallery}>
        <DialogContent className="max-w-5xl bg-[#2d3843] border-[#c4a574]/30 p-0 overflow-hidden">
          <DialogTitle className="sr-only">Galerie Bain Nordique & Sauna</DialogTitle>
          <DialogDescription className="sr-only">
            Découvrez notre espace bien-être avec bain nordique et sauna
          </DialogDescription>
          <AnimatePresence mode="wait">
            {galleryOpen && (
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
                    <h3 className="text-2xl text-white" style={{ fontFamily: 'serif' }}>
                      Bain Nordique & Sauna
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
                    src={wellnessGallery[currentImageIndex]}
                    alt={`Bain Nordique & Sauna - Photo ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(1.05) contrast(1.08) saturate(1.12)'
                    }}
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
                    {currentImageIndex + 1} / {wellnessGallery.length}
                  </p>
                </div>

                {/* Thumbnails */}
                <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-2 px-4 overflow-x-auto">
                  {wellnessGallery.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
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
