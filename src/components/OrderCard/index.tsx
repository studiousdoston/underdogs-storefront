import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import styles from "./OrderCard.module.css";
import { sweetConfirmDialog } from "@/lib/sweetAlert";
import { OrderStatus } from "@/lib/enums/order.enum";

type OrderCardProps = {
  orderId: string;
  items: { name: string; price: number; quantity: number }[];
  status: "IN_CART" | "PAID" | "DELIVERED" | "CANCELLED";
  onCancel: (orderId: string) => void;
  onPay: (orderId: string) => void;
};

export function OrderCard({
  orderId,
  items,
  status,
  onCancel,
  onPay,
}: OrderCardProps) {
  async function handleCancelClick() {
    const confirmed = await sweetConfirmDialog(
      "Cancel this order?",
      "This will permanently remove the ordered products. This cannot be undone.",
      "Yes, cancel it",
    );
    if (confirmed) onCancel(orderId);
  }

  return (
    <div className={styles.card}>
      <Typography level="title-sm" className={styles.label}>
        Ordered products:
      </Typography>
      {items.map((item) => (
        <div key={item.name} className={styles.row}>
          <span className={styles.name}>
            {item.name} {item.quantity > 1 ? `x${item.quantity}` : ""}
          </span>
          <span className={styles.price}>${item.price.toFixed(2)}</span>
        </div>
      ))}

      {status === OrderStatus.IN_CART && (
        <div className={styles.actions}>
          <Button
            variant="soft"
            color="danger"
            className={styles.cancel}
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="primary"
            className={styles.pay}
            onClick={() => onPay(orderId)}
          >
            Pay
          </Button>
        </div>
      )}
    </div>
  );
}
