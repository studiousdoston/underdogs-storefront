import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { ProductSection } from "../../components/ProductSection";
import { PromoImage } from "../../components/PromoImage";
import { BrandVideo } from "./BrandVideo";
// import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <PromoImage />
      <ProductSection title="Best Sellers">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ProductSection>
      <BrandVideo />
      <ProductSection title="New Drops">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ProductSection>

      <ProductSection title="Our Collabs">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ProductSection>

      <footer>FOOTER </footer>
    </>
  );
}
