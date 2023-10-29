import React from 'react';
import Image from 'next/image';

function NotFoundPizza() {
  return (
    <div className="not-found-content" style={{ textAlign: 'center' }}>
      <h1>По вашему запросу ничего не найдено 😔</h1>
      <Image
        width={600}
        height={500}
        className="not-found-icon"
        src="https://c8.alamy.com/comp/2BTM8W9/gloomy-face-of-slice-of-pizza-cartoon-character-with-404-boards-2BTM8W9.jpg"
        alt=""
      />
      <div className="close-icon"></div>
      <div className="close-down-icon"></div>
    </div>
  );
}

export default NotFoundPizza;
