import Typography from "@mui/joy/Typography";
import styles from "./FilterSidebar.module.css";

const sortOptions = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
  { label: "Popular", value: "popular" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

type Props = {
  typeOptions: string[];
  sort?: SortValue;
  category?: string;
  onSortChange?: (sort: SortValue) => void;
  onCategoryChange?: (category: string | undefined) => void;
};

export function FilterSidebar(props: Props) {
  const { typeOptions, sort, category, onSortChange, onCategoryChange } = props;

  return (
    <aside className={styles.sidebar}>
      <Typography level="title-md" className={styles.heading}>
        Sort By:
      </Typography>
      {sortOptions.map((option) => (
        <span
          key={option.value}
          className={`${styles.option} ${sort === option.value ? styles.active : ""}`}
          onClick={() => onSortChange?.(option.value)}
        >
          {option.label}
        </span>
      ))}

      <Typography level="title-md" className={styles.heading}>
        Product Type:
      </Typography>
      {typeOptions.map((option) => (
        <span
          key={option}
          className={`${styles.option} ${category === option ? styles.active : ""}`}
          onClick={() =>
            onCategoryChange?.(category === option ? undefined : option)
          }
        >
          {option}
        </span>
      ))}
    </aside>
  );
}
