import  storage  from 'redux-persist/lib/storage';
export const authPersistConfig = {
    key: 'auth',
    storage,
  };
export const cartPersistConfig = {
    key: 'cart',
    storage,
  };