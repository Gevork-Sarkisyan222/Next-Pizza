import { createSlice } from '@reduxjs/toolkit';

interface ITheme {
  theme: boolean;
}

const savedTheme = localStorage.getItem('theme');
const initialState: ITheme = {
  theme: savedTheme ? JSON.parse(savedTheme) : false,
};

const saveThemeToLocalStorage = (theme: boolean) => {
  localStorage.setItem('theme', JSON.stringify(theme));
};

export const changeThemeSlice = createSlice({
  name: 'changeTheme',
  initialState,
  reducers: {
    setChangeTheme(state) {
      state.theme = !state.theme;
    },
    setChangeThemeLight(state) {
      state.theme = false;
      saveThemeToLocalStorage(false); // Сохраняем значение в localStorage
    },
    setChangeThemeDark(state) {
      state.theme = true;
      saveThemeToLocalStorage(true); // Сохраняем значение в localStorage
    },
  },
});

export const { setChangeTheme, setChangeThemeLight, setChangeThemeDark } = changeThemeSlice.actions;
export default changeThemeSlice.reducer;
