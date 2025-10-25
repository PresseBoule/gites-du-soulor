import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { User, Mail, Phone, Users, Calendar, Loader2, Euro } from "lucide-react";
import { getSeasonForDate, getSeasonLabel } from "../utils/seasons";
import { calculatePrice, formatPrice } from "../utils/pricing";

interface BookingFormProps {
  checkIn: Date;
  checkOut: Date;
  onSubmit: (data: {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guests: number;
    notes: string;
  }) => void;
  onCancel: () => void;
  loading: boolean;
}

export function BookingForm({
  checkIn,
  checkOut,
  onSubmit,
  onCancel,
  loading,
}: BookingFormProps) {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");

  const nights = differenceInDays(checkOut, checkIn);
  const season = getSeasonForDate(checkIn);
  const seasonLabel = getSeasonLabel(season);
  const pricingDetails = calculatePrice(checkIn, checkOut);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      guestName,
      guestEmail,
      guestPhone,
      guests,
      notes,
    });
  };

  return (
    <div
      className="border-2 rounded-lg p-6 sticky top-4"
      style={{
        backgroundColor: "var(--cottage-darker)",
        borderColor: "var(--cottage-border)",
      }}
    >
      <h3
        className="text-white mb-6 text-xl text-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Demande de réservation
      </h3>

      {/* Selected Dates Summary */}
      <div
        className="mb-6 p-4 rounded-lg border"
        style={{
          backgroundColor: "rgba(232, 220, 196, 0.05)",
          borderColor: "var(--cottage-border)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4" style={{ color: "var(--cottage-cream)" }} />
          <span className="text-sm" style={{ color: "var(--cottage-cream)" }}>
            Dates sélectionnées
          </span>
        </div>
        <div className="space-y-1 text-xs" style={{ color: "var(--cottage-light)" }}>
          <div className="flex justify-between">
            <span>Arrivée :</span>
            <span>{format(checkIn, "EEEE d MMMM yyyy", { locale: fr })}</span>
          </div>
          <div className="flex justify-between">
            <span>Départ :</span>
            <span>{format(checkOut, "EEEE d MMMM yyyy", { locale: fr })}</span>
          </div>
          <div className="flex justify-between pt-2 border-t" style={{ borderColor: "var(--cottage-border)" }}>
            <span>Durée :</span>
            <span className="font-semibold">
              {nights} {nights === 1 ? "nuit" : "nuits"}
            </span>
          </div>
          {seasonLabel && (
            <div className="flex justify-between">
              <span>Saison :</span>
              <span style={{ color: "var(--cottage-cream)" }}>{seasonLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Price Display */}
      {pricingDetails && (
        <div
          className="mb-6 p-4 rounded-lg border-2"
          style={{
            backgroundColor: "rgba(232, 220, 196, 0.1)",
            borderColor: "var(--cottage-cream)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Euro className="h-5 w-5" style={{ color: "var(--cottage-cream)" }} />
            <span className="text-sm" style={{ color: "var(--cottage-cream)" }}>
              Tarif total
            </span>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-1" style={{ color: "var(--cottage-cream)" }}>
              {formatPrice(pricingDetails.total)}
            </div>
            <div className="text-xs" style={{ color: "var(--cottage-light)" }}>
              {pricingDetails.breakdown}
            </div>
          </div>
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Guest Name */}
        <div className="space-y-2">
          <Label htmlFor="guestName" className="text-sm" style={{ color: "var(--cottage-cream)" }}>
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" />
              Nom complet *
            </div>
          </Label>
          <Input
            id="guestName"
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            placeholder="Jean Dupont"
            className="border-2"
            style={{
              backgroundColor: "var(--cottage-dark)",
              borderColor: "var(--cottage-border)",
              color: "white",
            }}
          />
        </div>

        {/* Guest Email */}
        <div className="space-y-2">
          <Label htmlFor="guestEmail" className="text-sm" style={{ color: "var(--cottage-cream)" }}>
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              Email *
            </div>
          </Label>
          <Input
            id="guestEmail"
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            required
            placeholder="jean.dupont@email.com"
            className="border-2"
            style={{
              backgroundColor: "var(--cottage-dark)",
              borderColor: "var(--cottage-border)",
              color: "white",
            }}
          />
        </div>

        {/* Guest Phone */}
        <div className="space-y-2">
          <Label htmlFor="guestPhone" className="text-sm" style={{ color: "var(--cottage-cream)" }}>
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              Téléphone *
            </div>
          </Label>
          <Input
            id="guestPhone"
            type="tel"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            required
            placeholder="+33 6 12 34 56 78"
            className="border-2"
            style={{
              backgroundColor: "var(--cottage-dark)",
              borderColor: "var(--cottage-border)",
              color: "white",
            }}
          />
        </div>

        {/* Number of Guests */}
        <div className="space-y-2">
          <Label htmlFor="guests" className="text-sm" style={{ color: "var(--cottage-cream)" }}>
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3" />
              Nombre de personnes *
            </div>
          </Label>
          <Input
            id="guests"
            type="number"
            min="1"
            max="2"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
            required
            className="border-2"
            style={{
              backgroundColor: "var(--cottage-dark)",
              borderColor: "var(--cottage-border)",
              color: "white",
            }}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm" style={{ color: "var(--cottage-cream)" }}>
            Commentaires (optionnel)
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Demandes spéciales, heure d'arrivée estimée..."
            rows={3}
            className="border-2 resize-none"
            style={{
              backgroundColor: "var(--cottage-dark)",
              borderColor: "var(--cottage-border)",
              color: "white",
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-2"
            disabled={loading}
            style={{
              borderColor: "var(--cottage-border)",
              color: "var(--cottage-cream)",
            }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={loading}
            style={{
              backgroundColor: "var(--cottage-cream)",
              color: "var(--cottage-darker)",
            }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Envoi...
              </>
            ) : (
              "Envoyer la demande"
            )}
          </Button>
        </div>
      </form>

      <p className="text-xs mt-4 text-center" style={{ color: "var(--cottage-light)" }}>
        Vous recevrez un email de confirmation après validation
      </p>
    </div>
  );
}
