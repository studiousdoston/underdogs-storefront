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
  isCloth,
} from "../../lib/types/product";

import styles from "./ProductDetail.module.css";
import { useCartModal } from "@/context/CartModalContext";
import { ItemSize, ItemType } from "@/lib/enums/order.enum";
import { addItem } from "@/features/cart/CartSlice";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    current: product,
    related,
    status,
  } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { openCart } = useCartModal();

  function handleAddToCart() {
    if (!selectedSize || !product) return;

    dispatch(
      addItem({
        productId: product._id,
        itemType: isCloth(product) ? ItemType.CLOTH : ItemType.ACCESSORY,
        itemSize: selectedSize as ItemSize,
        itemQuantity: 1,
        itemName: getProductName(product),
        itemPrice: getProductPrice(product),
        imageUrl: getProductImages(product)[0],
      }),
    );
    openCart();
  }
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
            onClick={handleAddToCart}
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
