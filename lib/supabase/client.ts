import { createBrowserClient } from "@supabase/ssr";

export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

export const supabaseClient = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);