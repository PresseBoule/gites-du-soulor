import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { transform } from 'esbuild';
const root = new URL('../',import.meta.url);
function extract(source,name){const match=new RegExp('(?:async )?function '+name+'\\(').exec(source);assert.ok(match);return source.slice(match.index,source.indexOf('\n}',match.index)+2);}
test('diagnostic uses exactly the reviewed production availability functions, without write or model routes',async()=>{
 const {code:production}=await transform(fs.readFileSync(new URL('supabase/functions/server/index.tsx',root),'utf8'),{loader:'ts',format:'esm'});
 const preview=fs.readFileSync(new URL('supabase/functions/soulor-availability-preview/preview.js',root),'utf8');
 for(const name of ['toParisDate','isBlockingBooking','parseIcalDate','parseAirbnbCalendar','getAirbnbBookings','getSiteBookings','rangesOverlap','executeAgentQuote','normalizeGiteName'])assert.equal(extract(production,name),extract(preview,name));
 assert.doesNotMatch(preview,/kv\.(set|del|mset)|api\.openai\.com|resend\.com|\/bookings|agent\/chat/);
 assert.match(preview,/mode:'read_only_preview'/);
});

