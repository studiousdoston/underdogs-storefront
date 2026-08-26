import { X, Plus, Minus } from "lucide-react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import styles from "./CartItem.module.css";

type CartItemProps = {
  name: string;
  price: number;
  quantity?: number;
  imageUrl?: string;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
};

export function CartItem({
  name,
  price,
  quantity = 1,
  imageUrl = "https://placehold.co/100x120",
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className={styles.item}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.details}>
        <Typography level="title-sm">{name}</Typography>

        <div className={styles.qtyRow}>
          <IconButton
            variant="outlined"
            size="sm"
            className={styles.qtyBtn}
            onClick={onDecrease}
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </IconButton>
          <Typography level="body-sm" className={styles.qty}>
            {quantity}
          </Typography>
          <IconButton
            variant="outlined"
            size="sm"
            className={styles.qtyBtn}
            onClick={onIncrease}
          >
            <Plus size={14} />
          </IconButton>
        </div>

        <Typography level="title-sm" className={styles.price}>
          ${price.toFixed(2)}
        </Typography>
      </div>
      <IconButton
        variant="plain"
        size="sm"
        className={styles.remove}
        onClick={onRemove}
      >
        <X size={16} />
      </IconButton>
    </div>
  );
}
