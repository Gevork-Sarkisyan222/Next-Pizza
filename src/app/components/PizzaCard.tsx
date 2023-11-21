'use client';

import React, { useState, useEffect } from 'react';
import './pizza.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, removeCart } from '../redux/slices/cart.slice';
import { setCheckedTrue, setCheckedFalse } from '../redux/slices/checked.slice';
import { RootState } from '../redux/store';
import { RootStateTheme } from '../redux/slices/types/themeType';
import Image from 'next/image';
import PizzaInfo from './PizzaInfo';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobilePizzaInfo from './mobileInfo/MobilePizzaInfo';
import Button from '@mui/material/Button';
import { VariantType, useSnackbar } from 'notistack';

interface pizzaProps {
  id: number;
  image: string;
  title: string;
  price: number;
}

type ButtonNameType = 'тонкое' | 'традиционное' | '26 см.' | '30 см.' | '40 см.';

const PizzaCard: React.FC<pizzaProps> = ({ id, image, title, price }) => {
  // open modal of information about pizzas
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const checked = useSelector((state: RootState) => state.checked[id]);
  const theme = useSelector((state: RootStateTheme) => state.changeTheme.theme);

  const mobileQuery = useMediaQuery('(max-width:614px)');

  const [selectedButton, setSelectedButton] = useState<ButtonNameType | null>(null);
  const [selectedStyleOfPizza, setSelectedStyleOfPizza] = useState<ButtonNameType | null>(null);

  const handleButtonClick = (buttonName: ButtonNameType) => {
    setSelectedButton(buttonName);
  };

  const handleButtonClickOfStyle = (buttonName: ButtonNameType) => {
    setSelectedStyleOfPizza(buttonName);
  };

  const handleAddToCart = () => {
    const items = {
      id,
      image,
      title,
      price,
    };
    dispatch(addCart(items));
    dispatch(setCheckedTrue({ id }));
  };

  const removeFromCart = () => {
    dispatch(setCheckedFalse({ id }));
    dispatch(removeCart(id));

    localStorage.removeItem('checked');
  };

  // not used ================= ()
  // const handleChecked = () => {
  //   dispatch(setChecked({ id, value: !checked }));
  //   console.log(checked);
  // };
  // =========================

  useEffect(() => {
    const checkedJson = JSON.stringify(checked);
    localStorage.setItem(`checked_${id}`, checkedJson);
    // console.log(checkedJson);
  }, [checked, id]);

  const [openInfoPizza, setOpenInfoPizza] = useState(false);
  const [openInfoMobile, setOpenInfoMobile] = useState(false);

  const handleOpenPizzasInfo = () => {
    setOpenInfoPizza(true);
    setOpen(true);
  };
  const handleClosePizzasInfo = () => {
    setOpenInfoPizza(false);
  };

  const handleOpenPizzasInfoForMobile = () => {
    setOpenInfoMobile(true);
  };

  // its for moble component
  const handleClosePizzasInfoForMobile = () => {
    setOpenInfoMobile(false);
  };

  // SNACKBAR
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariantAdd = (variant: VariantType) => () => {
    if (variant === 'success') {
      enqueueSnackbar('Товар добавлен в корзину', {
        variant,
        style: { backgroundColor: '#ef5b24' },
      });
    } else {
      enqueueSnackbar('Товар добавлен в корзину', { variant });
    }
  };
  const handleClickVariantRemove = (variant: VariantType) => () => {
    if (variant === 'error') {
      enqueueSnackbar('Товар удален из корзины', {
        variant,
        style: { backgroundColor: '#992900' },
      });
    } else {
      enqueueSnackbar('Товар удален из корзины', { variant });
    }
  };

  return (
    <>
      {openInfoPizza && (
        <PizzaInfo
          title={title}
          image={image}
          price={price}
          open={open}
          handleClosePizzasInfo={handleClosePizzasInfo}
        />
      )}
      {openInfoMobile && (
        <MobilePizzaInfo
          openInfoMobile={openInfoMobile}
          handleClosePizzasInfoForMobile={handleClosePizzasInfoForMobile}
          title={title}
          image={image}
          price={price}
        />
      )}
      <div className="PizzaCard">
        <div className="pizza-img-title">
          <Image
            onClick={mobileQuery ? handleOpenPizzasInfoForMobile : handleOpenPizzasInfo}
            width={260}
            height={260}
            src={image}
            alt="pizza"
          />
          <h1 className={`${theme ? 'title-for-dark' : ''}`}>{title}</h1>
        </div>
        <div className={`select-size ${theme ? 'select-dark-size' : ''}`}>
          <button
            className={selectedButton === 'тонкое' ? 'selected-size-black' : ''}
            onClick={() => handleButtonClick('тонкое')}>
            тонкое
          </button>
          <button
            className={selectedButton === 'традиционное' ? 'selected-size-black' : ''}
            onClick={() => handleButtonClick('традиционное')}>
            традиционное
          </button>
          <button
            className={selectedStyleOfPizza === '26 см.' ? 'selected-size-black' : ''}
            onClick={() => handleButtonClickOfStyle('26 см.')}>
            26 см.
          </button>
          <button
            className={selectedStyleOfPizza === '30 см.' ? 'selected-size-black' : ''}
            onClick={() => handleButtonClickOfStyle('30 см.')}>
            30 см.
          </button>
          <button
            className={selectedStyleOfPizza === '40 см.' ? 'selected-size-black' : ''}
            onClick={() => handleButtonClickOfStyle('40 см.')}>
            40 см.
          </button>
        </div>
        <div className="price-button">
          <h1 className={`${theme ? 'price-dark' : ''}`}>от {price} ₽</h1>

          <button>
            {checked ? (
              <section onClick={removeFromCart}>
                <div onClickCapture={handleClickVariantRemove('error')} className="button-content">
                  <Image
                    width={100}
                    height={100}
                    src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/checkmark.png"
                    alt="checkmark"
                  />
                  <span>Добавлено</span>
                </div>
              </section>
            ) : (
              <section onClickCapture={handleClickVariantAdd('success')} onClick={handleAddToCart}>
                <div className="button-content">
                  <Image
                    width={100}
                    height={100}
                    src="https://img.icons8.com/ios-filled/50/FFFFFF/plus-math.png"
                    alt="plus-math"
                  />
                  <span>Добавить</span>
                </div>
              </section>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default PizzaCard;
