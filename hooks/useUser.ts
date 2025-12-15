'use client';

import { supabaseClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
    const data = useQuery({
        queryKey: ['auth', 'user'],
        queryFn: async () => {
            const { data, error } = await supabaseClient.auth.getUser();
            if (error) throw error;
            return data.user;
        },
    });

    const isAuthenticated = data.data?.aud === "authenticated";

    return {
        isAuthenticated,
        user: data.data,
    };
}
