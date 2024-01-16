import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IAuthState {
    isLogged: boolean;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: IAuthState = {
    isLogged: false,
    accessToken: null,
    refreshToken: null
}

export const authReducer = createSlice({
        name: 'auth',
        initialState: initialState,
        reducers: {
            setIsLogged: (state, action: PayloadAction<boolean>) => {
                state.isLogged = action.payload;
            },
            setAccessToken: (state, action: PayloadAction<string>) => {
                state.accessToken = action.payload;
            },
            removeAccessToken: (state) => {
                state.accessToken = null;
            },
            setRefreshToken: (state, action: PayloadAction<string>) => {
                state.refreshToken = action.payload;
            },
            removeRefreshToken: (state) => {
                state.refreshToken = null;
            },
        },
        selectors: {
            selectIsLogged: (state) => state.isLogged,
            selectAuthToken: (state) => state.accessToken,
            selectRefreshToken: (state) => state.refreshToken
        }
    }
);

export const {
    setIsLogged,
    setAccessToken,
    removeAccessToken,
    setRefreshToken,
    removeRefreshToken
} = authReducer.actions;
export const {selectIsLogged, selectAuthToken, selectRefreshToken} = authReducer.selectors;