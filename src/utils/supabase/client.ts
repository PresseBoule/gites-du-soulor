import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdmwkojncfnqlxdxrxqo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbXdrb2puY2ZucWx4ZHhyeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTYwNzgsImV4cCI6MjA3NjU3MjA3OH0.1dWe6X-FYwp6x0TPRBswbVtMNTyV9tsurtQlkMoG23k';

let supabase: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabase) {
    supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
}
