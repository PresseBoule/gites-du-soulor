import { useState } from 'react';
import { Mountain, Home } from 'lucide-react';
import { GiteBookingCalendar } from './components/GiteBookingCalendar';
import { Toaster } from 'sonner';
import { projectId, publicAnonKey } from './utils/supabase/info';

const gites = [
  { id: 'soum', name: 'Le Soum' },
  { id: 'tech', name: 'Le Tech' },
  { id: 'suyen', name: 'Le Suyen' },
  { id: 'estaing', name: "L'Estaing" },
];

export default function App() {
  const [selectedGite, setSelectedGite] = useState(gites[0].id);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#3d4f5c] via-[#4a5c6a] to-[#3d4f5c]">
      <Toaster position="top-center" richColors />
      
      {/* Motif de fond décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Mountain className="size-64 text-[#c9a77c]" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Mountain className="size-64 text-[#c9a77c]" />
        </div>
      </div>

      {/* En-tête */}
      <div className="relative z-10 text-center py-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Mountain className="size-12 text-[#c9a77c]" />
          <h1 className="text-5xl font-light text-[#c9a77c] tracking-[0.3em] uppercase">
            Les Gîtes du Soulor
          </h1>
          <Mountain className="size-12 text-[#c9a77c]" />
        </div>
        <p className="text-[#c9a77c]/80 text-lg font-light tracking-widest">
          Arrens Marsous - Réservation en ligne
        </p>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8 relative z-10 pb-20">
        {/* Sélecteur de gîtes */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {gites.map((gite) => (
            <button
              key={gite.id}
              onClick={() => setSelectedGite(gite.id)}
              className={`flex items-center gap-2 px-8 py-4 rounded-lg transition-all duration-300 uppercase tracking-wider text-sm font-light shadow-xl hover:scale-105 ${
                selectedGite === gite.id
                  ? 'bg-gradient-to-r from-[#c9a77c] to-[#b89768] text-white'
                  : 'bg-white/10 text-[#c9a77c] hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <Home className="size-5" />
              {gite.name}
            </button>
          ))}
        </div>

        {/* Calendrier de réservation */}
        <GiteBookingCalendar gite={selectedGite} projectId={projectId} publicAnonKey={publicAnonKey} />
      </div>

      {/* Pied de page */}
      <div className="relative z-10 text-center py-8 text-[#c9a77c]/60">
        <p className="text-sm font-light tracking-wide">
          © 2026 Les Gîtes du Soulor - Tous droits réservés
        </p>
      </div>
    </div>
  );
}