import { createContext } from "react";

interface FiltersContextType {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export const accessibilityLevels = ["available", "partial", "absent"];

export const FiltersContext = createContext<FiltersContextType>({
  filters: [],
  setFilters: () => {}, // A no-op function as a default
});
