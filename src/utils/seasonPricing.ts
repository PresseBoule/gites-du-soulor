export type Season = 'basse' | 'moyenne' | 'haute';

export interface SeasonPeriod {
  start: Date;
  end: Date;
  season: Season;
}

export interface Pricing {
  singleNight: number; // Prix pour 1 seule nuit (sans remise)
  nightly: number; // Prix à partir de 2 nuits (avec remise 15%)
  weekly: number; // Prix pour 7 jours
}

export const SEASON_PRICES: Record<Season, Pricing> = {
  basse: {
    singleNight: 150,
    nightly: 125,
    weekly: 875,
  },
  moyenne: {
    singleNight: 165,
    nightly: 140,
    weekly: 980,
  },
  haute: {
    singleNight: 180,
    nightly: 150,
    weekly: 1050,
  },
};

// Périodes de saisons 2025-2026
export const SEASON_PERIODS: SeasonPeriod[] = [
  // Basse saison
  { start: new Date('2025-11-02'), end: new Date('2025-12-19'), season: 'basse' },
  { start: new Date('2026-01-04'), end: new Date('2026-02-08'), season: 'basse' },
  { start: new Date('2026-03-08'), end: new Date('2026-04-03'), season: 'basse' },
  { start: new Date('2026-05-03'), end: new Date('2026-05-14'), season: 'basse' },
  { start: new Date('2026-05-17'), end: new Date('2026-05-22'), season: 'basse' },
  { start: new Date('2026-05-26'), end: new Date('2026-06-26'), season: 'basse' },
  { start: new Date('2026-09-25'), end: new Date('2026-10-16'), season: 'basse' },
  
  // Moyenne saison
  { start: new Date('2025-10-17'), end: new Date('2025-11-02'), season: 'moyenne' },
  { start: new Date('2026-04-03'), end: new Date('2026-05-03'), season: 'moyenne' },
  { start: new Date('2026-05-14'), end: new Date('2026-05-17'), season: 'moyenne' },
  { start: new Date('2026-05-22'), end: new Date('2026-05-26'), season: 'moyenne' },
  { start: new Date('2026-08-30'), end: new Date('2026-09-25'), season: 'moyenne' },
  { start: new Date('2026-10-16'), end: new Date('2026-11-01'), season: 'moyenne' },
  
  // Haute saison
  { start: new Date('2025-12-19'), end: new Date('2026-01-04'), season: 'haute' },
  { start: new Date('2026-02-08'), end: new Date('2026-03-08'), season: 'haute' },
  { start: new Date('2026-06-26'), end: new Date('2026-08-30'), season: 'haute' },
];

export function getSeason(date: Date): Season {
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  for (const period of SEASON_PERIODS) {
    const start = new Date(period.start.getFullYear(), period.start.getMonth(), period.start.getDate());
    const end = new Date(period.end.getFullYear(), period.end.getMonth(), period.end.getDate());
    
    if (dateOnly >= start && dateOnly <= end) {
      return period.season;
    }
  }
  
  // Par défaut, retourner basse saison
  return 'basse';
}

export function calculatePrice(startDate: Date, endDate: Date): {
  total: number;
  breakdown: string[];
  season: Season;
} {
  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const season = getSeason(startDate);
  const prices = SEASON_PRICES[season];
  const breakdown: string[] = [];
  
  let total = 0;
  let remainingNights = nights;
  
  // D'abord, compter les semaines complètes (7 nuits)
  const weeks = Math.floor(remainingNights / 7);
  if (weeks > 0) {
    total += weeks * prices.weekly;
    breakdown.push(`${weeks} semaine${weeks > 1 ? 's' : ''} (${weeks * prices.weekly}€)`);
    remainingNights -= weeks * 7;
  }
  
  // Gérer les nuits restantes
  if (remainingNights > 0) {
    if (remainingNights === 1) {
      // 1 seule nuit : tarif plein
      total += prices.singleNight;
      breakdown.push(`1 nuitée (${prices.singleNight}€)`);
    } else {
      // 2+ nuits : tarif réduit de 15%
      total += remainingNights * prices.nightly;
      breakdown.push(`${remainingNights} nuitées avec remise 15% (${remainingNights * prices.nightly}€)`);
    }
  }
  
  return { total, breakdown, season };
}

export function validateBooking(startDate: Date, endDate: Date): {
  valid: boolean;
  error?: string;
} {
  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (nights < 1) {
    return { valid: false, error: 'La réservation doit être d\'au moins 1 nuit' };
  }
  
  return { valid: true };
}

export function getSeasonColor(season: Season): string {
  switch (season) {
    case 'basse':
      return '#10b981'; // Vert
    case 'moyenne':
      return '#f59e0b'; // Orange
    case 'haute':
      return '#ef4444'; // Rouge
  }
}

export function getSeasonLabel(season: Season): string {
  switch (season) {
    case 'basse':
      return 'Basse saison';
    case 'moyenne':
      return 'Moyenne saison';
    case 'haute':
      return 'Haute saison';
  }
}