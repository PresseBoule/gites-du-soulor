import { differenceInDays, getDay } from "date-fns";
import { getSeasonForDate, Season } from "./seasons";

export interface PricingDetails {
  total: number;
  nights: number;
  type: "weekend" | "week" | "weekdays";
  season: Season;
  breakdown: string;
}

// Tarifs par saison
const PRICING = {
  weekend: {
    low: 400,
    mid: 425,
    high: 450,
  },
  weekday: {
    low: 150,
    mid: 165,
    high: 180,
  },
  week: {
    low: 1150,
    mid: 1250,
    high: 1350,
  },
};

/**
 * Vérifie si les dates correspondent à un week-end (vendredi 16h à dimanche 11h)
 * On considère vendredi à dimanche
 */
function isWeekendStay(checkIn: Date, checkOut: Date): boolean {
  const checkInDay = getDay(checkIn); // 0 = dimanche, 5 = vendredi
  const checkOutDay = getDay(checkOut);
  const nights = differenceInDays(checkOut, checkIn);

  // Week-end = arrivée vendredi (5) et départ dimanche (0) = 2 nuits
  return checkInDay === 5 && checkOutDay === 0 && nights === 2;
}

/**
 * Vérifie si les dates correspondent à une semaine entière (7 jours)
 */
function isWeekStay(checkIn: Date, checkOut: Date): boolean {
  const nights = differenceInDays(checkOut, checkIn);
  return nights === 7;
}

/**
 * Calcule le prix total d'un séjour en fonction des dates et de la saison
 */
export function calculatePrice(checkIn: Date, checkOut: Date): PricingDetails | null {
  const nights = differenceInDays(checkOut, checkIn);
  
  if (nights <= 0) {
    return null;
  }

  // Déterminer la saison (on prend la saison du check-in)
  const season = getSeasonForDate(checkIn);
  
  if (!season) {
    return null;
  }

  const weekendPrice = PRICING.weekend[season];
  const weekPrice = PRICING.week[season];
  const nightPrice = PRICING.weekday[season];

  // Cas 1: Week-end exact (vendredi à dimanche, 2 nuits)
  if (isWeekendStay(checkIn, checkOut)) {
    return {
      total: weekendPrice,
      nights: 2,
      type: "weekend",
      season,
      breakdown: `Week-end (${weekendPrice}€)`,
    };
  }

  // Cas 2: Séjour commençant un vendredi et incluant au moins le dimanche
  const checkInDay = getDay(checkIn);
  let remainingNights = nights;
  let totalPrice = 0;
  let breakdownParts: string[] = [];
  let hasWeekend = false;

  // Si on commence un vendredi et qu'on a au moins 2 nuits, on prend le weekend
  if (checkInDay === 5 && nights >= 2) {
    totalPrice += weekendPrice;
    remainingNights -= 2;
    breakdownParts.push(`Week-end (${weekendPrice}€)`);
    hasWeekend = true;
  }

  // Calculer les semaines complètes sur les nuits restantes
  if (remainingNights >= 7) {
    const fullWeeks = Math.floor(remainingNights / 7);
    const weeksTotal = fullWeeks * weekPrice;
    totalPrice += weeksTotal;
    remainingNights -= fullWeeks * 7;
    breakdownParts.push(`${fullWeeks} semaine${fullWeeks > 1 ? "s" : ""} (${weeksTotal}€)`);
  }

  // Nuitées restantes
  if (remainingNights > 0) {
    const nightsTotal = remainingNights * nightPrice;
    totalPrice += nightsTotal;
    breakdownParts.push(`${remainingNights} nuitée${remainingNights > 1 ? "s" : ""} (${nightsTotal}€)`);
  }

  // Si on a décomposé avec weekend et/ou semaines
  if (breakdownParts.length > 0) {
    return {
      total: totalPrice,
      nights,
      type: hasWeekend ? "weekend" : "weekdays",
      season,
      breakdown: breakdownParts.join(" + "),
    };
  }

  // Cas 3: Nuitées simples (ne commence pas un vendredi, ou moins de 2 nuits)
  const total = nightPrice * nights;
  return {
    total,
    nights,
    type: "weekdays",
    season,
    breakdown: `${nights} nuitée${nights > 1 ? "s" : ""} × ${nightPrice}€`,
  };
}

/**
 * Formate le prix pour l'affichage
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString("fr-FR")}€`;
}
