import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { getSeasonForDate, getSeasonColor } from "../utils/seasons";
import { Reservation } from "../App";

interface BookingCalendarProps {
  reservations: Reservation[];
  selectedDates: { checkIn: Date | null; checkOut: Date | null };
  onDateSelect: (checkIn: Date | null, checkOut: Date | null) => void;
  loading: boolean;
}

export function BookingCalendar({
  reservations,
  selectedDates,
  onDateSelect,
  loading,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Log reservations when they change
  console.log(`📅 BookingCalendar: ${reservations.length} réservation(s) reçue(s)`, reservations);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: fr });
  const calendarEnd = endOfWeek(monthEnd, { locale: fr });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if a date is reserved
  const isDateReserved = (date: Date): boolean => {
    return reservations.some((reservation) => {
      const start = new Date(reservation.checkIn);
      const end = new Date(reservation.checkOut);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      
      return isWithinInterval(date, { start, end });
    });
  };

  // Check if a date is in the past
  const isPast = (date: Date): boolean => {
    return isBefore(date, today);
  };

  // Check if a date is available for selection
  const isAvailable = (date: Date): boolean => {
    return !isPast(date) && !isDateReserved(date);
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (!isAvailable(date)) return;

    if (!selectedDates.checkIn) {
      // First click - select check-in
      onDateSelect(date, null);
    } else if (selectedDates.checkIn && !selectedDates.checkOut) {
      // Second click - select check-out
      if (isBefore(date, selectedDates.checkIn) || isSameDay(date, selectedDates.checkIn)) {
        // Reset if clicked before or same as check-in
        onDateSelect(date, null);
      } else {
        // Check if range is available
        const rangeAvailable = eachDayOfInterval({
          start: selectedDates.checkIn,
          end: date,
        }).every((d) => isAvailable(d) || isSameDay(d, selectedDates.checkIn) || isSameDay(d, date));

        if (rangeAvailable) {
          onDateSelect(selectedDates.checkIn, date);
        } else {
          // Range contains reserved dates, reset
          onDateSelect(date, null);
        }
      }
    } else {
      // Reset and start new selection
      onDateSelect(date, null);
    }
  };

  // Check if date is in selected range
  const isInSelectedRange = (date: Date): boolean => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return false;
    return isWithinInterval(date, {
      start: selectedDates.checkIn,
      end: selectedDates.checkOut,
    });
  };

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  if (loading) {
    return (
      <div
        className="border-2 rounded-lg p-8 flex items-center justify-center min-h-[500px]"
        style={{
          backgroundColor: "var(--cottage-darker)",
          borderColor: "var(--cottage-border)",
        }}
      >
        <div className="text-center">
          <Loader2
            className="h-12 w-12 animate-spin mx-auto mb-4"
            style={{ color: "var(--cottage-cream)" }}
          />
          <p className="text-white">Chargement du calendrier...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="border-2 rounded-lg p-4 sm:p-6"
      style={{
        backgroundColor: "var(--cottage-darker)",
        borderColor: "var(--cottage-border)",
      }}
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={goToPreviousMonth}
          variant="ghost"
          size="icon"
          className="hover:bg-opacity-10"
          style={{ color: "var(--cottage-cream)" }}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2
          className="text-white text-lg sm:text-xl capitalize"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {format(currentMonth, "MMMM yyyy", { locale: fr })}
        </h2>
        <Button
          onClick={goToNextMonth}
          variant="ghost"
          size="icon"
          className="hover:bg-opacity-10"
          style={{ color: "var(--cottage-cream)" }}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {/* Week Day Headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center py-2 text-xs sm:text-sm"
            style={{ color: "var(--cottage-cream)" }}
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((day) => {
          const season = getSeasonForDate(day);
          const seasonColors = getSeasonColor(season);
          const reserved = isDateReserved(day);
          const past = isPast(day);
          const available = isAvailable(day);
          const isCheckIn = selectedDates.checkIn && isSameDay(day, selectedDates.checkIn);
          const isCheckOut = selectedDates.checkOut && isSameDay(day, selectedDates.checkOut);
          const inRange = isInSelectedRange(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          let dayStyle: React.CSSProperties = {
            backgroundColor: "transparent",
            border: "1px solid var(--cottage-border)",
            color: "var(--cottage-light)",
          };

          if (!isCurrentMonth) {
            dayStyle.opacity = "0.3";
          }

          if (season && isCurrentMonth) {
            dayStyle.backgroundColor = seasonColors.bg;
            dayStyle.borderColor = seasonColors.border;
          }

          if (reserved) {
            // All reservations - Purple/Magenta
            dayStyle.backgroundColor = "rgba(168, 85, 247, 0.3)";
            dayStyle.borderColor = "#a855f7";
            dayStyle.color = "#c084fc";
          }

          if (past) {
            dayStyle.opacity = "0.4";
            dayStyle.cursor = "not-allowed";
          }

          if (isCheckIn || isCheckOut) {
            dayStyle.backgroundColor = "var(--cottage-cream)";
            dayStyle.color = "var(--cottage-darker)";
            dayStyle.borderColor = "var(--cottage-cream)";
          }

          if (inRange && !isCheckIn && !isCheckOut) {
            dayStyle.backgroundColor = "rgba(232, 220, 196, 0.2)";
            dayStyle.borderColor = "var(--cottage-cream)";
            dayStyle.color = "var(--cottage-cream)";
          }

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              disabled={!available || !isCurrentMonth}
              className="aspect-square p-1 sm:p-2 rounded-md text-xs sm:text-sm transition-all hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={dayStyle}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span>{format(day, "d")}</span>
                {isCheckIn && (
                  <span className="text-[8px] sm:text-[10px] mt-1">Arrivée</span>
                )}
                {isCheckOut && (
                  <span className="text-[8px] sm:text-[10px] mt-1">Départ</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--cottage-border)" }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border"
              style={{
                backgroundColor: "var(--cottage-cream)",
                borderColor: "var(--cottage-cream)",
              }}
            />
            <span style={{ color: "var(--cottage-light)" }}>Sélectionné</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border"
              style={{
                backgroundColor: "rgba(168, 85, 247, 0.3)",
                borderColor: "#a855f7",
              }}
            />
            <span style={{ color: "var(--cottage-light)" }}>Réservé</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border opacity-40"
              style={{
                backgroundColor: "transparent",
                borderColor: "var(--cottage-border)",
              }}
            />
            <span style={{ color: "var(--cottage-light)" }}>Indisponible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
