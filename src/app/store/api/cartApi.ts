import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {BASE_API} from "../../constants/constants";
import {CartType} from "../../types/cart.type";
import {DefaultResponseType} from "../../types/defaultResponse.type";

export interface ICartItem {
    productId: string;
    quantity: number;
}

export const cartAPI = createApi({
    reducerPath: 'cartAPI',
    tagTypes: ['cart'],
    baseQuery: fetchBaseQuery({baseUrl: BASE_API}),
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
        })
        // getCartCount:
    })
});

export const {
    useGetCartQuery,
    useUpdateCartMutation
} = cartAPI;