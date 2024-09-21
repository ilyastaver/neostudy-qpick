import React, { useState } from 'react';
import OrderModal from './OrderModal';
import '../styles/OrderItems.css';

interface OrderItemsProps {
  totalPrice: number;
  cartItems: { id: number; title: string; price: number; quantity: number }[];
  onCheckout: () => void;
  clearCart: () => void;
}

const OrderItems: React.FC<OrderItemsProps> = ({ totalPrice, cartItems, onCheckout, clearCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
    onCheckout();
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="order-items">
      <div className="order-summary">
        <span className="order-total-label">ИТОГО</span>
        <span className="order-total-price">{totalPrice.toLocaleString()} ₽</span>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Перейти к оформлению
      </button>

      {isModalOpen && (
        <OrderModal
          totalPrice={totalPrice}
          cartItems={cartItems}
          onClose={handleCloseModal}
          clearCart={clearCart}
        />
      )}
    </div>
  );
};

export default OrderItems;
