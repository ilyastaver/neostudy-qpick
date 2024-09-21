import React from 'react';
import '../styles/CartItem.css';

interface CartItemProps {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, image, title, price, quantity, onRemove, onUpdateQuantity }) => {

  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    } else {
      onRemove(id);
    }
  };

  const validPrice = !isNaN(price) && price > 0 ? price : 0;
  const totalPrice = validPrice * quantity;

  return (
      <div className="cart-item">
          <div className="cart-item-image">
              <img src={image} alt={title} />
              <div className="quantity-controls">
                  <button onClick={handleDecrease}>-</button>
                  <span>{quantity}</span>
                  <button onClick={handleIncrease}>+</button>
              </div>
          </div>
          <div className="cart-item-info">
              <h3>{title}</h3>
              <p>{validPrice} ₽ за штуку</p>
          </div>
          <div className="cart-item-actions">
              <div className="total-price">
                  {totalPrice.toFixed(2)} ₽
              </div>
          </div>
          <button onClick={() => onRemove(id)} className="remove-button">🗑</button>
      </div>
  );
};

export default CartItem;
