import { createClient } from '@supabase/supabase-js';

// These will be populated when you connect Supabase via the "Connect" button
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = () => {
    return supabaseUrl.length > 0 && supabaseAnonKey.length > 0;
};

// Only create the client if the URL is present to avoid "supabaseUrl is required" error.
// We export a dummy object if not configured, but it won't be used because of the isSupabaseConfigured check in services.
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({} as any);
