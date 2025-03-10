import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// const backUrl = "https://asignment-2-five.vercel.app/api/v1"

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://asignment-2-five.vercel.app/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('authorization', `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['product', 'order', 'user'],
  endpoints: () => ({}),
});
