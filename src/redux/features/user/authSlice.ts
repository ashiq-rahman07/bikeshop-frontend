// src/features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;

// export type  TAuthState ={
//   token: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: TAuthState = {
//   token: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//       state.isAuthenticated = true;
//     },
//     clearCredentials: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { setCredentials, clearCredentials } = authSlice.actions;
// export default authSlice.reducer;