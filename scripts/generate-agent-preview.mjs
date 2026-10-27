import fs from 'node:fs';
import { transform, build } from 'esbuild';
const root=new URL('../',import.meta.url);
const source=(await transform(fs.readFileSync(new URL('supabase/functions/server/index.tsx',root),'utf8'),{loader:'ts',format:'esm'})).code;
function fn(name){const match=new RegExp('(?:async )?function '+name+'\\(').exec(source);if(!match)throw Error(name);return source.slice(match.index,source.indexOf('\n}',match.index)+2);}
function constant(name){const match=new RegExp('(?:const|let|var) '+name+' =').exec(source);if(!match)throw Error(name);return source.slice(match.index,source.indexOf('\n};',match.index)+3);}
const names=['toParisDate','isBlockingBooking','parseIcalDate','parseAirbnbCalendar','getAirbnbBookings','getSiteBookings','rangesOverlap','executeAgentQuote','normalizeGiteName','getAgentInstructions','createOpenAIResponse','renderVerifiedQuote','createAgentReply'];
const output=`// Isolated conversational test: no booking writes and no email sending.
import { readSiteCalendar } from '../server/siteCalendar.ts';
import { normalizeDate, calculateServerPrice } from '../server/stayPricing.mjs';
${['GITES','REQUEST_TOOL','INFORMATION_REPLIES'].map(constant).join('\n')}
${names.map(fn).join('\n\n')}
const limits = new Map();
Deno.serve(async(request)=>{
 const url=new URL(request.url);
 const token=request.headers.get('authorization')?.replace(/^Bearer /i,'');
 const tokens=[Deno.env.get('SUPABASE_ANON_KEY'),Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')].filter(Boolean);
 if(!token||!tokens.includes(token))return Response.json({success:false,error:'Accès non autorisé'},{status:401});
 if(request.method==='GET'&&url.pathname.endsWith('/health'))return Response.json({success:true,mode:'read_only_agent_preview'});
 if(request.method!=='POST'||!url.pathname.endsWith('/chat'))return Response.json({success:false,error:'Route inconnue'},{status:404});
 const now=Date.now(),client=request.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';
 const limit=limits.get(client);
 if(limit&&limit.until>now&&limit.count>=20)return Response.json({success:false,error:'Trop de requêtes'},{status:429});
 limits.set(client,{until:limit?.until>now?limit.until:now+60000,count:limit?.until>now?limit.count+1:1});
 try{
  const text=await request.text();if(text.length>15000)return Response.json({success:false,error:'Message trop long'},{status:400});
  const body=JSON.parse(text);
  const message=String(body.message||'').trim().slice(0,1500);
  if(!message)return Response.json({success:false,error:'Message vide'},{status:400});
  const history=Array.isArray(body.history)?body.history.slice(-8).filter(x=>x&&['user','assistant'].includes(x.role)).map(x=>({role:x.role,content:String(x.content||'').slice(0,1500)})):[];
  const reply=await createAgentReply([...history,{role:'user',content:message}],'web');
  return Response.json({success:true,reply});
 }catch(error){console.error('Agent preview failed:',error instanceof Error?error.message:'unknown');return Response.json({success:false,error:'Impossible de vérifier cette demande actuellement.'},{status:503});}
});
`;
fs.mkdirSync(new URL('supabase/functions/soulor-agent-preview/',root),{recursive:true});
fs.writeFileSync(new URL('supabase/functions/soulor-agent-preview/preview.js',root),output);
fs.writeFileSync(new URL('supabase/functions/soulor-agent-preview/index.ts',root),"import './preview.js';\n");
await build({entryPoints:[new URL('supabase/functions/soulor-agent-preview/index.ts',root).pathname.replace(/^\/([A-Za-z]:)/,'$1')],bundle:true,platform:'neutral',format:'esm',external:['jsr:*'],outfile:new URL('../soulor-deployed-audit/agent-preview-ready.js',root).pathname.replace(/^\/([A-Za-z]:)/,'$1')});
console.log('Conversational test prepared, without reservation writes.');
