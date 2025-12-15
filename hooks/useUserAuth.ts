'use client';

import { supabaseClient } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export const useUserAuth = () => {
    const queryClient = useQueryClient();

    const login = async (email: string) => {
        await supabaseClient.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    const logout = async () => {
        await supabaseClient.auth.signOut();

        // 🔥 Force UI refresh
        queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    };

    return {
        login,
        logout,
    };
};
