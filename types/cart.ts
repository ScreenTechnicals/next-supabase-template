import { Sticker } from "@/hooks/useStickers";

export type CartItem = {
    id: string;
    cart_id: string;
    sticker_id: string;
    quantity: number;
    sticker?: Sticker;
}

export type Cart = {
    id: string;
    user_id: string;
    items: CartItem[];
}
