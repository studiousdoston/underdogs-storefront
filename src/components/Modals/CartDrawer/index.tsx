import { X } from "lucide-react";
import Drawer from "@mui/joy/Drawer";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import { useNavigate } from "react-router-dom";
import { useCartModal } from "../../../context/CartModalContext";
import { useAuthModal } from "../../../context/AuthModalContext";
import { CartItem } from "../CartItem";
import styles from "./CartDrawer.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  checkout,
} from "@/features/cart/CartSlice";

export function CartDrawer() {
  const { isOpenCart, closeCart } = useCartModal();
  const { open: openAuthModal } = useAuthModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, checkoutStatus } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.member);

  const subtotal = items.reduce(
    (sum: number, i: { itemPrice: number; itemQuantity: number }) =>
      sum + i.itemPrice * i.itemQuantity,
    0,
  );

  async function handleCheckout() {
    if (!user) {
      closeCart();
      openAuthModal();
      return;
    }
    const result = await dispatch(checkout());
    if (checkout.fulfilled.match(result)) {
      closeCart();
      navigate("/orders");
    }
  }

  return (
    <Drawer
      anchor="right"
      open={isOpenCart}
      onClose={closeCart}
      sx={{ "--Drawer-horizontalSize": "420px" }}
      slotProps={{
        backdrop: {
          sx: { backdropFilter: "none", backgroundColor: "rgba(0, 0, 0, 0.4)" },
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
          {items.length === 0 ? (
            <Typography level="body-sm" className={styles.empty}>
              Your cart is empty.
            </Typography>
          ) : (
            items.map((item) => (
              <CartItem
                key={`${item.productId}-${item.itemSize}`}
                name={`${item.itemName} (${item.itemSize})`}
                price={item.itemPrice}
                quantity={item.itemQuantity}
                imageUrl={item.imageUrl}
                onIncrease={() =>
                  dispatch(
                    increaseQuantity({
                      productId: item.productId,
                      itemSize: item.itemSize,
                    }),
                  )
                }
                onDecrease={() =>
                  dispatch(
                    decreaseQuantity({
                      productId: item.productId,
                      itemSize: item.itemSize,
                    }),
                  )
                }
                onRemove={() =>
                  dispatch(
                    removeItem({
                      productId: item.productId,
                      itemSize: item.itemSize,
                    }),
                  )
                }
              />
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.subtotalRow}>
            <Typography level="title-md">Subtotal</Typography>
            <Typography level="title-md">${subtotal.toFixed(2)}</Typography>
          </div>
          <Button
            size="lg"
            className={styles.checkout}
            onClick={handleCheckout}
            disabled={items.length === 0 || checkoutStatus === "loading"}
          >
            {checkoutStatus === "loading" ? "Placing order..." : "Checkout"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
