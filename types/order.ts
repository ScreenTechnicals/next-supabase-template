import { Sticker } from "@/hooks/useStickers";

export type OrderItem = {
    id: string;
    order_id: string;
    sticker_id: string;
    price_at_purchase: number;
    quantity: number;
    sticker?: Sticker;
}

export type Order = {
    id: string;
    user_id: string;
    status: string;
    total_amount: number;
    created_at: string;
    items: OrderItem[];
}
