import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {BASE_API} from "../../constants";

import {LoginResponseType, DefaultResponseType, SignupType, LoginType} from "../../types";

export const authApi = createApi({
    reducerPath: 'authAPI',
    tagTypes: ['auth'],
    baseQuery: fetchBaseQuery({baseUrl: BASE_API}),
    endpoints: (builder) => ({
        signup: builder.mutation<DefaultResponseType | LoginResponseType, SignupType>({
            query: (body) => ({
                url: 'signup',
                method: 'POST',
                body
            }),
            invalidatesTags: ['auth']
        }),
        login: builder.mutation<DefaultResponseType | LoginResponseType, LoginType>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body
            }),
            invalidatesTags: ['auth']
        }),
        refresh: builder.mutation<DefaultResponseType | LoginResponseType, { refreshToken: string }>({
            query: (body) => ({
                url: 'refresh',
                method: 'POST',
                body
            }),
            invalidatesTags: ['auth']
        }),
        logout: builder.mutation<DefaultResponseType, { refreshToken: string }>({
            query: (body) => ({
                url: 'logout',
                method: 'POST',
                body
            }),
            invalidatesTags: ['auth']
        }),
    })
});