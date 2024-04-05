import {createApi} from "@reduxjs/toolkit/query/react";

import {baseQueryWithReAuth} from "../../utils";

import {DefaultResponseType, FavoritesType} from "../../types";

export const favoritesApi = createApi({
    reducerPath: 'favoritesAPI',
    tagTypes: ['favorites'],
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getFavorites: builder.query<FavoritesType[] | DefaultResponseType, void>({
            query: () => ({
                url: 'favorites'
            }),
            providesTags: ['favorites']
        }),
        addToFavorites: builder.mutation<DefaultResponseType | FavoritesType, string>({
            query: (productId) => ({
                method: 'POST',
                url: 'favorites',
                body: {
                    productId
                }
            }),
            invalidatesTags: ['favorites']
        }),
        removeFromFavorites: builder.mutation<DefaultResponseType, string>({
            query: (productId) => ({
                method: 'DELETE',
                url: 'favorites',
                body: {
                    productId
                }
            }),
            invalidatesTags: ['favorites']
        }),
    })
});