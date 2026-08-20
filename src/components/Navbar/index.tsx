import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import styles from "./Navbar.module.css";
import "../../css/globals.css";

export function Navbar() {
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
            <IconButton variant="plain" size="sm"  className={styles.icon}>
              <Search size={24} />
            </IconButton>
            <IconButton variant="plain" size="sm" className={styles.icon}>
              <ShoppingCart size={24} />
            </IconButton>
            <IconButton variant="plain" size="sm" className={styles.icon}>
              <User size={24} />
            </IconButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
