import { useState } from 'react';
import { GiteBookingCalendar } from './components/GiteBookingCalendar';
import { CalendarDays, Home, MapPin, Mountain } from 'lucide-react';
import { Toaster } from 'sonner@2.0.3';
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
    <div className="min-h-screen bg-[#3d4f5c] relative overflow-hidden">
      <Toaster position="top-right" theme="dark" />
      
      {/* Étoiles décoratives - plus nombreuses */}
      <div className="absolute top-20 left-[15%] w-2 h-2 bg-[#c9a77c] rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-[20%] w-1.5 h-1.5 bg-[#c9a77c] rounded-full opacity-50"></div>
      <div className="absolute top-60 left-[25%] w-1 h-1 bg-[#c9a77c] rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-40 right-[15%] w-2 h-2 bg-[#c9a77c] rounded-full opacity-60"></div>
      <div className="absolute bottom-60 left-[10%] w-1.5 h-1.5 bg-[#c9a77c] rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/3 right-[30%] w-1 h-1 bg-[#c9a77c] rounded-full opacity-40"></div>
      <div className="absolute top-1/4 left-[40%] w-1.5 h-1.5 bg-[#c9a77c] rounded-full opacity-50"></div>
      <div className="absolute bottom-1/3 left-[20%] w-1 h-1 bg-[#c9a77c] rounded-full opacity-40 animate-pulse"></div>

      {/* Hero Section */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="inline-block bg-[#4a5c6a]/60 border border-[#c9a77c]/30 text-[#c9a77c] text-xs px-6 py-2 rounded-full tracking-wider font-light">
                Arrens-Marsous, Hautes-Pyrénées
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-8 tracking-[0.3em] uppercase font-light">
              <span className="text-[#c9a77c]">LES GÎTES DU SOULOR</span>
              <span className="text-[#c9a77c]">.</span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-[#c9a77c] w-16"></div>
              <div className="w-1.5 h-1.5 bg-[#c9a77c] rounded-full"></div>
              <div className="h-px bg-[#c9a77c] w-16"></div>
            </div>
            
            <p className="text-[#c9a77c]/80 text-lg font-light tracking-wide">
              Votre Refuge d'Exception au Cœur des Pyrénées
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8 relative z-10 pb-20">
        {/* Sélecteur de gîtes */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px bg-[#c9a77c] w-12"></div>
            <Home size={18} className="text-[#c9a77c]" />
            <span className="uppercase tracking-[0.3em] text-sm text-[#c9a77c] font-light">Nos Gîtes</span>
            <Home size={18} className="text-[#c9a77c]" />
            <div className="h-px bg-[#c9a77c] w-12"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {gites.map((gite) => (
              <button
                key={gite.id}
                onClick={() => setSelectedGite(gite.id)}
                className={`
                  p-6 rounded-lg border-2 transition-all duration-300
                  ${
                    selectedGite === gite.id
                      ? 'bg-[#c9a77c] border-[#c9a77c] text-white shadow-xl shadow-[#c9a77c]/30 scale-105'
                      : 'bg-[#2d3e4d]/60 border-[#c9a77c]/30 text-[#e8e8e8] hover:border-[#c9a77c] hover:bg-[#3d4f5c]/80 hover:scale-105'
                  }
                `}
              >
                <Mountain className="mx-auto mb-3" size={28} />
                <div className="uppercase tracking-wider text-center font-light">{gite.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Calendrier avec cadre doré épais style image */}
        <div className="max-w-6xl mx-auto">
          <div className="relative p-8 md:p-12 lg:p-16">
            {/* Cadre doré épais externe */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a77c] via-[#b89768] to-[#c9a77c] rounded-3xl shadow-2xl"></div>
            
            {/* Contenu intérieur avec fond */}
            <div className="relative bg-gradient-to-br from-[#3d4f5c] to-[#2d3e4d] rounded-2xl shadow-inner">
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="h-px bg-[#c9a77c] w-12"></div>
                  <h2 className="text-[#c9a77c] text-center uppercase tracking-[0.25em] text-lg font-light">
                    Calendrier de réservation
                  </h2>
                  <div className="h-px bg-[#c9a77c] w-12"></div>
                </div>
                
                <p className="text-center text-[#c9a77c]/80 mb-8 text-lg font-light tracking-wide">
                  {gites.find(g => g.id === selectedGite)?.name}
                </p>
                
                <GiteBookingCalendar
                  gite={selectedGite}
                  projectId={projectId}
                  publicAnonKey={publicAnonKey}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Informations pratiques */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="relative bg-gradient-to-br from-[#3d4f5c] to-[#2d3e4d] rounded-xl shadow-xl border-2 border-[#c9a77c]/30 overflow-hidden">
            <div className="absolute inset-0 border border-[#c9a77c]/10 rounded-xl pointer-events-none"></div>
            
            <div className="relative p-8">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px bg-[#c9a77c] w-12"></div>
                <h3 className="text-[#c9a77c] uppercase tracking-[0.2em] font-light">Informations pratiques</h3>
                <div className="h-px bg-[#c9a77c] w-12"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-[#e8e8e8]">
                <div>
                  <h4 className="text-[#c9a77c] mb-4 tracking-wider font-light text-base">Horaires</h4>
                  <ul className="space-y-3 text-[#d0d0d0]">
                    <li className="flex items-start gap-3">
                      <span className="text-[#c9a77c] mt-1">•</span>
                      <span className="font-light">Arrivée : à partir de 16h</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#c9a77c] mt-1">•</span>
                      <span className="font-light">Départ : avant 11h</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-[#c9a77c] mb-4 tracking-wider font-light text-base">Conditions de réservation</h4>
                  <ul className="space-y-3 text-[#d0d0d0]">
                    <li className="flex items-start gap-3">
                      <span className="text-[#c9a77c] mt-1">•</span>
                      <span className="font-light">Réservation à partir d'1 nuit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#c9a77c] mt-1">•</span>
                      <span className="font-light">Tarif réduit à partir de 2 nuits</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#c9a77c] mt-1">•</span>
                      <span className="font-light">Tarif semaine pour 7 jours</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <footer className="bg-[#2d3e4d] border-t border-[#c9a77c]/20 mt-16 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center text-[#c9a77c]/60 text-sm font-light tracking-wide">
          <p>© 2025 Les Gîtes du Soulor - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}