// src/pages/CartPage.tsx
import React from 'react';
import Header from '../components/Header';
import '../styles/CartPage.css';
import Cart from '../components/Cart';

const CartPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="cart-page">
        <Cart />
      </div>
    </div>
  );
};

export default CartPage;
