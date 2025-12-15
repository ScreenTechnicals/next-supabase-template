"use client";

import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    return <main className="bg-muted">
        <QueryClientProvider client={queryClient}>
            <Header />
            {children}
            <Toaster />
        </QueryClientProvider>
    </main>;
};
