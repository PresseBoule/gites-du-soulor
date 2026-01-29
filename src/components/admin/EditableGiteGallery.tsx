import { useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Folder } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { ImageCodeEditor } from './ImageCodeEditor';

interface EditableGiteGalleryProps {
  giteName: string;
  giteIndex: number;
  mainImage: string;
  gallery: string[];
  onUpdateImages: (giteIndex: number, mainImage: string, gallery: string[]) => void;
  children: React.ReactNode;
}

export function EditableGiteGallery({
  giteName,
  giteIndex,
  mainImage,
  gallery,
  onUpdateImages,
  children,
}: EditableGiteGalleryProps) {
  const { isAdminMode } = useAdmin();
  const [showEditor, setShowEditor] = useState(false);

  const handleSave = (urls: string[]) => {
    if (urls.length === 0) return;
    
    // Le premier élément devient l'image principale
    const newMainImage = urls[0];
    // Le reste forme la galerie
    const newGallery = urls;
    
    onUpdateImages(giteIndex, newMainImage, newGallery);
  };

  if (!isAdminMode) {
    return <>{children}</>;
  }

  // Combiner l'image principale et la galerie pour l'éditeur
  // On s'assure que l'image principale est en premier
  const allImages = [mainImage, ...gallery.filter(img => img !== mainImage)];

  return (
    <>
      <ImageCodeEditor
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        onSave={handleSave}
        initialUrls={allImages}
        title={`Galerie Photos : ${giteName}`}
        variableName="gallery"
        isSingle={false}
      />

      <div className="relative">
        {/* Bouton d'édition flottant sur le titre */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setShowEditor(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute -top-2 -right-2 z-50 w-10 h-10 rounded-full bg-gradient-to-br from-[#c4a574] to-[#b89560] shadow-lg shadow-[#c4a574]/50 flex items-center justify-center text-white hover:shadow-xl hover:shadow-[#c4a574]/70 transition-all"
          title={`Modifier toutes les photos de ${giteName}`}
        >
          <Folder className="w-5 h-5" />
        </motion.button>

        {/* Badge indicateur */}
        <div className="absolute -top-3 -left-3 z-40 bg-[#2d3843] border border-[#c4a574]/50 rounded-full px-3 py-1 text-xs text-[#c4a574] font-medium shadow-lg flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          {allImages.length} photos
        </div>

        {children}
      </div>
    </>
  );
}
