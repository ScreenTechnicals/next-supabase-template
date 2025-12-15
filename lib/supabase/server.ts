// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createSupabaseServerClient = () => {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return Promise.resolve(cookieStore).then((cookieStore) => cookieStore.getAll());
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            Promise.resolve(cookieStore).then((cookieStore) => cookieStore.set(name, value, options))
                        );
                    } catch {
                        // Safe to ignore when called from Server Components
                    }
                },
            },
        }
    );
};
