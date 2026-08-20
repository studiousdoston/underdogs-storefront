import { Search, X } from "lucide-react";
import Drawer from "@mui/joy/Drawer";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import { useSearchModal } from "../../../context/SearchModalContext";
import styles from "./SearchModal.module.css";

const HEADER_HEIGHT = "48px";

export function SearchModal() {
  const { isOpenSearch, closeSearch } = useSearchModal();

  return (
    <Drawer
      anchor="top"
      open={isOpenSearch}
      onClose={closeSearch}
      slotProps={{
        content: {
          sx: {
            marginTop: HEADER_HEIGHT,
            height: "auto",
            maxHeight: "none",
          },
        },
        backdrop: {
          sx: {
            marginTop: HEADER_HEIGHT,
            backdropFilter: "none",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <div className={styles.panel}>
        <Search size={20} className={styles.searchIcon} />
        <Input
          placeholder="Search for..."
          variant="plain"
          size="lg"
          autoFocus
          className={styles.input}
          sx={{ textTransform: "none" }}
        />
        <IconButton variant="plain" size="sm" onClick={closeSearch}>
          <X size={22} />
        </IconButton>
      </div>
    </Drawer>
  );
}
