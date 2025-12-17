"use client";

import { SkeletonCheckout } from "@/components/SkeletonCheckout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { CartItem } from "@/types/cart";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
    const { cart, isLoading: isCartLoading, updateQuantity, removeFromCart, clearCart } = useCart();
    const { createOrder, isLoading: isOrderCreating } = useOrders();
    const router = useRouter();

    const total = useMemo(() => {
        return cart?.items.reduce((acc: number, item: CartItem) => {
            return acc + (item.sticker?.price || 0) * item.quantity;
        }, 0) || 0;
    }, [cart?.items]);

    const handlePlaceOrder = async () => {
        if (!cart || !cart.items.length) return;

        try {
            await createOrder.mutateAsync({
                totalAmount: total,
                items: cart.items
            });
            await clearCart.mutateAsync();
            toast.success("Order placed successfully!");
            router.push("/orders");
        } catch (error: any) {
            console.error("Failed to place order:", error);
            toast.error(error.message || "Failed to place order. Please try again.");
        }
    };

    if (isCartLoading) {
        return <SkeletonCheckout />;
    }

    if (!cart?.items.length) {
        return (
            <div className="py-10 min-h-[400px] flex items-center justify-center">
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <ShoppingCart />
                        </EmptyMedia>
                        <EmptyTitle>Your cart is empty</EmptyTitle>
                        <EmptyDescription>
                            Add some stickers to your cart to checkout.
                        </EmptyDescription>
                    </EmptyHeader>
                    <div className="mt-6 flex justify-center">
                        <Button onClick={() => router.push("/")}>
                            Browse Stickers
                        </Button>
                    </div>
                </Empty>
            </div>
        )
    }

    return (
        <div className="container py-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    {cart.items.map((item: CartItem) => (
                        <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-4 flex gap-4">
                                <div className="relative w-24 h-24 bg-muted rounded-md shrink-0">
                                    {item.sticker?.image?.url ? (
                                        <Image
                                            src={item.sticker.image.url}
                                            alt={item.sticker.image.alt || item.sticker?.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    ) : null}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold">{item.sticker?.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-1">{item.sticker?.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">${Number(item.sticker?.price).toFixed(2)}</div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                disabled={item.quantity <= 1}
                                                onClick={() => updateQuantity.mutate({ itemId: item.id, quantity: item.quantity - 1 })}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity.mutate({ itemId: item.id, quantity: item.quantity + 1 })}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive ml-2"
                                                onClick={() => removeFromCart.mutate(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>Free</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button
                                className="w-full mt-6"
                                size="lg"
                                onClick={handlePlaceOrder}
                                disabled={isOrderCreating}
                            >
                                {isOrderCreating ? "Processing..." : "Place Order"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
