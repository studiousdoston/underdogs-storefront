import { X } from "lucide-react";
import Drawer from "@mui/joy/Drawer";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import { useCartModal } from "../../../context/CartModalContext";
import { CartItem } from "../CartItem";
import styles from "./CartDrawer.module.css";
import { Link } from "react-router-dom";

const sampleItems = [
  { name: "Shoes", price: 129.99 },
  { name: "Long Sleeve Shirt", price: 39.99 },
];

export function CartDrawer() {
  const { isOpenCart, closeCart } = useCartModal();

  const subtotal = sampleItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Drawer
      anchor="right"
      open={isOpenCart}
      onClose={closeCart}
      sx={{ "--Drawer-horizontalSize": "420px" }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "none",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <Typography level="title-lg">Your Cart</Typography>
          <IconButton variant="plain" size="sm" onClick={closeCart}>
            <X size={20} />
          </IconButton>
        </div>

        <div className={styles.items}>
          {sampleItems.map((item) => (
            <CartItem key={item.name} name={item.name} price={item.price} />
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.subtotalRow}>
            <Typography level="title-md">Subtotal</Typography>
            <Typography level="title-md">${subtotal.toFixed(2)}</Typography>
          </div>
          <Link to={"/orders"}>
            <Button size="lg" className={styles.checkout} onClick={closeCart}>
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </Drawer>
  );
}
