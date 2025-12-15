'use client';

import { supabaseClient } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUserAuth = () => {
    const queryClient = useQueryClient();

    const login = async (email: string) => {
        const { error } = await supabaseClient.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Check your email for the login link!");
        }
    };

    const logout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            toast.error(error.message);
            return;
        }

        // 🔥 Force UI refresh by clearing the data immediately
        queryClient.setQueryData(['auth', 'user'], null);
        queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
        toast.success("Logged out successfully");
    };

    return {
        login,
        logout,
    };
};
