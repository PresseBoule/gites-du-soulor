import { createClient } from 'jsr:@supabase/supabase-js@2.49.8';
import { DEFAULT_PRICING, pricingFromContent } from './stayPricing.mjs';
export async function loadPublishedPricing() {
  try {
    const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { data, error } = await client.from('kv_store_66cb1054').select('value').eq('key', 'cms:published').maybeSingle();
    if (error) throw error;
    // Until the first CMS publication, retain the already validated production rates.
    if (!data) return DEFAULT_PRICING;
    return pricingFromContent(data.value?.content);
  } catch {
    console.error('Published pricing could not be verified');
    // Never use old hard-coded prices after a CMS read failure.
    return null;
  }
}
