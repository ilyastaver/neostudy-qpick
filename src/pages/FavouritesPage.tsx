import React from 'react';
import Header from '../components/Header';
import '../styles/CartPage.css';
import Favourites from '../components/Favourites';

const FavouritesPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="cart-page">
        <Favourites />
      </div>
    </div>
  );
};

export default FavouritesPage;