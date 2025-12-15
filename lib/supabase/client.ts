import { createClient } from "@supabase/supabase-js";

export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);