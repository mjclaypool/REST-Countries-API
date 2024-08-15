import { useContext } from 'react';
import DarkModeContext from '../store/DarkModeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  const darkModeCtx = useContext(DarkModeContext);

  function handleClick() {
    darkModeCtx.toggleDarkMode();
  }

  return (
    <div
      id='header-section'
      className={darkModeCtx.mode == 'Dark Mode' ?
        `flex items-center justify-between gap-8 h-[8vh] px-8 md:px-16 lg:px-32
        bg-dark-theme-elem text-dark-theme-txt`
        :
        `flex items-center justify-between gap-8 h-[8vh] px-8 md:px-16 lg:px-32
        bg-light-theme-elem text-light-theme-txt`
      }
    >
      <h1 className="font-nunito text-3xl">
        Where in the world?
      </h1>
      <button
        type="button"
        onClick={handleClick}
        id="mode-button"
        className={darkModeCtx.mode == 'Dark Mode' ?
          `font-nunito text-lg p-1 cursor-pointer border-none
          bg-dark-theme-elem text-dark-theme-txt`
          :
          `font-nunito text-lg p-1 cursor-pointer border-none
          bg-light-theme-elem text-light-theme-txt`
        }
      >
        <FontAwesomeIcon icon={faMoon} id="mode-icon" className="pr-2" />
        {darkModeCtx.mode}
      </button>
    </div>
  )
}