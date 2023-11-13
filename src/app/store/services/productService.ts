import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import environment from "../../../environments/environment";
import {ProductType} from "../../types/product.type";
import {ActiveParamsType} from "../../types/active-params.type";

export const productAPI = createApi({
    reducerPath: 'productAPI',
    tagTypes: ['product'],
    baseQuery: fetchBaseQuery({baseUrl: environment.api}),
    endpoints: (builder) => ({
        getProduct: builder.query<ProductType, string>({
            query: (prodUrl: string) => ({
                url: 'products/' + prodUrl
            }),
            providesTags: result => ['product']
        }),
        getProducts: builder.query<{ totalCount: number, pages: number, items: ProductType[] }, ActiveParamsType>({
            query: (params: ActiveParamsType) => ({
                url: 'products/',
                params: {
                    params
                }
            }),
            providesTags: result => ['product']
        }),
        getBestProducts: builder.query<ProductType[], void>({
            query: () => ({
                url: 'products/best'
            }),
            providesTags: result => ['product']
        }),
        searchProducts: builder.query<ProductType[], string>({
            query: (searchPhrase: string) => ({
                url: 'products/search?query=' + searchPhrase
            }),
            providesTags: result => ['product']
        }),
    })
});