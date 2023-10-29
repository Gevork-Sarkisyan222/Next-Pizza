import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IinitState {
  value: string;
}

const initialState: IinitState = {
  value: '',
};

const storedValue = localStorage.getItem('value');

if (storedValue) {
  initialState.value = JSON.parse(storedValue);
}

export const valueSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem('value', JSON.stringify(action.payload));
    },
  },
});

export const { setValue } = valueSlice.actions;

export default valueSlice.reducer;
