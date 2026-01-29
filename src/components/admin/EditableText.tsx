import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit2, Check, X } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface EditableTextProps {
  path: string;
  value: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  style?: React.CSSProperties;
}

export function EditableText({
  path,
  value,
  as: Component = 'p',
  className = '',
  placeholder = 'Cliquez pour modifier',
  multiline = false,
  style,
}: EditableTextProps) {
  const { isAdminMode, updateContent } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = () => {
    updateContent(path, localValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isAdminMode) {
    return <Component className={className} style={style}>{value}</Component>;
  }

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} bg-white/10 border-2 border-[#c4a574] rounded-lg p-2 min-h-[100px] w-full`}
            placeholder={placeholder}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} bg-white/10 border-2 border-[#c4a574] rounded-lg p-2 w-full`}
            placeholder={placeholder}
          />
        )}
        <div className="absolute -right-2 -top-2 flex gap-1">
          <button
            onClick={handleSave}
            className="w-6 h-6 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg"
            title="Sauvegarder"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
            title="Annuler"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`${className} relative cursor-pointer group hover:outline hover:outline-2 hover:outline-[#c4a574] hover:outline-offset-2 rounded transition-all`}
      style={style}
    >
      {value || placeholder}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute -right-2 -top-2 w-6 h-6 bg-[#c4a574] rounded-full flex items-center justify-center text-[#3a4a5a] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
      >
        <Edit2 className="w-3 h-3" />
      </motion.div>
    </div>
  );
}
