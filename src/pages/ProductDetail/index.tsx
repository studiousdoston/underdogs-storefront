import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { StoreHeader } from "../../components/StoreHeader";
import { ProductGallery } from "../../components/ProductGallery";
import { SizeSelector } from "../../components/SizeSelector";
import { ProductSection } from "../../components/ProductSection";
import { ProductCard } from "../../components/ProductCard";
import styles from "./ProductDetail.module.css";
import { Footer } from "../../components/Footer";

export default function ProductDetail() {
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
              This is the product title,
            </Typography>
          </span>
          <span>
            <Typography level="title-lg" className={styles.descLabel}>
              Description:
            </Typography>
            <Typography level="body-sm" className={styles.description}>
              Minimalist clip bag for essentials on the go. Ripstop fabric with
              a 1500mm waterproof rating shields contents from rain and moisture
              when clipped externally. Zip main compartment with small nylon
              puller provides secure, quick access. Gunmetal D-ring spring clip
              attaches to any bag, belt loop, or kit. Finished with a woven
              "Wings | ASRV" snap patch and 1" red webbing loop.
            </Typography>
          </span>
          <Typography level="body-sm" className={styles.rating}>
            ★★★★★ (48)
          </Typography>
          <Typography level="title-lg" className={styles.price}>
            $0.00
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
