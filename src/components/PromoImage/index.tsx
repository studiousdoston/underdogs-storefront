import "../../css/globals.css";
import styles from "./PromoImage.module.css";

export function PromoImage() {
  return (
    <section className={`fullBleed ${styles.section}`}>
      <img src="/header.webp" alt="Promo" className={styles.image} />
    </section>
  );
}
