import { createClient } from "@supabase/supabase-js";

// --- PASTE YOUR SUPABASE URL HERE ---
const SUPABASE_URL = "https://cgncnfqufygoflttmfts.supabase.co";

// --- PASTE YOUR SUPABASE PUBLIC KEY HERE ---
const SUPABASE_PUBLIC_KEY = "sb_publishable_o-Q8zG4vcO1OPWMkvdwovA_a0-PIPgx";

// Export the Supabase client for use in your project
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
