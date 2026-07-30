import { useState } from 'react';
import { X, Calendar, User, Mail, Phone, Euro } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) => void;
  startDate: Date | null;
  endDate: Date | null;
  price: number;
  breakdown: string[];
  season: string;
  gite: string;
}

export function BookingModal({
  isOpen,
  onClose,
  onConfirm,
  startDate,
  endDate,
  price,
  breakdown,
  season,
  gite,
}: BookingModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  if (!isOpen || !startDate || !endDate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ customerName, customerEmail, customerPhone });
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-[#3d4f5c] to-[#2d3e4d] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Bordure dorée décorative */}
        <div className="absolute inset-0 border-4 border-[#c9a77c]/40 rounded-xl pointer-events-none"></div>
        <div className="absolute inset-1 border border-[#c9a77c]/20 rounded-xl pointer-events-none"></div>
        
        <div className="relative">
          <div className="sticky top-0 bg-gradient-to-r from-[#3d4f5c] to-[#2d3e4d] border-b border-[#c9a77c]/30 p-8 flex justify-between items-center rounded-t-xl">
            <h2 className="text-[#c9a77c] tracking-[0.2em] uppercase text-lg font-light">Confirmer la réservation</h2>
            <button
              onClick={onClose}
              className="text-[#c9a77c] hover:text-[#d4b896] transition-all hover:scale-110 duration-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8 space-y-6">
            {/* Détails de la réservation */}
            <div className="relative bg-[#2d3e4d]/40 border-2 border-[#c9a77c]/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#c9a77c]/20 pb-3">
                <Calendar size={20} className="text-[#c9a77c]" />
                <span className="uppercase tracking-[0.15em] text-[#c9a77c] font-light">Détails du séjour</span>
              </div>
              
              <div className="space-y-3 text-[#e8e8e8]">
                <div className="flex justify-between items-center bg-[#3d4f5c]/30 p-3 rounded-lg">
                  <span className="text-[#c9a77c]/70 font-light">Gîte</span>
                  <span className="capitalize font-light">{gite}</span>
                </div>
                <div className="flex justify-between items-center bg-[#3d4f5c]/30 p-3 rounded-lg">
                  <span className="text-[#c9a77c]/70 font-light">Arrivée</span>
                  <span className="font-light">{formatDate(startDate)}</span>
                </div>
                <div className="flex justify-between items-center bg-[#3d4f5c]/30 p-3 rounded-lg">
                  <span className="text-[#c9a77c]/70 font-light">Départ</span>
                  <span className="font-light">{formatDate(endDate)}</span>
                </div>
                <div className="flex justify-between items-center bg-[#3d4f5c]/30 p-3 rounded-lg">
                  <span className="text-[#c9a77c]/70 font-light">Durée</span>
                  <span className="font-light">{nights} nuit{nights > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between items-center bg-[#3d4f5c]/30 p-3 rounded-lg">
                  <span className="text-[#c9a77c]/70 font-light">Saison</span>
                  <span className="capitalize font-light">{season}</span>
                </div>
              </div>
            </div>

            {/* Tarification */}
            <div className="relative bg-[#2d3e4d]/40 border-2 border-[#c9a77c]/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#c9a77c]/20 pb-3">
                <Euro size={20} className="text-[#c9a77c]" />
                <span className="uppercase tracking-[0.15em] text-[#c9a77c] font-light">Tarification</span>
              </div>
              
              <div className="space-y-3 text-[#e8e8e8]">
                {breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm font-light bg-[#3d4f5c]/30 p-3 rounded-lg">
                    <span className="text-[#d0d0d0]">{item}</span>
                  </div>
                ))}
                <div className="border-t-2 border-[#c9a77c]/30 pt-4 mt-4 flex justify-between items-center text-lg">
                  <span className="text-[#c9a77c] font-light tracking-wider">Total</span>
                  <span className="text-[#c9a77c] font-normal text-xl">{price}€</span>
                </div>
              </div>
            </div>

            {/* Formulaire client */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#c9a77c] font-light tracking-wide">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    Nom complet *
                  </div>
                </Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="bg-[#2d3e4d]/50 border-2 border-[#c9a77c]/40 text-[#e8e8e8] focus:border-[#c9a77c] placeholder:text-[#a0a0a0] rounded-lg py-3 font-light"
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#c9a77c] font-light tracking-wide">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    Email *
                  </div>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  className="bg-[#2d3e4d]/50 border-2 border-[#c9a77c]/40 text-[#e8e8e8] focus:border-[#c9a77c] placeholder:text-[#a0a0a0] rounded-lg py-3 font-light"
                  placeholder="jean.dupont@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#c9a77c] font-light tracking-wide">
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    Téléphone *
                  </div>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  className="bg-[#2d3e4d]/50 border-2 border-[#c9a77c]/40 text-[#e8e8e8] focus:border-[#c9a77c] placeholder:text-[#a0a0a0] rounded-lg py-3 font-light"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-[#2d3e4d] text-[#e8e8e8] hover:bg-[#3d4f5c] border-2 border-[#c9a77c]/40 py-3 rounded-lg transition-all duration-300 uppercase tracking-[0.15em] text-sm font-light"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#c9a77c] to-[#b89768] text-white hover:from-[#d4b896] hover:to-[#c9a77c] py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 uppercase tracking-[0.15em] text-sm font-light hover:scale-[1.02]"
                >
                  Confirmer
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}