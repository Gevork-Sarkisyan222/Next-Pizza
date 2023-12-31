'use client';

import React, { useState } from 'react';
import './cartCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart } from '../redux/slices/cart.slice';
import { setCheckedFalse } from '../redux/slices/checked.slice';
import Image from 'next/image';
import { RootStateTheme } from '../redux/slices/types/themeType';

interface Iprops {
  id: number;
  title: string;
  image: string;
  price: number;
  onPriceChange: (newPrice: number) => void;
}

const CartCard: React.FC<Iprops> = ({ id, title, image, price, onPriceChange }) => {
  const dispatch = useDispatch();
  const [pizzaCount, setPizzaCount] = useState(1);
  const theme = useSelector((state: RootStateTheme) => state.changeTheme.theme);

  const setPizzaCountPlus = () => {
    setPizzaCount(pizzaCount + 1);
    onPriceChange(price);
  };

  const setPizzaCountMinus = () => {
    if (pizzaCount > 1) {
      setPizzaCount(pizzaCount - 1);
      onPriceChange(-price);
    }
  };
  const removeFromCart = () => {
    const confirmed = window.confirm('Вы действительно хотите удалить этот товар с корзины?');

    if (confirmed) {
      dispatch(removeCart(id));
      dispatch(setCheckedFalse({ id }));
    }
  };

  const totalPrice = price * pizzaCount;

  return (
    <div className="Cart-Card">
      <div className="cart-card-content">
        <div className="prop-container">
          <Image width={500} height={500} src={image} alt="pizzas-image" />
          <h1 className={`${theme ? 'cart-card-title-dark' : ''}`}>{title}</h1>
          {/* <p>тонкое тесто, 26 см.</p> */}
        </div>

        <div className="icons">
          <Image
            width={100}
            height={100}
            onClick={setPizzaCountMinus}
            src="data:image/png;base64,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"
            alt="minus"
          />
          <h2 className={`number-count ${theme ? 'count-dark' : ''}`}>{pizzaCount}</h2>
          <Image
            width={100}
            height={100}
            onClick={setPizzaCountPlus}
            src="data:image/png;base64,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"
            alt="plus"
          />
        </div>
        <div className="money-text">
          <h2 className={`${theme ? 'price-text-dark' : ''}`}>{totalPrice} ₽</h2>
        </div>
        <div className="remove-icon" onClick={removeFromCart}>
          <Image
            width={100}
            height={100}
            src="data:image/png;base64,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"
            alt="remvoe icon"
          />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
