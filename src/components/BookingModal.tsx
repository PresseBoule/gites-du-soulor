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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#3d4f5c] border-2 border-[#c9a77c]/40 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#3d4f5c] border-b border-[#c9a77c]/40 p-6 flex justify-between items-center">
          <h2 className="text-[#c9a77c] tracking-wider">Confirmer la réservation</h2>
          <button
            onClick={onClose}
            className="text-[#c9a77c] hover:text-[#d4b896] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Détails de la réservation */}
          <div className="bg-[#4a5c6a] border border-[#c9a77c]/30 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#c9a77c]">
              <Calendar size={20} />
              <span className="uppercase tracking-wider">Détails du séjour</span>
            </div>
            
            <div className="space-y-2 text-[#e8e8e8]">
              <div className="flex justify-between">
                <span className="text-[#d0d0d0]">Gîte :</span>
                <span className="capitalize">{gite}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d0d0d0]">Arrivée :</span>
                <span>{formatDate(startDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d0d0d0]">Départ :</span>
                <span>{formatDate(endDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d0d0d0]">Durée :</span>
                <span>{nights} nuit{nights > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d0d0d0]">Saison :</span>
                <span className="capitalize">{season}</span>
              </div>
            </div>
          </div>

          {/* Tarification */}
          <div className="bg-[#4a5c6a] border border-[#c9a77c]/30 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#c9a77c]">
              <Euro size={20} />
              <span className="uppercase tracking-wider">Tarification</span>
            </div>
            
            <div className="space-y-2 text-[#e8e8e8]">
              {breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-[#d0d0d0]">{item}</span>
                </div>
              ))}
              <div className="border-t border-[#c9a77c]/30 pt-2 mt-2 flex justify-between">
                <span className="text-[#c9a77c]">Total :</span>
                <span className="text-[#c9a77c]">{price}€</span>
              </div>
            </div>
          </div>

          {/* Formulaire client */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#c9a77c]">
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
                className="bg-[#4a5c6a] border-[#c9a77c]/40 text-[#e8e8e8] focus:border-[#c9a77c] placeholder:text-[#a0a0a0]"
                placeholder="Jean Dupont"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#c9a77c]">
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
                className="bg-[#4a5c6a] border-[#c9a77c]/40 text-[#e8e8e8] focus:border-[#c9a77c] placeholder:text-[#a0a0a0]"
                placeholder="jean.dupont@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#c9a77c]">
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
                className="bg-[#4a5c6a] border-[#c9a77c]/40 text-[#e8e8e8] focus:border-[#c9a77c] placeholder:text-[#a0a0a0]"
                placeholder="06 12 34 56 78"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 bg-[#4a5c6a] text-[#e8e8e8] hover:bg-[#5a6c7a] border-2 border-[#c9a77c]/40"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#c9a77c] text-white hover:bg-[#d4b896] shadow-lg"
              >
                Confirmer la réservation
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
