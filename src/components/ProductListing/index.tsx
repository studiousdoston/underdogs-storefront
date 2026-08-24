import { useEffect, useState } from "react";
import ProductService from "@/services/ProductService";
import type { Cloth } from "@/lib/types/clothes";
import { FilterSidebar } from "../FilterSidebar";
import { ProductGrid } from "../ProductGrid";
import styles from "./ProductListing.module.css";

type ProductListingProps = {
  typeOptions: string[];
};

const productService = new ProductService();

export function ProductListing({ typeOptions }: ProductListingProps) {
  const [products, setProducts] = useState<Cloth[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<
    "price_asc" | "price_desc" | "newest" | "popular"
  >("price_asc");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productService
      .getClothes({ sort, category, page, limit: 8 })
      .then((res) => {
        setProducts(res.data);
        setTotal(res.total);
      })
      .catch((err) => console.error("getClothes failed:", err))
      .finally(() => setLoading(false));
  }, [sort, category, page]);

  return (
    <div className={styles.listing}>
      <FilterSidebar
        typeOptions={typeOptions}
        sort={sort}
        category={category}
        onSortChange={setSort}
        onCategoryChange={setCategory}
      />
      <div className={styles.gridArea}>
        <ProductGrid products={products} loading={loading} />
        {/* pagination: wire page/setPage using `total` */}
      </div>
    </div>
  );
}
