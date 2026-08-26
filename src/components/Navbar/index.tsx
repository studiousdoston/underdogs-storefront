import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";

import { useAuthModal } from "../../context/AuthModalContext";
import { useSearchModal } from "../../context/SearchModalContext";
import { useCartModal } from "../../context/CartModalContext";
import { Badge } from "@mui/joy";
import { useAppSelector } from "@/hooks";

import styles from "./Navbar.module.css";
import "../../css/globals.css";

export function Navbar() {
  const { open } = useAuthModal();
  const { openSearch } = useSearchModal();
  const { openCart } = useCartModal();
  const { items } = useAppSelector((state) => state.cart);

  const cartCount = items.reduce((sum, i) => sum + i.itemQuantity, 0);

  return (
    <header className={`fullBleed ${styles.header}`}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          <Link to="/accessories" className={styles.link}>
            Accessories
          </Link>
          <Link to="/clothes" className={styles.link}>
            Clothes
          </Link>
        </nav>

        <Link to="/" className={styles.logo}>
          <Typography level="h3">Underdogs</Typography>
        </Link>

        <div className={styles.icons}>
          <IconButton variant="plain" size="sm" className={styles.icon}>
            <Search size={22} onClick={openSearch} />
          </IconButton>

          <Badge
            badgeContent={cartCount}
            size="sm"
            invisible={cartCount === 0}
            sx={{ "--Badge-ringColor": "transparent" }}
          >
            <IconButton
              variant="plain"
              size="sm"
              className={styles.icon}
              onClick={openCart}
            >
              <ShoppingCart size={22} />
            </IconButton>
          </Badge>

          <IconButton
            variant="plain"
            size="sm"
            className={styles.icon}
            onClick={open}
          >
            <User size={22} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
