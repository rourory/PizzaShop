import React from 'react';
import Header from '../../components/header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
