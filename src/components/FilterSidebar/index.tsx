import Typography from "@mui/joy/Typography";
import styles from "./FilterSidebar.module.css";

const sortOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Popular",
];
type Props = {
  typeOptions: string[];
};

export function FilterSidebar(props: Props) {
  const { typeOptions } = props;
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
