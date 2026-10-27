import { SEASON_PERIODS as PERIODS, SEASON_PRICES, getSeasonForDate, calculateServerPrice } from '../supabase/functions/server/stayPricing.mjs';
export { SEASON_PRICES };
export type Season = 'basse' | 'moyenne' | 'haute';
export interface SeasonPeriod { start: Date; end: Date; season: Season; endExclusive: boolean; }
export interface Pricing { singleNight: number; nightly: number; weekly: number; }
export const SEASON_PERIODS: SeasonPeriod[] = PERIODS.map(([start, end, season]) => ({ start: new Date(start + 'T00:00:00'), end: new Date(end + 'T00:00:00'), season, endExclusive: true }));
function dateKey(date: Date) {
  return Number.isNaN(date.getTime()) ? '' : date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0');
}
export function getSeason(date: Date): Season | null { return getSeasonForDate(dateKey(date)); }
export function calculatePrice(startDate: Date, endDate: Date) {
  const quote = calculateServerPrice(dateKey(startDate), dateKey(endDate));
  if (!quote) throw new Error('Tarifs non configurés pour toutes les nuits du séjour');
  return quote;
}
export function validateBooking(startDate: Date, endDate: Date): {valid: boolean; error?: string} {
  if (!calculateServerPrice(dateKey(startDate), dateKey(endDate))) return { valid: false, error: 'Dates invalides ou tarifs non configurés pour toutes les nuits (366 nuits maximum)' };
  return { valid: true };
}
export function getSeasonColor(season: Season | null): string {
  switch (season) {
    case 'basse': return '#10b981';
    case 'moyenne': return '#f59e0b';
    case 'haute': return '#ef4444';
    default: return '#9ca3af';
  }
}
export function getSeasonLabel(season: Season | 'mixte' | null): string {
  switch (season) {
    case 'basse': return 'Basse saison';
    case 'moyenne': return 'Moyenne saison';
    case 'haute': return 'Haute saison';
    case 'mixte': return 'Plusieurs saisons';
    default: return 'Tarif à confirmer';
  }
}
