import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FilterContextProvider } from './store/FilterContext';
import { DarkModeContextProvider } from './store/DarkModeContext';
import RootLayout from './pages/Root';
import HomePage from './pages/HomePage';
import CountryDetails from './components/CountryDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/:country', element: <CountryDetails /> },
    ]
  }
])

function App() {
  return (
    <DarkModeContextProvider>
      <FilterContextProvider>
        <RouterProvider router={router} />
      </FilterContextProvider>
    </DarkModeContextProvider>
  )
}

export default App
