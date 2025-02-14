// import { TSignInRequest, TSignInResponse } from "../../../types/alltypes";
import { baseApi } from "../../api/baseApi";
// <TRegisterResponse, TRegisterRequest>
// <TSignInResponse, TSignInRequest>
const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
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
      }),
    
})









export const { useRegisterUserMutation,  useSignInUserMutation} = registerApi;