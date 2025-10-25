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
      {/* En-tête du calendrier */}
      <div className="flex items-center justify-between bg-[#4a5c6a] border border-[#c9a77c]/40 rounded-lg p-4 mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-[#5a6c7a] rounded-lg transition-colors text-[#c9a77c]"
        >
          <ChevronLeft size={24} />
        </button>
        
        <h3 className="capitalize text-[#e8e8e8] tracking-wider">{monthName}</h3>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#5a6c7a] rounded-lg transition-colors text-[#c9a77c]"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Légende des saisons */}
      <div className="bg-[#4a5c6a] border border-[#c9a77c]/40 rounded-lg p-5 mb-6">
        <div className="flex items-center gap-2 mb-4 text-[#c9a77c]">
          <Info size={18} />
          <span className="text-sm uppercase tracking-wider">Légende des saisons</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border-2 border-[#c9a77c]/30" style={{ backgroundColor: getSeasonColor('basse') }}></div>
            <span className="text-[#e8e8e8]">Basse saison</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border-2 border-[#c9a77c]/30" style={{ backgroundColor: getSeasonColor('moyenne') }}></div>
            <span className="text-[#e8e8e8]">Moyenne saison</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border-2 border-[#c9a77c]/30" style={{ backgroundColor: getSeasonColor('haute') }}></div>
            <span className="text-[#e8e8e8]">Haute saison</span>
          </div>
        </div>
      </div>

      {/* Calendrier */}
      <div className="bg-[#4a5c6a] border border-[#c9a77c]/40 rounded-lg p-5">
        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
            <div key={day} className="text-center text-[#c9a77c] text-sm py-2 tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Jours du mois */}
        <div className="grid grid-cols-7 gap-2">
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
                  aspect-square p-2 rounded-lg text-sm transition-all relative
                  ${isBooked ? 'bg-[#2d3e4d] text-gray-500 cursor-not-allowed' : ''}
                  ${isPastDate ? 'bg-[#2d3e4d] text-gray-600 cursor-not-allowed' : ''}
                  ${isSelectedDate && !isBooked ? 'bg-[#c9a77c] text-white shadow-lg' : ''}
                  ${!isBooked && !isPastDate && !isSelectedDate ? 'hover:bg-[#5a6c7a] text-[#e8e8e8]' : ''}
                  ${!isBooked && !isPastDate && !isSelectedDate ? 'border-2' : 'border'}
                  border-transparent
                `}
                style={{
                  borderColor: !isBooked && !isPastDate && !isSelectedDate ? seasonColor : undefined,
                }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span>{day.getDate()}</span>
                  {isBooked && (
                    <span className="text-xs mt-1">●</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Résumé de la sélection */}
      {selectedStart && (
        <div className="bg-[#4a5c6a] border-2 border-[#c9a77c]/40 rounded-lg p-6 space-y-4 mt-6">
          <div className="flex items-center gap-2 text-[#c9a77c]">
            <Calendar size={18} />
            <span className="uppercase tracking-wider text-sm">Sélection en cours</span>
          </div>
          
          <div className="space-y-3 text-[#e8e8e8]">
            <div className="flex justify-between text-sm">
              <span className="text-[#d0d0d0]">Arrivée :</span>
              <span>{selectedStart.toLocaleDateString('fr-FR')}</span>
            </div>
            {selectedEnd && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-[#d0d0d0]">Départ :</span>
                  <span>{selectedEnd.toLocaleDateString('fr-FR')}</span>
                </div>
                {priceInfo && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#d0d0d0]">Saison :</span>
                      <span className="capitalize">{getSeasonLabel(priceInfo.season as Season)}</span>
                    </div>
                    <div className="border-t border-[#c9a77c]/30 pt-3 mt-3">
                      <div className="flex items-center gap-2 text-[#c9a77c] mb-3">
                        <Euro size={16} />
                        <span className="uppercase tracking-wider text-sm">Tarification</span>
                      </div>
                      {priceInfo.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm text-[#d0d0d0] mb-1">
                          <span>{item}</span>
                        </div>
                      ))}
                      <div className="flex justify-between mt-3 pt-3 border-t border-[#c9a77c]/30">
                        <span className="text-[#c9a77c]">Total :</span>
                        <span className="text-[#c9a77c]">{priceInfo.total}€</span>
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
              className="w-full bg-[#c9a77c] text-white hover:bg-[#d4b896] py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Réservation en cours...' : 'Réserver'}
            </button>
          )}

          {selectedStart && !selectedEnd && (
            <p className="text-sm text-[#d0d0d0] text-center">
              Sélectionnez la date de départ pour continuer
            </p>
          )}
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
