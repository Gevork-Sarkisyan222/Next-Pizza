import React, { useState } from 'react';
import './pizza-info.scss';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import ButtonJoy from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import TypographyJoy from '@mui/joy/Typography';
import Image from 'next/image';
import Taste from './taste/Taste';
import { useSelector } from 'react-redux';
import { keyframes } from '@emotion/react';
import { RootStateTheme } from '../redux/slices/types/themeType';
// for snackbar
import Snackbar from '@mui/joy/Snackbar';
import Stack from '@mui/joy/Stack';

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
  const theme = useSelector((state: RootStateTheme) => state.changeTheme.theme);

  // const handleBuyPizza = () => {
  //   const buyPizza = window.confirm('вы хотите купить этот товар?');

  //   if (buyPizza) {
  //     alert(`Мы передали ваш заказ под номером ${deliverNumber} курьерской службе`);
  //     window.location.reload();
  //   }
  // };

  // snack bar content and states
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [clickedYes, setClickedYes] = useState(false);
  const [removeContent, setRemoveContent] = useState(true);

  const handleBuyPizza = () => {
    setRemoveContent(false);
    setClickedYes(true);

    setTimeout(() => {
      window.location.reload();
    }, 1200);
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
          {removeContent && (
            <TypographyJoy sx={{ mt: 1, mb: 2, color: 'white' }}>
              вы хотите купить этот товар?
            </TypographyJoy>
          )}
          {clickedYes && (
            <TypographyJoy sx={{ mt: 1, mb: 2, color: 'white' }}>
              Мы передали ваш заказ под номером{' '}
              <span style={{ fontWeight: 900, color: 'white' }}>{deliverNumber}</span> курьерской
              службе
            </TypographyJoy>
          )}
          {removeContent && (
            <Stack direction="row" spacing={1}>
              <ButtonJoy onClick={handleBuyPizza} variant="solid" sx={{ color: 'black' }}>
                Да
              </ButtonJoy>
              <ButtonJoy variant="outlined" color="primary" onClick={() => setOpenSnackBar(false)}>
                Нет
              </ButtonJoy>
            </Stack>
          )}
        </div>
      </Snackbar>

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
                    <h1 style={{ color: theme ? 'white' : 'black' }}>{title}</h1>
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
                    // onClick={handleBuyPizza}
                    onClick={() => setOpenSnackBar(true)}
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
    </>
  );
};

export default PizzaInfo;
