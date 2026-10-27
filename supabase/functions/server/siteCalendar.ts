import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
// Exact count prevents a truncated REST result from being mistaken for a free calendar.
export async function readSiteCalendar(gite: string) {
  const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data, error, count } = await client.from('kv_store_497309b8')
    .select('value', { count: 'exact' }).like('key', 'booking:' + gite + ':%');
  if (error || !Array.isArray(data) || count === null || count !== data.length) {
    throw new Error('Calendrier site inaccessible ou incomplet');
  }
  return data.map((row) => row.value);
}
