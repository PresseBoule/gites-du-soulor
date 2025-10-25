// Copie des fonctions de pricing pour le backend
export interface PricingDetails {
  total: number;
  nights: number;
  type: "weekend" | "week" | "weekdays";
  season: "low" | "mid" | "high";
  breakdown: string;
}

interface Season {
  start: string;
  end: string;
  type: "low" | "mid" | "high";
  label: string;
}

const SEASONS_2025_2026: Season[] = [
  { start: "2025-01-01", end: "2025-02-07", type: "low", label: "Basse saison" },
  { start: "2025-02-08", end: "2025-02-22", type: "high", label: "Haute saison" },
  { start: "2025-02-23", end: "2025-04-04", type: "low", label: "Basse saison" },
  { start: "2025-04-05", end: "2025-04-26", type: "high", label: "Haute saison" },
  { start: "2025-04-27", end: "2025-06-27", type: "low", label: "Basse saison" },
  { start: "2025-06-28", end: "2025-09-06", type: "high", label: "Haute saison" },
  { start: "2025-09-07", end: "2025-10-17", type: "mid", label: "Moyenne saison" },
  { start: "2025-10-18", end: "2025-12-19", type: "low", label: "Basse saison" },
  { start: "2025-12-20", end: "2026-01-03", type: "high", label: "Haute saison" },
];

const PRICING = {
  weekend: { low: 400, mid: 425, high: 450 },
  weekday: { low: 150, mid: 165, high: 180 },
  week: { low: 1150, mid: 1250, high: 1350 },
};

function getSeasonForDate(date: Date): "low" | "mid" | "high" | null {
  const dateStr = date.toISOString().split("T")[0];
  for (const season of SEASONS_2025_2026) {
    if (dateStr >= season.start && dateStr <= season.end) {
      return season.type;
    }
  }
  return null;
}

function getDay(date: Date): number {
  return date.getDay();
}

function differenceInDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function isWeekendStay(checkIn: Date, checkOut: Date): boolean {
  const checkInDay = getDay(checkIn);
  const checkOutDay = getDay(checkOut);
  const nights = differenceInDays(checkOut, checkIn);
  return checkInDay === 5 && checkOutDay === 0 && nights === 2;
}

function isWeekStay(checkIn: Date, checkOut: Date): boolean {
  const nights = differenceInDays(checkOut, checkIn);
  return nights === 7;
}

export function calculatePrice(checkIn: Date, checkOut: Date): PricingDetails | null {
  const nights = differenceInDays(checkOut, checkIn);
  
  if (nights <= 0) return null;

  const season = getSeasonForDate(checkIn);
  if (!season) return null;

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

export function formatPrice(price: number): string {
  return `${price.toLocaleString("fr-FR")}€`;
}
