"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { useUserAuth } from "@/hooks/useUserAuth";
import { CheckCircle2, Database, Layout, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { login, logout } = useUserAuth();
  const { isAuthenticated, user } = useUser();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <span>NextSupabase</span>
          </div>
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:inline-block">
                  {user?.email}
                </span>
                <Button variant="secondary" onClick={() => logout()}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-medium border border-border">
            🚀 Next.js 16 Starter Template
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl">
            Build faster with <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-500">Modern Stack</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A production-ready template featuring Next.js 16, Supabase Auth, React Query, and Shadcn UI.
            Everything you need to ship your next big idea.
          </p>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Layout className="h-6 w-6 text-blue-500" />}
              title="Next.js 16"
              description="Leverage the latest App Router, Server Components, and optimized performance features."
            />
            <FeatureCard
              icon={<Database className="h-6 w-6 text-green-500" />}
              title="Supabase"
              description="Open source Firebase alternative. Database, Auth, Realtime, and Storage ready to go."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6 text-purple-500" />}
              title="Authentication"
              description="Secure user authentication flows pre-configured using Supabase Auth."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              title="React Query"
              description="Powerful asynchronous state management for server state synchronization."
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6 text-red-500" />}
              title="Shadcn UI"
              description="Beautifully designed, accessible components built with Radix UI and Tailwind CSS."
            />
            <FeatureCard
              icon={<Layout className="h-6 w-6 text-indigo-500" />}
              title="Tailwind CSS"
              description="Rapidly build modern websites without ever leaving your HTML."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Dev Verse. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="https://github.com/ScreenTechnicals/next-supabase-template" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/80 transition-colors">
      <CardHeader>
        <div className="mb-4 h-12 w-12 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
