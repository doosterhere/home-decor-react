import type {BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError,} from '@reduxjs/toolkit/query';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';

import {
    RootState,
    enqueueErrorMessage,
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
    setIsLogged,
    setRefreshToken
} from '../store';
import {BASE_API} from "../constants";

import {DefaultResponseType, LoginResponseType} from "../types";

const baseQueryWithAuthHeaders = fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.accessToken;

        if (token) {
            headers.set('x-access-token', token);
        }
    }
});

const logout = (api: BaseQueryApi) => {
    api.dispatch(removeAccessToken());
    api.dispatch(removeRefreshToken());
    api.dispatch(setIsLogged(false));
    api.dispatch(enqueueErrorMessage('Для доступа необходимо авторизоваться'));
}

export const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQueryWithAuthHeaders(args, api, extraOptions);

    if (result.error &&
        (
            result.error.status === 401 ||
            result.error.status === 500 && (result.error.data as DefaultResponseType).message === 'jwt expired'
        )
    ) {
        const state = api.getState() as RootState;
        const refreshToken = state.auth.refreshToken;
        const refreshResult = await baseQueryWithAuthHeaders({
                url: 'refresh',
                method: 'POST',
                body: {refreshToken}
            },
            api,
            extraOptions);

        if (refreshResult.error && refreshResult.error.status === 400) {
            logout(api);
            return refreshResult;
        }

        if (refreshResult.data && (refreshResult.data as LoginResponseType).userId) {
            const userData = refreshResult.data as LoginResponseType;
            api.dispatch(setAccessToken(userData.accessToken));
            api.dispatch(setRefreshToken(userData.refreshToken));
            result = await baseQueryWithAuthHeaders(args, api, extraOptions);
        } else {
            logout(api);
        }
    }
    return result;
};