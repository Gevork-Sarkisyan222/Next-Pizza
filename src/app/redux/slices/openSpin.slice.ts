import { createSlice } from '@reduxjs/toolkit';

interface ISpin {
  openSpin: boolean;
}

let initialOpenSpin = false;

if (typeof window !== 'undefined') {
  const savedOpenSpin = localStorage.getItem('openSpin');
  if (savedOpenSpin) {
    initialOpenSpin = JSON.parse(savedOpenSpin);
  }
}

const initialState: ISpin = {
  openSpin: initialOpenSpin,
};

export const openSpinSlice = createSlice({
  name: 'openSpin',
  initialState,
  reducers: {
    setOpenSpin(state) {
      state.openSpin = true;
      localStorage.setItem('openSpin', JSON.stringify(true));
    },
    setCloseSpin(state) {
      state.openSpin = false;
      localStorage.setItem('openSpin', JSON.stringify(false));
    },
  },
});

export const { setOpenSpin, setCloseSpin } = openSpinSlice.actions;
export default openSpinSlice.reducer;
