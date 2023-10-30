// checked.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckedState {
  [id: number]: boolean;
}

const isBrowser = typeof window !== 'undefined'; // Проверяем, запущено ли в браузере
const storedData = isBrowser ? localStorage.getItem('checkedState') : null;
const initialState: CheckedState = storedData ? JSON.parse(storedData) : {};

const checkedSlice = createSlice({
  name: 'checked',
  initialState,
  reducers: {
    setCheckedTrue(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      state[id] = true;
      if (isBrowser) localStorage.setItem('checkedState', JSON.stringify(state));
    },
    setCheckedFalse(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      state[id] = false;
      if (isBrowser) localStorage.setItem('checkedState', JSON.stringify(state));
    },
    clearAllChecked(state) {
      Object.keys(state).forEach((key) => {
        state[parseInt(key)] = false;
      });
      if (isBrowser) localStorage.setItem('checkedState', JSON.stringify(state));
    },
  },
});

export const { setCheckedTrue, setCheckedFalse, clearAllChecked } = checkedSlice.actions;
export default checkedSlice.reducer;
