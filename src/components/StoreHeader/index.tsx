import { Link } from "react-router-dom";
import { Search, Heart, User, ShoppingCart } from "lucide-react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import styles from "./StoreHeader.module.css";

export function StoreHeader() {
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
          <Input
            placeholder="What are you looking for today?"
            startDecorator={<Search size={12} />}
            className={styles.search}
            size="sm"
          />
          <IconButton variant="plain" size="sm">
            <Heart size={20} />
          </IconButton>
          <IconButton variant="plain" size="sm">
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
