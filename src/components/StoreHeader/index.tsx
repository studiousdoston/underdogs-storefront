import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { useAuthModal } from "../../context/AuthModalContext";
import { useSearchModal } from "../../context/SearchModalContext";

import styles from "./StoreHeader.module.css";

export function StoreHeader() {
  const { open } = useAuthModal();
  const { openSearch } = useSearchModal();
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
          <IconButton variant="plain" size="sm">
            <ShoppingCart size={20} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
