import { combineReducers } from '@reduxjs/toolkit';
import { cartSlice } from '../cart.slice';

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
