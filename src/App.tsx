import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Calendar, Users, MapPin, Check, Home } from "lucide-react";
import { BookingCalendar } from "./components/BookingCalendar";
import { BookingForm } from "./components/BookingForm";
import { SeasonLegend } from "./components/SeasonLegend";
import { projectId, publicAnonKey } from "./utils/supabase/info";
import { toast, Toaster } from "sonner@2.0.3";
import heroImage from "figma:asset/b1015fd3878a43013db9e4b6aed12af42607e0c8.png";

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-09db1ac7`;

// Les 4 gîtes
const GITES = [
  { id: "le-soum", name: "Le Soum" },
  { id: "lestaing", name: "L'Estaing" },
  { id: "le-suyen", name: "Le Suyen" },
  { id: "le-tech", name: "Le Tech" },
];

export interface Reservation {
  id: string;
  giteId?: string;
  giteName?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  notes: string;
  status: "pending" | "approved" | "refused";
}

interface ServerReservation {
  id: string;
  giteId?: string;
  giteName?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  notes: string;
  status: "pending" | "approved" | "refused";
  createdAt: string;
}

function convertToReservation(serverRes: ServerReservation): Reservation {
  return {
    id: serverRes.id,
    giteId: serverRes.giteId,
    giteName: serverRes.giteName,
    guestName: serverRes.guestName,
    guestEmail: serverRes.guestEmail,
    guestPhone: serverRes.guestPhone,
    checkIn: new Date(serverRes.checkIn),
    checkOut: new Date(serverRes.checkOut),
    guests: serverRes.guests,
    notes: serverRes.notes,
    status: serverRes.status || "pending",
  };
}

export default function App() {
  const [selectedGite, setSelectedGite] = useState<string | null>(null);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDates, setSelectedDates] = useState<{ checkIn: Date | null; checkOut: Date | null }>({
    checkIn: null,
    checkOut: null,
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load reservations from server
  useEffect(() => {
    loadReservations();
  }, []);

  // Filter by gite
  useEffect(() => {
    if (selectedGite) {
      setReservations(allReservations.filter(r => r.giteId === selectedGite));
    }
  }, [selectedGite, allReservations]);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load reservations");
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        const validData = result.data.filter(
          (item) => item && item.checkIn && item.checkOut && item.guestName
        );
        const converted = validData.map(convertToReservation);
        setAllReservations(converted);
      }
    } catch (error) {
      console.error("Error loading reservations:", error);
      toast.error("Erreur lors du chargement des disponibilités");
    } finally {
      setLoading(false);
    }
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
    if (!selectedDates.checkIn || !selectedDates.checkOut || !selectedGite) {
      toast.error("Veuillez sélectionner des dates");
      return;
    }

    try {
      setSubmitting(true);

      const gite = GITES.find(g => g.id === selectedGite);
      const payload = {
        giteId: selectedGite,
        giteName: gite?.name || selectedGite,
        guestName: bookingData.guestName,
        guestEmail: bookingData.guestEmail,
        guestPhone: bookingData.guestPhone,
        checkIn: selectedDates.checkIn.toISOString(),
        checkOut: selectedDates.checkOut.toISOString(),
        guests: bookingData.guests,
        notes: bookingData.notes,
      };

      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Erreur lors de l'envoi de la demande");
        return;
      }

      if (result.success && result.data) {
        const newReservation = convertToReservation(result.data);
        setAllReservations((prev) => [...prev, newReservation]);
        toast.success("Demande envoyée avec succès ! Le gérant vous recontactera au plus vite pour un devis personnalisé.", {
          duration: 5000,
        });
        setShowBookingForm(false);
        setSelectedDates({ checkIn: null, checkOut: null });
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error("Erreur lors de la création de la réservation");
    } finally {
      setSubmitting(false);
    }
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
                <Users className="h-5 w-5" />
                <span className="text-sm sm:text-base">2 personnes</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: "var(--cottage-cream)" }}>
                <Check className="h-5 w-5" />
                <span className="text-sm sm:text-base">Équipements complets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            
            {/* Sélection du gîte */}
            {!selectedGite && (
              <>
                <div className="text-center mb-8 sm:mb-12">
                  <h2
                    className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Choisissez votre gîte
                  </h2>
                  <p className="text-sm sm:text-base" style={{ color: "var(--cottage-light)" }}>
                    Sélectionnez l'un de nos 4 gîtes pour voir les disponibilités
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {GITES.map((gite) => (
                    <button
                      key={gite.id}
                      onClick={() => setSelectedGite(gite.id)}
                      className="border-2 rounded-lg p-8 text-left hover:scale-105 transition-transform"
                      style={{
                        backgroundColor: "var(--cottage-darker)",
                        borderColor: "var(--cottage-border)",
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <Home className="h-8 w-8" style={{ color: "var(--cottage-cream)" }} />
                        <h3
                          className="text-white text-2xl"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {gite.name}
                        </h3>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Calendrier si gîte sélectionné */}
            {selectedGite && (
              <>
                <div className="mb-6">
                  <Button
                    onClick={() => {
                      setSelectedGite(null);
                      setSelectedDates({ checkIn: null, checkOut: null });
                      setShowBookingForm(false);
                    }}
                    variant="ghost"
                    style={{ color: "var(--cottage-cream)" }}
                  >
                    ← Retour aux gîtes
                  </Button>
                </div>

                {/* Intro Section */}
                <div className="text-center mb-8 sm:mb-12">
                  <h2
                    className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {GITES.find(g => g.id === selectedGite)?.name}
                  </h2>
                  <p className="text-sm sm:text-base" style={{ color: "var(--cottage-light)" }}>
                    Consultez nos disponibilités et réservez directement en ligne
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
                        loading={submitting}
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
