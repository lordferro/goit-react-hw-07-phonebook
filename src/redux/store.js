import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';
import contactsReducer from './contactsSlice';

export const store = configureStore({
  reducer: contactsReducer,
});
