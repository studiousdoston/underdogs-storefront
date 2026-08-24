import { useEffect, useState } from "react";
import ProductService from "@/services/ProductService";
import type { Accessory } from "@/lib/types/accessories";
import type { Cloth } from "@/lib/types/clothes";
import { FilterSidebar } from "../FilterSidebar";
import { ProductGrid } from "../ProductGrid";
import styles from "./ProductListing.module.css";

type ProductListingProps = {
  typeOptions: { label: string; value: string }[];
  productType: "cloth" | "accessory";
};

const productService = new ProductService();

export function ProductListing({
  typeOptions,
  productType,
}: ProductListingProps) {
  const [products, setProducts] = useState<Cloth[] | Accessory[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<
    "price_asc" | "price_desc" | "newest" | "popular"
  >("price_asc");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  //* FETCHING
  useEffect(() => {
    setLoading(true);
    const request =
      productType === "cloth"
        ? productService.getClothes({ sort, category, page, limit: 8 })
        : productService.getAccessories({ sort, category, page, limit: 8 });

    request
      .then((res) => {
        setProducts(res.data);
        setTotal(res.total);
      })
      .catch((err) => console.error("fetching failed:", err))
      .finally(() => setLoading(false));
  }, [sort, category, page, productType]);

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
