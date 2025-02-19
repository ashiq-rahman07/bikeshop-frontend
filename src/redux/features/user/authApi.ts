// import { TSignInRequest, TSignInResponse } from "../../../types/alltypes";
import { TUser } from '../../../types/alltypes';
import { baseApi } from '../../api/baseApi';
// import { FieldValues } from 'react-hook-form';
// <TRegisterResponse, TRegisterRequest>
// <TSignInResponse, TSignInRequest>

// const registerApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         registerUser: builder.mutation({
//           query: (userData) => ({
//             url: '/user/register',
//             method: 'POST',
//             body: userData,
//           }),
//         }),
//         signInUser: builder.mutation({
//           query: (credentials) => ({
//             url: '/auth/login',
//             method: 'POST',
//             body: credentials,
//           }),
//         }),
//         getUsers: builder.query({
//           query: () => '/user',
//         }),
//         getSingleUser: builder.query({
//             query: (userId) => `/user/${userId}`,
//           }),
//         deleteUser:builder.mutation({
//           query: (userId) => ({
//             url:`/user/${userId}`,
//             method:'DELETE'
//           }),

//         })
//       }),

// })
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInUserPayload {
  email: string;
  password: string;
}

const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<TUser, RegisterUserPayload>({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData,
      }),
    }),
    signInUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUsers: builder.query<TUser[], void>({
      query: () => '/user',
    }),
    getSingleUser: builder.query({
      query: (userId) => `/user/${userId}`,
    }),
    updateUser: builder.mutation<
      TUser,
      { userId: string; userData: Partial<TUser> }
    >({
      query: ({ userId, userData }) => ({
        url: `/user/${userId}`,
        method: 'PATCH',
        body: userData,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useSignInUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = registerApi;

// export const { useRegisterUserMutation,  useSignInUserMutation,useGetUsersQuery,useGetSingleUserQuery,useDeleteUserMutation} = registerApi;

// getUsers: builder.query({
//   query: () => '/user',
// }),
// getSingleUser: builder.query({
//   query: (userId) => `/user/${userId}`,
// }),
