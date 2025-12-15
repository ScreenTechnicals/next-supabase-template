"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { Button } from "./ui/button";

type ProductCardProps = {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    price: number;
}

export const ProductCard = ({ imageSrc, imageAlt, title, description, price }: ProductCardProps) => {
    const { isAuthenticated } = useUser();

    return (
        <Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/80 transition-colors">
            <CardHeader>
                <div className="w-full aspect-square relative rounded-lg bg-muted border border-border flex items-center justify-center">
                    <Image src={imageSrc} alt={imageAlt} width={256} height={256} className="object-contain pointer-events-none" />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-base">
                    {description}
                </CardDescription>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">${price.toFixed(2)}</span>
                    <Button disabled={!isAuthenticated} className="">Add to Cart</Button>
                </div>
            </CardContent>
        </Card>
    );
}