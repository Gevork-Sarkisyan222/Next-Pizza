import { combineReducers } from '@reduxjs/toolkit';
import { valueSlice } from '../value.slice';

const rootReducer = combineReducers({
  value: valueSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
