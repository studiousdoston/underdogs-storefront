import { ProductCard } from "../../components/ProductCard";
import { ProductSection } from "../../components/ProductSection";
import { BrandVideo } from "./BrandVideo";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
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
