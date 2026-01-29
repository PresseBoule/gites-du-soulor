import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ImageCodeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (urls: string[]) => void;
  initialUrls: string[];
  title: string;
  variableName?: string;
  isSingle?: boolean; // true pour une seule image, false pour un tableau
}

export function ImageCodeEditor({
  isOpen,
  onClose,
  onSave,
  initialUrls,
  title,
  variableName = 'gallery',
  isSingle = false,
}: ImageCodeEditorProps) {
  const [urls, setUrls] = useState<string[]>(isSingle ? [initialUrls[0] || ''] : initialUrls);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleUrlChange = (index: number, newUrl: string) => {
    const newUrls = [...urls];
    newUrls[index] = newUrl;
    setUrls(newUrls);
  };

  const handleDelete = (index: number) => {
    if (isSingle) {
      setUrls(['']);
    } else {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
    }
  };

  const handleAddImage = () => {
    if (!isSingle) {
      setUrls([...urls, '']);
    }
  };

  const handleSave = () => {
    // Filtrer les URLs vides sauf si c'est une image unique
    const filteredUrls = isSingle ? urls : urls.filter(url => url.trim() !== '');
    onSave(filteredUrls);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-[#1e1e1e] rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-[#c4a574]/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#2d2d2d] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#c4a574]" />
                {title}
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Éditeur de code source • Modifiez les URLs des images
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Code Editor Area */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="p-6">
              {/* Code Block */}
              <div className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden">
                {/* Line numbers sidebar */}
                <div className="flex">
                  {/* Line numbers */}
                  <div className="bg-[#252525] px-4 py-3 text-right text-white/30 font-mono text-sm select-none border-r border-white/5">
                    {isSingle ? (
                      <div>1</div>
                    ) : (
                      <>
                        <div>1</div>
                        {urls.map((_, index) => (
                          <div key={index} className="leading-[52px]">{index + 2}</div>
                        ))}
                        <div className="leading-[52px]">{urls.length + 2}</div>
                      </>
                    )}
                  </div>

                  {/* Code content */}
                  <div className="flex-1 p-3 font-mono text-sm overflow-x-auto">
                    {isSingle ? (
                      // Single image mode
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400">const</span>
                        <span className="text-blue-300">{variableName}</span>
                        <span className="text-white">=</span>
                        <div className="flex-1 flex items-start gap-2">
                          <span className="text-green-400">"</span>
                          <input
                            type="text"
                            value={urls[0] || ''}
                            onChange={(e) => handleUrlChange(0, e.target.value)}
                            className="flex-1 bg-transparent text-green-400 outline-none border-none min-w-0"
                            placeholder="https://..."
                          />
                          <span className="text-green-400">"</span>
                        </div>
                      </div>
                    ) : (
                      // Array mode
                      <>
                        <div className="mb-1">
                          <span className="text-purple-400">const</span>{' '}
                          <span className="text-blue-300">{variableName}</span>{' '}
                          <span className="text-white">=</span>{' '}
                          <span className="text-yellow-400">[</span>
                        </div>

                        {urls.map((url, index) => (
                          <div key={index} className="ml-4 group relative">
                            <div className="flex items-center gap-2 py-1">
                              {/* Image preview */}
                              <div className="w-12 h-12 rounded border border-white/20 overflow-hidden flex-shrink-0 bg-[#2a2a2a]">
                                {url && (
                                  <ImageWithFallback
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>

                              {/* URL input */}
                              <div className="flex-1 flex items-center gap-1">
                                <span className="text-green-400">"</span>
                                <input
                                  type="text"
                                  value={url}
                                  onChange={(e) => handleUrlChange(index, e.target.value)}
                                  className="flex-1 bg-transparent text-green-400 outline-none border-none py-2"
                                  placeholder="https://..."
                                />
                                <span className="text-green-400">"</span>
                                <span className="text-white">{index < urls.length - 1 ? ',' : ''}</span>
                              </div>

                              {/* Action buttons */}
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleCopy(url, index)}
                                  className="p-2 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                                  title="Copier l'URL"
                                >
                                  {copiedIndex === index ? (
                                    <Check className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleDelete(index)}
                                  className="p-2 hover:bg-red-500/20 rounded text-white/60 hover:text-red-400 transition-colors"
                                  title="Supprimer cette image"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="text-yellow-400">]</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Add new image button */}
              {!isSingle && (
                <button
                  onClick={handleAddImage}
                  className="mt-4 w-full py-3 px-4 bg-[#2a2a2a] hover:bg-[#333] border border-white/10 rounded-lg text-white/70 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Ajouter une image
                </button>
              )}

              {/* Help text */}
              <div className="mt-6 bg-[#c4a574]/10 border border-[#c4a574]/20 rounded-lg p-4">
                <p className="text-white/70 text-sm">
                  💡 <span className="font-semibold text-[#c4a574]">Astuce :</span> Uploadez vos images sur{' '}
                  <a href="https://postimg.cc/" target="_blank" rel="noopener noreferrer" className="text-[#c4a574] hover:underline font-medium">
                    PostImage
                  </a>{' '}
                  ou{' '}
                  <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="text-[#c4a574] hover:underline font-medium">
                    ImgBB
                  </a>
                  , puis copiez le lien "Direct Link"
                </p>
              </div>
            </div>
          </div>

          {/* Footer - Action buttons */}
          <div className="bg-[#2d2d2d] px-6 py-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-white/50 text-sm">
              {isSingle ? (
                <span>1 image</span>
              ) : (
                <span>{urls.length} image{urls.length !== 1 ? 's' : ''}</span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#c4a574] to-[#b89560] text-white hover:from-[#b89560] hover:to-[#c4a574] transition-all shadow-lg shadow-[#c4a574]/30"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
