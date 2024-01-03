import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BASE_API} from "../../constants/constants";

import {TypeType} from "../../types/type.type";

export const typeApi = createApi({
    reducerPath: 'typeApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_API}),
    endpoints: (builder) => ({
        getTypes: builder.query<TypeType[], void>({
            query: () => ({
                url: 'types'
            })
        })
    })
});

export const {useGetTypesQuery} = typeApi;