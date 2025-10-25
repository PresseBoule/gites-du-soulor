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
      
      {/* Étoiles décoratives */}
      <div className="absolute top-20 left-[15%] w-2 h-2 bg-[#c9a77c] rounded-full opacity-60"></div>
      <div className="absolute top-40 right-[20%] w-1.5 h-1.5 bg-[#c9a77c] rounded-full opacity-50"></div>
      <div className="absolute top-60 left-[25%] w-1 h-1 bg-[#c9a77c] rounded-full opacity-40"></div>
      <div className="absolute bottom-40 right-[15%] w-2 h-2 bg-[#c9a77c] rounded-full opacity-60"></div>
      <div className="absolute bottom-60 left-[10%] w-1.5 h-1.5 bg-[#c9a77c] rounded-full opacity-50"></div>
      
      {/* Navigation en-tête */}
      <header className="relative z-10 border-b border-[#c9a77c]/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-[#e8e8e8] tracking-wider uppercase text-sm">
              Alpina Bardou
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-[#e8e8e8] hover:text-[#c9a77c] transition-colors text-sm">
                Accueil
              </a>
              <a href="#" className="text-[#e8e8e8] hover:text-[#c9a77c] transition-colors text-sm">
                Tarifs
              </a>
              <a href="#" className="text-[#e8e8e8] hover:text-[#c9a77c] transition-colors text-sm">
                Contact
              </a>
              <button className="bg-[#c9a77c] text-white px-6 py-2 rounded-full hover:bg-[#d4b896] transition-colors flex items-center gap-2">
                <CalendarDays size={16} />
                Réserver
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-[#e8e8e8] text-sm mb-4 flex items-center justify-center gap-2">
              <MapPin size={14} />
              <span>Pyrénées - Arrens-Marsous</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 tracking-[0.2em] uppercase">
              <span className="text-[#e8e8e8]">Les </span>
              <span className="text-[#c9a77c]">Gîtes</span>
              <span className="text-[#e8e8e8]"> du</span>
              <br />
              <span className="text-[#c9a77c]">Soulor</span>
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-[#c9a77c] w-12"></div>
              <div className="w-2 h-2 bg-[#c9a77c] rounded-full"></div>
              <div className="h-px bg-[#c9a77c] w-12"></div>
            </div>
            <p className="text-[#e8e8e8] text-lg">
              Vivez une expérience unique au cœur des Pyrénées
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Sélecteur de gîtes */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px bg-[#c9a77c] w-8"></div>
            <Home size={20} className="text-[#c9a77c]" />
            <span className="uppercase tracking-[0.3em] text-sm text-[#c9a77c]">Nos Gîtes</span>
            <Home size={20} className="text-[#c9a77c]" />
            <div className="h-px bg-[#c9a77c] w-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {gites.map((gite) => (
              <button
                key={gite.id}
                onClick={() => setSelectedGite(gite.id)}
                className={`
                  p-6 rounded-lg border-2 transition-all backdrop-blur-sm
                  ${
                    selectedGite === gite.id
                      ? 'bg-[#c9a77c] border-[#c9a77c] text-white shadow-lg shadow-[#c9a77c]/50'
                      : 'bg-[#4a5c6a]/80 border-[#c9a77c]/40 text-[#e8e8e8] hover:border-[#c9a77c] hover:bg-[#4a5c6a]'
                  }
                `}
              >
                <Mountain className="mx-auto mb-3" size={28} />
                <div className="uppercase tracking-wider text-center">{gite.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Calendrier */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#4a5c6a]/60 backdrop-blur-md border-2 border-[#c9a77c]/40 rounded-lg p-8 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px bg-[#c9a77c] w-12"></div>
              <h2 className="text-[#c9a77c] text-center uppercase tracking-[0.2em]">
                Calendrier de réservation
              </h2>
              <div className="h-px bg-[#c9a77c] w-12"></div>
            </div>
            <p className="text-center text-[#e8e8e8] mb-6">
              {gites.find(g => g.id === selectedGite)?.name}
            </p>
            
            <GiteBookingCalendar
              gite={selectedGite}
              projectId={projectId}
              publicAnonKey={publicAnonKey}
            />
          </div>
        </div>

        {/* Informations pratiques */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-[#4a5c6a]/60 backdrop-blur-md border-2 border-[#c9a77c]/40 rounded-lg p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px bg-[#c9a77c] w-12"></div>
              <h3 className="text-[#c9a77c] uppercase tracking-[0.2em]">Informations pratiques</h3>
              <div className="h-px bg-[#c9a77c] w-12"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#e8e8e8]">
              <div>
                <h4 className="text-[#c9a77c] mb-3 tracking-wider">Horaires</h4>
                <ul className="space-y-2 text-[#d0d0d0]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a77c]">•</span>
                    <span>Arrivée : à partir de 16h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a77c]">•</span>
                    <span>Départ : avant 11h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a77c]">•</span>
                    <span>Week-end : Vendredi 16h - Dimanche 11h</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-[#c9a77c] mb-3 tracking-wider">Conditions de réservation</h4>
                <ul className="space-y-2 text-[#d0d0d0]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a77c]">•</span>
                    <span>Minimum 2 nuits en semaine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a77c]">•</span>
                    <span>Formule week-end disponible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a77c]">•</span>
                    <span>Tarif semaine pour 7 jours</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <footer className="bg-[#2d3e4d] border-t border-[#c9a77c]/30 mt-16 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center text-[#d0d0d0] text-sm">
          <p>© 2025 Les Gîtes du Soulor - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}
