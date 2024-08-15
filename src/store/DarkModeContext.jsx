import { useState, createContext } from "react";

const DarkModeContext = createContext({
  mode: '',
  toggleDarkMode: () => {},
})

export function DarkModeContextProvider({children}) {
  const [mode, setMode] = useState('Dark Mode');

  function toggleDarkMode() {
    if (mode == 'Dark Mode') {
      setMode('Light Mode');
    } else {
      setMode('Dark Mode');
    }
  }

  const darkModeCtx = {
    mode: mode,
    toggleDarkMode,
  }

  return <DarkModeContext.Provider value={darkModeCtx}>{children}</DarkModeContext.Provider>
}

export default DarkModeContext;