import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import '../styles/ProductList.css';

interface Product {
  id: number;
  img: string;
  title: string;
  price: number;
  oldPrice: number;
  rate: number;
}

interface ProductListProps {
  products: Product[];
  onFavoritesUpdate?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onFavoritesUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<string>('');
  const [animating, setAnimating] = useState(false);
  const [inCart, setInCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const itemsPerPage = 6;

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites).map((item: Product) => item.id));
    }
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setDirection('right');
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + itemsPerPage);
        setAnimating(false);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('left');
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - itemsPerPage);
        setAnimating(false);
      }, 500);
    }
  };

  const addToCart = (id: number) => {
    setInCart([...inCart, id]);
  };

  const toggleFavorite = (product: Product) => {
    let favorites = sessionStorage.getItem('favorites');
    let favoriteItems = favorites ? JSON.parse(favorites) : [];

    if (favoriteItems.some((item: Product) => item.id === product.id)) {
      favoriteItems = favoriteItems.filter((item: Product) => item.id !== product.id);
    } else {
      favoriteItems.push(product);
    }

    sessionStorage.setItem('favorites', JSON.stringify(favoriteItems));
    setFavorites(favoriteItems.map((item: Product) => item.id));

    if (onFavoritesUpdate) {
      onFavoritesUpdate();
    }

    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const displayedProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="product-list-container">
      <button className="arrow-left" onClick={handlePrev} disabled={currentIndex === 0}>
        &lt;
      </button>
      <div className={`product-list ${animating ? (direction === 'right' ? 'animating-left' : 'animating-right') : ''}`}>
        {displayedProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            image={product.img}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            rate={product.rate}
            inCart={inCart.includes(product.id)}
            addToCart={addToCart}
            isFavorite={favorites.includes(product.id)}
            toggleFavorite={() => toggleFavorite(product)}
          />
        ))}
      </div>
      <button className="arrow-right" onClick={handleNext} disabled={currentIndex + itemsPerPage >= products.length}>
        &gt;
      </button>
    </div>
  );
};

export default ProductList;
