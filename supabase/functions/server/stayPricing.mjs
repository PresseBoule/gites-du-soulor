// Shared by the booking UI and the deployed function. End dates are exclusive.
export const SEASON_PERIODS = [
  ['2025-11-02', '2025-12-19', 'basse'],
  ['2026-01-04', '2026-02-08', 'basse'],
  ['2026-03-08', '2026-04-03', 'basse'],
  ['2026-05-03', '2026-05-14', 'basse'],
  ['2026-05-17', '2026-05-22', 'basse'],
  ['2026-05-26', '2026-06-26', 'basse'],
  ['2026-09-25', '2026-10-16', 'basse'],
  ['2025-10-17', '2025-11-02', 'moyenne'],
  ['2026-04-03', '2026-05-03', 'moyenne'],
  ['2026-05-14', '2026-05-17', 'moyenne'],
  ['2026-05-22', '2026-05-26', 'moyenne'],
  ['2026-08-30', '2026-09-25', 'moyenne'],
  ['2026-10-16', '2026-11-01', 'moyenne'],
  ['2025-12-19', '2026-01-04', 'haute'],
  ['2026-02-08', '2026-03-08', 'haute'],
  ['2026-06-26', '2026-08-30', 'haute'],
  // Périodes 2026-2027 : début inclus, fin exclue.
  ['2026-12-18', '2027-01-04', 'haute'],
  ['2027-01-04', '2027-02-06', 'basse'],
  ['2027-02-06', '2027-03-08', 'haute'],
  ['2027-03-08', '2027-04-02', 'basse'],
  ['2027-04-02', '2027-05-03', 'moyenne'],
  ['2027-05-03', '2027-05-05', 'basse'],
  ['2027-05-05', '2027-05-10', 'moyenne'],
  ['2027-05-10', '2027-07-02', 'basse'],
  ['2027-07-02', '2027-09-01', 'haute'],
];
export const SEASON_PRICES = {
  basse: { singleNight: 150, nightly: 125, weekly: 875 },
  moyenne: { singleNight: 165, nightly: 140, weekly: 980 },
  haute: { singleNight: 180, nightly: 150, weekly: 1050 },
};
export function normalizeDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(value + 'T00:00:00Z');
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : value;
}
export function getSeasonForDate(date) {
  return SEASON_PERIODS.find(([start, end]) => date >= start && date < end)?.[2] ?? null;
}
export function calculateServerPrice(startDate, endDate) {
  if (!normalizeDate(startDate) || !normalizeDate(endDate) || endDate <= startDate) return null;
  const nights = (Date.parse(endDate) - Date.parse(startDate)) / 86400000;
  if (nights > 366) return null;
  const bySeason = new Map();
  for (let offset = 0; offset < nights; offset++) {
    const date = new Date(Date.parse(startDate) + offset * 86400000).toISOString().slice(0, 10);
    const season = getSeasonForDate(date);
    if (!season) return null;
    bySeason.set(season, (bySeason.get(season) || 0) + 1);
  }
  let total = 0;
  const breakdown = [];
  for (const [season, count] of bySeason) {
    const rate = nights === 1 ? SEASON_PRICES[season].singleNight : SEASON_PRICES[season].nightly;
    total += count * rate;
    breakdown.push(count + ' nuit(s), saison ' + season + ' : ' + count + ' × ' + rate + ' € = ' + count * rate + ' €');
  }
  return { total, nights, season: bySeason.size === 1 ? [...bySeason.keys()][0] : 'mixte', breakdown };
}
