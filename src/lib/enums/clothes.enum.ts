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

export type ClothType = (typeof ClothType)[keyof typeof ClothType];
