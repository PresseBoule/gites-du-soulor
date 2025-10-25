import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Calendar, Users, MapPin, Check, Home } from "lucide-react";
import { BookingCalendar } from "./components/BookingCalendar";
import { BookingForm } from "./components/BookingForm";
import { SeasonLegend } from "./components/SeasonLegend";
import { toast, Toaster } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "./utils/supabase/info";

// Image de héro - compatible Netlify
const heroImage = "https://images.unsplash.com/photo-1701938840426-18396f3dd957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNvdHRhZ2UlMjBweXJlbmVlc3xlbnwxfHx8fDE3NjEzMTU4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080";

// Types
export interface Gite {
  id: string;
  name: string;
  description: string;
  capacity: number;
  color: string;
}

export interface Reservation {
  id: string;
  giteId: string;
  giteName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  notes: string;
  status: "pending" | "approved" | "refused";
}

// Configuration des 4 gîtes
const GITES: Gite[] = [
  {
    id: "le-soum",
    name: "Le Soum",
    description: "Vue panoramique sur les montagnes",
    capacity: 2,
    color: "rgba(232, 220, 196, 0.15)",
  },
  {
    id: "lestaing",
    name: "L'Estaing",
    description: "Au cœur de la nature",
    capacity: 2,
    color: "rgba(139, 92, 246, 0.15)",
  },
  {
    id: "le-suyen",
    name: "Le Suyen",
    description: "Calme et sérénité",
    capacity: 2,
    color: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: "le-tech",
    name: "Le Tech",
    description: "Authenticité montagnarde",
    capacity: 2,
    color: "rgba(16, 185, 129, 0.15)",
  },
];

