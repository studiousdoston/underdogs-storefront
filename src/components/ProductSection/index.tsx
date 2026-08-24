import { useRef, type ReactNode } from "react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ProductSection.module.css";

type ProductSectionProps = {
  title: string;
  children: ReactNode;
};

export function ProductSection({ title, children }: ProductSectionProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Typography level="h2">{title}</Typography>
        <div className={styles.arrows}>
          <IconButton
            variant="plain"
            size="sm"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft size={30} />
          </IconButton>
          <IconButton
            variant="plain"
            size="sm"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight size={30} />
          </IconButton>
        </div>
      </div>
      <div ref={rowRef} className={styles.row}>
        {children}
      </div>
    </section>
  );
}
