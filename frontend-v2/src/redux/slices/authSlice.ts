import { createSlice } from '@reduxjs/toolkit';
import { DataUser } from '../../interfaces/store';

const initialState: DataUser = {
  isLogin: false,
  email: '',
  role: '',
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isLogin = false;
      state.email = '';
      state.role = '';
      state.token = '';
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
