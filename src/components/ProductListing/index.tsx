import { FilterSidebar } from "../FilterSidebar";
import { ProductGrid } from "../ProductGrid";
import styles from "./ProductListing.module.css";

type ProductListingProps = {
  count?: number;
};

export function ProductListing({ count = 8 }: ProductListingProps) {
  return (
    <div className={styles.listing}>
      <FilterSidebar />
      <div className={styles.gridArea}>
        <ProductGrid count={count} />
        <div className={styles.pagination}>
          <span className={styles.pageArrow}>{"<"}</span>
          <span className={styles.pageNumber}>1</span>
          <span className={styles.pageNumber}>2</span>
          <span className={styles.pageNumber}>3</span>
          <span className={styles.pageDots}>...</span>
          <span className={styles.pageArrow}>{">"}</span>
        </div>
      </div>
    </div>
  );
}
