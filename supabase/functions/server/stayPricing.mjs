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
export function getSeasonForDate(date, config = DEFAULT_PRICING) {
  if (!config) return null;
  return config.periods.find(([start, end]) => date >= start && date < end)?.[2] ?? null;
}
export function calculateServerPrice(startDate, endDate, config = DEFAULT_PRICING) {
  if (!config) return null;
  if (!normalizeDate(startDate) || !normalizeDate(endDate) || endDate <= startDate) return null;
  const nights = (Date.parse(endDate) - Date.parse(startDate)) / 86400000;
  if (nights > 366) return null;
  const bySeason = new Map();
  for (let offset = 0; offset < nights; offset++) {
    const date = new Date(Date.parse(startDate) + offset * 86400000).toISOString().slice(0, 10);
    const season = getSeasonForDate(date, config);
    if (!season) return null;
    bySeason.set(season, (bySeason.get(season) || 0) + 1);
  }
  let total = 0;
  const breakdown = [];
  for (const [season, count] of bySeason) {
    const rate = nights === 1 ? config.prices[season].singleNight : config.prices[season].nightly;
    total += count * rate;
    breakdown.push(count + ' nuit(s), saison ' + season + ' : ' + count + ' × ' + rate + ' € = ' + count * rate + ' €');
  }
  return { total, nights, season: bySeason.size === 1 ? [...bySeason.keys()][0] : 'mixte', breakdown };
}

export const DEFAULT_PRICING = { periods: SEASON_PERIODS, prices: SEASON_PRICES };
export function validatePricing(config) {
  if (!config || !Array.isArray(config.periods) || !config.periods.length || config.periods.length > 300) throw new Error('Périodes tarifaires invalides');
  const sorted = [...config.periods].sort((a,b) => String(a[0]).localeCompare(String(b[0])));
  for (let i = 0; i < sorted.length; i++) {
    const period = sorted[i];
    if (!Array.isArray(period) || period.length !== 3 || !normalizeDate(period[0]) || !normalizeDate(period[1]) || period[1] <= period[0] || !['basse','moyenne','haute'].includes(period[2])) throw new Error('Vérifiez les dates et la saison de chaque période');
    if (i && sorted[i-1][1] > period[0]) throw new Error('Deux périodes tarifaires se chevauchent');
  }
  for (const season of ['basse','moyenne','haute']) {
    const rates = config.prices?.[season];
    if (!rates || ['singleNight','nightly','weekly'].some(key => !Number.isFinite(rates[key]) || rates[key] <= 0 || rates[key] > 100000)) throw new Error('Montants tarifaires invalides');
    if (Math.abs(rates.weekly - rates.nightly * 7) > .005) throw new Error('Le prix de la semaine doit correspondre à sept nuitées au tarif dégressif');
  }
  return config;
}
export function pricingFromContent(content) {
  if (!content || !content.tarifs) throw new Error('Tarifs non publiés');
  const money = value => { if (typeof value !== 'string' || !/^\d+(?:[.,]\d{1,2})?\s*€?$/.test(value.trim())) return NaN; return Number(value.replace(/[€\s]/g,'').replace(',','.')); };
  const prices = Object.fromEntries(['basse','moyenne','haute'].map((season,index) => [season, {
    singleNight: money(content.tarifs?.[0]?.prices?.[index]?.price),
    nightly: money(content.tarifs?.[1]?.prices?.[index]?.price),
    weekly: money(content.tarifs?.[2]?.prices?.[index]?.price),
  }]));
  return validatePricing({ prices, periods: content.seasonPeriods || SEASON_PERIODS });
}
export function describePrices(config) {
  if (!config) return 'Les tarifs sont temporairement indisponibles. Le gérant doit confirmer le montant du séjour.';
  return 'Pour les quatre gîtes : ' + ['basse','moyenne','haute'].map(season => season + ' saison ' + config.prices[season].singleNight + ' € pour une nuit seule, ' + config.prices[season].nightly + ' €/nuit dès deux nuits').join(' ; ') + '. Chaque nuit suit sa saison. Donnez vos dates avec l’année pour vérifier le tarif du séjour.';
}
