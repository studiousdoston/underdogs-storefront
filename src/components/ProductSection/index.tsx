import type { ReactNode } from "react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ProductSection.module.css";

type ProductSectionProps = {
  title: string;
  children: ReactNode;
};

export function ProductSection({ title, children }: ProductSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Typography level="h2">{title}</Typography>
        <div className={styles.arrows}>
          <IconButton variant="plain" size="sm">
            <ChevronLeft size={30} />
          </IconButton>
          <IconButton variant="plain" size="sm">
            <ChevronRight size={30} />
          </IconButton>
        </div>
      </div>
      <div className={styles.row}>{children}</div>
    </section>
  );
}
