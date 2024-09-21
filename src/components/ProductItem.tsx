import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import '../styles/ProductItem.css';

interface ProductItemProps {
  id: number;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  rate: number;
  inCart: boolean;
  addToCart: (id: number) => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  image,
  title,
  price,
  oldPrice,
  rate,
  isFavorite,
  toggleFavorite,
  addToCart
}) => {
  const [inCart, setInCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cart = sessionStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart) : [];
    if (cartItems.some((item: { id: number }) => item.id === id)) {
      setInCart(true);
    }
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateSessionStorage = (updatedCart: any[]) => {
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    let cart = sessionStorage.getItem('cart');
    let cartItems = cart ? JSON.parse(cart) : [];

    if (inCart) {
      cartItems = cartItems.filter((item: { id: number }) => item.id !== id);
      setInCart(false);
    } else {
      cartItems.push({
        id,
        title,
        price,
        oldPrice,
        image,
        quantity: 1
      });
      setInCart(true);
    }

    updateSessionStorage(cartItems);
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal();
  };

  return (
    <>
      <div className="product-item">
        <div className="product-image" onClick={handleProductClick}>
          <img src={image} alt={title} />
          <button
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          >
            ❤️
          </button>
        </div>
        <div className="product-info" onClick={handleProductClick}>
          <div className="product-top">
            <h3>{title}</h3>
            <div className="product-price">
              <span className="new-price">{price} ₽</span>
              {oldPrice > 0 && <span className="old-price">{oldPrice} ₽</span>}
            </div>
          </div>
          <div className="product-bottom">
            <div className="product-rate">
              <span className="star">★</span>
              <span>{rate}</span>
            </div>
            {inCart ? (
              <button
                className="in-cart"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(e);
                }}
              >
                Удалить
              </button>
            ) : (
              <button
                className="buy-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(e);
                }}
              >
                Купить
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img src={image} alt={title} style={{ width: '100%' }} />
          <h3>{title}</h3>
          <p>Характеристики</p>
          <p>Здесь будет текст с характеристиками продукта.</p>
          <button onClick={closeModal}>Закрыть</button>
        </Modal>
      )}
    </>
  );
};

export default ProductItem;
