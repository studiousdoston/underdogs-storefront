import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { ProductCard, type Product } from "../../components/ProductCard";
import { ProductSection } from "../../components/ProductSection";
import { BrandVideo } from "./BrandVideo";
import { normalizeProduct } from "@/lib/utils/normalizeProducts";
import { ProductCardSkeleton } from "@/components/Loader";
import { normalizeCollab } from "@/lib/utils/normalizwCollab";
import styles from "./Home.module.css";

const API_URL = "http://localhost:3030/product";

export default function Home() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newDrops, setNewDrops] = useState<Product[]>([]);
  const [collabs, setCollabs] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [bestSellersRes, newDropsRes, collabsRes] = await Promise.all([
          fetch(`${API_URL}/best-sellers?limit=8`),
          fetch(`${API_URL}/new-drops?limit=8`),
          fetch(`${API_URL}/collections?limit=8`),
        ]);

        const bestSellersJson = await bestSellersRes.json();
        const newDropsJson = await newDropsRes.json();
        const collabsJson = await collabsRes.json();

        if (Array.isArray(bestSellersJson.data)) {
          setBestSellers(bestSellersJson.data.map(normalizeProduct));
        }

        if (Array.isArray(newDropsJson.data)) {
          setNewDrops(newDropsJson.data.map(normalizeProduct));
        }
        if (Array.isArray(collabsJson.data)) {
          setCollabs(collabsJson.data.map(normalizeCollab));
        }
      } catch (err) {
        console.error("Failed to fetch home page data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  return (
    <>
      <Navbar />

      <ProductSection title="Best Sellers">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={`newdrops-skeleton-${index}`} />
          ))
        ) : bestSellers.length > 0 ? (
          bestSellers.map((product) => (
            <Link
              key={`bestseller-${product.id}`}
              to={`/product/${product.id}`}
              className={styles.productLink}
            >
              <ProductCard {...product} />
            </Link>
          ))
        ) : (
          <p>No best sellers found.</p>
        )}
      </ProductSection>

      <BrandVideo />

      <ProductSection title="New Drops">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={`newdrops-skeleton-${index}`} />
          ))
        ) : newDrops.length > 0 ? (
          newDrops.map((product) => (
            <Link
              key={`newdrop-${product.id}`}
              to={`/product/${product.id}`}
              className={styles.productLink}
            >
              <ProductCard {...product} />
            </Link>
          ))
        ) : (
          <p>No new drops found.</p>
        )}
      </ProductSection>

      <ProductSection title="Our Collabs">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={`collab-skeleton-${index}`} />
          ))
        ) : collabs.length > 0 ? (
          collabs.map((collab) => (
            <ProductCard key={`collab-${collab.id}`} {...collab} />
          ))
        ) : (
          <p>No collabs found.</p>
        )}
      </ProductSection>

      <Footer />
    </>
  );
}
