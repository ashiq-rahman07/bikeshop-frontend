/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action, configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/features/cart/cartSlice';
import authReducer from '../redux/features/user/authSlice';
// import authReducer from '../redux/features/user/authSlice'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {
  authPersistConfig,
  cartPersistConfig,
} from './persistConfig/persistconfig';
import { baseApi } from './api/baseApi';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'auth',
//   storage,
// };

// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    //   auth:persistedAuthReducer
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
