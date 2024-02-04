import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import tahunAjaranSlice from './slices/tahunAjaranSlice';
import kelasSlice from './slices/kelasSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tahunAjaran: tahunAjaranSlice,
    kelas: kelasSlice,
  },
});
