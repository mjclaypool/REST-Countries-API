import { useContext } from "react";

import SearchBar from "./SearchBar"
import FilterBar from "./FilterBar"
import DarkModeContext from '../store/DarkModeContext';

export default function FilterSearch() {
  const darkModeCtx = useContext(DarkModeContext);

  return (
    <div
      id="search-filter-region"
      className={darkModeCtx.mode == 'Dark Mode' ?
        `flex flex-col justify-between h-[12vh] lg:flex-row lg:items-center lg:gap-8 py-5 px-8 md:px-16 lg:px-32
        bg-dark-theme-bg text-dark-theme-txt`
        :
        `flex flex-col justify-between h-[12vh] lg:flex-row lg:items-center lg:gap-8 py-5 px-8 md:px-16 lg:px-32
        bg-light-theme-bg text-light-theme-txt`}
    >
      <SearchBar />
      <FilterBar />
    </div>
  )
}