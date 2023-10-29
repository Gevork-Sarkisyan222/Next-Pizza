'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IinitState {
  inputState: boolean;
}

const initialState: IinitState = {
  inputState: true,
};

export const valueSlice = createSlice({
  name: 'inputState',
  initialState,
  reducers: {
    setInputValue: (state) => {
      state.inputState = false;
    },
    setInputValueDefalut: (state) => {
      state.inputState = true;
    },
  },
});

export const { setInputValue, setInputValueDefalut } = valueSlice.actions;

export default valueSlice.reducer;
