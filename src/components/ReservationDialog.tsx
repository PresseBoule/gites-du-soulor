import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  notes: string;
  status: "upcoming" | "current" | "past";
}

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (reservation: Omit<Reservation, "id" | "status">) => void;
  existingReservation?: Reservation;
}

export function ReservationDialog({
  open,
  onOpenChange,
  onSave,
  existingReservation,
}: ReservationDialogProps) {
  const [guestName, setGuestName] = useState(existingReservation?.guestName || "");
  const [guestEmail, setGuestEmail] = useState(existingReservation?.guestEmail || "");
  const [guestPhone, setGuestPhone] = useState(existingReservation?.guestPhone || "");
  const [checkIn, setCheckIn] = useState<Date | undefined>(existingReservation?.checkIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(existingReservation?.checkOut);
  const [guests, setGuests] = useState(existingReservation?.guests || 1);
  const [notes, setNotes] = useState(existingReservation?.notes || "");

  useEffect(() => {
    if (existingReservation) {
      setGuestName(existingReservation.guestName);
      setGuestEmail(existingReservation.guestEmail);
      setGuestPhone(existingReservation.guestPhone);
      setCheckIn(existingReservation.checkIn);
      setCheckOut(existingReservation.checkOut);
      setGuests(existingReservation.guests);
      setNotes(existingReservation.notes);
    }
  }, [existingReservation]);

  const handleSave = () => {
    if (!guestName || !checkIn || !checkOut) return;

    onSave({
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      notes,
    });

    // Reset form
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setCheckIn(undefined);
    setCheckOut(undefined);
    setGuests(1);
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl border-2 max-h-[90vh] overflow-y-auto mx-4"
        style={{
          backgroundColor: "var(--cottage-darker)",
          borderColor: "var(--cottage-border)",
        }}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-white text-center"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}
          >
            {existingReservation ? "Modifier la réservation" : "Nouvelle réservation"}
          </DialogTitle>
          <DialogDescription className="text-center text-xs" style={{ color: "var(--cottage-light)" }}>
            {existingReservation 
              ? "Modifiez les informations de la réservation existante" 
              : "Remplissez les informations pour créer une nouvelle réservation"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:gap-6 py-4 sm:py-6">
          <div className="grid gap-2">
            <Label htmlFor="guestName" className="text-xs uppercase tracking-wider" style={{ color: "var(--cottage-cream)" }}>
              Nom du client *
            </Label>
            <Input
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Jean Dupont"
              className="border-2 bg-transparent text-white h-12 sm:h-10"
              style={{ borderColor: "var(--cottage-border)" }}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="guestEmail" className="text-xs uppercase tracking-wider" style={{ color: "var(--cottage-cream)" }}>
                Email
              </Label>
              <Input
                id="guestEmail"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="jean@example.com"
                className="border-2 bg-transparent text-white h-12 sm:h-10"
                style={{ borderColor: "var(--cottage-border)" }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="guestPhone" className="text-xs uppercase tracking-wider" style={{ color: "var(--cottage-cream)" }}>
                Téléphone
              </Label>
              <Input
                id="guestPhone"
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className="border-2 bg-transparent text-white h-12 sm:h-10"
                style={{ borderColor: "var(--cottage-border)" }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wider" style={{ color: "var(--cottage-cream)" }}>
                Date d'arrivée *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="justify-start border-2 bg-transparent text-white hover:bg-white/10 h-12 sm:h-10 text-sm"
                    style={{ borderColor: "var(--cottage-border)" }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="truncate">
                      {checkIn ? format(checkIn, "PPP", { locale: fr }) : "Sélectionner une date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 border-2"
                  style={{
                    backgroundColor: "var(--cottage-darker)",
                    borderColor: "var(--cottage-border)",
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wider" style={{ color: "var(--cottage-cream)" }}>
                Date de départ *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="justify-start border-2 bg-transparent text-white hover:bg-white/10 h-12 sm:h-10 text-sm"
                    style={{ borderColor: "var(--cottage-border)" }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="truncate">
                      {checkOut ? format(checkOut, "PPP", { locale: fr }) : "Sélectionner une date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 border-2"
                  style={{
                    backgroundColor: "var(--cottage-darker)",
                    borderColor: "var(--cottage-border)",
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                    disabled={(date) => checkIn ? date <= checkIn : false}
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="guests" className="text-xs uppercase tracking-wider" style={{ color: "var(--cottage-cream)" }}>
              Nombre de personnes
            </Label>
            <Input
              id="guests"
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="border-2 bg-transparent text-white h-12 sm:h-10"
              style={{ borderColor: "var(--cottage-border)" }}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes" className="text-xs uppercase tracking-wider" style={{ color: "var(--cottage-cream)" }}>
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Demandes spéciales, informations complémentaires..."
              rows={3}
              className="border-2 bg-transparent text-white resize-none"
              style={{ borderColor: "var(--cottage-border)" }}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 flex-col sm:flex-row">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-2 text-white hover:bg-white/10 w-full sm:w-auto h-12 sm:h-10"
            style={{ borderColor: "var(--cottage-border)" }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            disabled={!guestName || !checkIn || !checkOut}
            className="px-6 sm:px-8 w-full sm:w-auto h-12 sm:h-10"
            style={{
              backgroundColor: "var(--cottage-cream)",
              color: "var(--cottage-darker)",
            }}
          >
            {existingReservation ? "Modifier" : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
