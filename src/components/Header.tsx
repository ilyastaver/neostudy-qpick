import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const updateCartCount = () => {
    const storedCart = sessionStorage.getItem('cart');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    setCartItemCount(cartItems.length);
  };

  const updateFavoritesCount = () => {
    const storedFavorites = sessionStorage.getItem('favorites');
    const favoriteItems = storedFavorites ? JSON.parse(storedFavorites) : [];
    setFavoritesCount(favoriteItems.length);
  };

  useEffect(() => {
    console.log('Favorites count updated:', favoritesCount);
  }, [favoritesCount]);

  useEffect(() => {
    updateCartCount();
    updateFavoritesCount();

    const handleCartUpdated = () => {
      updateCartCount();
    };

    const handleFavoritesUpdated = () => {
      updateFavoritesCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdated);
    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          QPICK
        </Link>
        <div className="icons">
          <div className="icon-container">
            <Link to="/favourites">
              <img src="/images/heart.png" alt="Favorites" className="icon" />
              {favoritesCount > 0 && (
                <div className="favorites-count">
                  {favoritesCount}
                </div>
              )}
            </Link>
          </div>

          <div className="icon-container">
            <Link to="/cart" className="cart-container">
              <img src="/images/cart.png" alt="Cart" className="icon" />
              {cartItemCount > 0 && (
                <div className="cart-count">
                  {cartItemCount}
                </div>
              )}
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
