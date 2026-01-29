import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ImageCodeEditor } from './ImageCodeEditor';

interface EditableImageProps {
  path: string;
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function EditableImage({
  path,
  src,
  alt,
  className = '',
  style,
}: EditableImageProps) {
  const { isAdminMode, updateContent } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (urls: string[]) => {
    if (urls.length > 0) {
      updateContent(path, urls[0]);
    }
  };

  if (!isAdminMode) {
    return <ImageWithFallback src={src} alt={alt} className={className} style={style} />;
  }

  return (
    <>
      <ImageCodeEditor
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        initialUrls={[src]}
        title={`Modifier l'image : ${alt}`}
        variableName="image"
        isSingle={true}
      />
      
      <div
        onClick={() => setIsEditing(true)}
        className="relative cursor-pointer group"
      >
        <ImageWithFallback src={src} alt={alt} className={className} style={style} />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
        >
          <div className="text-white flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span className="text-sm">Modifier l'image</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute -right-2 -top-2 w-8 h-8 bg-[#c4a574] rounded-full flex items-center justify-center text-[#3a4a5a] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        >
          <ImageIcon className="w-4 h-4" />
        </motion.div>
      </div>
    </>
  );
}
