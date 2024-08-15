import { useContext } from 'react';
import FilterContext from '../store/FilterContext';
import DarkModeContext from '../store/DarkModeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function FilterBar() {
  const filterCtx = useContext(FilterContext);
  const darkModeCtx = useContext(DarkModeContext);

  function handleChange(e) {
    filterCtx.filterRegion(e.target.value);
  }

  return (
    <div
      id="filter-bar"
      aria-label="Filter bar element"
      className={darkModeCtx.mode == 'Dark Mode' ?
        `relative h-[50px] w-[200px] rounded-md shadow-md
        bg-dark-theme-elem text-dark-theme-txt`
        :
        `relative h-[50px] w-[200px] rounded-md shadow-md
        bg-light-theme-elem text-light-theme-txt`
      }
    >
      <form className="w-full h-full">
          <select
            name="filter-regions"
            aria-label="Filter bar dropdown"
            onChange={handleChange}
            value={filterCtx.activeRegion}
            id="filter-regions"
            className={darkModeCtx.mode == 'Dark Mode' ?
              `font-nunito text-base w-full h-full border-none rounded-md cursor-pointer appearance-none px-5
              bg-dark-theme-elem text-dark-theme-txt`
              :
              `font-nunito text-base w-full h-full border-none rounded-md cursor-pointer appearance-none px-5
              bg-light-theme-elem text-light-theme-txt`
            }
          >
            <optgroup className="font-nunito text-base">
              <option className="hidden" value="">Filter by Region</option>
              <option value="Africa" aria-label="Africa option">Africa</option>
              <option value="Americas" aria-label="Americas option">America</option>
              <option value="Asia" aria-label="Asia option">Asia</option>
              <option value="Europe" aria-label="Europe option">Europe</option>
              <option value="Oceania" aria-label="Oceania option">Oceania</option>
            </optgroup>
          </select>
      </form>
      <FontAwesomeIcon
        id="filter-bar-icon"
        className="absolute top-1/3 right-5 pointer-events-none"
        icon={faAngleDown}
        alt="Down caret icon, angle down from FontAwesome"
      />
    </div>
  )
}