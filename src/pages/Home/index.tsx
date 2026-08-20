import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { ProductSection } from "../../components/ProductSection";
import { BrandVideo } from "./BrandVideo";
// import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
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

      <Footer />
    </>
  );
}
