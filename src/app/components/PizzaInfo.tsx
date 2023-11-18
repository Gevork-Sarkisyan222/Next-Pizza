import React from 'react';
import './pizza-info.scss';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Taste from './taste/Taste';
import { useSelector } from 'react-redux';
import { keyframes } from '@emotion/react';

interface PizzasProps {
  title: string;
  image: string;
  price: number;
  open: boolean;
  handleClosePizzasInfo: () => void;
}

const PizzaInfo: React.FC<PizzasProps> = ({ title, image, price, open, handleClosePizzasInfo }) => {
  const deliverNumber = Math.floor(Math.random() * 150);
  // change theme at pizzas info
  const theme = useSelector((state: any) => state.changeTheme.theme);

  const handleBuyPizza = () => {
    const buyPizza = window.confirm('вы хотите купить этот товар?');

    if (buyPizza) {
      alert(`Мы передали ваш заказ под номером ${deliverNumber} курьерской службе`);
      window.location.reload();
    }
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: theme ? '2px solid white' : 'none',
    boxShadow: 24,
    p: 4,
  };

  const changeColorAnimation = keyframes`
  0% {
    background: #a600ff;
  }
  100% {
    background: #1f1f1f;
  }
`;

  return (
    <div className="Pizza-Info-Main">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClosePizzasInfo}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box
            sx={{
              ...style,
              width: '900px',
              height: '510px',
              borderRadius: '30px',
              border: theme ? '2px solid white' : 'none',
              background: theme ? 'linear-gradient(0deg, #a600ff 0%, #1f1f1f 99%)' : '#ffff',
              animation: theme ? `${changeColorAnimation} 5s infinite alternate` : 'none',
            }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginLeft: '464px',
                position: 'absolute',
              }}>
              <div className="pizzas-info-content">
                <article className="texts-left">
                  <h1 style={{ color: theme ? 'white' : 'black' }}>
                    {title.replace(/"/g, '&quot;')}
                  </h1>
                  <h3 style={{ color: theme ? 'white' : 'black' }}>
                    цена: <span>{price} ₽</span>
                  </h3>

                  <h3 style={{ color: theme ? 'white' : 'black' }} className="taste-title">
                    Добавить по вкусу
                  </h3>
                  <div>
                    <Taste />
                  </div>
                </article>
                <Button
                  onClick={handleBuyPizza}
                  sx={{
                    backgroundColor: 'rgb(255, 105, 0)',
                    marginTop: '17px',
                    width: '360px',
                    height: '44px',
                    borderRadius: '40px',
                    cursor: 'pointer',
                    position: 'absolute',

                    '&:hover': {
                      backgroundColor: 'rgb(207, 86, 0)',
                    },
                  }}
                  variant="contained">
                  Купить
                </Button>
              </div>
            </Box>
            <div>
              <Image
                style={{ marginTop: '40px', marginLeft: '21px' }}
                width={430}
                height={430}
                src={image}
                alt="pizzas image"
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PizzaInfo;
