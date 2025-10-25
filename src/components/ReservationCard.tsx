import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Mail, Phone, Users, Trash2, Edit } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Reservation } from "./ReservationDialog";

interface ReservationCardProps {
  reservation: Reservation;
  onEdit: (reservation: Reservation) => void;
  onDelete: (id: string) => void;
}

export function ReservationCard({ reservation, onEdit, onDelete }: ReservationCardProps) {
  const nights = differenceInDays(reservation.checkOut, reservation.checkIn);

  return (
    <div
      className="border p-3 rounded transition-all hover:bg-white/5 touch-manipulation"
      style={{
        borderColor: "var(--cottage-border)",
        backgroundColor: "var(--cottage-dark)",
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm mb-1 truncate">{reservation.guestName}</h4>
          <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "var(--cottage-light)" }}>
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">
              {format(reservation.checkIn, "d MMM", { locale: fr })} - {format(reservation.checkOut, "d MMM", { locale: fr })}
            </span>
          </div>
          <div className="text-xs" style={{ color: "var(--cottage-cream)" }}>
            {nights} {nights === 1 ? "nuit" : "nuits"}
          </div>
        </div>
        <div className="flex gap-1 ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(reservation)}
            className="h-8 w-8 sm:h-7 sm:w-7 text-white hover:bg-white/10 touch-manipulation"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(reservation.id)}
            className="h-8 w-8 sm:h-7 sm:w-7 text-white hover:bg-white/10 touch-manipulation"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {(reservation.guestEmail || reservation.guestPhone || reservation.guests > 1) && (
        <div className="space-y-1 text-xs pt-2 border-t" style={{ borderColor: "var(--cottage-border)", color: "var(--cottage-light)" }}>
          {reservation.guestEmail && (
            <div className="flex items-center gap-2 min-w-0">
              <Mail className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{reservation.guestEmail}</span>
            </div>
          )}

          {reservation.guestPhone && (
            <div className="flex items-center gap-2 min-w-0">
              <Phone className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{reservation.guestPhone}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Users className="h-3 w-3 flex-shrink-0" />
            <span>{reservation.guests} {reservation.guests === 1 ? "personne" : "personnes"}</span>
          </div>
        </div>
      )}

      {reservation.notes && (
        <p className="text-xs mt-2 pt-2 border-t line-clamp-2" style={{ borderColor: "var(--cottage-border)", color: "var(--cottage-light)" }}>
          {reservation.notes}
        </p>
      )}
    </div>
  );
}
