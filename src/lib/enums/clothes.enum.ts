export const ClothType = {
  SHIRTS: "SHIRTS",
  SLEEVES: "SLEEVES",
  TANKS: "TANKS",
  SHORTS: "SHORTS",
  PANTS: "PANTS",
  JOGGERS: "JOGGERS",
  HOODIES: "HOODIES",
  JACKETS: "JACKETS",
  COMPRESSIONS: "COMPRESSIONS",
  OTHERS: "OTHERS",
} as const;

export enum ClothSize {
  ONE_SIZE = "ONE_SIZE",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export type ClothType = (typeof ClothType)[keyof typeof ClothType];
