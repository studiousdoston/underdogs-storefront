import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Badge from "@mui/joy/Badge";
import { useAuthModal } from "../../context/AuthModalContext";
import { useSearchModal } from "../../context/SearchModalContext";
import { useCartModal } from "../../context/CartModalContext";
import { useAppSelector } from "../../hooks";

import styles from "./StoreHeader.module.css";

export function StoreHeader() {
  const { open } = useAuthModal();
  const { openSearch } = useSearchModal();
  const { openCart } = useCartModal();
  const { items } = useAppSelector((state) => state.cart);

  const cartCount = items.reduce((sum, i) => sum + i.itemQuantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          <Link to="/clothes" className={styles.link}>
            Clothes
          </Link>
          <Link to="/accessories" className={styles.link}>
            Accessories
          </Link>
        </nav>

        <Link to="/" className={styles.logo}>
          <Typography level="h4">Underdogs</Typography>
        </Link>

        <div className={styles.right}>
          <Search size={20} onClick={openSearch} />

          <IconButton variant="plain" size="sm" onClick={open}>
            <User size={20} />
          </IconButton>

          <Badge badgeContent={cartCount} size="sm" invisible={cartCount === 0}>
            <IconButton variant="plain" size="sm" onClick={openCart}>
              <ShoppingCart size={20} />
            </IconButton>
          </Badge>
        </div>
      </div>
    </header>
  );
}
