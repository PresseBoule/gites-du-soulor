import { motion } from 'motion/react';
import { Save, LogOut, AlertCircle, Check, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function AdminToolbar() {
  const { isAdminMode, logout, saveChanges, hasUnsavedChanges, content } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  if (!isAdminMode) return null;

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await saveChanges();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Erreur de sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Êtes-vous sûr de vouloir réinitialiser tout le contenu aux valeurs par défaut ? Cette action est irréversible.')) {
      return;
    }

    try {
      const password = sessionStorage.getItem('admin_password');
      if (!password) {
        alert('Non authentifié');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-66cb1054/admin/reset-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert('Contenu réinitialisé ! Rechargez la page.');
        window.location.reload();
      } else {
        alert('Erreur : ' + data.message);
      }
    } catch (err) {
      console.error('Erreur de réinitialisation:', err);
      alert('Erreur lors de la réinitialisation');
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-[#c4a574] to-[#b89564] shadow-2xl"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[#3a4a5a] font-semibold">Mode Édition</span>
              </div>
              {hasUnsavedChanges && (
                <div className="flex items-center gap-2 text-[#3a4a5a]/70 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Modifications non sauvegardées</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-lg"
                >
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Sauvegardé !</span>
                </motion.div>
              )}

              {saveError && (
                <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{saveError}</span>
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
                className="flex items-center gap-2 bg-[#3a4a5a] hover:bg-[#2a3a4a] disabled:bg-[#3a4a5a]/50 text-white px-4 py-2 rounded-lg transition-all shadow-lg disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
              </button>

              <button
                onClick={() => setShowDebug(!showDebug)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-[#3a4a5a] px-4 py-2 rounded-lg transition-all"
                title="Debug"
              >
                🐛
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-[#3a4a5a] px-4 py-2 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Quitter</span>
              </button>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="text-[#3a4a5a]/70 text-sm">
              💡 Cliquez sur n'importe quel texte ou image pour le modifier
            </div>
            {showDebug && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Réinitialiser tout</span>
              </button>
            )}
          </div>

          {showDebug && (
            <div className="mt-3 bg-white/10 rounded-lg p-3 text-xs text-[#3a4a5a] max-h-48 overflow-auto">
              <div className="font-semibold mb-2">Debug - Contenu actuel :</div>
              <div className="whitespace-pre-wrap font-mono">
                Tarifs: {content?.tarifs ? `${content.tarifs.length} items` : 'null ou undefined'}
                <br />
                Gites: {content?.gites ? `${content.gites.length} items` : 'null ou undefined'}
                <br />
                Hero: {content?.hero ? 'OK' : 'null ou undefined'}
                <br />
                InfoCards: {content?.infoCards ? `${content.infoCards.length} items` : 'null ou undefined'}
                <br />
                Wellness: {content?.wellness ? 'OK' : 'null ou undefined'}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Spacer pour éviter que le contenu soit caché sous la toolbar */}
      <div className="h-24" />
    </>
  );
}
