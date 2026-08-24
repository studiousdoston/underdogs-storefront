import {
  AccessoryCategory,
  AccessorySize,
  AccessoryStatus,
} from "../enums/accessories.enum";

export interface Accessory {
  _id: string;
  collabId?: string;
  accessoryStatus: AccessoryStatus;
  accessoryName: string;
  accessoryPrice: number;
  accessoryCategory: AccessoryCategory;
  accessoryVariants: AccessoryVariant[];
  accessoryDescription: string;
  accessoryImages: string[];
  accessorySoldNum: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccessoryVariant {
  size: AccessorySize;
  stock: number;
}

export type GetAccessoriesParams = {
  sort?: "price_asc" | "price_desc" | "newest" | "popular";
  category?: string;
  page?: number;
  limit?: number;
};

export type GetAccessoriesResponse = {
  data: Accessory[];
  total: number;
};
