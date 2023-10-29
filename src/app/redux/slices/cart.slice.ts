// src/redux/slices/cart.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type pizzas = {
  id: number;
  image: string;
  title: string;
  price: number;
};

interface IinitState {
  cart: pizzas[];
}

const savedCart = localStorage.getItem('cart');
const initialState: IinitState = {
  cart: savedCart ? JSON.parse(savedCart) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<pizzas>) => {
      state.cart.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { addCart, removeCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
