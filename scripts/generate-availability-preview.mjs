import fs from 'node:fs';
import { transform } from 'esbuild';
const root = new URL('../', import.meta.url);
const main = new URL('supabase/functions/server/index.tsx', root);
const {code} = await transform(fs.readFileSync(main,'utf8'),{loader:'ts',format:'esm'});
const helpers = ['toParisDate','isBlockingBooking','parseIcalDate','parseAirbnbCalendar','getAirbnbBookings','getSiteBookings','rangesOverlap','executeAgentQuote','normalizeGiteName'];
export function extractFunction(source,name) {
  const match = new RegExp('(?:async )?function '+name+'\\(').exec(source);
  if(!match)throw Error('Missing helper '+name);
  const end = source.indexOf('\n}',match.index);
  if(end<0)throw Error('Missing helper boundary '+name);
  return source.slice(match.index,end+2);
}
const output = `// Generated from the reviewed production helpers by scripts/generate-availability-preview.mjs.
// Diagnostic only: no reservation writes, no email, no model call, no production-function replacement.
import { readSiteCalendar } from '../server/siteCalendar.ts';
import { normalizeDate, calculateServerPrice } from '../server/stayPricing.mjs';
const GITES = { 'Le Soum':'soum', 'Le Tech':'tech', 'Le Suyen':'suyen', "L'Estaing":'estaing', soum:'soum',tech:'tech',suyen:'suyen',estaing:'estaing' };
${helpers.map(name=>extractFunction(code,name)).join('\n\n')}
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
`;
fs.writeFileSync(new URL('supabase/functions/soulor-availability-preview/preview.js',root),output);

