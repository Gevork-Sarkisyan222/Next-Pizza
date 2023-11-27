import { createSlice } from '@reduxjs/toolkit';

let savedAvatar = null;

if (typeof window !== 'undefined') {
  savedAvatar = localStorage.getItem('selectedAvatar');
}

const initialState = {
  selectedAvatar:
    savedAvatar ||
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PxtAWTgOyp0m_7NgdCm3T_9-aU0Zhg47SvX-AaLTU4y0kEvuk-maQdJeTNadSg3rFi0&usqp=CAU',
};

// Ваш срез Redux
const selectedAvatar = createSlice({
  name: 'selected/avatar',
  initialState,
  reducers: {
    setSelectedAvatar: (state, action) => {
      state.selectedAvatar = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedAvatar', action.payload);
      }
    },
    clearAvatar: (state) => {
      state.selectedAvatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PxtAWTgOyp0m_7NgdCm3T_9-aU0Zhg47SvX-AaLTU4y0kEvuk-maQdJeTNadSg3rFi0&usqp=CAU';
      if (typeof window !== 'undefined') {
        localStorage.removeItem('selectedAvatar');
      }
    },
  },
});

export const { setSelectedAvatar, clearAvatar } = selectedAvatar.actions;
export default selectedAvatar.reducer;
