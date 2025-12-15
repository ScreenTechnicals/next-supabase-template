import { supabaseClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";


export type Sticker = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    image: {
        url: string;
        alt: string | null;
        width: number | null;
        height: number | null;
    } | null;
}

const fetchStickers = async (): Promise<Sticker[]> => {
    const { data, error } = await supabaseClient
        .from("stickers")
        .select(`
      id,
      name,
      description,
      price,
      stock,
      sticker_images (
        is_primary,
        images (
          url,
          alt,
          width,
          height
        )
      )
    `)
        .eq("is_active", true)
        .eq("sticker_images.is_primary", true);

    if (error) throw error;

    return data.map((sticker: any) => {
        const rawImage = sticker.sticker_images?.[0]?.images;
        const image = Array.isArray(rawImage) ? rawImage[0] : rawImage;

        return {
            id: sticker.id,
            name: sticker.name,
            description: sticker.description,
            price: Number(sticker.price),
            stock: sticker.stock,
            image: image ? {
                url: image.url,
                alt: image.alt,
                width: image.width,
                height: image.height
            } : null,
        };
    });
};

export const useStickers = () => {
    return useQuery({
        queryKey: ["stickers"],
        queryFn: fetchStickers,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
