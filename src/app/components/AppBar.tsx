'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/slices/types/type';
import { setValue } from '../redux/slices/value.slice';
import { setInputValue, setInputValueDefalut } from '../redux/slices/InputState.slice';
import Link from 'next/link';
import { Category } from '../page';
import Image from 'next/image';
import { setOpenMenu, setCloseMenu } from '../redux/slices/openMenu.slice';
import {
  setChangeTheme,
  setChangeThemeLight,
  setChangeThemeDark,
} from '../redux/slices/changeTheme.slice';

// theme icons
import SunIcon from '@mui/icons-material/WbSunny';
import MoonIcon from '@mui/icons-material/DarkMode';
import { CSSTransition } from 'react-transition-group';

interface AppBarProps {
  setOpenMeatPizza?: (value: boolean) => void;
  setOpenVeganPizza?: (value: boolean) => void;
  setOpenGrillPizza?: (value: boolean) => void;
  setOpenSpicyPizza?: (value: boolean) => void;
  setOpenCheesePizza?: (value: boolean) => void;
  setDefaultCardRender?: (value: boolean) => void;
  setOpenCheapPizzas?: (value: boolean) => void;
  setOpenExpenisvePizzas?: (value: boolean) => void;
}

const AppBar: React.FC<AppBarProps> = ({
  setOpenMeatPizza,
  setOpenVeganPizza,
  setOpenGrillPizza,
  setOpenSpicyPizza,
  setOpenCheesePizza,
  setDefaultCardRender,
  setOpenCheapPizzas,
  setOpenExpenisvePizzas,
}) => {
  const value = useSelector((state: RootState) => state.value.value);
  const inputState = useSelector((state: any) => state.inputState.inputState);
  const openMenu = useSelector((state: any) => state.openMenu.openMenu);
  const [isScrollHidden, setIsScrollHidden] = useState(false);

  // themes change
  const [changeColors, setChangeColors] = useState(false);
  const [changeBackgroundImageTheme, setChangeBackgroundImageTheme] = useState(false);
  const theme = useSelector((state: any) => state.changeTheme.theme);
  // ===================================================

  const handleOpenMobileMenu = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    document.body.style.overflow = 'hidden';
    setIsScrollHidden(true);
    dispatch(setOpenMenu());
  };

  const handleCloseMobileMenu = () => {
    document.body.style.overflow = 'auto';
    setIsScrollHidden(false);
    dispatch(setCloseMenu());
  };

  const dispatch = useDispatch();

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(event.target.value));
  };

  const handleOpenCheapPizzas = () => {
    // category items
    if (setOpenMeatPizza) setOpenMeatPizza(false);
    if (setOpenVeganPizza) setOpenVeganPizza(false);
    if (setOpenGrillPizza) setOpenGrillPizza(false);
    if (setOpenSpicyPizza) setOpenSpicyPizza(false);
    if (setOpenCheesePizza) setOpenCheesePizza(false);
    if (setDefaultCardRender) setDefaultCardRender(false);
    if (setOpenCheapPizzas) setOpenCheapPizzas(true);
    if (setOpenExpenisvePizzas) setOpenExpenisvePizzas(false);

    dispatch(setInputValue());

    // close menu
    dispatch(setCloseMenu());
    document.body.style.overflow = 'auto';
    setIsScrollHidden(false);
  };

  const handleOpenExpenisvePizzas = () => {
    // category items
    if (setOpenMeatPizza) setOpenMeatPizza(false);
    if (setOpenVeganPizza) setOpenVeganPizza(false);
    if (setOpenGrillPizza) setOpenGrillPizza(false);
    if (setOpenSpicyPizza) setOpenSpicyPizza(false);
    if (setOpenCheesePizza) setOpenCheesePizza(false);
    if (setDefaultCardRender) setDefaultCardRender(false);
    if (setOpenExpenisvePizzas) setOpenExpenisvePizzas(true);
    if (setOpenCheapPizzas) setOpenCheapPizzas(false);

    dispatch(setInputValue());

    // close menu
    dispatch(setCloseMenu());
    document.body.style.overflow = 'auto';
    setIsScrollHidden(false);
  };

  const handleChangeTheme = () => {
    dispatch(setChangeTheme());
    setChangeColors((prev) => !prev);

    document.querySelectorAll('h1').forEach((h1) => {
      h1.style.color = changeColors ? 'black' : 'white';
    });
    document.querySelectorAll('h2').forEach((h2) => {
      h2.style.color = changeColors ? 'black' : 'white';
    });

    setChangeBackgroundImageTheme((prev) => !prev);
    const body = document.querySelector('body');
    if (body) {
      body.style.backgroundImage = changeBackgroundImageTheme
        ? 'url("https://img.freepik.com/premium-vector/seamless-pattern-with-classical-italian-foods_80590-1174.jpg?w=740")'
        : 'url("https://static.vecteezy.com/system/resources/previews/014/252/534/non_2x/slice-of-pizza-on-a-thin-crust-on-a-black-background-illustration-pattern-pizza-stuffed-with-meat-mushrooms-and-herbs-pattern-kitchen-decoration-stylish-wallpaper-vector.jpg")';
    }
  };

  const handleChangeThemeToLight = () => {
    const bodyFind = document.querySelector('body');
    if (bodyFind) {
      bodyFind.style.backgroundImage =
        'url("https://img.freepik.com/premium-vector/seamless-pattern-with-classical-italian-foods_80590-1174.jpg?w=740")';
    }
    dispatch(setChangeThemeLight());
  };

  const handleChangeThemeToDark = () => {
    const bodyFind = document.querySelector('body');
    if (bodyFind) {
      bodyFind.style.backgroundImage =
        'url("https://static.vecteezy.com/system/resources/previews/014/252/534/non_2x/slice-of-pizza-on-a-thin-crust-on-a-black-background-illustration-pattern-pizza-stuffed-with-meat-mushrooms-and-herbs-pattern-kitchen-decoration-stylish-wallpaper-vector.jpg")';
    }
    dispatch(setChangeThemeDark());
  };

  const menuRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="AppBar">
        <section className="app-bar-content">
          <Image
            width={100}
            height={100}
            src="https://react-pizza-v2.vercel.app/static/media/pizza-logo.56ac87032d8f6fdf863326acd06c0d97.svg"
            alt="app image"
          />
          <h1 className={`${theme ? 'dark-mode-h1' : ''}`}>NEXT PIZZA</h1>
          <p>самая вкусная пицца во вселенной</p>
        </section>
        {inputState && (
          <>
            <Image
              width={100}
              height={100}
              className="lope-icon"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG6vj-vkOjV4QcV6_JEWS3bCAISpV6yZEspw&usqp=CAU"
              alt="lope-icon"
            />

            <input
              className="find-pizzas-input"
              onChange={onChangeValue}
              value={value}
              type="text"
              placeholder="Поиск пиццы..."
            />
          </>
        )}

        <Image
          width={100}
          height={100}
          onClick={handleOpenMobileMenu}
          className="menu-icon"
          src="https://cdn-icons-png.flaticon.com/512/8771/8771165.png"
          alt="menu icon"
        />

        <CSSTransition
          menuRef={menuRef}
          in={openMenu}
          timeout={300}
          classNames="fade"
          unmountOnExit>
          <div className="Menu-Main">
            {openMenu && (
              <div ref={menuRef} className={`menu ${theme ? 'dark-menu' : ''}`}>
                <h2 className={`${theme ? 'menu-text-dark' : ''}`}>Меню</h2>
                <Image
                  width={100}
                  height={100}
                  className="close-menu-icon"
                  onClick={handleCloseMobileMenu}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/768px-Grey_close_x.svg.png"
                  alt="close-menu icon"
                />
                <div className="menu-content">
                  <div className="menu-buttons">
                    <Image
                      width={100}
                      height={100}
                      className="lope-icon-mobile"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG6vj-vkOjV4QcV6_JEWS3bCAISpV6yZEspw&usqp=CAU"
                      alt="lope icon for mobile device"
                    />
                    <input
                      value={value}
                      onChange={onChangeValue}
                      className="menu-input"
                      type="text"
                      placeholder="Поиск пицц..."
                    />
                    <Link onClick={handleCloseMobileMenu} href={'/cart'}>
                      <button>Корзина</button>
                    </Link>
                    <a href="https://dc.kh.ua/samye-populjarnye-vidy-piccy/" target="_blank">
                      <button>Топ пиццы</button>
                    </a>
                    <a href="https://www.youtube.com/watch?v=YqCcjFtPOIM" target="_blank">
                      <button>Готовка</button>
                    </a>

                    <div className="menu-sort-content">
                      <h3 className={`${theme ? 'sort-text-dark' : ''}`}>сортировка</h3>

                      <div className="sort-buttons">
                        <button onClick={handleOpenCheapPizzas}>Дешевые пиццы</button>
                        <button onClick={handleOpenExpenisvePizzas}>Дорогие пиццы</button>
                      </div>
                    </div>
                  </div>
                  <div className="theme-container">
                    <button className="light-button" onClick={handleChangeThemeToLight}>
                      <SunIcon />
                    </button>
                    <button className="dark-button" onClick={handleChangeThemeToDark}>
                      <MoonIcon />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CSSTransition>

        <div className="select-button">
          <div className="dark-light-theme">
            <label className="ui-switch">
              <input onClick={handleChangeTheme} type="checkbox" />
              <div className="slider">
                <div className="circle"></div>
              </div>
            </label>
          </div>
          <div className="line"></div>
          <Link onClick={handleChangeThemeToLight} href={'/cart'}>
            <Image
              width={100}
              height={100}
              onClick={() => dispatch(setInputValueDefalut())}
              src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png"
              alt="cart-icon"
            />
          </Link>
        </div>
      </div>
      <div className="line-content"></div>
    </>
  );
};

export default AppBar;
