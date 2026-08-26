import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import Drawer from "@mui/joy/Drawer";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { useSearchModal } from "../../../context/SearchModalContext";
import ProductService from "../../../services/ProductService";
import {
  getProductName,
  getProductPrice,
  getProductImages,
  type Product,
} from "../../../lib/types/product";
import styles from "./SearchModal.module.css";

const HEADER_HEIGHT = "48px";
const productService = new ProductService();

export function SearchModal() {
  const { isOpenSearch, closeSearch } = useSearchModal();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const data = await productService.searchProducts(query, 6);
        setResults(data);
      } catch (err) {
        console.log("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  function handleClose() {
    setQuery("");
    setResults([]);
    closeSearch();
  }

  return (
    <Drawer
      anchor="top"
      open={isOpenSearch}
      onClose={handleClose}
      slotProps={{
        content: {
          sx: {
            marginTop: HEADER_HEIGHT,
            height: "auto",
            maxHeight: "none",
          },
        },
        backdrop: {
          sx: {
            marginTop: HEADER_HEIGHT,
            backdropFilter: "none",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <div className={styles.panel}>
        <div className={styles.searchRow}>
          <Search size={20} className={styles.searchIcon} />
          <Input
            placeholder="Search for..."
            variant="plain"
            size="lg"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            sx={{ textTransform: "none" }}
          />
          <IconButton variant="plain" size="sm" onClick={handleClose}>
            <X size={22} />
          </IconButton>
        </div>

        {query.trim() && (
          <div className={styles.results}>
            {loading ? (
              <Typography level="body-sm" className={styles.status}>
                Searching...
              </Typography>
            ) : results.length === 0 ? (
              <Typography level="body-sm" className={styles.status}>
                No products found for "{query}".
              </Typography>
            ) : (
              results.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className={styles.resultItem}
                  onClick={handleClose}
                >
                  <img
                    src={getProductImages(item)[0]}
                    alt={getProductName(item)}
                    className={styles.resultImage}
                  />
                  <div className={styles.resultInfo}>
                    <Typography level="body-sm">
                      {getProductName(item)}
                    </Typography>
                    <Typography level="body-sm" fontWeight="lg">
                      ${getProductPrice(item).toFixed(2)}
                    </Typography>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
}
