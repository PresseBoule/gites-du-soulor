import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Calendar, Euro } from 'lucide-react';
import { BookingModal } from './BookingModal';
import {
  getSeason,
  calculatePrice,
  validateBooking,
  getSeasonColor,
  getSeasonLabel,
  type Season,
} from '../utils/seasonPricing';
import { toast } from 'sonner@2.0.3';

interface Booking {
  id: string;
  gite: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  price: number;
  season: string;
}

interface GiteBookingCalendarProps {
  gite: string;
  projectId: string;
  publicAnonKey: string;
}

export function GiteBookingCalendar({ gite, projectId, publicAnonKey }: GiteBookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [gite]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-497309b8/bookings/${gite}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Erreur lors du chargement des réservations');
    }
  };

  const isDateBooked = (date: Date): boolean => {
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    return bookings.some((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const startOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      
      return dateOnly >= startOnly && dateOnly < endOnly;
    });
  };

  const handleDateClick = (date: Date) => {
    if (isDateBooked(date)) {
      toast.error('Cette date est déjà réservée');
      return;
    }

    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Commencer une nouvelle sélection
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      // Compléter la sélection
      if (date < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(date);
      } else {
        setSelectedEnd(date);
      }
    }
  };

  const handleConfirmBooking = async (customerData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) => {
    if (!selectedStart || !selectedEnd) return;

    const validation = validateBooking(selectedStart, selectedEnd);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    const { total, season } = calculatePrice(selectedStart, selectedEnd);

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-497309b8/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            gite,
            startDate: selectedStart.toISOString(),
            endDate: selectedEnd.toISOString(),
            price: total,
            season,
            ...customerData,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Réservation confirmée !');
        setIsModalOpen(false);
        setSelectedStart(null);
        setSelectedEnd(null);
        await fetchBookings();
      } else {
        toast.error(data.error || 'Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Erreur lors de la création de la réservation');
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Ajouter les jours vides au début
    for (let i = 0; i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); i++) {
      days.push(null);
    }

    // Ajouter les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedStart) return false;
    if (!selectedEnd) return date.getTime() === selectedStart.getTime();
    
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startOnly = new Date(selectedStart.getFullYear(), selectedStart.getMonth(), selectedStart.getDate());
    const endOnly = new Date(selectedEnd.getFullYear(), selectedEnd.getMonth(), selectedEnd.getDate());
    
    return dateOnly >= startOnly && dateOnly <= endOnly;
  };

  const isPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  let priceInfo = null;
  if (selectedStart && selectedEnd) {
    const validation = validateBooking(selectedStart, selectedEnd);
    if (validation.valid) {
      const { total, breakdown, season } = calculatePrice(selectedStart, selectedEnd);
      priceInfo = { total, breakdown, season };
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête du calendrier avec style élégant */}
      <div className="relative bg-gradient-to-br from-[#3d4f5c] to-[#2d3e4d] rounded-xl shadow-2xl overflow-hidden">
        {/* Bordure dorée décorative */}
        <div className="absolute inset-0 border-4 border-[#c9a77c]/30 rounded-xl pointer-events-none"></div>
        <div className="absolute inset-1 border border-[#c9a77c]/20 rounded-lg pointer-events-none"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={previousMonth}
              className="p-3 hover:bg-[#c9a77c]/20 rounded-lg transition-all duration-300 text-[#c9a77c] hover:scale-110"
            >
              <ChevronLeft size={28} />
            </button>
            
            <h3 className="capitalize text-[#c9a77c] tracking-[0.3em] text-xl font-light">
              {monthName}
            </h3>
            
            <button
              onClick={nextMonth}
              className="p-3 hover:bg-[#c9a77c]/20 rounded-lg transition-all duration-300 text-[#c9a77c] hover:scale-110"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 gap-3 mb-4">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div key={day} className="text-center text-[#c9a77c]/80 text-sm py-3 tracking-widest font-light">
                {day}
              </div>
            ))}
          </div>

          {/* Jours du mois */}
          <div className="grid grid-cols-7 gap-3">
            {days.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} />;
              }

              const isBooked = isDateBooked(day);
              const isSelectedDate = isSelected(day);
              const isPastDate = isPast(day);
              const season = getSeason(day);
              const seasonColor = getSeasonColor(season);

              return (
                <button
                  key={index}
                  onClick={() => !isBooked && !isPastDate && handleDateClick(day)}
                  disabled={isBooked || isPastDate}
                  className={`
                    aspect-square p-3 rounded-lg text-sm transition-all duration-300 relative group
                    ${isBooked ? 'bg-[#2d3e4d]/50 text-gray-600 cursor-not-allowed' : ''}
                    ${isPastDate ? 'bg-[#2d3e4d]/30 text-gray-700 cursor-not-allowed opacity-50' : ''}
                    ${isSelectedDate && !isBooked ? 'bg-[#c9a77c] text-white shadow-xl scale-105 border-2 border-[#c9a77c]' : ''}
                    ${!isBooked && !isPastDate && !isSelectedDate ? 'hover:bg-[#c9a77c]/30 text-[#e8e8e8] hover:scale-105 hover:shadow-lg' : ''}
                    ${!isBooked && !isPastDate && !isSelectedDate ? 'border-2' : 'border'}
                  `}
                  style={{
                    borderColor: !isBooked && !isPastDate && !isSelectedDate ? `${seasonColor}60` : undefined,
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="font-light">{day.getDate()}</span>
                    {isBooked && (
                      <span className="text-xs mt-1 opacity-60">●</span>
                    )}
                    {!isBooked && !isPastDate && !isSelectedDate && (
                      <div 
                        className="absolute bottom-1 w-1 h-1 rounded-full opacity-70"
                        style={{ backgroundColor: seasonColor }}
                      ></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Légende des saisons avec style élégant */}
      <div className="relative bg-gradient-to-br from-[#3d4f5c] to-[#2d3e4d] rounded-xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 border-2 border-[#c9a77c]/30 rounded-xl pointer-events-none"></div>
        
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-5">
            <Info size={18} className="text-[#c9a77c]" />
            <span className="text-sm uppercase tracking-[0.2em] text-[#c9a77c] font-light">Légende des saisons</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
            <div className="flex items-center gap-4 bg-[#2d3e4d]/30 p-3 rounded-lg border border-[#c9a77c]/10">
              <div className="w-6 h-6 rounded-full border-2 border-[#c9a77c]/30 shadow-inner" style={{ backgroundColor: getSeasonColor('basse') }}></div>
              <span className="text-[#e8e8e8] font-light">Basse saison</span>
            </div>
            <div className="flex items-center gap-4 bg-[#2d3e4d]/30 p-3 rounded-lg border border-[#c9a77c]/10">
              <div className="w-6 h-6 rounded-full border-2 border-[#c9a77c]/30 shadow-inner" style={{ backgroundColor: getSeasonColor('moyenne') }}></div>
              <span className="text-[#e8e8e8] font-light">Moyenne saison</span>
            </div>
            <div className="flex items-center gap-4 bg-[#2d3e4d]/30 p-3 rounded-lg border border-[#c9a77c]/10">
              <div className="w-6 h-6 rounded-full border-2 border-[#c9a77c]/30 shadow-inner" style={{ backgroundColor: getSeasonColor('haute') }}></div>
              <span className="text-[#e8e8e8] font-light">Haute saison</span>
            </div>
          </div>
        </div>
      </div>

      {/* Résumé de la sélection avec style élégant */}
      {selectedStart && (
        <div className="relative bg-gradient-to-br from-[#3d4f5c] to-[#2d3e4d] rounded-xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 border-4 border-[#c9a77c]/40 rounded-xl pointer-events-none"></div>
          <div className="absolute inset-1 border border-[#c9a77c]/20 rounded-lg pointer-events-none"></div>
          
          <div className="relative p-8 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#c9a77c]/20 pb-4">
              <Calendar size={20} className="text-[#c9a77c]" />
              <span className="uppercase tracking-[0.2em] text-sm text-[#c9a77c] font-light">Votre réservation</span>
            </div>
            
            <div className="space-y-4 text-[#e8e8e8]">
              <div className="flex justify-between items-center text-sm bg-[#2d3e4d]/30 p-4 rounded-lg">
                <span className="text-[#c9a77c]/80 font-light">Arrivée</span>
                <span className="font-light">{selectedStart.toLocaleDateString('fr-FR')}</span>
              </div>
              {selectedEnd && (
                <>
                  <div className="flex justify-between items-center text-sm bg-[#2d3e4d]/30 p-4 rounded-lg">
                    <span className="text-[#c9a77c]/80 font-light">Départ</span>
                    <span className="font-light">{selectedEnd.toLocaleDateString('fr-FR')}</span>
                  </div>
                  {priceInfo && (
                    <>
                      <div className="flex justify-between items-center text-sm bg-[#2d3e4d]/30 p-4 rounded-lg">
                        <span className="text-[#c9a77c]/80 font-light">Saison</span>
                        <span className="capitalize font-light">{getSeasonLabel(priceInfo.season as Season)}</span>
                      </div>
                      <div className="border-t border-[#c9a77c]/20 pt-5 mt-5">
                        <div className="flex items-center gap-2 text-[#c9a77c] mb-4">
                          <Euro size={18} />
                          <span className="uppercase tracking-[0.2em] text-sm font-light">Tarification</span>
                        </div>
                        {priceInfo.breakdown.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-[#d0d0d0] mb-2 font-light">
                            <span>{item}</span>
                          </div>
                        ))}
                        <div className="flex justify-between mt-5 pt-5 border-t border-[#c9a77c]/30 text-lg">
                          <span className="text-[#c9a77c] font-light tracking-wider">Total</span>
                          <span className="text-[#c9a77c] font-normal">{priceInfo.total}€</span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {selectedEnd && priceInfo && (
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#c9a77c] to-[#b89768] text-white hover:from-[#d4b896] hover:to-[#c9a77c] py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl uppercase tracking-[0.2em] text-sm font-light hover:scale-[1.02]"
              >
                {isLoading ? 'Réservation en cours...' : 'Confirmer la réservation'}
              </button>
            )}

            {selectedStart && !selectedEnd && (
              <p className="text-sm text-[#c9a77c]/70 text-center font-light">
                Sélectionnez la date de départ pour continuer
              </p>
            )}
          </div>
        </div>
      )}

      {/* Modal de réservation */}
      {priceInfo && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmBooking}
          startDate={selectedStart}
          endDate={selectedEnd}
          price={priceInfo.total}
          breakdown={priceInfo.breakdown}
          season={getSeasonLabel(priceInfo.season as Season)}
          gite={gite}
        />
      )}
    </div>
  );
}