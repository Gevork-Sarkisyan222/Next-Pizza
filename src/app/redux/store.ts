'use client';

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import value from './slices/value.slice';
import cart from './slices/cart.slice';
import checked from './slices/checked.slice';
import inputState from './slices/InputState.slice';

export const store = configureStore({
  reducer: {
    value,
    cart,
    checked,
    inputState,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
