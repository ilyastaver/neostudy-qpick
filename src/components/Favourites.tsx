import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import BottomHeader from './BottomHeader';

const Favourites: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);


  useEffect(() => {
    updateFavoriteProducts();
  }, []);

  const updateFavoriteProducts = () => {
    const storedFavorites = sessionStorage.getItem('favorites');
    if (storedFavorites) {
      setFavoriteProducts(JSON.parse(storedFavorites));
    }
  };

  return (
    <div className="main-page">
      <div className="category">
        <h2>Избранное</h2>
        {favoriteProducts.length > 0 ? (
          <ProductList products={favoriteProducts} onFavoritesUpdate={updateFavoriteProducts} />
        ) : (
          <p>У вас пока нет избранных товаров.</p>
        )}
      </div>
      <BottomHeader />
    </div>
  );
};

export default Favourites;
