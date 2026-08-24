import type { Cloth } from "@/lib/types/clothes";
import { ProductCard } from "../ProductCard";
import styles from "./ProductGrid.module.css";

type ProductGridProps = {
  products: Cloth[];
  loading?: boolean;
};

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) return <div className={styles.grid}>Loading...</div>;

  return (
    <div className={styles.grid}>
      {products.map((cloth) => (
        <ProductCard
          key={cloth._id}
          imageUrl={`${import.meta.env.VITE_SERVER_API}/${cloth.clothImages[0]}`}
          name={cloth.clothName}
          price={cloth.clothPrice}
          soldCount={cloth.clothSoldNum ?? 0}
        />
      ))}
    </div>
  );
}
