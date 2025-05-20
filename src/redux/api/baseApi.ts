import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// const backUrl = "https://bikeshop-server.onrender.com/api/v1"
// const backUrl = "http://localhost:5000/api/v1"

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bikeshop-server.onrender.com/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('authorization', `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['bike','gear','order', 'user'],
  endpoints: () => ({}),
});
