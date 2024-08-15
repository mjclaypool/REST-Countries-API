import { useContext } from 'react';
import FilterContext from '../store/FilterContext';
import DarkModeContext from '../store/DarkModeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar() {
  const filterCtx = useContext(FilterContext);
  const darkModeCtx = useContext(DarkModeContext);

  function handleChange(e) {
    filterCtx.searchCountries(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      id="search-bar"
      className={darkModeCtx.mode == 'Dark Mode' ?
        `flex h-[50px] w-[100%] lg:w-[600px] rounded-md shadow-md
        bg-dark-theme-elem text-dark-theme-txt`
        :
        `flex h-[50px] w-[100%] lg:w-[600px] rounded-md shadow-md
        bg-light-theme-elem text-light-theme-txt`
      }
    >
      <FontAwesomeIcon
        id="search-bar-icon"
        className="my-auto px-5"
        icon={faMagnifyingGlass}
      />
      <form className="flex w-full h-full" onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={handleChange}
          value={filterCtx.activeSearch}
          placeholder='Search for a country...'
          autoComplete='off'
          id="search-bar-input"
          className={darkModeCtx.mode == 'Dark Mode' ?
            `font-nunito text-base border-none rounded-md w-full
            bg-dark-theme-elem text-dark-theme-txt`
            :
            `font-nunito text-base border-none rounded-md w-full
            bg-light-theme-elem text-light-theme-txt`
          }
        />
      </form>
    </div>
  )
}