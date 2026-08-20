import { X } from "lucide-react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import styles from "./CartItem.module.css";

type CartItemProps = {
  name: string;
  price: number;
  quantity?: number;
  imageUrl?: string;
};

export function CartItem({
  name,
  price,
  quantity = 1,
  imageUrl = "https://placehold.co/100x120",
}: CartItemProps) {
  return (
    <div className={styles.item}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.details}>
        <Typography level="title-sm">{name}</Typography>
        <Typography level="body-sm" className={styles.qty}>
          Qty: {quantity}
        </Typography>
        <Typography level="title-sm" className={styles.price}>
          ${price.toFixed(2)}
        </Typography>
      </div>
      <IconButton variant="plain" size="sm" className={styles.remove}>
        <X size={16} />
      </IconButton>
    </div>
  );
}
