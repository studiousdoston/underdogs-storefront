import Typography from "@mui/joy/Typography";
import styles from "./SizeSelector.module.css";

type SizeOption = {
  size: string;
  stock: number;
};

type SizeSelectorProps = {
  sizes: SizeOption[];
  selected: string | null;
  onSelect: (size: string) => void;
};

export function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <Typography level="title-sm" className={styles.label}>
        Size:
      </Typography>
      <div className={styles.sizes}>
        {sizes.map(({ size, stock }) => (
          <span
            key={size}
            className={`${styles.size} ${selected === size ? styles.sizeActive : ""} ${stock === 0 ? styles.sizeDisabled : ""}`}
            onClick={() => stock > 0 && onSelect(size)}
          >
            {size}
          </span>
        ))}
      </div>
    </div>
  );
}
