import { combineReducers } from '@reduxjs/toolkit';
import { openMenuSlice } from '../openMenu.slice';

const rootReducer = combineReducers({
  openMenu: openMenuSlice.reducer,
});

export type RootStateMenu = ReturnType<typeof rootReducer>;

export default rootReducer;
