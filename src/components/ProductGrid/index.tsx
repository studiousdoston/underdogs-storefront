import { ProductCard } from "../ProductCard";
import styles from "./ProductGrid.module.css";

type ProductGridProps = {
  count?: number;
};

export function ProductGrid({ count = 8 }: ProductGridProps) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
}
