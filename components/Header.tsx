"use client";

import { useCart } from "@/hooks/useCart";
import { useUser } from "@/hooks/useUser";
import { useUserAuth } from "@/hooks/useUserAuth";
import { ShoppingCart, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
    const { logout } = useUserAuth();
    const { isAuthenticated, user } = useUser();
    const { cart } = useCart();

    const cartItemsCount = cart?.items.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;

    return (
        <header className="border-b sticky inset-0 bg-muted border-border/60 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                        <Zap className="h-5 w-5 fill-current" />
                    </div>
                    <span>Cat Stickers</span>
                </Link>
                <nav className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link href="/orders" className="text-sm font-medium hover:text-primary transition-colors">
                                Orders
                            </Link>
                            <Link href="/checkout" className="relative flex items-center">
                                <ShoppingCart className="h-6 w-6" />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </Link>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground hidden sm:inline-block">
                                    {user?.email}
                                </span>
                                <Button variant="secondary" onClick={() => logout()}>
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </nav>
            </div>
        </header>
    )
}
