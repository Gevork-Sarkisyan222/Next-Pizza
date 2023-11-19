import { combineReducers } from '@reduxjs/toolkit';
import { openSpinSlice } from '../openSpin.slice';

const rootReducer = combineReducers({
  openSpin: openSpinSlice.reducer,
});

export type RootStateSpin = ReturnType<typeof rootReducer>;

export default rootReducer;
