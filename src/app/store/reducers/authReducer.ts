import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IAuthState {
    isLogged: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    userHasBeenChanged: boolean;
}

const initialState: IAuthState = {
    isLogged: false,
    accessToken: null,
    refreshToken: null,
    userHasBeenChanged: true
}

export const authReducer = createSlice({
        name: 'auth',
        initialState: initialState,
        reducers: (create) => ({
            setIsLogged: create.reducer((state, action: PayloadAction<boolean>) => {
                state.isLogged = action.payload;
            }),
            setAccessToken: create.reducer((state, action: PayloadAction<string>) => {
                state.accessToken = action.payload;
            }),
            removeAccessToken: create.reducer((state) => {
                state.accessToken = null;
            }),
            setRefreshToken: create.reducer((state, action: PayloadAction<string>) => {
                state.refreshToken = action.payload;
            }),
            removeRefreshToken: create.reducer((state) => {
                state.refreshToken = null;
            }),
            setUserHasBeenChanged: create.reducer((state) => {
                state.userHasBeenChanged = true;
            }),
            resetUserHasBeenChanged: create.reducer((state) => {
                state.userHasBeenChanged = false;
            })
        }),
        selectors: {
            selectIsLogged: (state) => state.isLogged,
            selectAuthToken: (state) => state.accessToken,
            selectRefreshToken: (state) => state.refreshToken,
            selectUserHasBeenChanged: (state) => state.userHasBeenChanged
        }
    }
);

export const {
    setIsLogged,
    setAccessToken,
    removeAccessToken,
    setRefreshToken,
    removeRefreshToken,
    setUserHasBeenChanged,
    resetUserHasBeenChanged
} = authReducer.actions;
export const {selectIsLogged, selectAuthToken, selectRefreshToken, selectUserHasBeenChanged} = authReducer.selectors;