import Typography from "@mui/joy/Typography";
import styles from "./FilterSidebar.module.css";

const sortOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Popular",
];
const typeOptions = [
  "Bags",
  "Socks",
  "Underwear",
  "Bottles & Shakers",
  "Shoes",
  "Others",
];

export function FilterSidebar() {
  return (
    <aside className={styles.sidebar}>
      <Typography level="title-md" className={styles.heading}>
        Sort By:
      </Typography>
      {sortOptions.map((option) => (
        <span key={option} className={styles.option}>
          {option}
        </span>
      ))}

      <Typography level="title-md" className={styles.heading}>
        Product Type:
      </Typography>
      {typeOptions.map((option) => (
        <span key={option} className={styles.option}>
          {option}
        </span>
      ))}
    </aside>
  );
}
