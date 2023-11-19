// checked.slice.ts

import { createSlice } from '@reduxjs/toolkit';

interface IopenMenu {
  openMenu: boolean;
}

const initialState: IopenMenu = {
  openMenu: false,
};

export const openMenuSlice = createSlice({
  name: 'openMenu',
  initialState,
  reducers: {
    setOpenMenu(state) {
      state.openMenu = true;
    },
    setCloseMenu(state) {
      state.openMenu = false;
    },
  },
});

export const { setOpenMenu, setCloseMenu } = openMenuSlice.actions;
export default openMenuSlice.reducer;
