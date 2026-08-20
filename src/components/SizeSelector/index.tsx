import Typography from "@mui/joy/Typography";
import styles from "./SizeSelector.module.css";

type SizeSelectorProps = {
  sizes?: string[];
};

export function SizeSelector(props: SizeSelectorProps) {
  const { sizes = ["S", "M", "L", "X", "XL"] } = props;
  return (
    <div className={styles.wrapper}>
      <Typography level="title-sm" className={styles.label}>
        Size:
      </Typography>
      <div className={styles.sizes}>
        {sizes.map((size) => (
          <span key={size} className={styles.size}>
            {size}
          </span>
        ))}
      </div>
    </div>
  );
}
