import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  imageUrl?: string;
  name?: string;
  price?: number;
  rating?: number;
  soldCount?: number;
};

export function ProductCard({
  imageUrl = "https://placehold.co/340x400",
  name = "Product Name",
  price = 0,
  rating = 5,
  soldCount = 0,
}: ProductCardProps) {
  return (
    <Card variant="plain" className={styles.card}>
      <AspectRatio ratio="4/5">
        <img src={imageUrl} alt={name} />
      </AspectRatio>

      <Typography level="body-sm" className={styles.name}>
        {name}
      </Typography>

      <Typography level="body-md" fontWeight="lg" className={styles.name}>
        ${price.toFixed(2)}
      </Typography>

      <Typography level="body-xs" className={styles.rating}>
        {"★".repeat(rating)} ({soldCount === 0 ? 48 : soldCount})
      </Typography>
    </Card>
  );
}
