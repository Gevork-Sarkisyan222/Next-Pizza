'use client';

import React, { useState } from 'react';
import './cart.scss';
import AppBar from '../components/AppBar';
import CartCard from './CartCard';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/slices/types/cartType';
import { pizzas } from '../redux/slices/cart.slice';
import { clearCart } from '../redux/slices/cart.slice';
import { clearAllChecked } from '../redux/slices/checked.slice';
import Image from 'next/image';
import { setChangeThemeLight } from '../redux/slices/changeTheme.slice';
import { RootStateTheme } from '../redux/slices/types/themeType';
import { RootStateMenu } from '../redux/slices/types/menuType';

// snackbar imports
import Snackbar from '@mui/joy/Snackbar';
import Stack from '@mui/joy/Stack';
import ButtonJoy from '@mui/joy/Button';
import TypographyJoy from '@mui/joy/Typography';

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const openMenu = useSelector((state: RootStateMenu) => state.openMenu.openMenu);
  const theme = useSelector((state: RootStateTheme) => state.changeTheme.theme);
  const dispatch = useDispatch();
  const deliverNumber = Math.floor(Math.random() * 100);

  const handleClearCart = () => {
    const clearConfirm = window.confirm('Вы действительно хотите очистить корзину?');

    if (clearConfirm) {
      dispatch(clearCart());
      dispatch(clearAllChecked());
    }
  };

  const handleChangeThemeToLightInCart = () => {
    const bodyFind = document.querySelector('body');
    if (bodyFind) {
      bodyFind.style.backgroundImage =
        'url("https://img.freepik.com/premium-vector/seamless-pattern-with-classical-italian-foods_80590-1174.jpg?w=740")';
    }
    dispatch(setChangeThemeLight());
  };

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleCartCardPriceChange = (newPrice: number) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + newPrice);
  };

  // snackbars
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [successfullBuy, setSuccessfullBuy] = useState(false);
  const [content, setContent] = useState(true);

  const handleBuyPizzasOpenFirstStep = () => {
    setOpenSnackBar(true);
  };

  const agreeToOpenBuy = () => {
    setContent(false);
    setSuccessfullBuy(true);

    // buy pizzas clear cart and checked
    setTimeout(() => {
      dispatch(clearCart());
      dispatch(clearAllChecked());
    }, 2000);
  };

  const renderCart = (
    totalPrice: number,
    handleCartCardPriceChange: (newPrice: number) => void,
  ) => {
    if (cart.length === 0) {
      return (
        <>
          {openMenu && <div className="black-bg"></div>}
          <div className="Empty-Cart-Wrapper">
            <div className="empty-container">
              <h1 className={`${theme ? 'empty-cart-text-dark' : ''}`}>Корзина пустая 😕</h1>
              <p>
                Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди
                на главную страницу.
              </p>
              <div className="img-and-button">
                <Image
                  width={550}
                  height={450}
                  className="empty-cart-icon"
                  src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png"
                  alt="empty-cart"
                />
                <Link onClick={handleChangeThemeToLightInCart} href={'/'}>
                  <button className="back-button-pc">Вернуться назад</button>
                </Link>
                <Link href={'/'}>
                  <button className="back-button-mobile">Вернуться назад</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <Snackbar
          autoHideDuration={500000}
          variant="solid"
          color="primary"
          size="lg"
          invertedColors
          open={openSnackBar}
          onClose={() => setOpenSnackBar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={(theme) => ({
            background: '#ef5b24',
            maxWidth: 360,
          })}>
          <div>
            <TypographyJoy level="title-lg">Next Pizza:</TypographyJoy>
            {content && (
              <TypographyJoy sx={{ mt: 1, mb: 2, color: 'white' }}>
                Вы действительно хотите купить нашы пиццы?
              </TypographyJoy>
            )}

            {successfullBuy && (
              <TypographyJoy sx={{ mt: 1, mb: 2, color: 'white' }}>
                ПОЗДРАВЛЯЕМ! Вы приобрели наши пиццы мы передали ваш заказ под номером{' '}
                <span style={{ fontWeight: 900, color: 'white' }}>{deliverNumber}</span> курьерской
                службе
              </TypographyJoy>
            )}

            <Stack direction="row" spacing={1}>
              {content && (
                <ButtonJoy onClick={agreeToOpenBuy} variant="solid" sx={{ color: 'black' }}>
                  Да
                </ButtonJoy>
              )}
              {content && (
                <ButtonJoy
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpenSnackBar(false)}>
                  Нет
                </ButtonJoy>
              )}
            </Stack>
          </div>
        </Snackbar>

        {openMenu && <div className="black-bg"></div>}
        <div className="cart-container">
          <div className="mobile-cart-content">
            <h1>Корзина товаров</h1>
            <h2 onClick={handleClearCart}>🗑️Очистить</h2>
          </div>
          <h1 className={`title-cart ${theme ? 'title-cart-dark' : ''}`}>Корзина</h1>
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
                onPriceChange={handleCartCardPriceChange}
              />
            ))}
          </div>
        </div>
        <div className="card-down-text">
          <h2 className={`first-count-text ${theme ? 'count-text-dark ' : ''}`}>
            Всего видов: {cart.length} шт.
          </h2>
          <h2 className={`finally-price-text ${theme ? 'finally-price-text-dark' : ''}`}>
            Сумма заказа: <span>{totalPrice} ₽</span>
          </h2>
        </div>
        <div className="card-down-buttons">
          <Link href={'/'}>
            <button className="go-back-button">Вернуться назад</button>
          </Link>
          <button onClick={handleBuyPizzasOpenFirstStep} className="pay-now-button">
            Оплатить сейчас
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="Cart-Main">
      <div className={`cart-wrapper ${theme ? 'changed-theme-cart-bg' : ''}`}>
        <AppBar />
        {renderCart(totalPrice, handleCartCardPriceChange)}
      </div>
    </div>
  );
};

export default Cart;
