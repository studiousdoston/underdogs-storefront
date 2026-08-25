import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

export type Product = {
  id?: string | number;
  imageUrl?: string;
  name?: string;
  price?: number;
  rating?: number;
  soldCount?: number;
};

export function ProductCard({
  id,
  imageUrl = "https://placehold.co/340x400",
  name = "Product Name",
  price = 0,
  rating = 5,
  soldCount = 0,
}: Product) {
  const card = (
    <Card variant="plain" className={styles.card}>
      <AspectRatio ratio="3/4">
        <img src={imageUrl} alt={name} />
      </AspectRatio>

      <Typography level="body-sm" className={styles.name}>
        {name}
      </Typography>

      <Typography level="body-md" fontWeight="lg" className={styles.price}>
        ${(price ?? 0).toFixed(2)}
      </Typography>

      <Typography level="body-xs" className={styles.rating}>
        {"★".repeat(rating ?? 0)} ({soldCount === 0 ? 48 : soldCount})
      </Typography>
    </Card>
  );

  // If an id is provided, make the whole card a link to the product detail page
  return id ? (
    <Link to={`/product/${id}`} className={styles.link} aria-label={`View details for ${name}`}>
      {card}
    </Link>
  ) : (
    card
  );
}
