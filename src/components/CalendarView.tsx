import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";
import { fr } from "date-fns/locale";
import { Reservation } from "./ReservationDialog";
import { getSeasonForDate, getSeasonColor, getSeasonLabel } from "../utils/seasons";

interface CalendarViewProps {
  reservations: Reservation[];
  onDateClick: (date: Date) => void;
}

export function CalendarView({ reservations, onDateClick }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const isDateBooked = (date: Date) => {
    return reservations.some((reservation) =>
      isWithinInterval(date, {
        start: reservation.checkIn,
        end: reservation.checkOut,
      })
    );
  };

  const getDateStatus = (date: Date) => {
    const reservation = reservations.find((r) =>
      isWithinInterval(date, { start: r.checkIn, end: r.checkOut })
    );
    return reservation?.status;
  };

  const isCheckIn = (date: Date) => {
    return reservations.some((r) => isSameDay(r.checkIn, date));
  };

  const isCheckOut = (date: Date) => {
    return reservations.some((r) => isSameDay(r.checkOut, date));
  };

  const getReservationForDate = (date: Date) => {
    return reservations.find((r) =>
      isWithinInterval(date, { start: r.checkIn, end: r.checkOut })
    );
  };

  return (
    <div
      className="border-2 p-4 sm:p-6 lg:p-8 rounded-lg"
      style={{
        backgroundColor: "var(--cottage-darker)",
        borderColor: "var(--cottage-border)",
      }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
        <h2
          className="text-white uppercase tracking-widest text-lg sm:text-xl lg:text-2xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {format(currentMonth, "MMMM yyyy", { locale: fr })}
        </h2>
        <div className="flex gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setCurrentMonth(new Date())}
            className="text-white hover:bg-white/10 text-xs uppercase tracking-wider px-3 sm:px-4"
          >
            Aujourd'hui
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      <div className="border-2 overflow-hidden" style={{ borderColor: "var(--cottage-border)" }}>
        {/* Header row */}
        <div className="grid grid-cols-7 border-b-2" style={{ borderColor: "var(--cottage-border)" }}>
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
            <div
              key={day}
              className="text-center py-2 sm:py-3 lg:py-4 text-[10px] sm:text-xs uppercase tracking-wider"
              style={{ color: "var(--cottage-light)" }}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const booked = isDateBooked(day);
            const status = getDateStatus(day);
            const checkIn = isCheckIn(day);
            const checkOut = isCheckOut(day);
            const today = isToday(day);
            const currentMonthDay = isSameMonth(day, currentMonth);
            const reservation = getReservationForDate(day);
            const season = getSeasonForDate(day);
            const seasonColors = getSeasonColor(season);

            const isLastInRow = (index + 1) % 7 === 0;
            const isLastRow = index >= days.length - 7;

            let bgColor = "var(--cottage-dark)";
            let borderLeftColor = "var(--cottage-border)";
            
            if (booked) {
              // Different colors based on status
              if (status === "pending") {
                // Pending - Orange
                bgColor = "#9a6233";
                borderLeftColor = "#fb923c";
              } else if (status === "approved") {
                // Approved - Purple
                bgColor = "#6b3a99";
                borderLeftColor = "#a855f7";
              } else if (status === "refused") {
                // Refused - Gray (should not show)
                bgColor = "#52555c";
              }
            } else if (season) {
              // Add subtle season background for non-booked dates
              bgColor = `color-mix(in srgb, ${seasonColors.bg} 100%, var(--cottage-dark))`;
              borderLeftColor = seasonColors.border;
            }

            return (
              <button
                key={index}
                onClick={() => onDateClick(day)}
                className={`
                  relative p-2 sm:p-3 lg:p-4 min-h-16 sm:min-h-20 lg:min-h-24 transition-all
                  border-r-2 border-b-2 border-l-2 sm:border-l-4
                  ${!currentMonthDay ? "opacity-30" : ""}
                  ${today ? "ring-1 sm:ring-2 ring-inset" : ""}
                  ${!booked ? "hover:bg-white/5" : ""}
                  ${isLastInRow ? "border-r-0" : ""}
                  ${isLastRow ? "border-b-0" : ""}
                `}
                style={{
                  backgroundColor: bgColor,
                  borderColor: "var(--cottage-border)",
                  borderLeftColor: borderLeftColor,
                  ringColor: "var(--cottage-cream)",
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className={`text-xs sm:text-sm ${today ? "font-semibold" : ""}`}
                      style={{ color: currentMonthDay ? "white" : "var(--cottage-light)" }}
                    >
                      {format(day, "d")}
                    </span>
                    {season && !booked && (
                      <div
                        className="text-[8px] sm:text-[10px] px-1 rounded flex-shrink-0"
                        style={{
                          backgroundColor: seasonColors.border,
                          color: "white",
                        }}
                      >
                        {season === "low" ? "B" : season === "mid" ? "M" : "H"}
                      </div>
                    )}
                  </div>

                  {booked && reservation && (
                    <div className="flex-1 flex flex-col justify-center">
                      {checkIn && (
                        <div
                          className="text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded mb-1 text-center"
                          style={{
                            backgroundColor: "var(--cottage-cream)",
                            color: "var(--cottage-darker)",
                          }}
                        >
                          <span className="hidden sm:inline">Arrivée</span>
                          <span className="sm:hidden">A</span>
                        </div>
                      )}
                      {(checkIn || (!checkIn && !checkOut)) && (
                        <div
                          className="text-[8px] sm:text-xs truncate text-center sm:text-left"
                          style={{ color: "var(--cottage-cream)" }}
                        >
                          <span className="hidden sm:inline">{reservation.guestName}</span>
                          <span className="sm:hidden">{reservation.guestName.split(' ')[0]}</span>
                        </div>
                      )}
                      {checkOut && (
                        <div
                          className="text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded mt-1 text-center"
                          style={{
                            backgroundColor: "#9a8a7a",
                            color: "white",
                          }}
                        >
                          <span className="hidden sm:inline">Départ</span>
                          <span className="sm:hidden">D</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
        {/* Reservation Status Legend */}
        <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4 lg:gap-6 justify-center">
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded border-2"
              style={{ backgroundColor: "#6b3a99", borderColor: "#a855f7" }}
            />
            <span className="text-[10px] sm:text-xs" style={{ color: "var(--cottage-light)" }}>
              Confirmé
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded border-2"
              style={{ backgroundColor: "#9a6233", borderColor: "#fb923c" }}
            />
            <span className="text-[10px] sm:text-xs" style={{ color: "var(--cottage-light)" }}>
              En attente
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded border"
              style={{ backgroundColor: "var(--cottage-cream)", borderColor: "var(--cottage-border)" }}
            />
            <span className="text-[10px] sm:text-xs" style={{ color: "var(--cottage-light)" }}>
              <span className="hidden sm:inline">Arrivée</span>
              <span className="sm:hidden">A</span>
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded border"
              style={{ backgroundColor: "#9a8a7a", borderColor: "var(--cottage-border)" }}
            />
            <span className="text-[10px] sm:text-xs" style={{ color: "var(--cottage-light)" }}>
              <span className="hidden sm:inline">Départ</span>
              <span className="sm:hidden">D</span>
            </span>
          </div>
        </div>

        {/* Season Legend */}
        <div className="pt-3 sm:pt-4 border-t" style={{ borderColor: "var(--cottage-border)" }}>
          <h3 
            className="text-[10px] sm:text-xs uppercase tracking-wider text-center mb-2 sm:mb-3"
            style={{ color: "var(--cottage-cream)" }}
          >
            Saisons tarifaires
          </h3>
          <div className="grid grid-cols-3 sm:flex gap-2 sm:gap-4 lg:gap-6 justify-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded border-l-2 sm:border-l-4"
                style={{ 
                  backgroundColor: getSeasonColor("low").bg,
                  borderLeftColor: getSeasonColor("low").border,
                  borderTop: "1px solid var(--cottage-border)",
                  borderRight: "1px solid var(--cottage-border)",
                  borderBottom: "1px solid var(--cottage-border)",
                }}
              />
              <span className="text-[10px] sm:text-xs" style={{ color: "var(--cottage-light)" }}>
                <span className="hidden sm:inline">{getSeasonLabel("low")}</span>
                <span className="sm:hidden">Basse</span> (B)
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded border-l-2 sm:border-l-4"
                style={{ 
                  backgroundColor: getSeasonColor("mid").bg,
                  borderLeftColor: getSeasonColor("mid").border,
                  borderTop: "1px solid var(--cottage-border)",
                  borderRight: "1px solid var(--cottage-border)",
                  borderBottom: "1px solid var(--cottage-border)",
                }}
              />
              <span className="text-[10px] sm:text-xs" style={{ color: "var(--cottage-light)" }}>
                <span className="hidden sm:inline">{getSeasonLabel("mid")}</span>
                <span className="sm:hidden">Moy.</span> (M)
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded border-l-2 sm:border-l-4"
                style={{ 
                  backgroundColor: getSeasonColor("high").bg,
                  borderLeftColor: getSeasonColor("high").border,
                  borderTop: "1px solid var(--cottage-border)",
                  borderRight: "1px solid var(--cottage-border)",
                  borderBottom: "1px solid var(--cottage-border)",
                }}
              />
              <span className="text-[10px] sm:text-xs" style={{ color: "var(--cottage-light)" }}>
                <span className="hidden sm:inline">{getSeasonLabel("high")}</span>
                <span className="sm:hidden">Haute</span> (H)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
