import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { ProductCard, type Product } from "../../components/ProductCard";
import { ProductSection } from "../../components/ProductSection";
import { BrandVideo } from "./BrandVideo";
import { normalizeProduct } from "@/lib/utils/normalizeProducts";

const API_URL = "http://localhost:3030/product";

export default function Home() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newDrops, setNewDrops] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [bestSellersRes, newDropsRes] = await Promise.all([
          fetch(`${API_URL}/best-sellers?limit=8`),
          fetch(`${API_URL}/new-drops?limit=8`),
        ]);

        const bestSellersJson = await bestSellersRes.json();
        const newDropsJson = await newDropsRes.json();

        if (Array.isArray(bestSellersJson.data)) {
          setBestSellers(bestSellersJson.data.map(normalizeProduct));
        }

        if (Array.isArray(newDropsJson.data)) {
          setNewDrops(newDropsJson.data.map(normalizeProduct));
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
          <p>Loading best sellers...</p>
        ) : bestSellers.length > 0 ? (
          bestSellers.map((product) => (
            <ProductCard key={`bestseller-${product.id}`} {...product} />
          ))
        ) : (
          <p>No best sellers found.</p>
        )}
      </ProductSection>

      <BrandVideo />

      <ProductSection title="New Drops">
        {loading ? (
          <p>Loading new drops...</p>
        ) : newDrops.length > 0 ? (
          newDrops.map((product) => (
            <ProductCard key={`newdrop-${product.id}`} {...product} />
          ))
        ) : (
          <p>No new drops found.</p>
        )}
      </ProductSection>

      <Footer />
    </>
  );
}
