// 'use client';
import React, { useState, useMemo, useEffect } from 'react';
import './spin.scss';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setCloseSpin } from '@/app/redux/slices/openSpin.slice';

const cells = 31;

const items = [
  {
    name: 'Price',
    img: 'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/ee7881d13c9e495f934f7670faf6959d_292x292.webp',
    chance: 10,
  },
  {
    name: 'Price2',
    img: 'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/f2751f0e30db461d8179689de11b586b_292x292.webp',
    chance: 20,
  },
  {
    name: 'Price3',
    img: 'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/7ea7a45d9a03453783c3f75f2feea2e9_292x292.webp',
    chance: 30,
  },
  {
    name: 'Price4',
    img: 'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/9c76b48d74d847dd8be8b3c49f7cdcf0_292x292.webp',
    chance: 40,
  },
  {
    name: 'Price5',
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Products/bebaa13644304e75b438e45be9eb5076_292x292.webp',
    chance: 50,
  },
  {
    name: 'Price6',
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Products/6046174c06e440299c4e7117a8ecfea4_292x292.webp',
    chance: 60,
  },
  {
    name: 'Price7',
    img: 'https://www.shakeyspizza.ph/images/supercard-gold.png',
    chance: 70,
  },
  {
    name: 'Price8',
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Products/7d8acee0f9984844bdeb3e22d359a4fc_292x292.webp',
    chance: 80,
  },
  {
    name: 'Price9',
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Products/fa54ea6a78ed4bb89f9788b691d4ad56_292x292.webp',
    chance: 90,
  },
  {
    name: 'Price10',
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Products/cd83a5cb97f74df99ec47e7bfba1fb7d_292x292.webp',
    chance: 100,
  },
];

const ListItem = ({ item }) => {
  return (
    <li data-item={JSON.stringify(item)} className="list__item">
      <Image width={200} height={200} src={item.img} alt="images of case" />
    </li>
  );
};

// Перемещаем getItem выше его использования
const getItem = () => {
  let item;

  while (!item) {
    const chance = Math.floor(Math.random() * 100);

    items.forEach((elm) => {
      if (chance < elm.chance && !item) item = elm;
    });
  }

  return item;
};

// Обертка ListItem с использованием React.memo
const MemoizedListItem = React.memo(ListItem);

function SpinPizzas() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFirstStart, setIsFirstStart] = useState(true);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.changeTheme.theme);

  const generateItems = useMemo(() => {
    const list = [];

    for (let i = 0; i < cells; i++) {
      const item = getItem();

      list.push(<MemoizedListItem key={i} item={item} />);
    }

    return list;
  }, []); // Зависимости отсутствуют, поэтому useMemo вызывается только один раз

  const start = () => {
    if (isStarted) return;
    setIsStarted(true);

    if (!isFirstStart) setIsFirstStart(true);

    const list = document.querySelector('.list');

    setTimeout(() => {
      list.style.left = '50%';
      list.style.transform = 'translate3d(-50%, 0, 0)';
    }, 0);

    const item = list.querySelectorAll('li')[15];

    list.addEventListener(
      'transitionend',
      () => {
        setIsStarted(false);
        item.classList.add('active');
        const data = JSON.parse(item.getAttribute('data-item'));

        console.log(data);
      },
      { once: true },
    );

    setTimeout(() => {
      alert('Поздравляем с выигрышем');
      window.location.reload();
    }, 5500);
  };

  const handleCloseSpin = () => {
    document.body.style.overflow = 'auto';
    dispatch(setCloseSpin());
  };

  // Обработчик для кнопки с использованием обычного JavaScript
  const handleButtonClick = () => {
    start();
  };

  useEffect(() => {
    // Получаем кнопку и добавляем обработчик события
    const button = document.querySelector('.start');
    button.addEventListener('click', handleButtonClick);

    // Очистка обработчика при размонтировании компонента
    return () => {
      button.removeEventListener('click', handleButtonClick);
    };
  }, []); // Пустой массив зависимостей означает, что useEffect вызывается только один раз после монтирования

  return (
    <div className="SpinPizzas-Main">
      <div className={`spin-pizza-wrapper ${theme ? 'dark-spin-wrapper' : ''}`}>
        <Image
          className="cancel-spin-component"
          onClick={handleCloseSpin}
          width={100}
          height={100}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/768px-Grey_close_x.svg.png"
          alt="close-menu icon"
        />
        <div className="spin-pizza-content">
          <h1>Крутите и выигрывайте пиццы</h1>

          <section className="spin-container">
            <div className="app">
              <Image
                width={55}
                height={55}
                className="pointer"
                src="https://cdn-icons-png.flaticon.com/512/7721/7721893.png"
                alt="mark icon"
              />
              <div className="scope">
                <ul className="list">{generateItems}</ul>
              </div>
              <button className={`start ${theme ? 'dark-start-button' : ''}`}>Крутить 800р</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SpinPizzas;
