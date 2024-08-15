import { Outlet, ScrollRestoration } from 'react-router-dom';

import Header from "../components/Header";

function RootLayout() {
  return (
    <>
      <Header/>
      <main>
        <ScrollRestoration />
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout;