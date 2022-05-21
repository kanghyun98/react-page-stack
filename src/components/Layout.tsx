import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterNav from './FooterNav';
import HeaderNav from './HeaderNav';

const Layout = () => {
  return (
    <>
      <header>
        <HeaderNav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterNav />
      </footer>
    </>
  );
};

export default Layout;
