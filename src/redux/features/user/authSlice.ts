// src/features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type Role = "admin" | "customer";
export type TUser = {
  userId: string;
  role: Role;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
  loading: boolean
};

const initialState: TAuthState = {
  user: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // true or false
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
  },
});


export const { setUser, logout,setLoading, } = authSlice.actions;

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