// API URL
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-09db1ac7`;

// API Functions
async function fetchReservations(): Promise<Reservation[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || "Failed to fetch reservations");
    }

    // Convert ISO strings back to Date objects
    return result.data.map((r: any) => ({
      ...r,
      checkIn: new Date(r.checkIn),
      checkOut: new Date(r.checkOut),
    }));
  } catch (error) {
    console.error("Error fetching reservations:", error);
    toast.error("Erreur lors du chargement des réservations");
    return [];
  }
}

async function createReservation(reservationData: {
  giteId: string;
  giteName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  notes: string;
}): Promise<{ success: boolean; data?: Reservation; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        giteId: reservationData.giteId,
        giteName: reservationData.giteName,
        guestName: reservationData.guestName,
        guestEmail: reservationData.guestEmail,
        guestPhone: reservationData.guestPhone,
        checkIn: reservationData.checkIn.toISOString(),
        checkOut: reservationData.checkOut.toISOString(),
        guests: reservationData.guests,
        notes: reservationData.notes,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.error || "Erreur lors de la création de la réservation",
      };
    }

    // Convert ISO strings back to Date objects
    const reservation: Reservation = {
      ...result.data,
      checkIn: new Date(result.data.checkIn),
      checkOut: new Date(result.data.checkOut),
    };

    return { success: true, data: reservation };
  } catch (error) {
    console.error("Error creating reservation:", error);
    return {
      success: false,
      error: "Erreur de connexion au serveur",
    };
  }
}

export default function App() {
  const [selectedGite, setSelectedGite] = useState<Gite | null>(null);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDates, setSelectedDates] = useState<{ checkIn: Date | null; checkOut: Date | null }>({
    checkIn: null,
    checkOut: null,
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Charger toutes les réservations au démarrage
  useEffect(() => {
    const loadReservations = async () => {
      setLoading(true);
      const loadedReservations = await fetchReservations();
      setAllReservations(loadedReservations);
      setLoading(false);
    };

    loadReservations();
  }, []);

  // Filtrer les réservations quand un gîte est sélectionné
  useEffect(() => {
    if (selectedGite) {
      const giteReservations = allReservations.filter(r => r.giteId === selectedGite.id);
      setReservations(giteReservations);
      // Reset selection when changing gite
      setSelectedDates({ checkIn: null, checkOut: null });
      setShowBookingForm(false);
    }
  }, [selectedGite, allReservations]);

  const handleGiteSelect = (gite: Gite) => {
    setSelectedGite(gite);
  };

  const handleDateSelect = (checkIn: Date | null, checkOut: Date | null) => {
    setSelectedDates({ checkIn, checkOut });
    if (checkIn && checkOut) {
      setShowBookingForm(true);
    }
  };

  const handleBookingSubmit = async (bookingData: {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guests: number;
    notes: string;
  }) => {
    if (!selectedGite || !selectedDates.checkIn || !selectedDates.checkOut) {
      toast.error("Veuillez sélectionner un gîte et des dates");
      return;
    }

    setLoading(true);

    const result = await createReservation({
      giteId: selectedGite.id,
      giteName: selectedGite.name,
      guestName: bookingData.guestName,
      guestEmail: bookingData.guestEmail,
      guestPhone: bookingData.guestPhone,
      checkIn: selectedDates.checkIn,
      checkOut: selectedDates.checkOut,
      guests: bookingData.guests,
      notes: bookingData.notes,
    });

    setLoading(false);

    if (!result.success) {
      toast.error(result.error || "Erreur lors de la réservation");
      return;
    }

    // Update local state
    const newReservations = [...allReservations, result.data!];
    setAllReservations(newReservations);

    toast.success(
      `Demande envoyée avec succès pour ${selectedGite.name} ! Le gérant vous recontactera au plus vite pour un devis personnalisé.`,
      { duration: 5000 }
    );

    setShowBookingForm(false);
    setSelectedDates({ checkIn: null, checkOut: null });
  };

  const handleBackToSelection = () => {
    setSelectedGite(null);
    setSelectedDates({ checkIn: null, checkOut: null });
    setShowBookingForm(false);
  };

  return (
    <>
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "var(--cottage-darker)",
            color: "var(--cottage-cream)",
            border: "2px solid var(--cottage-border)",
          },
        }}
      />
      <div className="min-h-screen" style={{ backgroundColor: "var(--cottage-dark)" }}>
        {/* Hero Section */}
        <div
          className="relative border-b-2 overflow-hidden"
          style={{ borderColor: "var(--cottage-border)" }}
        >
          <div className="absolute inset-0 opacity-20">
            <img
              src={heroImage}
              alt="Gîte"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 text-center">
            <h1
              className="mb-4 sm:mb-6 text-white tracking-wide text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "0.15em",
              }}
            >
              LES GÎTES DU SOULOR
            </h1>
            <p
              className="mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--cottage-cream)" }}
            >
              Réservez votre séjour dans nos gîtes authentiques
            </p>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8">
              <div className="flex items-center gap-2" style={{ color: "var(--cottage-cream)" }}>
                <MapPin className="h-5 w-5" />
                <span className="text-sm sm:text-base">Hautes-Pyrénées</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: "var(--cottage-cream)" }}>
                <Home className="h-5 w-5" />
                <span className="text-sm sm:text-base">4 gîtes disponibles</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: "var(--cottage-cream)" }}>
                <Users className="h-5 w-5" />
                <span className="text-sm sm:text-base">2 personnes par gîte</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            {!selectedGite ? (
              /* Sélection du gîte */
              <>
                <div className="text-center mb-8 sm:mb-12">
                  <h2
                    className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Choisissez votre gîte
                  </h2>
                  <p className="text-sm sm:text-base" style={{ color: "var(--cottage-light)" }}>
                    Sélectionnez le gîte qui vous convient pour voir les disponibilités
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {GITES.map((gite) => (
                    <button
                      key={gite.id}
                      onClick={() => handleGiteSelect(gite)}
                      className="border-2 rounded-lg p-6 sm:p-8 text-left transition-all hover:scale-105 hover:shadow-xl"
                      style={{
                        backgroundColor: gite.color,
                        borderColor: "var(--cottage-border)",
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: "var(--cottage-cream)",
                            color: "var(--cottage-darker)",
                          }}
                        >
                          <Home className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3
                            className="text-white mb-2 text-xl sm:text-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {gite.name}
                          </h3>
                          <p className="mb-3 text-sm sm:text-base" style={{ color: "var(--cottage-light)" }}>
                            {gite.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--cottage-cream)" }}>
                            <Users className="h-4 w-4" />
                            <span>Capacité : {gite.capacity} personnes</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Check className="h-6 w-6" style={{ color: "var(--cottage-cream)" }} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Calendrier et réservation */
              <>
                {/* Breadcrumb / Retour */}
                <div className="mb-6">
                  <Button
                    onClick={handleBackToSelection}
                    variant="ghost"
                    className="gap-2"
                    style={{ color: "var(--cottage-cream)" }}
                  >
                    ← Changer de gîte
                  </Button>
                </div>

                {/* Titre avec gîte sélectionné */}
                <div className="text-center mb-8 sm:mb-12">
                  <h2
                    className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {selectedGite.name}
                  </h2>
                  <p className="text-sm sm:text-base mb-2" style={{ color: "var(--cottage-cream)" }}>
                    {selectedGite.description}
                  </p>
                  <p className="text-sm" style={{ color: "var(--cottage-light)" }}>
                    Consultez les disponibilités et réservez vos dates
                  </p>
                </div>

                {/* Season Legend */}
                <div className="mb-6 sm:mb-8">
                  <SeasonLegend />
                </div>

                {/* Calendar and Booking Form */}
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Calendar */}
                  <div className="lg:col-span-2">
                    <BookingCalendar
                      reservations={reservations}
                      selectedDates={selectedDates}
                      onDateSelect={handleDateSelect}
                      loading={loading}
                    />
                  </div>

                  {/* Booking Form or Info */}
                  <div className="lg:col-span-1">
                    {showBookingForm && selectedDates.checkIn && selectedDates.checkOut ? (
                      <BookingForm
                        checkIn={selectedDates.checkIn}
                        checkOut={selectedDates.checkOut}
                        onSubmit={handleBookingSubmit}
                        onCancel={() => {
                          setShowBookingForm(false);
                          setSelectedDates({ checkIn: null, checkOut: null });
                        }}
                        loading={loading}
                      />
                    ) : (
                      <div
                        className="border-2 rounded-lg p-6 sm:p-8 sticky top-4"
                        style={{
                          backgroundColor: "var(--cottage-darker)",
                          borderColor: "var(--cottage-border)",
                        }}
                      >
                        <Calendar
                          className="h-16 w-16 mx-auto mb-6"
                          style={{ color: "var(--cottage-cream)" }}
                        />
                        <h3
                          className="text-white text-center mb-4 text-xl"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Comment réserver ?
                        </h3>
                        <div className="space-y-4 text-sm" style={{ color: "var(--cottage-light)" }}>
                          <div className="flex gap-3">
                            <div
                              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: "var(--cottage-cream)",
                                color: "var(--cottage-darker)",
                              }}
                            >
                              1
                            </div>
                            <p>Cliquez sur la date d'arrivée souhaitée dans le calendrier</p>
                          </div>
                          <div className="flex gap-3">
                            <div
                              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: "var(--cottage-cream)",
                                color: "var(--cottage-darker)",
                              }}
                            >
                              2
                            </div>
                            <p>Sélectionnez la date de départ</p>
                          </div>
                          <div className="flex gap-3">
                            <div
                              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: "var(--cottage-cream)",
                                color: "var(--cottage-darker)",
                              }}
                            >
                              3
                            </div>
                            <p>Remplissez le formulaire de demande</p>
                          </div>
                          <div className="flex gap-3">
                            <div
                              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: "var(--cottage-cream)",
                                color: "var(--cottage-darker)",
                              }}
                            >
                              4
                            </div>
                            <p>Recevez la confirmation après validation</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer
          className="border-t-2 mt-12 sm:mt-16 lg:mt-24 py-8"
          style={{ borderColor: "var(--cottage-border)" }}
        >
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs sm:text-sm" style={{ color: "var(--cottage-light)" }}>
              Pour toute question, contactez-nous à{" "}
              <a
                href="mailto:spanazol@wanadoo.fr"
                className="underline"
                style={{ color: "var(--cottage-cream)" }}
              >
                spanazol@wanadoo.fr
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
