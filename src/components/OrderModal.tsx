import React, { useEffect, useState } from 'react';
import '../styles/OrderModal.css';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

interface OrderModalProps {
    cartItems: CartItem[];
    totalPrice: number;
    onClose: () => void;
    clearCart: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ cartItems, totalPrice, onClose, clearCart }) => {
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
    const [selectedPayment, setSelectedPayment] = useState<'cash' | 'card' | null>(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const [address, setAddress] = useState('');

    const handlePlaceOrder = () => {
        const randomOrderNumber = Math.floor(1000 + Math.random() * 9000).toString();
        setOrderNumber(randomOrderNumber);
        setOrderPlaced(true);
        clearCart();
        sessionStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handlePaymentSelect = (method: 'cash' | 'card') => {
        setSelectedPayment(method);
    };

    const handleDeliveryMethodChange = (method: 'pickup' | 'delivery') => {
        setDeliveryMethod(method);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                {!orderPlaced ? (
                    <>
                        <h3>Состав заказа</h3>
                        <ul className="order-summary-list">
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                    {item.title} x{item.quantity}
                                </li>
                            ))}
                        </ul>
                        <div className="order-total">
                            <p>Итого: {totalPrice.toLocaleString()} ₽</p>
                        </div>
                        <hr />

                        <h4>Способ доставки</h4>
                        <div className="delivery-method-buttons">
                            <button
                                className={deliveryMethod === 'pickup' ? 'active' : ''}
                                onClick={() => handleDeliveryMethodChange('pickup')}
                            >
                                Самовывоз
                            </button>
                            <button
                                className={deliveryMethod === 'delivery' ? 'active' : ''}
                                onClick={() => handleDeliveryMethodChange('delivery')}
                            >
                                Доставка
                            </button>
                        </div>

                        {deliveryMethod === 'delivery' && (
                            <>
                                <h4>Адрес доставки</h4>
                                <div className="delivery-address-section">
                                    <div className="personal-info-section">
                                        <input type="text" placeholder="Город" />
                                        <input type="text" placeholder="Улица" />
                                        <input type="text" placeholder="Дом, квартира" />
                                    </div>
                                </div>
                                <h4>Способ оплаты</h4>
                                <div className="payment-method-buttons">
                                    <button
                                        className={selectedPayment === 'cash' ? 'active' : ''}
                                        onClick={() => handlePaymentSelect('cash')}
                                    >
                                        Наличные
                                    </button>
                                    <button
                                        className={selectedPayment === 'card' ? 'active' : ''}
                                        onClick={() => handlePaymentSelect('card')}
                                    >
                                        Карта
                                    </button>
                                </div>
                            </>
                        )}

                        <div className="personal-info-section">
                            <h4>Личные данные</h4>
                            <input type="text" placeholder="Имя" />
                            <input type="text" placeholder="Фамилия" />
                            <input type="text" placeholder="Номер телефона" />
                        </div>

                        <button className="place-order-button" onClick={handlePlaceOrder}>
                            Оформить заказ
                        </button>
                    </>
                ) : (
                    <div className="order-success">
                        <h3>Заказ оформлен!</h3>
                        <p>Ваш номер заказа: {orderNumber}</p>
                        <button onClick={onClose}>Закрыть</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderModal;
