import React, { useState } from 'react';
import '../enter.scss';
import Avatar from '@mui/material/Avatar';
import BackIcon from '@mui/icons-material/ArrowBack';
import { RootStateTheme } from '@/app/redux/slices/types/themeType';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/joy/Snackbar';
import Stack from '@mui/joy/Stack';
import ButtonJoy from '@mui/joy/Button';
import TypographyJoy from '@mui/joy/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { clearFormData, setFormData } from '@/app/redux/slices/formData.slice';
import { clearAvatar, setSelectedAvatar } from '@/app/redux/slices/selectedAvatar.slice';

interface PropsRegister {
  handleBackToLogin: () => void;
}

interface IFormData {
  name: string;
  surname: string;
  phone: string;
  country: string;
  email: string;
  password: string;
  repeat_password: string;
  [key: string]: string;
}

const Register: React.FC<PropsRegister> = ({ handleBackToLogin }) => {
  // const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PxtAWTgOyp0m_7NgdCm3T_9-aU0Zhg47SvX-AaLTU4y0kEvuk-maQdJeTNadSg3rFi0&usqp=CAU',
  // );
  const selectedAvatar = useSelector((state: any) => state.selectedAvatar.selectedAvatar);
  const theme = useSelector((state: RootStateTheme) => state.changeTheme.theme);
  const dispatch = useDispatch();

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  // const [formData, setFormData] = useState<IFormData>({
  //   name: '',
  //   surname: '',
  //   phone: '',
  //   country: '',
  //   email: '',
  //   password: '',
  //   repeat_password: '',
  // });
  const formData = useSelector((state: any) => state.formData.formData);

  const [openCreationMessageAndCircular, setOpenCreationMessageAndCircular] = useState(false);
  const clearReduxStateLogin = () => {
    dispatch(clearFormData());
    dispatch(clearAvatar());
  };

  const handleCreateAccaunt = () => {
    for (const field in formData) {
      if (formData[field] === '') {
        alert('Пожалуйста, заполните все поля');
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Пожалуйста, введите корректный адрес электронной почты.');
      return;
    }

    if (formData.password.length < 6 || formData.repeat_password.length < 6) {
      alert('Пароли должны содержать как минимум 6 символов.');
      return;
    }

    if (formData.phone.length < 10) {
      alert('Номер телефона должен иметь 10 цифр');
      return;
    }

    if (formData.country.length < 4) {
      alert('К сожалению такой страны + города не существует');
      return;
    }

    if (formData.password !== formData.repeat_password) {
      setPasswordsMatch(false);
      alert('Пароли не совпадают. Пожалуйста, проверьте введенные данные.');
      return;
    }

    if (formData.name.length < 5 || formData.surname.length < 5) {
      alert('Имя и Фамилия должны содержать как минимум 5 символа.');
      return;
    }

    setPasswordsMatch(true);
    // const message = window.confirm('Ваш аккаунт успешно создан, поздравляем!');
    setOpenCreationMessageAndCircular(true);
    setTimeout(() => {
      window.location.reload();
    }, 1200);

    // if (message) {
    //   window.location.reload();
    // }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    for (const field in formData) {
      if (formData[field] === '') {
        alert('Пожалуйста, заполните все поля');
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Пожалуйста, введите корректный адрес электронной почты.');
      return;
    }

    if (formData.password !== formData.repeat_password) {
      setPasswordsMatch(false);
      alert('Пароли не совпадают. Пожалуйста, проверьте введенные данные.');
      return;
    }

    setPasswordsMatch(true);
    console.log('Форма успешно отправлена!');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result;
        if (imageUrl) {
          dispatch(setSelectedAvatar(imageUrl as string));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    dispatch(setFormData({ ...formData, [fieldName]: value }));
  };

  return (
    <>
      <div>
        <Snackbar
          autoHideDuration={500000}
          variant="solid"
          color="primary"
          size="lg"
          invertedColors
          open={openCreationMessageAndCircular}
          onClose={() => setOpenCreationMessageAndCircular(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={(theme) => ({
            background: '#ef5b24',
            maxWidth: 360,
          })}>
          <div>
            <TypographyJoy level="title-lg">Next Pizza:</TypographyJoy>
            <TypographyJoy sx={{ mt: 1, mb: 2, color: 'white' }}>
              Вы успешно создали свой аккаунт
            </TypographyJoy>
          </div>
        </Snackbar>
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openCreationMessageAndCircular}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <BackIcon
          onClick={handleBackToLogin}
          onClickCapture={clearReduxStateLogin}
          sx={{ position: 'absolute', cursor: 'pointer', color: theme ? 'white' : 'black' }}
        />
        <div className="Avatar-register">
          <label htmlFor="imageUpload" style={{ position: 'relative' }}>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              style={{
                display: 'none',
              }}
              onChange={handleImageChange}
            />
            <Avatar
              sx={{ cursor: 'pointer', width: '140px', height: '140px' }}
              src={selectedAvatar as string}
            />
          </label>
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <div className="inputForm">
            <input
              required
              value={formData.name}
              style={{
                backgroundColor: theme ? '#272727' : '#fff',
                color: theme ? 'white' : 'black',
              }}
              onChange={(e) => handleInputChange('name', e.target.value)}
              name="name"
              id="name"
              type="text"
              className="input"
              placeholder="Имя"
            />
          </div>
          <div className="inputForm">
            <input
              required
              value={formData.surname}
              style={{
                backgroundColor: theme ? '#272727' : '#fff',
                color: theme ? 'white' : 'black',
              }}
              onChange={(e) => handleInputChange('surname', e.target.value)}
              name="surname"
              id="surname"
              type="text"
              className="input"
              placeholder="Фамилия"
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill={theme ? 'white' : 'black'}
                d="M6.176 1.322l2.844-1.322 4.041 7.89-2.724 1.341c-.538 1.259 2.159 6.289 3.297 6.372.09-.058 2.671-1.328 2.671-1.328l4.11 7.932s-2.764 1.354-2.854 1.396c-7.862 3.591-19.103-18.258-11.385-22.281zm1.929 1.274l-1.023.504c-5.294 2.762 4.177 21.185 9.648 18.686l.971-.474-2.271-4.383-1.026.5c-3.163 1.547-8.262-8.219-5.055-9.938l1.007-.497-2.251-4.398z"
              />
            </svg>
            <h3
              style={{ marginTop: '13px', marginRight: '-3px', color: theme ? 'white' : 'black' }}>
              +
            </h3>
            <input
              required
              value={formData.phone}
              style={{
                backgroundColor: theme ? '#272727' : '#fff',
                color: theme ? 'white' : 'black',
              }}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              name="phone"
              id="phone"
              defaultValue="995"
              type="number"
              className="input"
              placeholder="Номер телефона"
            />
          </div>
          <div className="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill={theme ? 'white' : 'black'}
                d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"
              />
            </svg>
            <input
              required
              value={formData.country}
              style={{
                backgroundColor: theme ? '#272727' : '#fff',
                color: theme ? 'white' : 'black',
              }}
              onChange={(e) => handleInputChange('country', e.target.value)}
              name="country"
              id="country"
              type="text"
              className="input"
              placeholder="Страна | Город"
            />
          </div>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
            <g id="Layer_3" data-name="Layer 3">
              <path
                fill={theme ? 'white' : 'black'}
                d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            required
            value={formData.email}
            style={{
              backgroundColor: theme ? '#272727' : '#fff',
              color: theme ? 'white' : 'black',
            }}
            name="email"
            id="email"
            type="email"
            className="input"
            placeholder="Электронная почта"
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={theme ? 'white' : 'black'}
              d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path
              fill={theme ? 'white' : 'black'}
              d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            required
            value={formData.password}
            style={{
              backgroundColor: theme ? '#272727' : '#fff',
              color: theme ? 'white' : 'black',
            }}
            name="password"
            id="password"
            type="text"
            className="input"
            placeholder="Придумайте пароль"
            onChange={(e) => {
              handleInputChange('password', e.target.value);
              if (e.target.value === formData.repeat_password) {
                setPasswordsMatch(true);
              } else {
                setPasswordsMatch(false);
              }
            }}
          />
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={theme ? 'white' : 'black'}
              d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path
              fill={theme ? 'white' : 'black'}
              d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            required
            value={formData.repeat_password}
            style={{
              backgroundColor: theme ? '#272727' : '#fff',
              color: theme ? 'white' : 'black',
            }}
            type="text"
            className="input"
            placeholder="Повторите пароль"
            id="repeat_password"
            name="repeat_password"
            onChange={(e) => {
              handleInputChange('repeat_password', e.target.value);
              if (e.target.value === formData.password) {
                setPasswordsMatch(true);
              } else {
                setPasswordsMatch(false);
              }
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClickCapture={handleSubmit} onClick={handleCreateAccaunt} className="button">
            Зарегистрироваться
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
