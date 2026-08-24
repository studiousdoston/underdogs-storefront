import type { ClothCategory, ClothVariant } from "../enums/clothes.enum";

export type Cloth = {
  _id: string;
  clothName: string;
  clothPrice: number;
  clothCategory: ClothCategory;
  clothDescription: string;
  clothVariants: ClothVariant[];
  clothImages: string[];
  clothSoldNum?: number;
  createdAt: string;
};

export type GetClothesParams = {
  sort?: "price_asc" | "price_desc" | "newest" | "popular";
  category?: string;
  page?: number;
  limit?: number;
};

export type GetClothesResponse = {
  data: Cloth[];
  total: number;
};
