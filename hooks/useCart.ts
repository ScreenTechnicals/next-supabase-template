import { supabaseClient } from "@/lib/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";

const fetchCart = async (userId: string) => {
    const { data: cart, error: cartError } = await supabaseClient
        .from("carts")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (cartError) throw cartError;

    if (!cart) {
        // Create cart if it doesn't exist
        const { data: newCart, error: createError } = await supabaseClient
            .from("carts")
            .insert({ user_id: userId })
            .select()
            .single();

        if (createError) throw createError;
        return { ...newCart, items: [] };
    }

    const { data: items, error: itemsError } = await supabaseClient
        .from("cart_items")
        .select(`
            *,
            sticker:stickers (
                id,
                name,
                description,
                price,
                stock,
                sticker_images (
                    images (
                        url,
                        alt,
                        width,
                        height
                    )
                )
            )
        `)
        .eq("cart_id", cart.id);

    if (itemsError) throw itemsError;

    // Transform items to match our Sticker type structure for images
    const transformedItems = items.map((item: any) => {
        const rawImage = item.sticker?.sticker_images?.[0]?.images;
        const image = Array.isArray(rawImage) ? rawImage[0] : rawImage;

        return {
            ...item,
            sticker: {
                ...item.sticker,
                image: image ? {
                    url: image.url,
                    alt: image.alt,
                    width: image.width,
                    height: image.height
                } : null
            }
        };
    });

    return { ...cart, items: transformedItems };
};

export const useCart = () => {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["cart", user?.id],
        queryFn: () => fetchCart(user!.id),
        enabled: !!user,
    });

    const addToCart = useMutation({
        mutationFn: async ({ stickerId, quantity }: { stickerId: string; quantity: number }) => {
            if (!query.data?.id) throw new Error("No cart found");

            const { error } = await supabaseClient
                .from("cart_items")
                .upsert(
                    {
                        cart_id: query.data.id,
                        sticker_id: stickerId,
                        quantity
                    },
                    { onConflict: 'cart_id, sticker_id' }
                );

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
        },
    });

    const removeFromCart = useMutation({
        mutationFn: async (itemId: string) => {
            const { error } = await supabaseClient
                .from("cart_items")
                .delete()
                .eq("id", itemId);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
        },
    });

    const updateQuantity = useMutation({
        mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
            const { error } = await supabaseClient
                .from("cart_items")
                .update({ quantity })
                .eq("id", itemId);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
        }
    })

    const clearCart = useMutation({
        mutationFn: async () => {
            if (!query.data?.id) return;

            const { error } = await supabaseClient
                .from("cart_items")
                .delete()
                .eq("cart_id", query.data.id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
        }
    })

    return {
        ...query,
        cart: query.data,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};
