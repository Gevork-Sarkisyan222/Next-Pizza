'use client';

import React, { useState } from 'react';
import AppBar from './components/AppBar';
import './globals.scss';
import PizzaCard from './components/PizzaCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/slices/types/type';
import NotFoundPizza from './components/NotFoundPizza';
import { setInputValue, setInputValueDefalut } from './redux/slices/InputState.slice';
import { setChangeTheme } from './redux/slices/changeTheme.slice';

type pizza = {
  id: number;
  image: string;
  title: string;
  price: number;
  meat: boolean;
  vegan: boolean;
  grill: boolean;
  spicy: boolean;
  cheese: boolean;
};

const pizzas: pizza[] = [
  {
    id: 1,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/6390157043034f8585c64cc279edbef1_292x292.webp',
    title: 'Пицца мортаделлой',
    price: 649,
    meat: true,
    vegan: false,
    grill: false,
    spicy: false,
    cheese: false,
  },
  {
    id: 2,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/03c840b1ab6f4ccb84f5dc167e146598_292x292.webp',
    title: 'Диабло 🌶️🌶️',
    price: 590,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 3,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/3a948b9d5af14d219e2c54282229755a_292x292.webp',
    title: 'Бургер-пицца',
    price: 529,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 4,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/42360a7dcb7640c998b723231586fe84_292x292.webp',
    title: 'Сырный цыпленок',
    price: 385,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 5,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/50555f951a6d4fd4ac0088c099eb3769_292x292.webp',
    title: 'Четыре сыра 🌱',
    price: 599,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 6,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/14.png',
    title: 'Додо Микс',
    price: 250,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 7,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/4.png',
    title: 'Ветчина и сыр',
    price: 180,
    meat: true,
    vegan: false,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 8,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/13.png',
    title: 'Пепперони и сюрприз',
    price: 240,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: true,
  },
  {
    id: 9,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/02989e65729e4b20b2e469db3278ac40_292x292.webp',
    title: 'Комбо от Смешариков',
    price: 495,
    meat: false,
    vegan: false,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 10,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/7e354a063fe4456595f8d8076fbeb10f_292x292.webp',
    title: 'Двойная пепперони',
    price: 409,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: true,
  },
  {
    id: 11,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/bb47abfc5d714dbfb7a161d817081ef3_292x292.webp',
    title: 'Комбо от 789 ₽',
    price: 789,
    meat: true,
    vegan: false,
    grill: true,
    spicy: true,
    cheese: false,
  },
  {
    id: 12,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/b0f1819c175546e2a95c712c26e74b87_292x292.webp',
    title: '3 пиццы',
    price: 1499,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 13,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/a4962e8682384c18988449ccb5746270_292x292.webp',
    title: '5 пицц',
    price: 3059,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 14,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/ee7881d13c9e495f934f7670faf6959d_292x292.webp',
    title: '7 пицц',
    price: 4199,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 15,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/43e67a191ab14555afdc4e3707dabccb_292x292.webp',
    title: '10 пицц',
    price: 5849,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
];

const pizzasMeat: pizza[] = [
  {
    id: 640042,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/11.png',
    title: 'Мясной Микс',
    price: 690,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 54654656757,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/7.png',
    title: 'Карбонара',
    price: 420,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 64,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/14.png',
    title: 'Додо Микс',
    price: 250,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 46752,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/03c840b1ab6f4ccb84f5dc167e146598_292x292.webp',
    title: 'Диабло 🌶️🌶️',
    price: 590,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 74,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/4.png',
    title: 'Ветчина и сыр',
    price: 180,
    meat: true,
    vegan: false,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 31,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/3a948b9d5af14d219e2c54282229755a_292x292.webp',
    title: 'Бургер-пицца',
    price: 529,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 123,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/6390157043034f8585c64cc279edbef1_292x292.webp',
    title: 'Пицца мортаделлой',
    price: 649,
    meat: true,
    vegan: false,
    grill: false,
    spicy: false,
    cheese: false,
  },
  {
    id: 115,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/bb47abfc5d714dbfb7a161d817081ef3_292x292.webp',
    title: 'Комбо от 789 ₽',
    price: 789,
    meat: true,
    vegan: false,
    grill: true,
    spicy: true,
    cheese: false,
  },
];

const pizzasVegan: pizza[] = [
  {
    id: 8815,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/32.png',
    title: 'Овощи и грибы 🌱',
    price: 240,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 88833,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/31.png',
    title: 'Овощи гриль',
    price: 250,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 999,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/21.png',
    title: 'Пепперони',
    price: 200,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 8215,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/50555f951a6d4fd4ac0088c099eb3769_292x292.webp',
    title: 'Четыре сыра 🌱',
    price: 599,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 212433,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/3a948b9d5af14d219e2c54282229755a_292x292.webp',
    title: 'Бургер-пицца',
    price: 529,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
];

const pizzasGrill: pizza[] = [
  {
    id: 1126,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/14.png',
    title: 'Додо Микс',
    price: 250,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 388,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/3a948b9d5af14d219e2c54282229755a_292x292.webp',
    title: 'Бургер-пицца',
    price: 529,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 112289,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/bb47abfc5d714dbfb7a161d817081ef3_292x292.webp',
    title: 'Комбо от 789 ₽',
    price: 789,
    meat: true,
    vegan: false,
    grill: true,
    spicy: true,
    cheese: false,
  },
];

const pizzasSpicy: pizza[] = [
  {
    id: 26821,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/16.png',
    title: 'Аррива 🌶️',
    price: 620,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 262122208,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/03c840b1ab6f4ccb84f5dc167e146598_292x292.webp',
    title: 'Диабло 🌶️🌶️',
    price: 590,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 279938,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/27bc9bfab5f64bb196fa1ad598ca19a6_292x292.webp',
    title: 'Додо',
    price: 799,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 3238,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/02ca2561953b488993878d1f70e359de_292x292.webp',
    title: 'Чоризо фреш',
    price: 459,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 3838,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/3a948b9d5af14d219e2c54282229755a_292x292.webp',
    title: 'Бургер-пицца',
    price: 529,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 6664,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/14.png',
    title: 'Додо Микс',
    price: 250,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
];

const pizzasCheese: pizza[] = [
  {
    id: 4451,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/3.png',
    title: 'Сырная 🌱👶',
    price: 409,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 445,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/25.png',
    title: 'Четыре сыра 🌱',
    price: 599,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 5564,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/42360a7dcb7640c998b723231586fe84_292x292.webp',
    title: 'Сырный цыпленок',
    price: 385,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 733,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/4.png',
    title: 'Ветчина и сыр',
    price: 180,
    meat: true,
    vegan: false,
    grill: false,
    spicy: false,
    cheese: true,
  },
];

const cheapPizzas: pizza[] = [
  {
    id: 3330007,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/4.png',
    title: 'Ветчина и сыр',
    price: 180,
    meat: true,
    vegan: false,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 2007,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/21.png',
    title: 'Пепперони',
    price: 200,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 4000218,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/13.png',
    title: 'Пепперони и сюрприз',
    price: 240,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: true,
  },
  {
    id: 88657815,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/32.png',
    title: 'Овощи и грибы 🌱',
    price: 240,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 88830003,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/31.png',
    title: 'Овощи гриль',
    price: 250,
    meat: false,
    vegan: true,
    grill: false,
    spicy: false,
    cheese: true,
  },
  {
    id: 54211216,
    image: 'https://react-pizza-v2-psi.vercel.app/assets/img/products/14.png',
    title: 'Додо Микс',
    price: 250,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
];

const expensivePizzas: pizza[] = [
  {
    id: 677686863,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/3a948b9d5af14d219e2c54282229755a_292x292.webp',
    title: 'Бургер-пицца',
    price: 529,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 265464654,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/03c840b1ab6f4ccb84f5dc167e146598_292x292.webp',
    title: 'Диабло 🌶️🌶️',
    price: 590,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 35355113001,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/6390157043034f8585c64cc279edbef1_292x292.webp',
    title: 'Пицца мортаделлой',
    price: 649,
    meat: true,
    vegan: false,
    grill: false,
    spicy: false,
    cheese: false,
  },
  {
    id: 1555551,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/bb47abfc5d714dbfb7a161d817081ef3_292x292.webp',
    title: 'Комбо от 789 ₽',
    price: 789,
    meat: true,
    vegan: false,
    grill: true,
    spicy: true,
    cheese: false,
  },
  {
    id: 279938678678,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/27bc9bfab5f64bb196fa1ad598ca19a6_292x292.webp',
    title: 'Додо',
    price: 799,
    meat: true,
    vegan: false,
    grill: false,
    spicy: true,
    cheese: false,
  },
  {
    id: 1000002,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/b0f1819c175546e2a95c712c26e74b87_292x292.webp',
    title: '3 пиццы',
    price: 1499,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 13231441,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/a4962e8682384c18988449ccb5746270_292x292.webp',
    title: '5 пицц',
    price: 3059,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 200714,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/ee7881d13c9e495f934f7670faf6959d_292x292.webp',
    title: '7 пицц',
    price: 4199,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
  {
    id: 333336415,
    image:
      'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/43e67a191ab14555afdc4e3707dabccb_292x292.webp',
    title: '10 пицц',
    price: 5849,
    meat: true,
    vegan: true,
    grill: true,
    spicy: true,
    cheese: true,
  },
];

export type Category = 'Все' | 'Мясные' | 'Вегетарианская' | 'Гриль' | 'Острые' | 'Сырные';

export default function Home() {
  const value = useSelector((state: RootState) => state.value.value);
  const openMenu = useSelector((state: any) => state.openMenu.openMenu);

  const dispatch = useDispatch();

  const [selectCategory, setSelectCategory] = useState<Category>('Все');
  const [openMeatPizza, setOpenMeatPizza] = useState(false);
  const [openVeganPizza, setOpenVeganPizza] = useState(false);
  const [openGrillPizza, setOpenGrillPizza] = useState(false);
  const [openSpicyPizza, setOpenSpicyPizza] = useState(false);
  const [openCheesePizza, setOpenCheesePizza] = useState(false);
  const [defaultCardRender, setDefaultCardRender] = useState(true);
  const [openSort, setOpenSort] = useState(false);

  // sort
  const [openCheapPizzas, setOpenCheapPizzas] = useState(false);
  const [openExpenisvepPizzas, setOpenExpenisvePizzas] = useState(false);

  const theme = useSelector((state: any) => state.changeTheme.theme);

  const handleOpenCheapPizzas = () => {
    // open pizzas
    setOpenMeatPizza(false);
    setOpenVeganPizza(false);
    setOpenGrillPizza(false);
    setOpenSpicyPizza(false);
    setOpenCheesePizza(false);
    setDefaultCardRender(false);
    setOpenCheapPizzas(true);
    setOpenExpenisvePizzas(false);
    setOpenSort(false);
    dispatch(setInputValue());
  };

  const handleOpenExpenisvePizzas = () => {
    // category items
    setOpenMeatPizza(false);
    setOpenVeganPizza(false);
    setOpenGrillPizza(false);
    setOpenSpicyPizza(false);
    setOpenCheesePizza(false);
    setDefaultCardRender(false);
    // open sort list
    setOpenExpenisvePizzas(true);
    setOpenCheapPizzas(false);
    setOpenSort(false);
    dispatch(setInputValue());
  };

  const handleAllSortPopularnosty = () => {
    // category items
    setOpenMeatPizza(true);
    setOpenVeganPizza(false);
    setOpenGrillPizza(false);
    setOpenSpicyPizza(false);
    setOpenCheesePizza(false);
    setDefaultCardRender(false);
    // open sort list
    setOpenExpenisvePizzas(false);
    setOpenCheapPizzas(false);
    setOpenSort(false);
    dispatch(setInputValue());
  };

  const handleCategoryClick = (category: Category) => {
    setSelectCategory(category);
  };

  const filterPizza = (obj: pizza) => {
    return obj.title.toLowerCase().includes(value.toLowerCase());
  };

  const filteredFindPizzas = pizzas.filter(filterPizza);

  const openMeat = () => {
    // category items
    setOpenMeatPizza(true);
    setOpenVeganPizza(false);
    setOpenGrillPizza(false);
    setOpenSpicyPizza(false);
    setOpenCheesePizza(false);
    setDefaultCardRender(false);
    setOpenSort(false);
    dispatch(setInputValue());
  };
  const openSpicy = () => {
    // category items
    setOpenGrillPizza(false);
    setOpenMeatPizza(false);
    setOpenVeganPizza(false);
    setOpenSpicyPizza(true);
    setOpenCheesePizza(false);
    setDefaultCardRender(false);
    setOpenSort(false);
    dispatch(setInputValue());
  };
  const openCheese = () => {
    // category items
    setOpenGrillPizza(false);
    setOpenMeatPizza(false);
    setOpenVeganPizza(false);
    setOpenSpicyPizza(false);
    setOpenCheesePizza(true);
    setDefaultCardRender(false);
    setOpenSort(false);
    dispatch(setInputValue());
  };

  const openGrill = () => {
    // category items
    setOpenGrillPizza(true);
    setOpenMeatPizza(false);
    setOpenVeganPizza(false);
    setOpenSpicyPizza(false);
    setOpenCheesePizza(false);
    setDefaultCardRender(false);
    setOpenSort(false);
    dispatch(setInputValue());
  };
  const openVegan = () => {
    // category items
    setOpenVeganPizza(true);
    setOpenMeatPizza(false);
    setOpenGrillPizza(false);
    setOpenSpicyPizza(false);
    setOpenCheesePizza(false);
    setDefaultCardRender(false);
    setOpenSort(false);
    dispatch(setInputValue());
  };
  const removeMeat = () => {
    // category items
    setOpenMeatPizza(false);
    setOpenVeganPizza(false);
    setOpenGrillPizza(false);
    setOpenSpicyPizza(false);
    setOpenCheesePizza(false);
    setDefaultCardRender(true);
    setOpenSort(false);
    dispatch(setInputValueDefalut());
  };

  const handleChangeTheme = () => {
    dispatch(setChangeTheme());
  };

  return (
    <>
      {openMenu && <div className="black-bg"></div>}

      <div className="main-container">
        <div className={`main-wrapper ${theme ? 'changed-theme-bg' : ''}`}>
          <AppBar
            setOpenMeatPizza={setOpenMeatPizza}
            setOpenVeganPizza={setOpenVeganPizza}
            setOpenGrillPizza={setOpenGrillPizza}
            setOpenSpicyPizza={setOpenSpicyPizza}
            setOpenCheesePizza={setOpenCheesePizza}
            setDefaultCardRender={setDefaultCardRender}
            setOpenCheapPizzas={setOpenCheapPizzas}
            setOpenExpenisvePizzas={setOpenExpenisvePizzas}
          />

          <div className="center-title">
            <h1>Покупайте пиццы внизу</h1>
          </div>
          <div
            onClick={() => setOpenCheapPizzas(false)}
            onClickCapture={() => setOpenExpenisvePizzas(false)}
            className="select-buttons-section">
            <button
              onClickCapture={removeMeat}
              className={selectCategory === 'Все' ? 'selected-black' : ''}
              onClick={() => handleCategoryClick('Все')}>
              Все
            </button>
            <button
              onClickCapture={openMeat}
              className={selectCategory === 'Мясные' ? 'selected-black' : ''}
              onClick={() => handleCategoryClick('Мясные')}>
              Мясные
            </button>
            <button
              onClickCapture={openVegan}
              className={selectCategory === 'Вегетарианская' ? 'selected-black' : ''}
              onClick={() => handleCategoryClick('Вегетарианская')}>
              Вегетарианская
            </button>

            <button
              onClickCapture={openGrill}
              className={selectCategory === 'Гриль' ? 'selected-black' : ''}
              onClick={() => handleCategoryClick('Гриль')}>
              Гриль
            </button>
            <button
              onClickCapture={openSpicy}
              className={selectCategory === 'Острые' ? 'selected-black' : ''}
              onClick={() => handleCategoryClick('Острые')}>
              Острые
            </button>
            <button
              onClickCapture={openCheese}
              className={selectCategory === 'Сырные' ? 'selected-black' : ''}
              onClick={() => handleCategoryClick('Сырные')}>
              Сырные
            </button>
          </div>
          {openSort && (
            <div className="select-sort">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="162"
                height="166"
                viewBox="0 0 162 166"
                fill="none">
                <g filter="url(#filter0_d_8_0)">
                  <rect x="15" y="10" width="132" height="136" rx="10" fill="white" />
                </g>

                <defs>
                  <filter
                    id="filter0_d_8_0"
                    x="0"
                    y="0"
                    width="162"
                    height="166"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="5" />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_8_0"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_8_0"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <div className="select-sort-text">
                <h3 onClick={handleAllSortPopularnosty}>популярности</h3>
                <h3 onClick={handleOpenCheapPizzas}>самые дешевые</h3>
                <h3 onClick={handleOpenExpenisvePizzas}>самые дорогие</h3>
                <button>light</button>
                <button>dark</button>
              </div>
            </div>
          )}
          <div className="sort">
            <h1 className={`${theme ? 'sort-title-dark' : ''}`} onClick={() => setOpenSort(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none">
                <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
                />
              </svg>
              <span className="sort-text">Сортировка по:</span>
              <span className="sort-select-text">популярности</span>
            </h1>
          </div>
          <div className="title">
            <h1 className={`${theme ? 'black-title' : ''}`}>Все пиццы</h1>
          </div>
          <div className="pizza-container">
            {/* expensive pizzas */}
            {openExpenisvepPizzas &&
              expensivePizzas.map((obj) => (
                <>
                  <PizzaCard
                    key={obj.id}
                    image={obj.image}
                    title={obj.title}
                    price={obj.price}
                    id={obj.id}
                  />
                </>
              ))}
            {/* cheap pizzas */}
            {openCheapPizzas &&
              cheapPizzas.map((obj) => (
                <>
                  <PizzaCard
                    key={obj.id}
                    image={obj.image}
                    title={obj.title}
                    price={obj.price}
                    id={obj.id}
                  />
                </>
              ))}

            {/* cheese pizza */}
            {openCheesePizza &&
              pizzasCheese.map((obj) => (
                <>
                  <PizzaCard
                    key={obj.id}
                    image={obj.image}
                    title={obj.title}
                    price={obj.price}
                    id={obj.id}
                  />
                </>
              ))}

            {/* spciy pizza */}
            {openSpicyPizza &&
              pizzasSpicy.map((obj) => (
                <>
                  <PizzaCard
                    key={obj.id}
                    image={obj.image}
                    title={obj.title}
                    price={obj.price}
                    id={obj.id}
                  />
                </>
              ))}
            {/* grill pizza */}
            {openGrillPizza &&
              pizzasGrill.map((obj) => (
                <>
                  <PizzaCard
                    key={obj.id}
                    image={obj.image}
                    title={obj.title}
                    price={obj.price}
                    id={obj.id}
                  />
                </>
              ))}

            {/* vegan pizza */}
            {openVeganPizza &&
              pizzasVegan.map((obj) => (
                <>
                  <PizzaCard
                    key={obj.id}
                    image={obj.image}
                    title={obj.title}
                    price={obj.price}
                    id={obj.id}
                  />
                </>
              ))}

            {/* meat pizzas */}
            {openMeatPizza &&
              pizzasMeat.map((obj) => (
                <>
                  <PizzaCard
                    key={obj.id}
                    image={obj.image}
                    title={obj.title}
                    price={obj.price}
                    id={obj.id}
                  />
                </>
              ))}

            {/* default pizzas */}
            {filteredFindPizzas.length > 0 ? (
              filteredFindPizzas.map((obj) => (
                <>
                  {defaultCardRender && (
                    <PizzaCard
                      key={obj.id}
                      image={obj.image}
                      title={obj.title}
                      price={obj.price}
                      id={obj.id}
                    />
                  )}
                </>
              ))
            ) : (
              <NotFoundPizza />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
