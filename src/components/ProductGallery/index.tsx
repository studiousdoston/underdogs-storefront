import { useRef, useState } from "react";
import styles from "./ProductGallery.module.css";

type ProductGalleryProps = {
  images?: string[];
};

export function ProductGallery({
  images = Array(6).fill("https://placehold.co/460x575"),
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveIndex(index);
  }

  function scrollToIndex(index: number) {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * container.clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.gallery}>
      <div
        className={styles.mainScroll}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`View ${i + 1}`}
            className={styles.main}
          />
        ))}
      </div>

      <div className={styles.thumbRow}>
        {images.map((thumb, i) => (
          <img
            key={i}
            src={thumb}
            alt={`Thumbnail ${i + 1}`}
            className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ""}`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
