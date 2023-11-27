'use client';

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import value from './slices/value.slice';
import cart from './slices/cart.slice';
import checked from './slices/checked.slice';
import inputState from './slices/InputState.slice';
import openMenu from './slices/openMenu.slice';
import changeTheme from './slices/changeTheme.slice';
import openSpin from './slices/openSpin.slice';
import formData from './slices/formData.slice';
import selectedAvatar from './slices/selectedAvatar.slice';

export const store = configureStore({
  reducer: {
    value,
    cart,
    checked,
    inputState,
    openMenu,
    changeTheme,
    openSpin,
    formData,
    selectedAvatar,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
