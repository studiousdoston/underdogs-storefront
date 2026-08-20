import { createContext, useContext, useState, type ReactNode } from "react";

type SearchModalContextType = {
  isOpenSearch: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchModalContext = createContext<SearchModalContextType | undefined>(
  undefined,
);

export function SearchModalProvider({ children }: { children: ReactNode }) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <SearchModalContext.Provider
      value={{
        isOpenSearch,
        openSearch: () => setIsOpenSearch(true),
        closeSearch: () => setIsOpenSearch(false),
      }}
    >
      {children}
    </SearchModalContext.Provider>
  );
}

export function useSearchModal() {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error("useSearchModal must be used within SearchModalProvider");
  }
  return context;
}
