// checked.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckedState {
  [id: number]: boolean;
}

const storedData = localStorage.getItem('checkedState');
const initialState: CheckedState = storedData ? JSON.parse(storedData) : {};

const checkedSlice = createSlice({
  name: 'checked',
  initialState,
  reducers: {
    setCheckedTrue(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      state[id] = true;
      localStorage.setItem('checkedState', JSON.stringify(state));
    },
    setCheckedFalse(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      state[id] = false;
      localStorage.setItem('checkedState', JSON.stringify(state));
    },
    clearAllChecked(state) {
      Object.keys(state).forEach((key) => {
        state[parseInt(key)] = false;
      });
      localStorage.setItem('checkedState', JSON.stringify(state));
    },
  },
});

export const { setCheckedTrue, setCheckedFalse, clearAllChecked } = checkedSlice.actions;
export default checkedSlice.reducer;
