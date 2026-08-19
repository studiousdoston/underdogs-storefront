import { Link } from "react-router-dom";
import styles from "./BrandVideo.module.css";
// import brandVideoSrc from "../../../../public/entrance.mp4";

export function BrandVideo() {
  return (
    <section className={styles.section}>
      <video
        className={styles.video}
        src="/entrance.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.overlay}>
        <span className={styles.heading}>Shop with us:</span>
        <Link to="/clothes" className={styles.link}>
          Clothes
        </Link>
        <Link to="/accessories" className={styles.link}>
          Accessories
        </Link>
      </div>
    </section>
  );
}
