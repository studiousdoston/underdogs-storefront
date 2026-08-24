import Skeleton from "@mui/joy/Skeleton";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";

import type { Cloth } from "@/lib/types/clothes";
import type { Accessory } from "@/lib/types/accessories";
import { ProductCard } from "../ProductCard";
import { Typography } from "@mui/joy";

import styles from "./ProductGrid.module.css";
import cardStyles from "../ProductCard/ProductCard.module.css";

type ProductGridProps = {
  products: (Cloth | Accessory)[];
  loading?: boolean;
};

function isCloth(item: Cloth | Accessory): item is Cloth {
  return "clothName" in item;
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading)
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );

  if (products.length === 0)
    return (
      <div className={styles.empty}>
        <Typography level="body-lg">No products available.</Typography>
      </div>
    );
  return (
    <div className={styles.grid}>
      {products.map((item) => {
        const name = isCloth(item) ? item.clothName : item.accessoryName;
        const price = isCloth(item) ? item.clothPrice : item.accessoryPrice;
        const images = isCloth(item) ? item.clothImages : item.accessoryImages;
        const soldNum = isCloth(item)
          ? item.clothSoldNum
          : item.accessorySoldNum;

        return (
          <ProductCard
            key={item._id}
            imageUrl={`${import.meta.env.VITE_SERVER_API}/${images[0]}`}
            name={name}
            price={price}
            soldCount={soldNum ?? 0}
          />
        );
      })}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <Card variant="plain" className={styles.card}>
      <AspectRatio ratio="3/4">
        <Skeleton variant="rectangular" />
      </AspectRatio>
      <Skeleton variant="text" level="body-sm" className={cardStyles.name} />
      <Skeleton
        variant="text"
        level="body-md"
        width="40%"
        className={cardStyles.name}
      />
    </Card>
  );
}
