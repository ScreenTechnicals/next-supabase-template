"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { Button } from "./ui/button";

type ProductCardProps = {
    id: string; // Add ID prop
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    price: number;
}

export const ProductCard = ({ id, imageSrc, imageAlt, title, description, price }: ProductCardProps) => {
    const { isAuthenticated } = useUser();
    const { cart, addToCart } = useCart();

    const existingItem = cart?.items?.find((item: any) => item.sticker_id === id);

    const handleAddToCart = () => {
        const quantity = existingItem ? existingItem.quantity + 1 : 1;
        addToCart.mutate({ stickerId: id, quantity });
    };

    return (
        <Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/80 transition-colors">
            <CardHeader>
                <div className="w-full flex items-center justify-center aspect-square relative">
                    <Image src={imageSrc} alt={imageAlt} width={256} height={256} className="object-contain pointer-events-none" />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-base">
                    {description}
                </CardDescription>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold">${price.toFixed(2)}</span>
                    <Button
                        disabled={!isAuthenticated || addToCart.isPending}
                        className=""
                        onClick={handleAddToCart}
                    >
                        {addToCart.isPending ? "Adding..." : "Add to Cart"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};