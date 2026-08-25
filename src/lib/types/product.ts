import type { Cloth } from "./clothes";
import type { Accessory } from "./accessories";

export type Product = Cloth | Accessory;
const BACKEND_URL = import.meta.env.VITE_SERVER_API as string;

export function isCloth(product: Product): product is Cloth {
  return "clothCategory" in product;
}

export function getProductName(product: Product): string {
  return isCloth(product) ? product.clothName : product.accessoryName;
}

export function getProductPrice(product: Product): number {
  return isCloth(product) ? product.clothPrice : product.accessoryPrice;
}

export function getProductDescription(product: Product): string {
  return isCloth(product)
    ? product.clothDescription
    : product.accessoryDescription;
}

export function resolveImageUrl(raw?: string): string {
  if (!raw) return "https://placehold.co/460x575";
  return raw.startsWith("http") ? raw : `${BACKEND_URL}/${raw}`;
}

export function getProductImages(product: Product): string[] {
  const raw = isCloth(product) ? product.clothImages : product.accessoryImages;
  return raw.length > 0
    ? raw.map(resolveImageUrl)
    : [resolveImageUrl(undefined)];
}

export function getProductVariants(
  product: Product,
): { size: string; stock: number }[] {
  return isCloth(product) ? product.clothVariants : product.accessoryVariants;
}

export function getProductSoldNum(product: Product): number {
  return (
    (isCloth(product) ? product.clothSoldNum : product.accessorySoldNum) ?? 0
  );
}
