import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { StoreHeader } from "../../components/StoreHeader";
import { ProductGallery } from "../../components/ProductGallery";
import { SizeSelector } from "../../components/SizeSelector";
import { ProductSection } from "../../components/ProductSection";
import { ProductCard } from "../../components/ProductCard";
import { Footer } from "../../components/Footer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchProductById,
  fetchRelatedProducts,
  resetProduct,
} from "../../features/product/productSlice";
import {
  getProductName,
  getProductPrice,
  getProductDescription,
  getProductImages,
  getProductVariants,
  getProductSoldNum,
} from "../../lib/types/product";

import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    current: product,
    related,
    status,
  } = useAppSelector((state) => state.product);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    dispatch(resetProduct());
    setSelectedSize(null);
    dispatch(fetchProductById(id));
    dispatch(fetchRelatedProducts({ id, limit: 4 }));
  }, [id, dispatch]);

  if (status === "loading" || status === "idle" || !product) {
    return (
      <>
        <StoreHeader />
        <div className={styles.top}>
          <Typography level="body-md">Loading...</Typography>
        </div>
        <Footer />
      </>
    );
  }

  if (status === "failed") {
    return (
      <>
        <StoreHeader />
        <div className={styles.top}>
          <Typography level="body-md">Product not found.</Typography>
        </div>
        <Footer />
      </>
    );
  }

  const variants = getProductVariants(product);

  return (
    <>
      <StoreHeader />

      <div className={styles.top}>
        <ProductGallery images={getProductImages(product)} />

        <div className={styles.info}>
          <span>
            <Typography level="title-lg" className={styles.titleLabel}>
              Title:
            </Typography>
            <Typography level="body-sm" className={styles.titleText}>
              {getProductName(product)}
            </Typography>
          </span>
          <span>
            <Typography level="title-lg" className={styles.descLabel}>
              Description:
            </Typography>
            <Typography level="body-sm" className={styles.description}>
              {getProductDescription(product)}
            </Typography>
          </span>
          <Typography level="body-sm" className={styles.rating}>
            ★★★★★ ({getProductSoldNum(product)})
          </Typography>
          <Typography level="title-lg" className={styles.price}>
            ${getProductPrice(product).toFixed(2)}
          </Typography>

          <SizeSelector
            sizes={variants}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />

          <Button
            size="lg"
            className={styles.addToCart}
            disabled={!selectedSize}
            onClick={() => {
              // TODO: wire to cart slice once it exists
              console.log("Add to cart:", product._id, selectedSize);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <ProductSection title="You may also like">
        {related.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className={styles.relatedLink}
          >
            <ProductCard
              imageUrl={getProductImages(item)[0]}
              name={getProductName(item)}
              price={getProductPrice(item)}
              soldCount={getProductSoldNum(item)}
            />
          </Link>
        ))}
      </ProductSection>

      <Footer />
    </>
  );
}
