import React, { useState } from 'react';
import './mobileInfo.scss';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { keyframes } from '@emotion/react';

import Image from 'next/image';
import Taste from '../taste/Taste';
import { RootStateTheme } from '@/app/redux/slices/types/themeType';

// for snackbar
import Snackbar from '@mui/joy/Snackbar';
import Stack from '@mui/joy/Stack';
import ButtonJoy from '@mui/joy/Button';
import TypographyJoy from '@mui/joy/Typography';

interface MobileInfoProps {
  openInfoMobile: boolean;
  handleClosePizzasInfoForMobile: () => void;
  title: string;
  price: number;
  image: string;
}

const MobilePizzaInfo: React.FC<MobileInfoProps> = ({
  openInfoMobile,
  handleClosePizzasInfoForMobile,
  title,
  image,
  price,
}) => {
  const deliverNumber = Math.floor(Math.random() * 100);
  const theme = useSelector((state: RootStateTheme) => state.changeTheme.theme);
  const mobileQuery = useMediaQuery('(min-height:932px)');

  const changeColorAnimation = keyframes`
  0% {
    background: #a600ff;
  }
  100% {
    background: #3d194d;
  }
`;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    borderRadius: '25px',
    // height: '88%',
    height: mobileQuery ? '747px' : '710px',
    background: theme ? 'linear-gradient(0deg, #2b008f 0%, #7a0064 38%, #292929 100%)' : '#ffff',
    animation: theme ? `${changeColorAnimation} 4s infinite alternate` : 'none',
    border: theme ? '2px solid white' : '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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

      <div className="Mobile-Pizza-Info-Main">
        <Modal
          sx={{ width: '100%' }}
          open={openInfoMobile}
          // onClose={handleClosePizzasInfoForMobile}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}>
          <Fade in={openInfoMobile} onExited={handleClosePizzasInfoForMobile}>
            <Box sx={style}>
              <svg
                onClick={handleClosePizzasInfoForMobile}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.925 11.16a1.25 1.25 0 00-1.766-.085l-10.16 9.236-10.158-9.236a1.25 1.25 0 10-1.682 1.85l10.462 9.511.017.016c.079.072.184.167.285.246.12.093.31.223.568.301.332.101.686.101 1.018 0 .258-.078.447-.208.568-.301.1-.079.205-.174.284-.246l.018-.016 10.461-9.511a1.25 1.25 0 00.085-1.766z"
                  fill={theme ? 'white' : '#000'}></path>
              </svg>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={image} width={275} height={275} alt="pizza-image" />
              </div>
              <h1
                style={{ fontSize: '26px', marginTop: '30px', color: theme ? 'white' : 'black' }}
                className="pizza-info-mobile-title">
                {title}
              </h1>
              <div className="pizzas-with-taste">
                <h3 style={{ color: theme ? 'white' : 'black' }}>Добавить по вкусу</h3>
                <Taste />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '100px',
                }}>
                <Button
                  onClick={() => setOpenSnackBar(true)}
                  sx={{
                    backgroundColor: 'rgb(255, 105, 0)',
                    marginTop: '-67px',
                    width: '329px',
                    height: '50px',
                    borderRadius: '40px',
                    cursor: 'pointer',
                    position: 'absolute',

                    '&:hover': {
                      backgroundColor: 'rgb(207, 86, 0)',
                    },
                  }}
                  variant="contained">
                  Купить {price}₽
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default MobilePizzaInfo;
