'use client';

import React from 'react';
import './cart.scss';
import AppBar from '../components/AppBar';
import CartCard from './CartCard';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/slices/types/cartType';
import { pizzas } from '../redux/slices/cart.slice';
import { clearCart } from '../redux/slices/cart.slice';
import { clearAllChecked } from '../redux/slices/checked.slice';

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const deliverNumber = Math.floor(Math.random() * 100);

  const handleClearCart = () => {
    const clearConfirm = window.confirm('Вы действительно хотите очистить корзину?');

    if (clearConfirm) {
      dispatch(clearCart());
      dispatch(clearAllChecked());
    }
  };

  const handleBuyPizzas = () => {
    alert('ПОЗДРАВЛЯЕМ! ВЫ ПРИОБРЕЛИ НАШИ ПИЦЦЫ');
    alert(`МЫ ПЕРЕДАЛИ ВАШ ЗАКАЗ ПОД НОМЕРОМ ${deliverNumber} КУРЬЕРСКОЙ СЛУЖБЕ`);

    dispatch(clearCart());
    dispatch(clearAllChecked());
  };

  const renderCart = () => {
    if (cart.length === 0) {
      return (
        <div className="Empty-Cart-Wrapper">
          <div className="empty-container">
            <h1>Корзина пустая 😕</h1>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди
              на главную страницу.
            </p>
            <div className="img-and-button">
              <img
                src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png"
                alt="empty-cart"
              />
              <Link href={'/'}>
                <button>Вернуться назад</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="cart-container">
          <h1 className="title-cart">Корзина</h1>
          {/* <img
            className="clear-icon"
            src="https://s1.iconbird.com/ico/0612/GooglePlusInterfaceIcons/w128h1281338911651trashcan.png"
            alt=""
          /> */}
          <h3 onClick={handleClearCart}>🗑️Очистить корзину</h3>
          <div className="line-for-cart"></div>
        </div>
        <div className="d-flex">
          <div className="cart-pizza-container">
            {cart.map((obj: pizzas) => (
              <CartCard
                key={obj.id}
                title={obj.title}
                image={obj.image}
                price={obj.price}
                id={obj.id}
              />
            ))}
          </div>
        </div>
        <div className="card-down-text">
          <h2 className="first-count-text ">Всего пицц: {cart.length} шт.</h2>
          <h2 className="finally-price-text">
            Сумма заказа: <span>900 ₽</span>
          </h2>
        </div>
        <div className="card-down-buttons">
          <Link href={'/'}>
            <button className="go-back-button">Вернуться назад</button>
          </Link>
          <button onClick={handleBuyPizzas} className="pay-now-button">
            Оплатить сейчас
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="Cart-Main">
      <div className="cart-wrapper">
        <AppBar />
        {renderCart()}
      </div>
    </div>
  );
};

export default Cart;
