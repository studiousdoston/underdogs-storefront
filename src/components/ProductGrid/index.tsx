import { Link } from "react-router-dom";
import type { Product } from "@/lib/types/product";
import {
  getProductName,
  getProductPrice,
  getProductImages,
  getProductSoldNum,
} from "@/lib/types/product";
import { ProductCard } from "../ProductCard";
import { Typography } from "@mui/joy";

import styles from "./ProductGrid.module.css";
import { ProductCardSkeleton } from "../Loader";

type ProductGridProps = {
  products: Product[];
  loading?: boolean;
};

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
      {products.map((item) => (
        <Link
          key={item._id}
          to={`/product/${item._id}`}
          className={styles.productLink}
        >
          <ProductCard
            imageUrl={getProductImages(item)[0]}
            name={getProductName(item)}
            price={getProductPrice(item)}
            soldCount={getProductSoldNum(item)}
          />
        </Link>
      ))}
    </div>
  );
}
