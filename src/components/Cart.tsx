import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import OrderItems from './OrderItems';
import BottomHeader from './BottomHeader';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedItems = sessionStorage.getItem('cart');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const handleRemove = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    sessionStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    console.log('Начинаем оформление заказа');
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Корзина</h1>
      <div className="cart-content">
        <div className="cart-items-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))
          ) : (
            <p>Корзина пуста</p>
          )}
        </div>
        <div className="order-summary-container">
          <OrderItems
            totalPrice={totalPrice}
            cartItems={cartItems}
            onCheckout={handleCheckout}
            clearCart={clearCart}
          />
        </div>
      </div>
      <BottomHeader />
    </div>
  );
};

export default Cart;
