import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <Typography level="h4">Underdogs</Typography>
        </Link>

        <nav className={styles.nav}>
          <Link to="/accessories" className={styles.link}>
            Accessories
          </Link>
          <Link to="/clothes" className={styles.link}>
            Clothes
          </Link>

          <div className={styles.icons}>
            <IconButton variant="plain" size="sm">
              <Search size={20} />
            </IconButton>
            <IconButton variant="plain" size="sm">
              <ShoppingCart size={20} />
            </IconButton>
            <IconButton variant="plain" size="sm">
              <User size={20} />
            </IconButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
