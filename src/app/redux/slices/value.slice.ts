import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IinitState {
  value: string;
}

const initialState: IinitState = {
  value: '',
};

export const valueSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = valueSlice.actions;

export default valueSlice.reducer;
