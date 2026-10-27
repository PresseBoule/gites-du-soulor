// Generated from the reviewed production helpers by scripts/generate-availability-preview.mjs.
// Diagnostic only: no reservation writes, no email, no model call, no production-function replacement.
import { readSiteCalendar } from '../server/siteCalendar.ts';
import { normalizeDate, calculateServerPrice } from '../server/stayPricing.mjs';
const GITES = { 'Le Soum':'soum', 'Le Tech':'tech', 'Le Suyen':'suyen', "L'Estaing":'estaing', soum:'soum',tech:'tech',suyen:'suyen',estaing:'estaing' };
function toParisDate(value) {
  if (typeof value !== "string") return null;
  const direct = normalizeDate(value);
  if (direct) return direct;
  if (!normalizeDate(value.slice(0, 10))) return null;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris" }).format(parsed);
}

function isBlockingBooking(booking) {
  return !booking.status || booking.status === "pending" || booking.status === "accepted";
}

function parseIcalDate(value) {
  const raw = value.trim();
  if (/^\d{8}$/.test(raw)) {
    return normalizeDate(`${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`);
  }
  return toParisDate(raw);
}

function parseAirbnbCalendar(ical, gite) {
  const unfolded = ical.replace(/\r?\n[ \t]/g, "").replaceAll("\r\n", "\n").trim();
  if (!unfolded.startsWith("BEGIN:VCALENDAR") || !unfolded.endsWith("END:VCALENDAR")) {
    throw new Error("Calendrier ICS invalide");
  }
  const events = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
  if ((unfolded.match(/^BEGIN:VEVENT$/gm) || []).length !== events.length) throw new Error("Calendrier ICS incomplet");
  return events.flatMap((event) => {
    if (/^STATUS:CANCELLED$/m.test(event)) return [];
    if (/^(RRULE|RDATE|EXDATE|RECURRENCE-ID)(?:;[^:]*)?:/m.test(event)) throw new Error("R\xE9currence ICS non prise en charge");
    const startValue = event.match(/^DTSTART(?:;[^:]*)?:(.+)$/m)?.[1];
    const endValue = event.match(/^DTEND(?:;[^:]*)?:(.+)$/m)?.[1];
    const startDate = startValue ? parseIcalDate(startValue) : null;
    const endDate = endValue ? parseIcalDate(endValue) : null;
    if (!startValue || !endValue || !/^\d{8}$/.test(startValue) || !/^\d{8}$/.test(endValue) || !startDate || !endDate || endDate <= startDate) {
      throw new Error("\xC9v\xE9nement ICS invalide ou format non pris en charge");
    }
    return [{ gite, startDate, endDate, status: "accepted", source: "airbnb" }];
  });
}

async function getAirbnbBookings(normalizedGite) {
  const envName = `AIRBNB_ICAL_${normalizedGite.toUpperCase()}`;
  const configuredUrl = Deno.env.get(envName);
  if (!configuredUrl) {
    if (Deno.env.get(`CALENDAR_SOURCE_${normalizedGite.toUpperCase()}`) === "site_only") return [];
    throw new Error("Source du calendrier non configur\xE9e");
  }
  const url = configuredUrl.replace(/^webcal:\/\//i, "https://");
  if (new URL(url).protocol !== "https:") throw new Error("URL du calendrier invalide");
  const response = await fetch(url, { headers: { Accept: "text/calendar", "Cache-Control": "no-cache" }, cache: "no-store", signal: AbortSignal.timeout(8e3) });
  if (!response.ok) throw new Error(`Calendrier Airbnb indisponible (${response.status})`);
  return parseAirbnbCalendar(await response.text(), normalizedGite);
}

async function getSiteBookings(normalizedGite) {
  const records = await readSiteCalendar(normalizedGite);
  if (!Array.isArray(records) || records.length >= 1e3) throw new Error("Calendrier site incomplet");
  return records.filter((booking) => {
    if (!booking || booking.status && !["pending", "accepted", "rejected", "cancelled"].includes(booking.status)) throw new Error("Statut de r\xE9servation invalide");
    if (!isBlockingBooking(booking)) return false;
    const start = toParisDate(booking.startDate);
    const end = toParisDate(booking.endDate);
    if (!start || !end || end <= start) throw new Error("Dates de r\xE9servation invalides");
    return true;
  });
}

function rangesOverlap(startDate, endDate, booking) {
  const bookingStart = toParisDate(booking.startDate);
  const bookingEnd = toParisDate(booking.endDate);
  return Boolean(bookingStart && bookingEnd && startDate < bookingEnd && endDate > bookingStart);
}

async function executeAgentQuote(args) {
  const normalizedGite = normalizeGiteName(String(args?.gite || ""));
  const startDate = normalizeDate(args?.startDate);
  const endDate = normalizeDate(args?.endDate);
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris" }).format(/* @__PURE__ */ new Date());
  if (!normalizedGite || !startDate || !endDate || endDate <= startDate || startDate < today || Date.parse(endDate) - Date.parse(startDate) > 366 * 864e5) {
    return { success: false, available: null, code: "invalid_request", gite: normalizedGite, error: "G\xEEte ou dates invalides : pr\xE9cisez une arriv\xE9e et un d\xE9part futurs, avec l\u2019ann\xE9e (s\xE9jour de 366 nuits maximum)." };
  }
  try {
    const [siteBookings, airbnbBookings] = await Promise.all([getSiteBookings(normalizedGite), getAirbnbBookings(normalizedGite)]);
    const available = ![...siteBookings, ...airbnbBookings].some((booking) => rangesOverlap(startDate, endDate, booking));
    const quote = calculateServerPrice(startDate, endDate);
    return {
      success: true,
      available,
      gite: normalizedGite,
      startDate,
      endDate,
      checkedAt: (/* @__PURE__ */ new Date()).toISOString(),
      sources: ["site", Deno.env.get("AIRBNB_ICAL_" + normalizedGite.toUpperCase()) ? "airbnb_ics" : "site_only"],
      priceStatus: quote ? "configured" : "unconfigured",
      ...available && quote ? quote : {}
    };
  } catch {
    return { success: false, available: null, code: "calendar_unavailable", gite: normalizedGite, error: "Impossible de v\xE9rifier tous les calendriers actuellement. Aucune disponibilit\xE9 ne peut \xEAtre confirm\xE9e. Contactez le 06 45 79 59 39." };
  }
}

function normalizeGiteName(gite) {
  return GITES[gite] || "";
}
Deno.serve(async (request) => {
  const url = new URL(request.url);
  const allowedTokens = [Deno.env.get('SUPABASE_ANON_KEY'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')].filter(Boolean);
  const supplied = request.headers.get('authorization')?.replace(/^Bearer /i,'');
  if (!supplied || !allowedTokens.includes(supplied)) return Response.json({success:false,error:'Accès non autorisé'},{status:401});
  if (request.method === 'GET' && url.pathname.endsWith('/health')) return Response.json({success:true,mode:'read_only_preview'});
  if (request.method !== 'POST' || !url.pathname.endsWith('/quote')) return Response.json({success:false,error:'Route inconnue'},{status:404});
  try {
    const text = await request.text();
    if(text.length > 1000) return Response.json({success:false,error:'Demande trop longue'},{status:400});
    const result = await executeAgentQuote(JSON.parse(text));
    return Response.json(result,{status:result.success?200:result.code==='calendar_unavailable'?503:400});
  } catch { return Response.json({success:false,available:null,error:'Demande invalide'},{status:400}); }
});
