import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {BASE_API} from "../../constants/constants";

import {ProductType} from "../../types/product.type";

export const productAPI = createApi({
    reducerPath: 'productAPI',
    tagTypes: ['product'],
    baseQuery: fetchBaseQuery({baseUrl: BASE_API}),
    endpoints: (builder) => ({
        getProduct: builder.query<ProductType, string>({
            query: (prodUrl: string) => ({
                url: 'products/' + prodUrl
            }),
            providesTags: ['product']
        }),
        getProducts: builder.query<{ totalCount: number, pages: number, items: ProductType[] }, string>({
            query: (params: string) => ({
                url: 'products' + params
            }),
            providesTags: ['product']
        }),
        getBestProducts: builder.query<ProductType[], void>({
            query: () => ({
                url: 'products/best'
            }),
            providesTags: ['product']
        }),
        searchProducts: builder.query<ProductType[], string>({
            query: (searchString: string) => {
                return ({
                    url: 'products/search?query=' + searchString
                });
            },
            providesTags: ['product']
        }),
    })
});