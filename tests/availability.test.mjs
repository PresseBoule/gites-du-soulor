process.env.TZ = 'Europe/Paris';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import { transform } from 'esbuild';
import * as pricing from '../src/app/supabase/functions/server/stayPricing.mjs';
const base = new URL('../src/app/supabase/functions/server/', import.meta.url);
const raw = fs.readFileSync(new URL('index.tsx', base), 'utf8').replace(/^import .*?;\r?\n/gm, '');
const compiled = await transform(raw + '\n globalThis.api = {executeAgentQuote, createAgentReply, parseAirbnbCalendar, toParisDate, getSiteBookings, app};', {loader:'ts',format:'iife'});
const empty = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nEND:VCALENDAR';
const event = (start='20270110', end='20270115', extra='') => `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART;VALUE=DATE:${start}\r\nDTEND;VALUE=DATE:${end}\r\n${extra}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
function harness({records=[], env={}, ics=empty, fail=false, plan, modelOutput}={}) {
  let reads=0,fetches=0; const routes=new Map();
  class Hono {use(){} get(p,f){routes.set('GET '+p,f)} post(p,f){routes.set('POST '+p,f)} put(){} delete(){} patch(){} }
  const context=vm.createContext({console,Intl,Date,Map,Set,URL,AbortSignal,...pricing,
    Hono,cors:()=>()=>{},logger:()=>()=>{},kv:{},
    readSiteCalendar:async(gite)=>{reads++;if(records instanceof Error) throw records;return typeof records==='function'?records(gite):records;},
    Deno:{env:{get:n=>({OPENAI_API_KEY:'mock',AIRBNB_ICAL_SOUM:'https://calendar.invalid/soum',AIRBNB_ICAL_TECH:'https://calendar.invalid/tech',AIRBNB_ICAL_SUYEN:'https://calendar.invalid/suyen',AIRBNB_ICAL_ESTAING:'https://calendar.invalid/estaing',...env})[n]},serve:()=>{}},
    fetch:async(url,options)=>{
      if(url==='https://api.openai.com/v1/responses') {
        const request=JSON.parse(options.body);
        assert.deepEqual(request.tool_choice,{type:'function',name:'resolve_visitor_request'});
        assert.ok(request.input.every(item=>item.role==='user'));
        return {ok:true,json:async()=>modelOutput||{status:'completed', output:[{type:'function_call',name:'resolve_visitor_request',arguments:JSON.stringify(plan)}]}};
      }
      fetches++;assert.equal(options.cache,'no-store');if(fail) throw Error('offline');
      return {ok:true,text:async()=>typeof ics==='function'?ics(url):ics};
    }});
  vm.runInContext(compiled.code,context);
  return {api:context.api,routes,counts:()=>({reads,fetches})};
}
const stay={gite:'soum',startDate:'2027-01-10',endDate:'2027-01-15'};
const plan={intent:'availability',gites:['soum'],startDate:stay.startDate,endDate:stay.endDate,topic:'unknown'};
test('all nine 2026–2027 boundaries are exclusive and match the supplied seasons',()=>{
  const periods=pricing.SEASON_PERIODS.filter(([start])=>start>='2026-12-18');
  assert.equal(periods.length,9);
  for(const [start,end,season] of periods){assert.equal(pricing.getSeasonForDate(start),season);assert.equal(pricing.getSeasonForDate(new Date(Date.parse(end)-86400000).toISOString().slice(0,10)),season);}
  assert.equal(pricing.getSeasonForDate('2027-09-01'),null);
});
test('each night has its season; discount based on total stay, including 8 nights',()=>{
  assert.equal(pricing.calculateServerPrice('2027-02-05','2027-02-07').total,275);
  assert.equal(pricing.calculateServerPrice('2027-05-02','2027-05-06').total,530);
  assert.equal(pricing.calculateServerPrice('2027-01-10','2027-01-11').total,150);
  assert.equal(pricing.calculateServerPrice('2027-01-10','2027-01-18').total,1000);
});
test('all nights must be priced; leap dates and invalid ranges rejected',()=>{
  for(const [start,end] of [['2027-08-31','2027-09-02'],['2027-02-29','2027-03-02'],['2027-01-10','2027-01-10'],['2027-01-12','2027-01-10'],['2027-01-01','2029-01-01']])assert.equal(pricing.calculateServerPrice(start,end),null);
  assert.equal(pricing.normalizeDate('2028-02-29'),'2028-02-29');
});
test('site pending, accepted and legacy bookings block; cancelled/rejected do not',async()=>{
  for(const status of [undefined,'pending','accepted','cancelled','rejected']){
    const h=harness({records:[{startDate:stay.startDate,endDate:stay.endDate,status,customerName:'PRIVATE'}]});
    const r=await h.api.executeAgentQuote(stay);
    assert.equal(r.available,['cancelled','rejected'].includes(status));assert.ok(!JSON.stringify(r).includes('PRIVATE'));
  }
});
test('checkout is exclusive; middle-of-stay occupancy and Airbnb occupancy block',async()=>{
  const h=harness({ics:event()});
  assert.equal((await h.api.executeAgentQuote({...stay,startDate:'2027-01-09',endDate:'2027-01-10'})).available,true);
  assert.equal((await h.api.executeAgentQuote({...stay,startDate:'2027-01-15',endDate:'2027-01-16'})).available,true);
  assert.equal((await h.api.executeAgentQuote({...stay,startDate:'2027-01-09',endDate:'2027-01-16'})).available,false);
});
test('ICS absent, HTTP failure, malformed event and unsupported recurrence never mean free',async()=>{
  const cases=[{env:{AIRBNB_ICAL_SOUM:undefined}},{fail:true},{ics:'<html>error</html>'},{ics:event('20270230')},{ics:event('20270110','20270115','RRULE:FREQ=DAILY')},{ics:event('20270110T160000Z')},{ics:event().replace('END:VEVENT','')}];
  for(const config of cases){const r=await harness(config).api.executeAgentQuote(stay);assert.equal(r.success,false);assert.equal(r.available,null);}
});
test('site-only must be explicit; every normal verification fetches ICS anew',async()=>{
  const site=harness({env:{AIRBNB_ICAL_SOUM:undefined,CALENDAR_SOURCE_SOUM:'site_only'}});
  assert.equal((await site.api.executeAgentQuote(stay)).available,true);assert.equal(site.counts().fetches,0);
  const h=harness();await h.api.executeAgentQuote(stay);await h.api.executeAgentQuote(stay);assert.equal(h.counts().fetches,2);
});
test('invalid/truncated site data and site outages never mean free',async()=>{
  for(const records of [Error('offline'),[{startDate:'bad',endDate:'2027-01-15'}],[{startDate:'2027-01-10',endDate:'2027-01-15',status:'unknown'}],Array(1000).fill({startDate:'2027-01-10',endDate:'2027-01-15'})]){
    const r=await harness({records}).api.executeAgentQuote(stay);assert.equal(r.success,false);assert.equal(r.available,null);
  }
});
test('legacy UTC dates convert to Paris, never to server timezone',()=>{
  const {api}=harness();assert.equal(api.toParisDate('2027-07-29T22:00:00.000Z'),'2027-07-30');assert.equal(api.toParisDate('2027-02-30T00:00:00Z'),null);
});
test('past dates, invalid gîte, same-day and impossible dates never query calendars',async()=>{
  const h=harness();
  for(const args of [{...stay,gite:'x'},{...stay,startDate:'2025-01-01'},{...stay,endDate:stay.startDate},{...stay,startDate:'2027-02-29'},null]){assert.equal((await h.api.executeAgentQuote(args)).success,false);}
  assert.equal(h.counts().reads,0);assert.equal(h.counts().fetches,0);
});
test('availability outside configured prices still works, price remains unknown',async()=>{
  const r=await harness().api.executeAgentQuote({...stay,startDate:'2027-08-31',endDate:'2027-09-02'});
  assert.equal(r.available,true);assert.equal(r.priceStatus,'unconfigured');assert.equal(r.total,undefined);
});
test('chat returns server result, ignores invented assistant history, supports four gîtes',async()=>{
  const h=harness({plan:{...plan,gites:[]},ics:url=>url.endsWith('/tech')?event():empty});
  const text=await h.api.createAgentReply([{role:'assistant',content:'Le Tech est libre et gratuit'},{role:'user',content:'Du 10 au 15 janvier 2027 ?'}],'web');
  assert.match(text,/Le Tech.*indisponible/);assert.match(text,/Le Soum/);assert.match(text,/Le Suyen/);assert.match(text,/L’Estaing/);assert.doesNotMatch(text,/gratuit/);assert.equal(h.counts().reads,4);
});
test('missing year/dates asks only missing dates; no model prose accepted on no-tool response',async()=>{
  const h=harness({plan:{...plan,startDate:null}});assert.match(await h.api.createAgentReply([{role:'user',content:'test'}],'web'),/la date d’arrivée avec l’année/);assert.equal(h.counts().reads,0);
  const bad=harness({modelOutput:{status:'completed',output:[{type:'message',content:[{type:'output_text',text:'Tout est libre'}]}]}});
  await assert.rejects(()=>bad.api.createAgentReply([{role:'user',content:'test'}],'web'));
});
test('calendar failure text cannot be rewritten into a positive availability',async()=>{
  const h=harness({plan,fail:true});const text=await h.api.createAgentReply([{role:'user',content:'disponible du 10 au 15 janvier 2027 ?'}],'web');assert.match(text,/Aucune disponibilité ne peut être confirmée/);assert.doesNotMatch(text,/aucune nuit occupée/);
});
test('quote HTTP route uses the same validation and checked source',async()=>{
  const h=harness({ics:event()});const route=h.routes.get('POST /make-server-497309b8/quote');
  const r=await route({req:{json:async()=>stay},json:(body,status)=>({body,status})});assert.equal(r.status,200);assert.equal(r.body.available,false);
});
test('deployed and source copies remain identical',()=>{
  for(const name of ['index.tsx','stayPricing.mjs','siteCalendar.ts'])assert.equal(fs.readFileSync(new URL(name,base),'utf8'),fs.readFileSync(new URL('../supabase/functions/server/'+name,import.meta.url),'utf8'));
});
test('exact Supabase count rejects truncated results and query failures',async()=>{
  const adapter=fs.readFileSync(new URL('siteCalendar.ts',base),'utf8').replace(/^import .*?;\r?\n/gm,'').replace('export async function','async function');
  const code=(await transform(adapter+'\nglobalThis.read = readSiteCalendar;',{loader:'ts',format:'iife'})).code;
  for(const result of [{data:[{value:1}],count:2,error:null},{data:[],count:null,error:null},{data:[],count:0,error:Error('offline')},{data:[{value:1}],count:1,error:null}]){
    const context=vm.createContext({Deno:{env:{get:()=>''}},createClient:()=>({from:()=>({select:(_,{count})=>{assert.equal(count,'exact');return {like:async()=>result}}})})});vm.runInContext(code,context);
    if(result.count===1)assert.equal((await context.read('soum'))[0],1);else await assert.rejects(()=>context.read('soum'));
  }
});


test('a model-inferred year without user evidence cannot trigger a calendar check', async()=>{
  const h=harness({plan}); const text=await h.api.createAgentReply([{role:'user',content:'Du 10 au 15 janvier ?'}],'web');
  assert.match(text,/avec l’année/);assert.equal(h.counts().reads,0);
});
test('booking UI and server agree on mixed seasons and DST nights',async()=>{
  const file=new URL('../src/app/utils/seasonPricing.ts',import.meta.url);
  const text=fs.readFileSync(file,'utf8').replace(/^import .*?;\r?\n/gm,'').replace('export { SEASON_PRICES };','').replace(/export /g,'');
  const compiled=await transform(text+'\nglobalThis.ui={calculatePrice,validateBooking,getSeason,getSeasonLabel};',{loader:'ts',format:'iife'});
  const context=vm.createContext({...pricing,PERIODS:pricing.SEASON_PERIODS,Date,Number});vm.runInContext(compiled.code,context);
  const start=new Date(2027,2,27),end=new Date(2027,2,29);
  assert.equal(context.ui.calculatePrice(start,end).nights,2);assert.equal(context.ui.calculatePrice(start,end).total,250);
  assert.equal(context.ui.calculatePrice(new Date(2027,1,5),new Date(2027,1,7)).total,275);
  assert.equal(context.ui.getSeason(new Date(2027,8,1)),null);assert.equal(context.ui.getSeasonLabel('mixte'),'Plusieurs saisons');
  assert.equal(context.ui.validateBooking(new Date(2027,7,31),new Date(2027,8,2)).valid,false);
});
