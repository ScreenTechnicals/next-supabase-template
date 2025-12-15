"use client";

import { ProductCard } from "@/components/ProductCard";
import { useStickers } from "@/hooks/useStickers";


export default function Home() {

  const { data: stickers } = useStickers();

  console.log(stickers);

  return (
    <div className="min-h-dvh container pb-10 mx-auto text-foreground flex flex-col">
      <section className="flex flex-col items-center justify-center py-10">
        <h1 className="text-5xl font-bold text-pink-600">Get Meow Stickers!</h1>
        <p className="text-xl text-muted-foreground">UTimes are tough. Liven up your home with some cute Cat Stickers. 🐈</p>
      </section>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          stickers?.map((sticker) => (
            <ProductCard
              key={sticker.id}
              imageSrc={sticker.image?.url || ""}
              imageAlt={sticker.image?.alt || ""}
              title={sticker.name}
              description={sticker.description || ""}
              price={sticker.price}
            />
          ))
        }
      </div>

    </div>
  );
}

