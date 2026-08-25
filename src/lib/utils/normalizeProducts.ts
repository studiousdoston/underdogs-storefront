import type { Product } from "@/components/ProductCard/index";

const BACKEND_URL = import.meta.env.VITE_SERVER_API as string;
export function normalizeProduct(rawItem: any): Product {
  const isCloth = "clothName" in rawItem;

  const rawImage = isCloth
    ? rawItem.clothImages?.[0]
    : rawItem.accessoryImages?.[0];

  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${BACKEND_URL}/${rawImage}`
    : "https://placehold.co/340x400";

  return {
    id: rawItem._id,
    name: isCloth ? rawItem.clothName : rawItem.accessoryName,
    price: isCloth ? rawItem.clothPrice : rawItem.accessoryPrice,
    soldCount: isCloth ? rawItem.clothSoldNum : rawItem.accessorySoldNum,
    imageUrl,
    rating: 5,
  };
}
