'use client';

import { createSlice } from '@reduxjs/toolkit';

const savedAvatar = localStorage.getItem('selectedAvatar');

const initialState = {
  selectedAvatar:
    savedAvatar ||
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PxtAWTgOyp0m_7NgdCm3T_9-aU0Zhg47SvX-AaLTU4y0kEvuk-maQdJeTNadSg3rFi0&usqp=CAU',
};

const selectedAvatar = createSlice({
  name: 'selected/avatar',
  initialState,
  reducers: {
    setSelectedAvatar: (state, action) => {
      state.selectedAvatar = action.payload;
      localStorage.setItem('selectedAvatar', action.payload);
    },
    clearAvatar: (state) => {
      state.selectedAvatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PxtAWTgOyp0m_7NgdCm3T_9-aU0Zhg47SvX-AaLTU4y0kEvuk-maQdJeTNadSg3rFi0&usqp=CAU';
      localStorage.removeItem('selectedAvatar');
    },
  },
});

export const { setSelectedAvatar, clearAvatar } = selectedAvatar.actions;
export default selectedAvatar.reducer;
