// src/redux/slices/cart.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type pizzas = {
  id: number;
  image: string;
  title: string;
  price: number;
};

interface IinitState {
  cart: pizzas[];
}

const isBrowser = typeof window !== 'undefined';
const savedCart = isBrowser ? localStorage.getItem('cart') : null;
const initialState: IinitState = {
  cart: savedCart ? JSON.parse(savedCart) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<pizzas>) => {
      state.cart.push(action.payload);
      if (isBrowser) localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      if (isBrowser) localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      if (isBrowser) localStorage.removeItem('cart');
    },
  },
});

export const { addCart, removeCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
