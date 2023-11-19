import { combineReducers } from '@reduxjs/toolkit';
import { changeThemeSlice } from '../changeTheme.slice';

const rootReducer = combineReducers({
  changeTheme: changeThemeSlice.reducer,
});

export type RootStateTheme = ReturnType<typeof rootReducer>;

export default rootReducer;
