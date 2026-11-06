import { createClient } from 'jsr:@supabase/supabase-js@2.49.8';
export async function createReservation(key: string, booking: unknown) {
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const result = await db.rpc('soulor_write_reservation', { p_kind:'gite', p_key:key, p_expected:null, p_booking:booking });
  if (result.error) throw new Error('Enregistrement des réservations indisponible');
  return result.data?.success === true;
}
