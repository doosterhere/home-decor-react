import {createApi} from "@reduxjs/toolkit/query/react";

import {baseQueryWithReAuth} from "../../utils";

import {CartType, DefaultResponseType, ICartItem} from "../../types";

export const cartAPI = createApi({
    reducerPath: 'cartAPI',
    tagTypes: ['cart'],
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getCart: builder.query<CartType | DefaultResponseType, void>({
            query: () => ({
                headers: {
                    withCredentials: 'true'
                },
                url: 'cart'
            }),
            providesTags: ['cart']
        }),
        updateCart: builder.mutation<CartType | DefaultResponseType, ICartItem>({
            query: (patch) => ({
                url: 'cart',
                method: 'POST',
                body: patch
            }),
            invalidatesTags: ['cart']
        }),
        getCartCount: builder.query<{ count: number } | DefaultResponseType, void>({
            query: () => ({
                headers: {
                    withCredentials: 'true'
                },
                url: 'cart/count'
            })
        })
    })
});