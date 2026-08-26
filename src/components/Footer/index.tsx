import Typography from "@mui/joy/Typography";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <Typography level="title-sm" className={styles.heading}>
            Help
          </Typography>
          <span className={styles.link}>Contact Us</span>
          <span className={styles.link}>FAQs</span>
          <span className={styles.link}>Shipping & Returns</span>
        </div>

        <div className={styles.column}>
          <Typography level="title-sm" className={styles.heading}>
            Shop with Us
          </Typography>
          <Link to={"/clothes"} className={styles.link}>
            Clothes
          </Link>
          <Link to={"/accessories"} className={styles.link}>
            Accessories
          </Link>
          <span className={styles.link}>New Drops</span>
        </div>

        <div className={styles.column}>
          <Link to={"/auth"} className={styles.heading}>
            Explore our Stores
          </Link>
          <span className={styles.link}>Store Locator</span>
          <span className={styles.link}>About Us</span>
        </div>

        <div className={styles.column}>
          <Link to={"/auth"} className={styles.heading}>
            Join Us
          </Link>
          <span className={styles.link}>Newsletter</span>
          <span className={styles.link}>Careers</span>
          <Link to={"/auth"} className={styles.link}>
            SIGN UP
          </Link>
        </div>
      </div>
    </footer>
  );
}
