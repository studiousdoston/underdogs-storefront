import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { StoreHeader } from "../../components/StoreHeader";
import { ProductGallery } from "../../components/ProductGallery";
import { SizeSelector } from "../../components/SizeSelector";
import { ProductSection } from "../../components/ProductSection";
import { ProductCard, type Product } from "../../components/ProductCard";
import { normalizeProduct } from "@/lib/utils/normalizeProducts";
import styles from "./ProductDetail.module.css";
import { Footer } from "../../components/Footer";

const API_URL = "http://localhost:3030/product";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const json = await res.json();
        // backend returns the product item under data or directly; handle both
        const raw = json.data ?? json;
        setProduct(normalizeProduct(raw));
      } catch (err) {
        console.error("Failed to fetch product detail:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return (
    <>
      <StoreHeader />

      <div className={styles.top}>
        <ProductGallery />

        <div className={styles.info}>
          <span>
            <Typography level="title-lg" className={styles.titleLabel}>
              Title:
            </Typography>
            <Typography level="body-sm" className={styles.titleText}>
              {loading ? "Loading..." : product?.name ?? "Product not found"}
            </Typography>
          </span>
          <span>
            <Typography level="title-lg" className={styles.descLabel}>
              Description:
            </Typography>
            <Typography level="body-sm" className={styles.description}>
              {/* If the backend provides a description field, it could be shown here. */}
              {loading
                ? ""
                : "This product page displays the selected product. Detailed description is not provided by the mock API."}
            </Typography>
          </span>
          <Typography level="body-sm" className={styles.rating}>
            ★★★★★ (48)
          </Typography>
          <Typography level="title-lg" className={styles.price}>
            {loading ? "$0.00" : `$${(product?.price ?? 0).toFixed(2)}`}
          </Typography>

          <SizeSelector />

          <Button size="lg" className={styles.addToCart}>
            Add to Cart
          </Button>
        </div>
      </div>

      <ProductSection title="You may also like">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ProductSection>

      <Footer />
    </>
  );
}
