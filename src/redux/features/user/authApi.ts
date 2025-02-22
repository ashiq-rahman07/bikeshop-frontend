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
type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  isActive: boolean;
  phone: string;
  address: string;
};
export interface UserResponse {
  success: boolean;
  message: string;
  data: IUser[];
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
    getUsers: builder.query<UserResponse, void>({
      query: () => '/user',
    }),
    getSingleUser: builder.query({
      query: (userId) => `/user/${userId}`,
    }),

    updateUser: builder.mutation<
      UserResponse,
      { userId: string; userData: Partial<IUser> }
    >({
      query: ({ userId, userData }) => ({
        url: `/user/${userId}`,
        method: 'PATCH',
        body: userData,
      }),
    }),
    updateUserStatus: builder.mutation<
      UserResponse,
      { userId: string; isActive: boolean }
    >({
      query: ({ userId, isActive }) => ({
        url: `/user/status/${userId}`,
        method: 'PATCH',
        body: { isActive },
      }),
      // invalidatesTags: (result, error, { id }) => [{ type: 'User', id }]
    }),

    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'DELETE',
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
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
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
} = registerApi;

// export const { useRegisterUserMutation,  useSignInUserMutation,useGetUsersQuery,useGetSingleUserQuery,useDeleteUserMutation} = registerApi;

// getUsers: builder.query({
//   query: () => '/user',
// }),
// getSingleUser: builder.query({
//   query: (userId) => `/user/${userId}`,
// }),
