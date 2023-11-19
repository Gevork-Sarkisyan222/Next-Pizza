import { combineReducers } from '@reduxjs/toolkit';
import { valueSlice } from '../InputState.slice';

const rootReducer = combineReducers({
  inputState: valueSlice.reducer,
});

export type RootStateInput = ReturnType<typeof rootReducer>;

export default rootReducer;
