export type Season = 'basse' | 'moyenne' | 'haute';

export interface SeasonPeriod {
  start: Date;
  end: Date;
  season: Season;
}

export interface Pricing {
  weekend: number;
  nightly: number;
  weekly: number;
}

export const SEASON_PRICES: Record<Season, Pricing> = {
  basse: {
    weekend: 400,
    nightly: 150,
    weekly: 1150,
  },
  moyenne: {
    weekend: 425,
    nightly: 165,
    weekly: 1250,
  },
  haute: {
    weekend: 450,
    nightly: 180,
    weekly: 1350,
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

export function isWeekend(startDate: Date, endDate: Date): boolean {
  // Week-end = Vendredi 16h au Dimanche 11h
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Vérifier si c'est un week-end (2 nuits, vendredi->dimanche)
  if (daysDiff === 2) {
    const startDay = startDate.getDay();
    return startDay === 5; // Vendredi
  }
  
  return false;
}

export function includesWeekend(startDate: Date, endDate: Date): boolean {
  // Vérifier si la période inclut un vendredi-dimanche
  const current = new Date(startDate);
  
  while (current <= endDate) {
    if (current.getDay() === 5) { // Vendredi trouvé
      const friday = new Date(current);
      const sunday = new Date(current);
      sunday.setDate(sunday.getDate() + 2);
      
      // Vérifier si vendredi et dimanche sont tous les deux dans la période
      if (sunday <= endDate) {
        return true;
      }
    }
    current.setDate(current.getDate() + 1);
  }
  
  return false;
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
  
  // Cas week-end exact (vendredi -> dimanche, 2 nuits)
  if (isWeekend(startDate, endDate) && nights === 2) {
    total = prices.weekend;
    breakdown.push(`Week-end (${prices.weekend}€)`);
    return { total, breakdown, season };
  }
  
  // Calcul pour les séjours plus longs
  let remainingNights = nights;
  
  // D'abord, compter les semaines complètes (7 nuits)
  const weeks = Math.floor(remainingNights / 7);
  if (weeks > 0) {
    total += weeks * prices.weekly;
    breakdown.push(`${weeks} semaine${weeks > 1 ? 's' : ''} (${weeks * prices.weekly}€)`);
    remainingNights -= weeks * 7;
  }
  
  // Ensuite, vérifier si les nuits restantes incluent un week-end
  if (remainingNights > 0) {
    const endOfWeeks = new Date(startDate);
    endOfWeeks.setDate(endOfWeeks.getDate() + weeks * 7);
    
    if (includesWeekend(endOfWeeks, endDate) && remainingNights >= 2) {
      // Inclure le tarif week-end si la période contient vendredi-dimanche
      total += prices.weekend;
      breakdown.push(`Week-end inclus (${prices.weekend}€)`);
      remainingNights -= 2;
    }
    
    // Ajouter les nuitées restantes
    if (remainingNights > 0) {
      total += remainingNights * prices.nightly;
      breakdown.push(`${remainingNights} nuitée${remainingNights > 1 ? 's' : ''} (${remainingNights * prices.nightly}€)`);
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
  
  // Vérifier si c'est un week-end
  if (isWeekend(startDate, endDate)) {
    return { valid: true };
  }
  
  // En semaine, minimum 2 nuits
  const startDay = startDate.getDay();
  const isWeekday = startDay !== 5 && startDay !== 6; // Pas vendredi ni samedi
  
  if (isWeekday && nights < 2) {
    return { valid: false, error: 'En semaine, la réservation doit être d\'au moins 2 nuits (minimum)' };
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
