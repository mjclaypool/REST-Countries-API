import { useContext } from 'react';
import CountryCard from './CountryCard'
import FilterContext from '../store/FilterContext';
import DarkModeContext from '../store/DarkModeContext';

export default function Countries() {
  const filterCtx = useContext(FilterContext);
  const darkModeCtx = useContext(DarkModeContext);

  return (
    <div
      id="countries-section-background"
      className={darkModeCtx.mode == 'Dark Mode' ?
        `h-[80vh] w-full px-8 md:px-16 lg:px-32 bg-dark-theme-bg text-dark-theme-txt`
        :
        `h-[80vh] w-full px-8 md:px-16 lg:px-32 bg-light-theme-bg text-light-theme-txt`
      }
    >
      <div
        id="countries-section"
        className={darkModeCtx.mode == 'Dark Mode' ?
          `flex flex-col lg:flex-row lg:flex-wrap items-center justify-between gap-16
          bg-dark-theme-bg text-dark-theme-txt`
          :
          `flex flex-col lg:flex-row lg:flex-wrap items-center justify-between gap-16
          bg-light-theme-bg text-light-theme-txt`
        }
      >
        {filterCtx.visibleData.map(country => (
          <CountryCard
            key={country.name.common}
            country={country}
          />
        ))}
      </div>
    </div>
  )
}