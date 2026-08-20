import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import styles from "./OrderCard.module.css";

type OrderItem = {
  name: string;
  price: number;
};

type OrderCardProps = {
  items: OrderItem[];
};

export function OrderCard({ items }: OrderCardProps) {
  return (
    <div className={styles.card}>
      <Typography level="title-sm" className={styles.label}>
        Ordered products:
      </Typography>
      {items.map((item) => (
        <div key={item.name} className={styles.row}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.price}>${item.price.toFixed(2)}</span>
        </div>
      ))}

      <div className={styles.actions}>
        <Button variant="soft" color="danger" className={styles.cancel}>
          Cancel
        </Button>
        <Button variant="solid" color="primary" className={styles.pay}>
          Pay
        </Button>
      </div>
    </div>
  );
}
