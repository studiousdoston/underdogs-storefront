import { User, CreditCard } from "lucide-react";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import styles from "./OrderSidebar.module.css";

export function OrderSidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.card}>
        <div className={styles.avatar}>
          <User size={32} />
        </div>
        <Typography level="title-sm">My Info</Typography>
      </div>

      <div className={styles.card}>
        <Typography level="title-sm" className={styles.sectionLabel}>
          Card Info:
        </Typography>
        <Input
          size="sm"
          placeholder="Card number"
          startDecorator={<CreditCard size={16} />}
          className={styles.input}
        />
        <Input size="sm" placeholder="MM/YY   CVC" className={styles.input} />

        <Typography level="title-sm" className={styles.sectionLabel}>
          Location:
        </Typography>
        <Input
          size="sm"
          placeholder="Street address"
          className={styles.input}
        />
        <Input
          size="sm"
          placeholder="City, postal code"
          className={styles.input}
        />
      </div>
    </div>
  );
}
