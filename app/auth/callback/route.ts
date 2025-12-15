// src/app/auth/callback/route.ts

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
        const supabase = createSupabaseServerClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    // Redirect user after successful auth
    return NextResponse.redirect(new URL('/', request.url));
}
