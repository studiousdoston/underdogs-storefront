import type { Product } from "@/components/ProductCard";

export function normalizeCollab(collab: any): Product {
  return {
    id: collab._id,
    name: collab.collabName,
    price: 0,
    imageUrl:
      collab.collabImage ||
      `https://placehold.co/340x400?text=${encodeURIComponent(collab.collabName)}`,
    rating: 5,
    soldCount: 0,
  };
}
