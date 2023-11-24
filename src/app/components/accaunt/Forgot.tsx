import React, { useState } from 'react';
import './enter.scss';
import { useSelector } from 'react-redux';
import { RootStateTheme } from '@/app/redux/slices/types/themeType';
import BackIcon from '@mui/icons-material/ArrowBack';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import Snackbar from '@mui/joy/Snackbar';
import Stack from '@mui/joy/Stack';
import ButtonJoy from '@mui/joy/Button';
import TypographyJoy from '@mui/joy/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface Iprops {
  handleCloseForgot: () => void;
}

const Forgot: React.FC<Iprops> = ({ handleCloseForgot }) => {
  const theme = useSelector((state: RootStateTheme) => state.changeTheme.theme);
  const [emailWriteContent, setEmailWriteContent] = useState<boolean>(true);
  const [forgotCode, setForgotCode] = useState<boolean>(false);
  const [codeComeForButton, setCodeComeForButton] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(false);
  const randomConfirmationCode = Math.floor(1000 + Math.random() * 9000);

  const [codeValue, setCodeValue] = useState('');

  const addCodeValueInfoValue = () => {
    const codeValueAdd = `${randomConfirmationCode}`;

    setCode(false);
    setCodeValue(codeValueAdd);
  };

  const onClickCodeButton = () => {
    if (codeValue.length !== 4) {
      alert('Кода нету может еще отправить');
    } else {
      setSuccessfullEnter(true);
      setOpen(true);

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  const handleOpenForgot = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.match(emailRegex)) {
      setForgotCode(true);
      setEmailWriteContent(false);

      // code is already come
      setTimeout(() => {
        setCode(true);
        setCodeComeForButton(true);
      }, 15000);
    } else {
      alert('Пожалуйста, введите корректный email');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCloseForgotBack = () => {
    setForgotCode(false);
    setEmailWriteContent(true);
  };

  // open loading
  const [open, setOpen] = React.useState(false);
  const handleCloseCircle = () => {
    setOpen(false);
  };

  // ================

  // successfully enter into accaunt by code login
  const [successfullEnter, setSuccessfullEnter] = useState(false);

  return (
    <>
      <section>
        <Snackbar
          autoHideDuration={500000}
          variant="solid"
          color="primary"
          size="lg"
          invertedColors
          open={successfullEnter}
          onClose={() => setSuccessfullEnter(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={(theme) => ({
            background: '#ef5b24',
            maxWidth: 360,
          })}>
          <div>
            <TypographyJoy level="title-lg">Next Pizza:</TypographyJoy>
            <TypographyJoy sx={{ mt: 1, mb: 2, color: 'white' }}>
              Вы успешно зашли на свой аккаунт
            </TypographyJoy>
          </div>
        </Snackbar>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleCloseCircle}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </section>

      <Snackbar
        autoHideDuration={500000}
        variant="solid"
        color="primary"
        size="lg"
        invertedColors
        open={code}
        onClose={() => setCode(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={(theme) => ({
          background: '#ef5b24',
          maxWidth: 360,
        })}>
        <div>
          <TypographyJoy level="title-lg">Next Pizza:</TypographyJoy>
          <TypographyJoy sx={{ mt: 1, mb: 2, color: 'white' }}>
            Код подтверждения: {randomConfirmationCode}
          </TypographyJoy>
          <Stack direction="row" spacing={1}>
            <ButtonJoy onClick={addCodeValueInfoValue} variant="solid" sx={{ color: 'black' }}>
              Подтвердить
            </ButtonJoy>
            <ButtonJoy
              sx={{ color: 'white' }}
              variant="outlined"
              color="primary"
              onClick={() => setCode(false)}>
              отмена
            </ButtonJoy>
          </Stack>
        </div>
      </Snackbar>

      <div className="Forgot-Main">
        {emailWriteContent && (
          <>
            <div style={{ textAlign: 'start' }}>
              <BackIcon
                onClick={handleCloseForgot}
                sx={{ color: theme ? 'white' : 'black', cursor: 'pointer' }}
              />
            </div>
            <h2 style={{ color: theme ? 'white' : 'black' }}>Введите электронную почту</h2>

            <div className="inputForm">
              <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                <g id="Layer_3" data-name="Layer 3">
                  <path
                    fill={theme ? 'white' : 'black'}
                    d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </g>
              </svg>
              <input
                style={{
                  backgroundColor: theme ? '#272727' : '#fff',
                  color: theme ? 'white' : 'black',
                }}
                name="email"
                required
                type="email"
                className="input"
                onChange={handleEmailChange}
                placeholder="Введите Электронную почту"
              />
            </div>
            <button onClick={handleOpenForgot} className="Next-Button">
              Далее <ArrowRightAltIcon sx={{ color: 'white', marginBottom: '-6px' }} />
            </button>
          </>
        )}

        {forgotCode && (
          <>
            <div style={{ textAlign: 'start' }}>
              <BackIcon
                onClick={handleCloseForgotBack}
                sx={{ color: theme ? 'white' : 'black', cursor: 'pointer' }}
              />
            </div>
            <h2 style={{ color: theme ? 'white' : 'black' }}>
              В течении 15 секунд вам придёт код ожидайте
            </h2>

            <div className="inputForm">
              <svg
                height="20"
                viewBox="-64 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill={theme ? 'white' : 'black'}
                  d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path
                  fill={theme ? 'white' : 'black'}
                  d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input
                style={{
                  backgroundColor: theme ? '#272727' : '#fff',
                  color: theme ? 'white' : 'black',
                }}
                name="text"
                maxLength={4}
                required
                type="text"
                className="input"
                placeholder="Напишите код"
                value={codeValue}
                onChange={(e) => e.target.value}
              />
            </div>
            {codeComeForButton && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClickCapture={onClickCodeButton}
                  onClick={handleOpenForgot}
                  className="Next-Button">
                  Перейти
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Forgot;
