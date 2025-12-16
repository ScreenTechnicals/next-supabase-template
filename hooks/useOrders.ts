import { supabaseClient } from "@/lib/supabase/client";
import { CartItem } from "@/types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";

const fetchOrders = async (userId: string) => {
    const { data, error } = await supabaseClient
        .from("orders")
        .select(`
            *,
            order_items (
                *,
                sticker:stickers (
                    id,
                    name,
                     sticker_images (
                        images (
                            url,
                            alt
                        )
                    )
                )
            )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform items to match our structure
    return data.map((order: any) => ({
        ...order,
        items: order.order_items.map((item: any) => {
            const rawImage = item.sticker?.sticker_images?.[0]?.images;
            const image = Array.isArray(rawImage) ? rawImage[0] : rawImage;
            return {
                ...item,
                sticker: {
                    ...item.sticker,
                    image
                }
            }
        })
    }));
};

export const useOrders = () => {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["orders", user?.id],
        queryFn: () => fetchOrders(user!.id),
        enabled: !!user,
    });

    const createOrder = useMutation({
        mutationFn: async ({ totalAmount, items }: { totalAmount: number; items: CartItem[] }) => {
            if (!user) throw new Error("User not valid");

            // 1. Create Order
            const { data: order, error: orderError } = await supabaseClient
                .from("orders")
                .insert({
                    user_id: user.id,
                    total_amount: totalAmount,
                    status: "pending"
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Order Items
            const orderItems = items.map(item => ({
                order_id: order.id,
                sticker_id: item.sticker_id,
                price_at_purchase: item.sticker?.price || 0,
                quantity: item.quantity
            }));

            const { error: itemsError } = await supabaseClient
                .from("order_items")
                .insert(orderItems);

            if (itemsError) throw itemsError;

            return order;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders", user?.id] });
        },
    });

    return {
        orders: query.data,
        isLoading: query.isLoading,
        createOrder
    };
};
