import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Cart from '../../pages/Cart';
import FullPizzaInfo from '../../pages/FullPizzaInfo';
import MainLayout from '../../layouts/MainLayout';

const Content: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path=":id" element={<FullPizzaInfo />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Content;
