"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useOrders } from "@/hooks/useOrders";
import { format } from "date-fns";
import Image from "next/image";

export default function OrdersPage() {
    const { orders, isLoading } = useOrders();

    if (isLoading) {
        return <div className="container py-10">Loading orders...</div>;
    }

    if (!orders?.length) {
        return <div className="container py-10">No orders found.</div>;
    }

    return (
        <div className="container py-10 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Your Orders</h1>

            <div className="flex flex-col gap-6">
                {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 flex flex-row items-center justify-between space-y-0 p-4">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-medium">
                                    Order #{order.id.slice(0, 8)}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Placed on {format(new Date(order.created_at), "PPP")}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="font-bold">
                                        ${Number(order.total_amount).toFixed(2)}
                                    </div>
                                    <Badge variant={order.status === "pending" ? "secondary" : "default"}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">Image</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right">Qty</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {order.items.map((item: any) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="relative w-12 h-12 bg-muted rounded-md overflow-hidden">
                                                    {item.sticker?.image?.url && (
                                                        <Image
                                                            src={item.sticker.image.url}
                                                            alt={item.sticker.image.alt || ""}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.sticker?.name || "Unknown Product"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                ${Number(item.price_at_purchase).toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                ${(Number(item.price_at_purchase) * item.quantity).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
