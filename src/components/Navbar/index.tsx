import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import styles from "./Navbar.module.css";
import { useAuthModal } from "../../context/AuthModalContext";
import "../../css/globals.css";
import { useSearchModal } from "../../context/SearchModalContext";

export function Navbar() {
  const { open } = useAuthModal();
  const { openSearch } = useSearchModal();

  return (
    <header className={`fullBleed ${styles.header}`}>
      {" "}
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <Typography level="h3">Underdogs</Typography>
        </Link>

        <nav className={styles.nav}>
          <Link to="/accessories" className={styles.link}>
            Accessories
          </Link>
          <Link to="/clothes" className={styles.link}>
            Clothes
          </Link>

          <div className={styles.icons}>
            <IconButton variant="plain" size="sm" className={styles.icon}>
              <Search size={24} onClick={openSearch} />
            </IconButton>
            <IconButton variant="plain" size="sm" className={styles.icon}>
              <ShoppingCart size={24} />
            </IconButton>
            <IconButton
              variant="plain"
              size="sm"
              className={styles.icon}
              onClick={open}
            >
              <User size={24} />
            </IconButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
