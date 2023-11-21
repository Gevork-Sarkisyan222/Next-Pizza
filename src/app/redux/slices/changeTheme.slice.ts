import { createSlice } from '@reduxjs/toolkit';

interface ITheme {
  theme: boolean;
}

const initialState: ITheme = {
  theme: false,
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
    },
    setChangeThemeDark(state) {
      state.theme = true;
    },
  },
});

export const { setChangeTheme, setChangeThemeLight, setChangeThemeDark } = changeThemeSlice.actions;
export default changeThemeSlice.reducer;
